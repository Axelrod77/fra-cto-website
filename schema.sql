-- FraCTO Team Quick Scan — D1 Schema

CREATE TABLE IF NOT EXISTS team_sessions (
  id TEXT PRIMARY KEY,
  invite_code TEXT UNIQUE NOT NULL,
  org_name TEXT NOT NULL,
  created_by_name TEXT NOT NULL,
  created_by_role TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS team_responses (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES team_sessions(id),
  respondent_name TEXT NOT NULL,
  respondent_role TEXT NOT NULL,
  answers TEXT NOT NULL,
  scores TEXT NOT NULL,
  submitted_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_sessions_code ON team_sessions(invite_code);
CREATE INDEX IF NOT EXISTS idx_responses_session ON team_responses(session_id);
