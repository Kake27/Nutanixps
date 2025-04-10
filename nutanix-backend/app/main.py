from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.predict import router as predict_router
from app.routes.graph import router as graph_router


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

app.include_router(predict_router)
app.include_router(graph_router)

@app.get("/")
async def root():
    return {"message": "Whalecum to the backrooms mf"}

