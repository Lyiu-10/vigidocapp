export interface TourStep {
  stepIndex: number
  title: string
  description: string
  requireInteraction?: boolean
}

export const HOME_TOUR_STEPS: TourStep[] = [
  {
    stepIndex: 0,
    title: 'Seu resumo do dia',
    description: 'Aqui você vê como está o seu dia e quantas medições já realizou.',
  },
  {
    stepIndex: 1,
    title: 'Registrar uma medição',
    description: 'Toque neste botão sempre que for medir sua pressão, temperatura ou outro sinal.',
  },
  {
    stepIndex: 2,
    title: 'Progresso diário',
    description: 'Este círculo mostra quantas medições você fez hoje em relação à sua meta.',
  },
  {
    stepIndex: 3,
    title: 'Navegação do app',
    description: 'Use a barra aqui embaixo para ir ao Histórico, Notificações e ver seu Médico.',
  },
]

export const MEASUREMENT_TOUR_STEPS: TourStep[] = [
  {
    stepIndex: 0,
    title: 'Escolha o que medir',
    description: 'Toque no tipo de medição que você vai registrar agora.',
    requireInteraction: true,
  },
  {
    stepIndex: 1,
    title: 'Prepare-se antes de medir',
    description: 'Siga as dicas desta tela para garantir uma leitura precisa. Em seguida, toque em "Estou pronto".',
    requireInteraction: true,
  },
]

export const MEASUREMENT_INPUT_TOUR_STEPS: TourStep[] = [
  {
    stepIndex: 0,
    title: 'Digite o valor',
    description: 'Insira o número que aparece no seu aparelho. Toque em Confirmar quando terminar.',
    requireInteraction: true,
  },
]
