import { Activity, Heart, Thermometer, Wind, Droplets, Scale } from 'lucide-react-native'
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
  glucose: {
    label: 'Glicose',
    unit:  'mg/dL',
    Icon:  Droplets,
    color: colors.esmeralda,
    instructions: [
      'Lave e seque bem as mãos',
      'Use uma lanceta nova',
      'Coloque a gota de sangue na fita',
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
  glucose:           { min: 20,  max: 600 },
  weight:            { min: 20,  max: 300 },
}
