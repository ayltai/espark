from esparknode.networks.dummy_wifi import WiFiManager
from esparknode.utils.dummy_watchdog import Watchdog


def test_dummy_wifi_connect():
    wifi = WiFiManager(Watchdog(), ssid='test_ssid', password='test_password')

    assert hasattr(wifi, 'ensure_wifi_on')
    assert callable(wifi.ensure_wifi_on)

    assert hasattr(wifi, 'ensure_wifi_off')
    assert callable(wifi.ensure_wifi_off)
