
from sqlalchemy.orm import Session
from .models import Task
from .schemas import TaskCreate

def list_tasks(db: Session):
    return db.query(Task).order_by(Task.id.desc()).all()

def create_task(db: Session, data: TaskCreate):
    task = Task(title=data.title, done=False)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

def set_done(db: Session, task_id: int, done: bool):
    task = db.get(Task, task_id)
    if not task:
        return None
    task.done = done
    db.commit()
    db.refresh(task)
    return task

def delete_task(db: Session, task_id: int):
    task = db.get(Task, task_id)
    if not task:
        return False
    db.delete(task)
    db.commit()
    return True
