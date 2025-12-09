from datetime import timezone

from pytest import fixture

from fastapi import FastAPI
from fastapi.testclient import TestClient

from esparkcore.routers import DeviceRouter, TelemetryRouter


@fixture
def client() -> TestClient:
    app = FastAPI()
    app.include_router(DeviceRouter().router)
    app.include_router(TelemetryRouter().router)

    return TestClient(app)


@fixture
def async_monkeypatch(monkeypatch):
    def _patch(target, value):
        async def wrapper(*args, **kwargs):
            return value(*args, **kwargs) if callable(value) else value

        monkeypatch.setattr(target, wrapper)

    return _patch


def test_device_crud(client, monkeypatch):
    async def async_add(self, session, entity):
        return entity

    async def async_get(self, session, *args, **kwargs):
        return None

    monkeypatch.setattr('esparkcore.routers.device_router.DeviceRepository.add', async_add)
    monkeypatch.setattr('esparkcore.routers.device_router.DeviceRepository.get', async_get)

    response = client.post('/api/v1/devices/', json={
        'id'           : 'dev1',
        'display_name' : 'Device 1',
    })

    assert response.status_code == 201
    assert response.json()['id'] == 'dev1'


def test_telemetry_recent(client, monkeypatch):
    async def async_list(self, session, *args, **kwargs):
        return [type('Device', (), {
            'id'           : 'dev1',
            'capabilities' : 'sensor,actuator',
        })()]

    async def async_get_latest_for_device(self, session, device_id, data_type):
        return type('Telemetry', (), {
            'id'        : 1,
            'timestamp' : __import__('datetime').datetime.now(timezone.utc),
            'device_id' : device_id,
            'data_type' : data_type,
            'value'     : True,
        })()

    monkeypatch.setattr('esparkcore.routers.telemetry_router.DeviceRepository.list', async_list)
    monkeypatch.setattr('esparkcore.routers.telemetry_router.TelemetryRepository.get_latest_for_device', async_get_latest_for_device)

    response = client.get('/api/v1/telemetry/recent?offset=1')

    assert response.status_code == 200
    assert isinstance(response.json(), list)
