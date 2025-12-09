from datetime import datetime
from typing import Dict, Optional

from sqlalchemy import Column
from sqlmodel import SQLModel, Field, JSON


class Device(SQLModel, table=True):
    id           : str                         = Field(primary_key=True, description='Unique identifier for the device')
    display_name : Optional[str]               = Field(default=None, description='Human-readable name of the device')
    capabilities : Optional[str]               = Field(default=None, description='Comma separated capabilities of the device')
    parameters   : Dict[str, str | int | bool] = Field(default_factory=dict, sa_column=Column(JSON), description='JSON string of capability-specific parameters')
    last_seen    : datetime                    = Field(index=True, description='Last time the device was seen online')
