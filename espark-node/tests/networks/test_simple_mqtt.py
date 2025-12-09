from unittest.mock import MagicMock, patch

from esparknode.configs import MQTT_KEEPALIVE
from esparknode.networks.dummy_wifi import WiFiManager
from esparknode.networks.simple_mqtt import MQTTManager
from esparknode.utils.dummy_watchdog import Watchdog

def test_connect_and_publish():
    with patch('esparknode.networks.simple_mqtt.Client') as MockClient:
        mock_client = MagicMock()
        MockClient.return_value = mock_client

        watchdog = Watchdog()
        manager  = MQTTManager(WiFiManager(watchdog, ssid='test_ssid', password='test_password'), watchdog=watchdog, device_id='dev1', host='localhost', port=1883)

        mock_client.is_connected.return_value = False
        mock_client.connect.return_value      = None
        mock_client.loop_start.return_value   = None
        mock_client.subscribe.return_value    = None
        mock_client.publish.return_value      = None

        manager.publish('topic', 'msg')

        mock_client.connect.assert_called_with('localhost', 1883, keepalive=MQTT_KEEPALIVE)
        mock_client.publish.assert_called_with('topic', 'msg', qos=1, retain=False)

        mock_client.is_connected.return_value = True

        manager.publish('topic2', 'msg2')

        mock_client.publish.assert_called_with('topic2', 'msg2', qos=1, retain=False)
