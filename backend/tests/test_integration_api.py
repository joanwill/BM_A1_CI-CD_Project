
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    r = client.get("/api/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"

def test_task_flow():
    # create
    r = client.post("/api/tasks", json={"title": "Hello"})
    assert r.status_code == 201
    tid = r.json()["id"]

    # list
    r = client.get("/api/tasks")
    assert r.status_code == 200
    assert any(t["id"] == tid for t in r.json())

    # done
    r = client.post(f"/api/tasks/{tid}/done")
    assert r.status_code == 200
    assert r.json()["done"] is True

    # delete
    r = client.delete(f"/api/tasks/{tid}")
    assert r.status_code == 204
