from fastapi import FastAPI
from auth import router as auth_router
from sessions import router as sessions_router

app = FastAPI()

app.include_router(auth_router)
app.include_router(sessions_router)
