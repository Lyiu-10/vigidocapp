import { MeasurementType, HealthStatus } from '@/types/domain'

export type MewsColor = 'green' | 'yellow' | 'orange' | 'red'

export function getMewsColor(type: MeasurementType, val1: string, val2?: string): MewsColor | null {
  if (!val1 || !val1.trim()) return null
  const v = parseFloat(val1)
  if (isNaN(v)) return null

  switch (type) {
    case 'heart_rate':
      if (v >= 130) return 'red'
      if (v <= 40 || (v >= 111 && v <= 129)) return 'orange'
      if ((v >= 41 && v <= 50) || (v >= 101 && v <= 110)) return 'yellow'
      if (v >= 51 && v <= 100) return 'green'
      break

    case 'oxygen_saturation':
      if (v <= 91) return 'red'
      if (v >= 92 && v <= 93) return 'orange'
      if (v >= 94 && v <= 95) return 'yellow'
      if (v >= 96) return 'green'
      break

    case 'temperature':
      if (v < 35.0 || v > 39.0) return 'orange' // Max alert is orange for temperature
      if ((v >= 35.1 && v <= 36.0) || (v >= 38.0 && v <= 38.9)) return 'yellow'
      if (v >= 36.1 && v <= 37.9) return 'green'
      break

    case 'blood_pressure': {
      if (!val2 || !val2.trim()) return null
      const v2 = parseFloat(val2)
      if (isNaN(v2)) return null
      
      // MEWS uses systolic
      if (v <= 70 || v >= 200) return 'red'
      if ((v >= 71 && v <= 80) || (v >= 180 && v <= 199)) return 'orange'
      if (v >= 81 && v <= 100) return 'yellow'
      if (v >= 101 && v <= 179) return 'green'
      break
    }

    case 'pain_level':
      if (v >= 7 && v <= 10) return 'red'
      if (v >= 4 && v <= 6) return 'orange'
      if (v >= 0 && v <= 3) return 'green'
      break
  }

  return null
}

export function mewsColorToStatus(color: MewsColor | null): HealthStatus {
  switch (color) {
    case 'green': return 'normal'
    case 'yellow': return 'attention'
    case 'orange': return 'warning'
    case 'red': return 'critical'
    default: return 'normal'
  }
}
