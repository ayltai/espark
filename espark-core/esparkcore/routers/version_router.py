import pathlib

from json import loads
from os import getenv
from shutil import move, rmtree
from zipfile import ZipFile

from fastapi import File, HTTPException, status, Path, UploadFile

from ..constants import ENV_UPLOAD_PATH
from ..data.models import AppVersion
from ..data.repositories import AppVersionRepository
from .base_router import BaseRouter


class AppVersionRouter(BaseRouter):
    def __init__(self, repo: AppVersionRepository = None) -> None:
        self.repo : AppVersionRepository = repo or AppVersionRepository()

        super().__init__(AppVersion, self.repo, '/api/v1/apps', ['version'])

    def _setup_routes(self) -> None:
        @self.router.post('/upload/{app_name}/{version}')
        async def upload(app_name: str = Path(..., min_length=1), version: str = Path(..., min_length=1), file: UploadFile = File(...)):
            temp_zip = pathlib.Path(f'/tmp/{app_name}_{version}.zip')
            temp_dir = pathlib.Path(f'/tmp/{app_name}_{version}')

            with temp_zip.open('wb') as ref:
                ref.write(await file.read())

            with ZipFile(temp_zip, 'r') as ref:
                ref.extractall(temp_dir)

            package_json = temp_dir / 'package.json'
            if not package_json.exists():
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Missing package.json')

            package = loads(package_json.read_text())

            if 'urls' not in package:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Missing "files" field in package.json')

            destination = pathlib.Path(getenv(ENV_UPLOAD_PATH)) / app_name / version
            destination.mkdir(parents=True, exist_ok=True)

            if destination.exists():
                rmtree(destination)

            move(temp_dir, destination)

        super()._setup_routes()
