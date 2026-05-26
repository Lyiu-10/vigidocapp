import { View, Text, Pressable, StyleSheet, useColorScheme } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated'
import { useEffect } from 'react'
import {
  RotateCw,
  CalendarX,
  Activity,
  Heart,
  Thermometer,
  Wind,
  Droplets,
  Scale,
} from 'lucide-react-native'
import type { LucideIcon } from 'lucide-react-native'
import { colors } from '@/lib/constants/colors'
import type { HealthMeasurement, MeasurementType, HealthStatus } from '@/types/domain'

// Dark mode — mover para colors.ts quando sistema de temas for formalizado
const DARK = { cardBg: '#1E293B' } as const

const TYPE_ICONS: Record<MeasurementType, LucideIcon> = {
  blood_pressure:    Activity,
  heart_rate:        Heart,
  temperature:       Thermometer,
  oxygen_saturation: Wind,
  glucose:           Droplets,
  weight:            Scale,
}

const TYPE_LABELS: Record<MeasurementType, string> = {
  blood_pressure:    'Pressão Arterial',
  heart_rate:        'Freq. Cardíaca',
  temperature:       'Temperatura',
  oxygen_saturation: 'Saturação O₂',
  glucose:           'Glicemia',
  weight:            'Peso',
}

const STATUS_COLORS: Record<HealthStatus, string> = {
  normal:    colors.esmeralda,
  attention: colors.amber,
  critical:  colors.critical,
}

const STATUS_LABELS: Record<HealthStatus, string> = {
  normal:    'normal',
  attention: 'atenção',
  critical:  'crítico',
}

