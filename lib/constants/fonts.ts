// Tokens de Tipografia VigidocApp
// IBM Plex Sans — Corpo, números, botões, labels e dados (alta legibilidade)
// Gayathri — Títulos de tela, cabeçalhos e destaques de boas-vindas (identidade acolhedora)

export const fonts = {
  // ── Corpo e Interface (IBM Plex Sans) ──
  regular: 'IBMPlexSans_400Regular',
  medium: 'IBMPlexSans_500Medium',
  semibold: 'IBMPlexSans_600SemiBold',
  bold: 'IBMPlexSans_700Bold',

  // ── Títulos e Destaques (Gayathri) ──
  title: 'Gayathri_700Bold',
  titleRegular: 'Gayathri_400Regular',
} as const

export type FontToken = keyof typeof fonts
