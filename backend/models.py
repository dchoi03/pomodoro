from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# What the client sends to register
class UserCreate(BaseModel):
  email: str
  username: str
  password: str
  name: Optional[str] = None

# What we send back after creating or fetching a user
class UserRead(BaseModel):
  id: str
  email: str
  created_at: datetime
  
  class Config:
    from_attributes=True # allowing reading from ORM object or dicts

# What the client sends to log in a session
class SessionCreate(BaseModel):
  duration: int # Seconds
  
class SessionRead(BaseModel):
  id: str
  user_id: str 
  duration: int
  inserted_at: datetime
  
  class Config:
    from_attributes=True 

# (Optional) wrap a list of sessions for a single response
class SessionsList(BaseModel):
    sessions: List[SessionRead]

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[str] = None
