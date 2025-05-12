from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from ..database import get_session
from ..models import Item, ItemCreate, ItemUpdate

router = APIRouter(prefix="/api/itens", tags=["itens"])


@router.get("/")
def get_items(session: Session = Depends(get_session)):
    return session.exec(select(Item)).all()


@router.post("/")
def create_item(item: ItemCreate, session: Session = Depends(get_session)):
    new_item = Item.from_orm(item)
    session.add(new_item)
    session.commit()
    session.refresh(new_item)
    return new_item


@router.put("/{item_id}")
def update_item(item_id: int, updated: ItemUpdate, session: Session = Depends(get_session)):
    item = session.get(Item, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    item.name = updated.name
    item.description = updated.description
    session.commit()
    return item


@router.delete("/{item_id}")
def delete_item(item_id: int, session: Session = Depends(get_session)):
    item = session.get(Item, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    session.delete(item)
    session.commit()
    return {"ok": True}
