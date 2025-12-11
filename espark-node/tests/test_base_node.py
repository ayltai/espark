from unittest.mock import MagicMock

from pytest import fixture

from esparknode.base_node import BaseNode
from esparknode.constants import TOPIC_ACTION, TOPIC_DEVICE
from esparknode.networks.base_mqtt import BaseMQTTManager
from esparknode.networks.dummy_bluetooth import BluetoothManager
from esparknode.networks.dummy_wifi import WiFiManager
from esparknode.sensors.base_sensor import BaseSensor
from esparknode.utils.base_sleeper import BaseSleeper
from esparknode.utils.dummy_watchdog import Watchdog

watchdog     = Watchdog()
wifi_manager = WiFiManager(watchdog, ssid='test_ssid', password='test_password')


class DummySleeper(BaseSleeper):
    def light_sleep(self, interval: int) -> None:
        pass

    def deep_sleep(self, interval: int) -> None:
        pass


class DummyMQTT(BaseMQTTManager):
    def __init__(self, device_id: str, server: str):
        super().__init__(wifi_manager, watchdog, device_id, server)

        self.published = []
        self.callback  = None

    def set_on_callback(self, cb):
        self.callback = cb

    def publish(self, topic, msg, retain=False):
        self.published.append((topic, msg))


class DummySensor(BaseSensor):
    def __init__(self, data):
        self._data = data

    def read(self):
        return self._data


@fixture
def node():
    return BaseNode(
        device_id         = 'dev1',
        sleeper           = DummySleeper(),
        watchdog          = watchdog,
        wifi_manager      = wifi_manager,
        mqtt_manager      = DummyMQTT('dev1', 'mqtt://test'),
        bluetooth_manager = BluetoothManager(),
        sensors           = [DummySensor({'temperature': 25, 'humidity': 50})]
    )


def test_register_publishes(node: BaseNode):
    node.register()

    assert any('registration' in topic for topic, _ in node.mqtt_manager.published)


def test_telemetry_publishes(node: BaseNode):
    mqtt_manager = node.mqtt_manager
    mqtt_manager.publish = MagicMock()

    node.publish_telemetry()

    calls = mqtt_manager.publish.call_args_list
    assert any('temperature' in str(call) for call in calls)
    assert any('humidity' in str(call) for call in calls)


def test_on_mqtt_message_parameter_update(node: BaseNode):
    payload = {'param1': 'value1', 'param2': 42}
    topic   = f'{TOPIC_DEVICE}/{node.device_id}'

    node._on_mqtt_message(topic, payload)

    assert node.parameters_updated is True


def test_on_mqtt_message_action(node: BaseNode):
    payload = {'action': 'test_action'}
    topic   = f'{TOPIC_ACTION}/{node.device_id}'

    node._handle_action = MagicMock()
    node._on_mqtt_message(topic, payload)

    assert node.parameters_updated is False
    node._handle_action.assert_called_once()
