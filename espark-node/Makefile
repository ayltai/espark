run:
	PYTHONPATH=. PYTHONDONTWRITEBYTECODE=1 python main.py

venv:
	python3 -m venv venv

reset: clean upgrade

clean:
	pip uninstall -y -r requirements.txt

upgrade:
	pip install --upgrade pip wheel setuptools
	pip install --upgrade --upgrade-strategy eager --no-cache-dir --prefer-binary -r requirements.txt

outdated:
	pip list --outdated

lint: autopep8 pycodestyle pylint

autopep8:
	PYTHONPATH=. autopep8 -i -r esparknode --global-config setup.cfg

pycodestyle:
	PYTHONPATH=. pycodestyle esparknode

pylint:
	PYTHONPATH=. pylint --recursive=y --fail-under=9.5 esparknode

test:
	PYTHONPATH=. PYTHONDONTWRITEBYTECODE=1 pytest --cov=esparknode --cov-report=term --cov-report=lcov
