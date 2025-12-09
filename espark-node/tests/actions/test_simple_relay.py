from unittest.mock import patch

from esparknode.actions.simple_relay import Relay, RELAY_STATE_KEY

def test_turn_on_sets_state(monkeypatch):
    relay  = Relay()

    called = {}
    def set_int(key, value):
        called['key']   = key
        called['value'] = value

    monkeypatch.setattr(relay.storage, 'get_int', lambda key: 0)
    monkeypatch.setattr(relay.storage, 'set_int', set_int)

    with patch('time.sleep'):
        relay.turn_on()

    assert called['key'] == RELAY_STATE_KEY
    assert called['value'] == 1

def test_turn_on_noop_if_already_on(monkeypatch):
    relay = Relay()

    monkeypatch.setattr(relay.storage, 'get_int', lambda key: 1)
    monkeypatch.setattr(relay.storage, 'set_int', lambda key, value: (_ for _ in ()).throw(Exception("Should not be called")))

    with patch('time.sleep'):
        relay.turn_on()

def test_turn_off_sets_state(monkeypatch):
    relay = Relay()

    called = {}
    def set_int(key, value):
        called['key']   = key
        called['value'] = value

    monkeypatch.setattr(relay.storage, 'get_int', lambda key: 1)
    monkeypatch.setattr(relay.storage, 'set_int', set_int)

    with patch('time.sleep'):
        relay.turn_off()

    assert called['key'] == RELAY_STATE_KEY
    assert called['value'] == 0

def test_turn_off_noop_if_already_off(monkeypatch):
    relay = Relay()

    monkeypatch.setattr(relay.storage, 'get_int', lambda key: 0)
    monkeypatch.setattr(relay.storage, 'set_int', lambda key, value: (_ for _ in ()).throw(Exception("Should not be called")))

    with patch('time.sleep'):
        relay.turn_off()

def test_toggle_calls_turn_on_or_off(monkeypatch):
    relay = Relay()

    monkeypatch.setattr(relay, 'turn_on', lambda: setattr(relay, '_turned_on', True))
    monkeypatch.setattr(relay, 'turn_off', lambda: setattr(relay, '_turned_off', True))
    monkeypatch.setattr(relay.storage, 'get_int', lambda key: 1)

    relay.toggle()

    assert hasattr(relay, '_turned_off')

    monkeypatch.setattr(relay.storage, 'get_int', lambda key: 0)

    relay.toggle()

    assert hasattr(relay, '_turned_on')

def test_get_state_returns_value(monkeypatch):
    relay = Relay()

    monkeypatch.setattr(relay.storage, 'get_int', lambda key: 42)

    assert relay.get_state() == 42
