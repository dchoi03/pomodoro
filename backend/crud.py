from fastapi import HTTPException, Depends
from gotrue.errors import AuthApiError
from supabase_client import supabase
from typing import List
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

def create_user(user_data: dict) -> dict:
    """
    1. Call supabase.auth.sign_up({...})
    2. Catch AuthApiError and raise HTTPException(400, ...)
    3. On success, extract auth_res.user and return a dict matching UserRead
    """
    try:
        auth_res = supabase.auth.sign_up({
            "email":    user_data["email"],
            "password": user_data["password"],
            "options": {
                "data": {
                    "username": user_data["username"],
                    "name":     user_data.get("name")
                }
            }
        })
    except AuthApiError as e:
        # Supabase will throw this if email invalid, duplicate, etc.
        raise HTTPException(status_code=400, detail=e.message)

    # auth_res is an AuthResponse; its .user is the actual User object
    user = auth_res.user

    # build a plain dict that matches your UserRead schema
    return {
        "id":         user.id,
        "email":      user.email,
        "created_at": user.created_at,
    }


def authenticate_user(email: str, password: str) -> dict:
    """
    1. Call supabase.auth.sign_in_with_password({ email, password })
    2. Catch AuthApiError and raise HTTPException(401, ...)
    3. Return { "access_token": ..., "token_type": "bearer" }
    """
    try:
      auth_res = supabase.auth.sign_in_with_password({
        "email": email,
        "password": password
      })
    except AuthApiError as e:
        raise HTTPException(status_code=401, detail=e.message)

    session = auth_res.session
    if not session or not session.access_token:
        raise HTTPException(status_code=401, detail="Authentication failed")

    return {
        "access_token": session.access_token,
        "token_type":   "bearer"
    }


def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    """
    1. Call supabase.auth.get_user(token)
    2. Catch AuthApiError and raise HTTPException(401, ...)
    3. Extract auth_res.user and return a dict matching UserRead
    """
    
    try:
      auth_res = supabase.auth.get_user(token)
    except AuthApiError as e:
      raise HTTPException(status_code=401, detail='Invalid token')
    
    user = auth_res.user
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    return {
      "id": user.id,
      "email": user.email,
      "created_at": user.created_at,
    }

###############################################################################
# 2. SESSION OPERATIONS (via PostgREST on study_sessions)
###############################################################################

def create_session(user_id: str, duration: int) -> dict:
    """
    1. Call supabase.table("study_sessions")
               .insert([{"user_id": user_id, "duration": duration}])
               .single()
               .execute()
    2. If result.error: raise HTTPException(400, ...)
    3. Return result.data
    """
    result = (
      supabase
      .table("study_sessions")
      .insert([{"user_id": user_id, "duration": duration}])
      .execute()
    )
    
    if not result.data: 
      raise HTTPException(status_code=403, detail="Failed to Create Session")
    
    return result.data[0]       

def get_sessions(user_id: str) -> List[dict]:
    """
    1. Call supabase.table("study_sessions")
               .select("*")
               .eq("user_id", user_id)
               .order("inserted_at", {"ascending": False})
               .execute()
    2. If result.error: raise HTTPException(400, ...)
    3. Return result.data or []
    """
    result = (
      supabase
      .table("study_sessions")
      .select("*")
      .eq("user_id", user_id)
      .order("inserted_at")
      .execute()
    )
    
    if not result.data:
      raise HTTPException(status_code=403, detail="No Session Exists")
    
    return result.data


def get_longest_sessions(user_id: str, limit: int = 5) -> List[dict]:
    """
    1. Call supabase.table("study_sessions")
               .select("*")
               .eq("user_id", user_id)
               .order("duration", {"ascending": False})
               .limit(limit)
               .execute()
    2. If result.error: raise HTTPException(400, ...)
    3. Return result.data or []
    """
    result = (
      supabase
      .table("study_sessions")
      .select("*")
      .eq("user_id", user_id)
      .order("duration")
      .limit(limit)
      .execute()
    )
    
    if not result.data:
      raise HTTPException(status_code=400, detail="Invalid")

    return result.data
