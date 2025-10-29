
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .config import settings
from .database import SessionLocal, init_db
from . import crud, schemas

app = FastAPI(title=settings.APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in settings.CORS_ORIGINS.split(",") if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
def startup():
    init_db()

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.get("/api/tasks", response_model=list[schemas.TaskOut])
def get_tasks(db: Session = Depends(get_db)):
    return crud.list_tasks(db)

@app.post("/api/tasks", response_model=schemas.TaskOut, status_code=201)
def post_task(data: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.create_task(db, data)

@app.post("/api/tasks/{task_id}/done", response_model=schemas.TaskOut)
def mark_done(task_id: int, db: Session = Depends(get_db)):
    t = crud.set_done(db, task_id, True)
    if not t:
        raise HTTPException(status_code=404, detail="Task not found")
    return t

@app.delete("/api/tasks/{task_id}", status_code=204)
def delete(task_id: int, db: Session = Depends(get_db)):
    ok = crud.delete_task(db, task_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Task not found")
    return None
