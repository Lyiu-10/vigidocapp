import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { secureStorage } from '@/lib/storage/secureStorage'

export type TourId = 'home' | 'measurement' | 'measurement_input'

export interface LayoutRect {
  x: number
  y: number
  width: number
  height: number
}

interface TutorialState {
  _hydrated: boolean
  homeTourCompleted: boolean
  measurementTourCompleted: boolean
  measurementInputTourCompleted: boolean
  activeTour: TourId | null
  currentStep: number
  layouts: Partial<Record<string, LayoutRect>>

  startTour: (tourId: TourId) => void
  nextStep: (totalSteps: number) => void
  skipTour: () => void
  registerLayout: (tourId: TourId, stepIndex: number, rect: LayoutRect) => void
}

export const useTutorialStore = create<TutorialState>()(
  persist(
    (set) => ({
      _hydrated: false,
      homeTourCompleted: false,
      measurementTourCompleted: false,
      measurementInputTourCompleted: false,
      activeTour: null,
      currentStep: 0,
      layouts: {},

      startTour: (tourId) => set({ activeTour: tourId, currentStep: 0 }),

      nextStep: (totalSteps) =>
        set((state) => {
          const next = state.currentStep + 1
          if (next >= totalSteps) {
            return {
              activeTour: null,
              currentStep: 0,
              homeTourCompleted:
                state.activeTour === 'home' ? true : state.homeTourCompleted,
              measurementTourCompleted:
                state.activeTour === 'measurement'
                  ? true
                  : state.measurementTourCompleted,
              measurementInputTourCompleted:
                state.activeTour === 'measurement_input'
                  ? true
                  : state.measurementInputTourCompleted,
            }
          }
          return { currentStep: next }
        }),

      skipTour: () =>
        set((state) => ({
          activeTour: null,
          currentStep: 0,
          homeTourCompleted:
            state.activeTour === 'home' ? true : state.homeTourCompleted,
          measurementTourCompleted:
            state.activeTour === 'measurement'
              ? true
              : state.measurementTourCompleted,
          measurementInputTourCompleted:
            state.activeTour === 'measurement_input'
              ? true
              : state.measurementInputTourCompleted,
        })),

      registerLayout: (tourId, stepIndex, rect) =>
        set((state) => {
          const key = `${tourId}:${stepIndex}`
          const prev = state.layouts[key]
          if (
            prev &&
            prev.x === rect.x &&
            prev.y === rect.y &&
            prev.width === rect.width &&
            prev.height === rect.height
          ) {
            return state
          }
          return { layouts: { ...state.layouts, [key]: rect } }
        }),
    }),
    {
      name: 'tutorial-completion',
      storage: createJSONStorage(() => ({
        getItem: (key) => secureStorage.get(key),
        setItem: (key, value) => secureStorage.set(key, value),
        removeItem: (key) => secureStorage.delete(key),
      })),
      partialize: (state) => ({
        homeTourCompleted: state.homeTourCompleted,
        measurementTourCompleted: state.measurementTourCompleted,
        measurementInputTourCompleted: state.measurementInputTourCompleted,
      }),
      onRehydrateStorage: () => (_state, error) => {
        if (!error) {
          useTutorialStore.setState({ _hydrated: true })
        }
      },
    }
  )
)
