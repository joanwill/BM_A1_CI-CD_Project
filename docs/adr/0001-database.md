
# ADR 0001 – Datenbankwahl

## Status
Akzeptiert

## Kontext
Für ein einfaches Demo-Projekt ist ein minimaler Setup-Aufwand wichtig.

## Entscheidung
Wir verwenden **SQLite** für Persistenz. Für produktive Nutzung kann ein RDBMS (z. B. Postgres) angeschlossen werden.

## Konsequenzen
- Sehr einfacher Start
- Keine Netzwerkkonfiguration
- Migrationsstrategie mit Alembic möglich (hier nicht erforderlich)
