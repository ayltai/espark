venv:
	python3 -m venv venv

reset: clean upgrade

clean:
	pip uninstall -y -r requirements.txt
	pip uninstall -y -r requirements.dev.txt

upgrade:
	pip install --upgrade pip wheel setuptools
	pip install --upgrade --upgrade-strategy eager --no-cache-dir --prefer-binary -e .[dev]

outdated:
	pip list --outdated

lint: autopep8 pycodestyle pylint

autopep8:
	autopep8 -i -r esparkcore --global-config setup.cfg

pycodestyle:
	pycodestyle esparkcore

pylint:
	pylint --recursive=y --fail-under=9.5 esparkcore

test:
	pytest --cov=esparkcore --cov-report=term --cov-report=lcov

publish:
	rm -rf build dist *.egg-info
	python -m build
	python -m twine upload dist/* --non-interactive
