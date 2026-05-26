import { create } from 'zustand'
import type { MeasurementType } from '@/types/domain'

interface MeasurementState {
  selectedType: MeasurementType | null
  value:        string
  systolic:     string  // pressão sistólica (blood_pressure)
  diastolic:    string  // pressão diastólica (blood_pressure)

  completed:    MeasurementType[]

  setType:      (type: MeasurementType) => void
  setValue:     (v: string) => void
  setSystolic:  (v: string) => void
  setDiastolic: (v: string) => void
  markCompleted:() => void
  resetCurrent: () => void
  resetSession: () => void
}

const INITIAL = {
  selectedType: null as MeasurementType | null,
  value:        '',
  systolic:     '',
  diastolic:    '',
}

export const useMeasurementStore = create<MeasurementState>((set) => ({
  ...INITIAL,
  completed:    [],
  setType:      (type)      => set({ selectedType: type }),
  setValue:     (value)     => set({ value }),
  setSystolic:  (systolic)  => set({ systolic }),
  setDiastolic: (diastolic) => set({ diastolic }),
  markCompleted:()          => set((state) => {
    if (!state.selectedType) return state
    return { completed: [...new Set([...state.completed, state.selectedType])] }
  }),
  resetCurrent: ()          => set(INITIAL),
  resetSession: ()          => set({ ...INITIAL, completed: [] }),
}))
