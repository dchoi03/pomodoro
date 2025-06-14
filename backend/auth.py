from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from models import UserCreate, UserRead, Token
import crud

# create a router that will live under /auth
router = APIRouter(
  prefix="/auth",  # all routes here start with /auth
  tags=["auth"]    # groups them together in OPENapi docs
)

@router.post("/register", response_model=UserRead, status_code=201)
def register(user_in: UserCreate):
    """
    Sign up a new user.
    """
    return crud.create_user(user_in.dict())

@router.post("/token", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Log in and get a bearer token.
    """
    return crud.authenticate_user(form_data.username, form_data.password)
