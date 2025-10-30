
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app import crud, schemas
from app.models import Base


def get_session():
    engine = create_engine("sqlite:///:memory:", connect_args={"check_same_thread": False})
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)
    return TestingSessionLocal()

def test_create_and_list_tasks():
    db = get_session()
    crud.create_task(db, schemas.TaskCreate(title="Test A"))
    crud.create_task(db, schemas.TaskCreate(title="Test B"))
    items = crud.list_tasks(db)
    assert len(items) == 2
    assert items[0].title == "Test B"  # desc order

def test_set_done_and_delete():
    db = get_session()
    t = crud.create_task(db, schemas.TaskCreate(title="X"))
    updated = crud.set_done(db, t.id, True)
    assert updated and updated.done is True
    assert crud.delete_task(db, t.id) is True
    assert crud.delete_task(db, t.id) is False
