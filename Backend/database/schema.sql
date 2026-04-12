-- HMS Database Schema
-- Run these statements to set up a fresh database.
-- If tables already exist, use the ALTER TABLE section at the bottom.

CREATE TABLE patients (
  id       SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255)        NOT NULL
);

CREATE TABLE doctors (
  id             SERIAL PRIMARY KEY,
  username       VARCHAR(100) UNIQUE NOT NULL,
  password       VARCHAR(255)        NOT NULL,
  specialization TEXT
);

CREATE TABLE appointments (
  id               SERIAL PRIMARY KEY,
  patient_id       INT REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id        INT REFERENCES doctors(id)  ON DELETE CASCADE,
  appointment_date DATE        NOT NULL,
  status           VARCHAR(20) NOT NULL DEFAULT 'pending'
  -- status values: pending | approved | completed | cancelled
);

CREATE TABLE prescriptions (
  id             SERIAL PRIMARY KEY,
  appointment_id INT REFERENCES appointments(id) ON DELETE CASCADE,
  patient_name   VARCHAR(100),
  complaint      TEXT,
  diagnosis      TEXT NOT NULL,
  medicines      TEXT,           -- stored as JSON string: [{name, instructions, duration}]
  advice         TEXT,
  follow_up      TEXT,
  created_at     TIMESTAMP DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- MIGRATION: Run these if you already have an older prescriptions table
-- ─────────────────────────────────────────────────────────────
-- ALTER TABLE prescriptions ADD COLUMN IF NOT EXISTS patient_name VARCHAR(100);
-- ALTER TABLE prescriptions ADD COLUMN IF NOT EXISTS complaint    TEXT;
-- ALTER TABLE prescriptions ADD COLUMN IF NOT EXISTS advice       TEXT;
-- ALTER TABLE prescriptions ADD COLUMN IF NOT EXISTS follow_up    TEXT;
-- ALTER TABLE prescriptions ADD COLUMN IF NOT EXISTS created_at   TIMESTAMP DEFAULT NOW();