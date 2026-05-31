import { create } from 'zustand'
import type { MeasurementType, HealthMeasurement } from '@/types/domain'

interface MeasurementState {
  selectedType: MeasurementType | null
  value: string
  systolic: string  // pressão sistólica (blood_pressure)
  diastolic: string  // pressão diastólica (blood_pressure)

  completed: MeasurementType[]
  records: HealthMeasurement[]
  sessionRecords: HealthMeasurement[]

  setType: (type: MeasurementType) => void
  setValue: (v: string) => void
  setSystolic: (v: string) => void
  setDiastolic: (v: string) => void
  markCompleted: () => void
  resetCurrent: () => void
  resetSession: () => void
  addSessionRecord: (record: HealthMeasurement) => void
  commitSession: () => void
}

const INITIAL_RECORDS: HealthMeasurement[] = [
  {
    id: '1',
    userId: 'user-1',
    type: 'blood_pressure',
    value: '120/80',
    unit: 'mmHg',
    status: 'normal',
    measuredAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: '2',
    userId: 'user-1',
    type: 'oxygen_saturation',
    value: 97,
    unit: 'SpO₂ %',
    status: 'normal',
    measuredAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: '3',
    userId: 'user-1',
    type: 'temperature',
    value: 37.8,
    unit: '°C',
    status: 'attention',
    measuredAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
]

const INITIAL = {
  selectedType: null as MeasurementType | null,
  value: '',
  systolic: '',
  diastolic: '',
}

export const useMeasurementStore = create<MeasurementState>((set) => ({
  ...INITIAL,
  completed: [],
  records: INITIAL_RECORDS,
  sessionRecords: [],
  setType: (type) => set({ selectedType: type }),
  setValue: (value) => set({ value }),
  setSystolic: (systolic) => set({ systolic }),
  setDiastolic: (diastolic) => set({ diastolic }),
  markCompleted: () => set((state) => {
    if (!state.selectedType) return state
    return { completed: [...new Set([...state.completed, state.selectedType])] }
  }),
  resetCurrent: () => set(INITIAL),
  resetSession: () => set({ ...INITIAL, completed: [], sessionRecords: [] }),
  addSessionRecord: (record) => set((state) => ({ sessionRecords: [...state.sessionRecords, record] })),
  commitSession: () => set((state) => {
    if (state.sessionRecords.length === 0) return state
    const commitTime = new Date().toISOString()
    const finalRecords = state.sessionRecords.map(r => ({ ...r, measuredAt: commitTime }))
    return {
      records: [...finalRecords, ...state.records],
      sessionRecords: []
    }
  }),
}))
