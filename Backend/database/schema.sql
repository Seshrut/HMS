CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE doctors (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  specialization TEXT
);

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  patient_id INT REFERENCES patients(id),
  doctor_id INT REFERENCES doctors(id),
  appointment_date DATE,
  status VARCHAR(20) DEFAULT 'pending'
);

CREATE TABLE prescriptions (
  id SERIAL PRIMARY KEY,
  appointment_id INT REFERENCES appointments(id),
  diagnosis TEXT,
  medicines TEXT
);