from sqlmodel import SQLModel, Field
from typing import Optional


class ItemBase(SQLModel):
    name: str
    description: str


class Item(ItemBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class ItemCreate(ItemBase):
    pass


class ItemUpdate(ItemBase):
    pass
