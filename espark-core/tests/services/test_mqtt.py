from pytest import mark

from unittest.mock import AsyncMock, MagicMock, patch

from esparkcore.services.mqtt import MQTTManager


@mark.asyncio
async def test_handle_registration_adds_and_updates():
    device_repo = MagicMock()

    device_repo.get    = AsyncMock(return_value=None)
    device_repo.add    = AsyncMock()
    device_repo.update = AsyncMock()

    manager = MQTTManager(device_repo=device_repo)

    with patch('esparkcore.services.mqtt.async_session') as mock_session:
        mock_session.return_value.__aenter__.return_value = AsyncMock()

        await manager._handle_registration('dev1', {
            'device_id'    : 'dev1',
            'capabilities' : [
                'cap1',
                'cap2',
            ],
        })

        device_repo.add.assert_awaited()

        device_repo.get = AsyncMock(return_value=MagicMock())

        await manager._handle_registration('dev1', {
            'device_id'    : 'dev1',
            'capabilities' : [
                'cap1',
                'cap2',
            ],
        })

        device_repo.update.assert_awaited()


@mark.asyncio
async def test_handle_telemetry_adds():
    telemetry_repo = MagicMock()

    telemetry_repo.add = AsyncMock()

    manager = MQTTManager(telemetry_repo=telemetry_repo)

    payload = {
        'data_type' : 'human_presence',
        'value'     : True,
    }

    with patch('esparkcore.services.mqtt.async_session') as mock_session:
        mock_session.return_value.__aenter__.return_value = AsyncMock()
        await manager._handle_telemetry('dev1', payload)

        telemetry_repo.add.assert_awaited()
