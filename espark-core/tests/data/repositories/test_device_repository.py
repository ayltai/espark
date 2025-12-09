from pytest import mark

from unittest.mock import AsyncMock, MagicMock

from esparkcore.data.models import Device
from esparkcore.data.repositories import DeviceRepository


@mark.asyncio
async def test_get_by_id():
    repo    = DeviceRepository()
    session = AsyncMock()

    session.execute = AsyncMock(return_value=MagicMock(scalars=MagicMock(return_value=MagicMock(first=MagicMock(return_value=Device(id='1'))))))
    device = await repo.get_by_id(session, '1')

    assert isinstance(device, Device)
