from typing import List
from fastapi import APIRouter, Depends
from models import SessionCreate, SessionRead
import crud
from crud import get_current_user  # your token-to-user helper

router = APIRouter(prefix="/sessions", tags=["sessions"])

@router.post("/", response_model=SessionRead, status_code=201)
def log_session(
    session_in: SessionCreate,
    current_user=Depends(get_current_user),
):
    return crud.create_session(current_user["id"], session_in.duration)


@router.get("/", response_model=List[SessionRead])
def list_sessions(current_user=Depends(get_current_user)):
    return crud.get_sessions(current_user["id"])


@router.get("/longest", response_model=List[SessionRead])
def longest_sessions(
    limit: int = 5,
    current_user=Depends(get_current_user),
):
    return crud.get_longest_sessions(current_user["id"], limit)
