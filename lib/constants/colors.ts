// Design System — Tokens de Cor VigidocApp
// Sempre use estes tokens. Nunca valores hardcoded.

export const colors = {
  // ── Paleta oficial da marca ──────────────────
  navy:        '#002959',  // Oxford Navy — headers, textos primários
  cerulean:    '#3672AA',  // Rich Cerulean — CTA, ícones ativos, links
  sandy:       '#C4A484',  // Sandy — bordas de cards, detalhes de elegância
  coolHorizon: '#5FA7DA',  // Cool Horizon — badges, acentos leves

  // ── Cores funcionais de saúde (semânticas) ───
  esmeralda:   '#00A878',  // Status normal — NUNCA usar em botões CTA
  amber:       '#F59E0B',  // Status atenção
  critical:    '#EF4444',  // Status crítico / emergência

  // ── Neutros ──────────────────────────────────
  iceBlue:     '#F0F7FF',  // Background de cards e telas
  white:       '#FFFFFF',
  border:      '#C4A48440', // Sandy com 25% de opacidade (sutil/complementar)
  placeholder: '#9CA3AF',

  // ── Texto ────────────────────────────────────
  textOnDark:  '#FFFFFF',
  textOnLight: '#002959',
} as const

export type ColorToken = keyof typeof colors

// Status de saúde
export const statusColors = {
  normal:    colors.esmeralda,
  attention: colors.amber,
  warning:   '#F97316', // Laranja
  critical:  colors.critical,
} as const

export type StatusLevel = keyof typeof statusColors
