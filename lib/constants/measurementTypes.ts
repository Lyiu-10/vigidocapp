import { Activity, Heart, Thermometer, Wind, Frown, Scale } from 'lucide-react-native'
import type { LucideIcon } from 'lucide-react-native'
import { colors } from '@/lib/constants/colors'
import type { MeasurementType } from '@/types/domain'

export interface MeasurementTypeConfig {
  label:        string
  unit:         string
  Icon:         LucideIcon
  color:        string
  instructions: readonly [string, string, string]
}

export interface ValidationRange {
  min: number
  max: number
}

export const MEASUREMENT_CONFIG: Record<MeasurementType, MeasurementTypeConfig> = {
  blood_pressure: {
    label: 'Pressão Arterial',
    unit:  'mmHg',
    Icon:  Activity,
    color: colors.cerulean,
    instructions: [
      'Sente-se e descanse por 5 minutos',
      'Apoie o braço na altura do coração',
      'Não fale durante a medição',
    ],
  },
  heart_rate: {
    label: 'Freq. Cardíaca',
    unit:  'BPM',
    Icon:  Heart,
    color: colors.critical,
    instructions: [
      'Fique em repouso por 2 minutos',
      'Coloque o dedo no sensor corretamente',
      'Respire normalmente',
    ],
  },
  temperature: {
    label: 'Temperatura',
    unit:  '°C',
    Icon:  Thermometer,
    color: colors.amber,
    instructions: [
      'Use o termômetro limpo',
      'Aguarde o sinal sonoro',
      'Anote o valor exibido',
    ],
  },
  oxygen_saturation: {
    label: 'Oxigenação',
    unit:  'SpO₂ %',
    Icon:  Wind,
    color: colors.coolHorizon,
    instructions: [
      'Remova esmalte ou unhas postiças',
      'Mantenha a mão aquecida e relaxada',
      'Fique imóvel durante a leitura',
    ],
  },
  pain_level: {
    label: 'Nível de Dor',
    unit:  '1–10',
    Icon:  Frown,
    color: colors.critical,
    instructions: [
      'Avalie sua dor de 1 (leve) a 10 (insuportável)',
      'Escolha o valor que melhor representa seu estado',
      'Mantenha a calma e respire fundo',
    ],
  },
  weight: {
    label: 'Peso',
    unit:  'kg',
    Icon:  Scale,
    color: colors.cerulean,
    instructions: [
      'Use a balança em superfície plana',
      'Meça pela manhã, em jejum',
      'Fique descalço e sem roupas pesadas',
    ],
  },
}

export const MEASUREMENT_TYPE_LIST = Object.keys(MEASUREMENT_CONFIG) as MeasurementType[]

// Ranges de alerta — não bloqueadores, apenas informativos (passo 3)
export const VALIDATION_RANGES: Partial<Record<MeasurementType, ValidationRange>> = {
  blood_pressure:    { min: 60,  max: 250 },
  heart_rate:        { min: 30,  max: 220 },
  temperature:       { min: 34,  max: 42  },
  oxygen_saturation: { min: 70,  max: 100 },
  pain_level:        { min: 1,  max: 10 },
  weight:            { min: 20,  max: 300 },
}
