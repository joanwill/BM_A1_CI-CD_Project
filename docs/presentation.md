
# Abschlusspräsentation (30–45 min)

## 1. Projektübersicht (Demo)
- Zeige die App (Frontend + Backend)
- Swagger UI: `http://localhost:8000/docs`

## 2. Technologieentscheidungen
- Warum FastAPI, React/Vite, Docker, GitHub Actions, Terraform (Docker Provider)
- Alternativen (Express/Node, Postgres, k8s)

## 3. Entwicklungsprozess (Agil)
- Iterationen (1–2 Wochen): Planung → Umsetzung → Testing → Review
- Inkrementelles Vorgehen, Priorisierung (MVP → Features)
- Tracking über GitHub Issues/Projects (Beispiele im Journal)

## 4. CI/CD-Pipeline
- Build, Test (Unit + Integration), Docker Build
- Push auf Registry bei main
- Manuelles Deploy: Compose oder `terraform apply`
- Live: Commit pushen → Actions zeigen → neues Image ziehen

## 5. Herausforderungen & Lösungen
- CORS / Env-Handling
- Testdatenbank (In-Memory SQLite)
- Deterministische Builds

## 6. Lessons Learned
- Kleine Inkremente liefern
- Pipeline früh aufsetzen
- Tests zuerst, um Verhalten zu sichern

## 7. Live-Demo
- Feature hinzufügen (kleine UI/Endpoint-Änderung)
- Pipeline läuft
- Deploy via Compose/Terraform
