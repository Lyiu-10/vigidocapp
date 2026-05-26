import { View, Text, StyleSheet, useColorScheme } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import { useEffect } from 'react'
import { Clock } from 'lucide-react-native'
import { colors } from '@/lib/constants/colors'

// Dark mode — mover para colors.ts quando sistema de temas for formalizado
const DARK = {
  cardBg: '#1E293B',
  track:  '#374151',
  text:   '#FFFFFF',
} as const

const RING_SIZE    = 72
const STROKE_WIDTH = 7
const RADIUS       = (RING_SIZE - STROKE_WIDTH) / 2  // 32.5 — stroke centrado no path
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

interface DailyProgressCardProps {
  completed: number
  total: number
  nextReminderTime?: string
}

export function DailyProgressCard({
  completed,
  total,
  nextReminderTime,
}: DailyProgressCardProps) {
  const isDark    = useColorScheme() === 'dark'
  const safeTotal = total > 0 ? total : 1
  const ratio     = Math.min(completed / safeTotal, 1)
  const progress  = useSharedValue(0)

  useEffect(() => {
    progress.value = withTiming(ratio, {
      duration: 600,
      easing: Easing.out(Easing.ease),
    })
  }, [ratio])

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCE * (1 - progress.value),
  }))

  const arcColor   = ratio === 0
    ? colors.placeholder
    : ratio >= 1
      ? colors.esmeralda
      : colors.ceruleanDeep
  const trackColor = isDark ? DARK.track : colors.border
  const textColor  = isDark ? DARK.text  : colors.navy

  let subtitle: string
  if (completed === 0)       subtitle = 'Nenhuma medição registrada ainda'
  else if (completed >= total) subtitle = 'Tudo certo por hoje! ✓'
  else                         subtitle = `${completed} de ${total} medições realizadas`

  return (
    <View style={[styles.card, isDark && styles.cardDark]}>
      <View style={styles.content}>

        {/* Anel de progresso */}
        <View style={styles.ringWrap}>
          <Svg width={RING_SIZE} height={RING_SIZE}>
            {/* Trilha */}
            <Circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RADIUS}
              stroke={trackColor}
              strokeWidth={STROKE_WIDTH}
              fill="none"
            />
            {/* Arco animado — começa no topo via rotate(-90) */}
            <AnimatedCircle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RADIUS}
              stroke={arcColor}
              strokeWidth={STROKE_WIDTH}
              fill="none"
              strokeDasharray={CIRCUMFERENCE}
              strokeLinecap="round"
              transform={`rotate(-90, ${RING_SIZE / 2}, ${RING_SIZE / 2})`}
              animatedProps={animatedProps}
            />
          </Svg>
          {/* Contador central */}
          <View style={styles.ringCenter}>
            <Text style={[styles.ringLabel, { color: textColor }]}>
              {completed}/{total}
            </Text>
          </View>
        </View>

        {/* Texto */}
        <View style={styles.textWrap}>
          <Text style={[styles.cardTitle, { color: textColor }]}>
            Medições de hoje
          </Text>
          <Text style={styles.cardSubtitle} numberOfLines={2}>
            {subtitle}
          </Text>
          {nextReminderTime != null && completed < total && (
            <View style={styles.reminderRow}>
              <Clock size={12} color={colors.cerulean} strokeWidth={2} />
              <Text style={styles.reminderText}>
                Próximo lembrete: {nextReminderTime}
              </Text>
            </View>
          )}
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: DARK.cardBg,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ringWrap: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  textWrap: {
    flex: 1,
    paddingLeft: 16,
    gap: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 12,
    color: colors.placeholder,
    lineHeight: 18,
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  reminderText: {
    fontSize: 12,
    color: colors.cerulean,
  },
})
