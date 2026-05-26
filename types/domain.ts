// Entidades do domínio VigidocApp

export interface User {
  id: string
  name: string
  birthDate: string
  sensitiveData: string  // criptografado — nunca em texto puro
  createdAt: string
}

export type MeasurementType =
  | 'blood_pressure'
  | 'heart_rate'
  | 'temperature'
  | 'glucose'
  | 'oxygen_saturation'
  | 'weight'

export type HealthStatus = 'normal' | 'attention' | 'critical'

export interface HealthMeasurement {
  id: string
  userId: string
  type: MeasurementType
  value: number | string
  unit: string
  status: HealthStatus
  measuredAt: string  // ISO 8601
}

export interface DailyLog {
  id: string
  userId: string
  date: string        // ISO 8601
  moodScore: number   // 1–5
  notes: string
  hasSymptoms: boolean
  deletedAt: string | null
}
