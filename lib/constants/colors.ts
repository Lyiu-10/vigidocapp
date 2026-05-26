// Design System — Tokens de Cor VigidocApp
// Sempre use estes tokens. Nunca valores hardcoded.

export const colors = {
  // Paleta principal
  navy:         '#002959',
  ceruleanDeep: '#0A6F97',
  cerulean:     '#3672AA',
  coolHorizon:  '#5FA7DA',

  // Paleta funcional
  esmeralda:   '#00A878',  // CTA principal — NUNCA como texto sobre branco
  iceBlue:     '#F0F7FF',  // Background de cards
  amber:       '#F59E0B',  // Status atenção
  critical:    '#EF4444',  // Status crítico

  // Texto
  textOnDark:  '#FFFFFF',  // Sobre Navy
  textOnLight: '#002959',  // Sobre Ice Blue / branco

  // UI utilitários
  border:      '#E5E7EB',
  placeholder: '#9CA3AF',
  white:       '#FFFFFF',
} as const

// Status de saúde
export const statusColors = {
  normal:    colors.esmeralda,
  attention: colors.amber,
  critical:  colors.critical,
} as const

export type StatusLevel = keyof typeof statusColors