function formatMeasurementTime(iso: string): string {
  const d = new Date(iso)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

interface RecentMeasurementsProps {
  measurements: HealthMeasurement[]
  isLoading: boolean
  onRefresh: () => void
}

export function RecentMeasurements({
  measurements,
  isLoading,
  onRefresh,
}: RecentMeasurementsProps) {
  const isDark      = useColorScheme() === 'dark'
  const shimmer     = useSharedValue(0.4)
  const skeletonStyle = useAnimatedStyle(() => ({ opacity: shimmer.value }))

  useEffect(() => {
    if (!isLoading) return
    shimmer.value = withRepeat(
      withSequence(
        withTiming(0.85, { duration: 700 }),
        withTiming(0.4,  { duration: 700 }),
      ),
      -1,
      false,
    )
    return () => cancelAnimation(shimmer)
  }, [isLoading])

  const textColor = isDark ? '#FFFFFF' : colors.navy
  const cardBg    = isDark ? DARK.cardBg : colors.white

  return (
    <View style={styles.container}>

      {/* Cabeçalho da seção */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Últimas Aferições
          </Text>
          <Text style={styles.sectionSub}>Hoje</Text>
        </View>
        <Pressable
          style={({ pressed }) => [styles.refreshBtn, pressed && { opacity: 0.7 }]}
          onPress={onRefresh}
          accessibilityLabel="Atualizar medições"
          accessibilityRole="button"
        >
          <RotateCw size={18} color={colors.cerulean} strokeWidth={2} />
        </Pressable>
      </View>

      {/* Skeletons de loading */}
      {isLoading && (
        <>
          <SkeletonCard style={skeletonStyle} bg={cardBg} />
          <SkeletonCard style={skeletonStyle} bg={cardBg} />
          <SkeletonCard style={skeletonStyle} bg={cardBg} />
        </>
      )}

      {/* Estado vazio */}
      {!isLoading && measurements.length === 0 && (
        <View style={styles.emptyState}>
          <CalendarX size={40} color={colors.border} strokeWidth={1.5} />
          <Text style={styles.emptyTitle}>Nenhuma medição hoje</Text>
          <Text style={styles.emptySubtext}>
            Toque em "Registrar medição" para começar
          </Text>
        </View>
      )}

      {/* Lista de medições */}
      {!isLoading && measurements.map((m) => (
        <MeasurementCard
          key={m.id}
          measurement={m}
          cardBg={cardBg}
          textColor={textColor}
        />
      ))}

    </View>
  )
}

// ── Subcomponentes internos ────────────────────────────────────────────────

function MeasurementCard({
  measurement,
  cardBg,
  textColor,
}: {
  measurement: HealthMeasurement
  cardBg: string
  textColor: string
}) {
  const Icon        = TYPE_ICONS[measurement.type]
  const statusColor = STATUS_COLORS[measurement.status]
  const typeLabel   = TYPE_LABELS[measurement.type]
  const statusLabel = STATUS_LABELS[measurement.status]
  const timeStr     = formatMeasurementTime(measurement.measuredAt)

  return (
    <View
      style={[styles.card, { backgroundColor: cardBg }]}
      accessible
      accessibilityRole="text"
      accessibilityLabel={`${typeLabel}, ${String(measurement.value)} ${measurement.unit}, status ${statusLabel}`}
    >
      {/* Esquerda: status dot + ícone + nome/hora */}
      <View style={styles.cardLeft}>
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
        <Icon size={20} color={statusColor} strokeWidth={2} />
        <View style={styles.cardTextCol}>
          <Text style={[styles.cardTypeName, { color: textColor }]} numberOfLines={1}>
            {typeLabel}
          </Text>
          <Text style={styles.cardTime}>{timeStr}</Text>
        </View>
      </View>

      {/* Direita: valor + unidade */}
      <View style={styles.cardRight}>
        <Text style={[styles.cardValue, { color: statusColor }]} numberOfLines={1}>
          {String(measurement.value)}
        </Text>
        <Text style={styles.cardUnit}>{measurement.unit}</Text>
      </View>
    </View>
  )
}

function SkeletonCard({
  style,
  bg,
}: {
  style: ReturnType<typeof useAnimatedStyle>
  bg: string
}) {
  return (
    <Animated.View style={[styles.card, { backgroundColor: bg }, style]}>
      <View style={styles.cardLeft}>
        <View style={[styles.statusDot, styles.skeletonBlock]} />
        <View style={[styles.skeletonIcon, styles.skeletonBlock]} />
        <View style={styles.cardTextCol}>
          <View style={[styles.skeletonLine, styles.skeletonBlock]} />
          <View style={[styles.skeletonLineSm, styles.skeletonBlock]} />
        </View>
      </View>
      <View style={styles.cardRight}>
        <View style={[styles.skeletonValue, styles.skeletonBlock]} />
        <View style={[styles.skeletonUnit, styles.skeletonBlock]} />
      </View>
    </Animated.View>
  )
}

// ── Estilos ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
  },

  // Cabeçalho
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionSub: {
    fontSize: 13,
    color: colors.placeholder,
  },
  refreshBtn: {
    minWidth: 48,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Estado vazio
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.placeholder,
    marginTop: 4,
  },
  emptySubtext: {
    fontSize: 13,
    color: colors.placeholder,
    textAlign: 'center',
    lineHeight: 20,
  },

  // Card de medição
  card: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  cardLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  cardTextCol: {
    flex: 1,
    gap: 2,
  },
  cardTypeName: {
    fontSize: 15,
    fontWeight: '600',
  },
  cardTime: {
    fontSize: 12,
    color: colors.placeholder,
  },
  cardRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  cardUnit: {
    fontSize: 12,
    color: colors.placeholder,
  },

  // Skeleton
  skeletonBlock: {
    backgroundColor: colors.border,
    borderRadius: 4,
  },
  skeletonIcon: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  skeletonLine: {
    width: 80,
    height: 13,
  },
  skeletonLineSm: {
    width: 48,
    height: 10,
    marginTop: 2,
  },
  skeletonValue: {
    width: 40,
    height: 18,
  },
  skeletonUnit: {
    width: 24,
    height: 10,
    marginTop: 2,
  },
})
