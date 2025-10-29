
# Agile Two-Component App (Frontend + Backend)

A simple full‑stack **Tasks** application built to satisfy the project rubric:
- **Two components:** React Web Frontend + FastAPI Backend
- **CI/CD:** GitHub Actions with Build, Test, and Deploy (Docker images)
- **Tests:** Unit tests (required) + Integration tests
- **Docker:** Dockerfiles for both components + Docker Compose
- **Multiple environments:** `staging` and `production` via Docker Compose or Terraform (manual `terraform apply` step optional)
- **Docs:** Architecture decisions, implementation notes, challenges, work journal, and presentation outline

## Quick Start (Local Dev)
Prereqs: Docker, Docker Compose, Node 18+, Python 3.11+

```bash
# 1) run backend
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# 2) run frontend (in another terminal)
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 — the frontend will call the backend at http://localhost:8000 by default.

## Run Everything with Docker Compose
```bash
docker compose -f deploy/docker-compose.staging.yml up --build
# for prod-like
docker compose -f deploy/docker-compose.prod.yml up --build
```

## Environments
- **Staging:** uses `deploy/docker-compose.staging.yml`
- **Production:** uses `deploy/docker-compose.prod.yml`
- **Manual step example:** `terraform -chdir=terraform apply` (provisions backend + frontend containers via the Docker provider).

## CI/CD
- On **every push**: build + test (frontend & backend), then build Docker images
- On **push to main**: also push images to a registry (Docker Hub by default)
- Manual deploy: pull images in target environment or run Terraform

See `.github/workflows/ci.yml` and `docs/presentation.md` for demo steps.

## Tests
- **Backend**
  - Unit: utility and service functions
  - Integration: API endpoints with FastAPI TestClient and in-memory SQLite
- **Frontend**
  - Unit: components with Vitest + React Testing Library

---

For detailed design, see `docs/architecture.md` and `docs/adr/`.
