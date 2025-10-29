
# Architektur

## Überblick
Die Applikation besteht aus zwei Komponenten:
1. **Backend (FastAPI, Python)** – REST API, SQLite (Datei), Dockerbereitstellung.
2. **Frontend (React, Vite, TypeScript)** – Web-UI, kommuniziert mit der API über `VITE_API_BASE_URL`.

## Wichtige Entscheidungen
- **FastAPI**: Schnelle Entwicklung, gute Typsicherheit, eingebaute OpenAPI/Swagger.
- **SQLite**: Einfaches Setup, gut für Demo/Tests. Austauschbar durch Postgres.
- **React + Vite**: Moderne DX, schnelle Builds, einfache Tests (Vitest).
- **Docker**: Einheitliche Artefakte; Compose für Mehrumgebungen.
- **CI/CD (GitHub Actions)**: Build, Test, Docker Build & Push, pro Push.
- **Terraform (Docker Provider)**: Optionale manuelle Bereitstellung in zwei Umgebungen.

## Komponenten-Interaktion
Frontend → Backend (`/api/...`), CORS aktiviert. Backend persistiert Daten in SQLite (`tasks.db`).

## Environments
- **Staging:** `deploy/docker-compose.staging.yml` (API base `http://localhost:8080` via reverse proxy)
- **Production:** `deploy/docker-compose.prod.yml` (gleiches Schema, andere Variablen)

## Sicherheit & Qualität
- Input-Validierung mit Pydantic
- Fehlerbehandlung in FastAPI Middleware
- Tests (Unit + Integration) in CI
- Linting via `ruff` (Python) und `eslint` (Frontend)

## Skalierung
- DB-Adapter-Schicht erlaubt Postgres
- Containerisierbar für K8s
