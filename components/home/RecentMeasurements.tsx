import { View, Text, Pressable, StyleSheet, useColorScheme } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  cancelAnimation,
  FadeInDown,
  useReducedMotion,
} from 'react-native-reanimated'
import { useEffect } from 'react'
import {
  RotateCw,
  CalendarX,
  Activity,
  Heart,
  Thermometer,
  Wind,
  Frown,
  Scale,
} from 'lucide-react-native'
import type { LucideIcon } from 'lucide-react-native'
import { colors } from '@/lib/constants/colors'
import type { HealthMeasurement, MeasurementType, HealthStatus } from '@/types/domain'

const DARK = { cardBg: '#1E293B' } as const

const TYPE_ICONS: Record<MeasurementType, LucideIcon> = {
  blood_pressure:    Activity,
  heart_rate:        Heart,
  temperature:       Thermometer,
  oxygen_saturation: Wind,
  pain_level:        Frown,
  weight:            Scale,
}

const TYPE_LABELS: Record<MeasurementType, string> = {
  blood_pressure:    'Pressão Arterial',
  heart_rate:        'Freq. Cardíaca',
  temperature:       'Temperatura',
  oxygen_saturation: 'Saturação O₂',
  pain_level:        'Nível de Dor',
  weight:            'Peso',
}

const TYPE_BG_COLORS: Record<MeasurementType, string> = {
  blood_pressure:    colors.cerulean     + '20',
  heart_rate:        colors.critical     + '18',
  temperature:       colors.amber        + '20',
  oxygen_saturation: colors.coolHorizon  + '22',
  pain_level:        colors.critical     + '18',
  weight:            colors.cerulean     + '20',
}

const STATUS_COLORS: Record<HealthStatus, string> = {
  normal:    colors.esmeralda,
  attention: colors.amber,
  critical:  colors.critical,
}

const STATUS_PILL_LABEL: Record<HealthStatus, string> = {
  normal:    'Normal',
  attention: 'Atenção',
  critical:  'Crítico',
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

import { useState, useMemo } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react-native'

export function RecentMeasurements({
  measurements,
  isLoading,
  onRefresh,
}: RecentMeasurementsProps) {
  const isDark        = useColorScheme() === 'dark'
  const shimmer       = useSharedValue(0.4)
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

  const textColor = isDark ? colors.textOnDark : colors.navy
  const cardBg    = isDark ? DARK.cardBg : colors.white

  // Agrupar medições por horário
  const grouped = useMemo(() => {
    const map = new Map<string, HealthMeasurement[]>()
    measurements.forEach((m) => {
      const time = formatMeasurementTime(m.measuredAt)
      if (!map.has(time)) map.set(time, [])
      map.get(time)!.push(m)
    })
    
    return Array.from(map.entries()).map(([timeStr, items]) => ({
      timeStr,
      items
    }))
  }, [measurements])

  const [expandedTime, setExpandedTime] = useState<string | null>(null)

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
          <View style={styles.emptyIconWrapper}>
            <CalendarX size={32} color={colors.cerulean} strokeWidth={1.5} />
          </View>
          <Text style={styles.emptyTitle}>Nenhuma medição hoje</Text>
          <Text style={styles.emptySubtext}>
            Toque em "Registrar medição" para{'\n'}
            começar seu acompanhamento
          </Text>
        </View>
      )}

      {/* Lista de medições agrupadas */}
      {!isLoading && grouped.map((group, index) => (
        <MeasurementGroup
          key={group.timeStr}
          group={group}
          index={index}
          isExpanded={expandedTime === group.timeStr}
          onToggle={() => setExpandedTime(prev => prev === group.timeStr ? null : group.timeStr)}
          cardBg={cardBg}
          textColor={textColor}
        />
      ))}

    </View>
  )
}

// ── Subcomponentes internos ────────────────────────────────────────────────

function MeasurementGroup({
  group,
  index,
  isExpanded,
  onToggle,
  cardBg,
  textColor,
}: {
  group: { timeStr: string; items: HealthMeasurement[] }
  index: number
  isExpanded: boolean
  onToggle: () => void
  cardBg: string
  textColor: string
}) {
  const reducedMotion = useReducedMotion()
  const countText = group.items.length === 1 ? '1 aferição' : `${group.items.length} aferições`

  return (
    <Animated.View entering={reducedMotion ? undefined : FadeInDown.delay(index * 80).duration(400).springify()}>
      <View style={[styles.groupCard, { backgroundColor: cardBg }]}>
        {/* Cabeçalho do Acordeão */}
        <Pressable
          style={styles.groupHeader}
          onPress={onToggle}
          accessibilityRole="button"
          accessibilityState={{ expanded: isExpanded }}
          accessibilityLabel={`Medições das ${group.timeStr}, ${countText}. Toque para ${isExpanded ? 'recolher' : 'expandir'}`}
        >
          <View style={styles.groupHeaderLeft}>
            <Text style={[styles.groupTimeStr, { color: textColor }]}>{group.timeStr}</Text>
            <Text style={styles.groupCountText}>{countText}</Text>
          </View>
          <View style={styles.groupHeaderRight}>
            {isExpanded ? (
              <ChevronUp size={20} color={colors.placeholder} />
            ) : (
              <ChevronDown size={20} color={colors.placeholder} />
            )}
          </View>
        </Pressable>

        {/* Conteúdo Expandido */}
        {isExpanded && (
          <View style={styles.groupContent}>
            {group.items.map((m, idx) => (
              <MeasurementCard
                key={m.id}
                measurement={m}
                index={idx}
                cardBg={cardBg}
                textColor={textColor}
              />
            ))}
          </View>
        )}
      </View>
    </Animated.View>
  )
}

function MeasurementCard({
  measurement,
  index,
  cardBg,
  textColor,
}: {
  measurement: HealthMeasurement
  index: number
  cardBg: string
  textColor: string
}) {
  const Icon        = TYPE_ICONS[measurement.type]
  const statusColor = STATUS_COLORS[measurement.status]
  const typeLabel   = TYPE_LABELS[measurement.type]
  const timeStr     = formatMeasurementTime(measurement.measuredAt)

  const reducedMotion = useReducedMotion()

  return (
    <Animated.View
      entering={reducedMotion ? undefined : FadeInDown.delay(index * 80).duration(400).springify()}
      style={[styles.card, { backgroundColor: cardBg }]}
      accessible
      accessibilityRole="text"
      accessibilityLabel={`${typeLabel}, ${String(measurement.value)} ${measurement.unit}, status ${STATUS_PILL_LABEL[measurement.status]}, às ${timeStr}`}
    >
      {/* Ícone com fundo colorido */}
      <View style={[styles.iconWrapper, { backgroundColor: TYPE_BG_COLORS[measurement.type] }]}>
        <Icon size={18} color={statusColor} strokeWidth={2.5} />
      </View>

      {/* Centro: nome + status pill */}
      <View style={styles.cardCenter}>
        <Text style={[styles.cardTypeName, { color: textColor }]} numberOfLines={1}>
          {typeLabel}
        </Text>
        <View style={[styles.statusPill, { backgroundColor: statusColor + '18' }]}>
          <View style={[styles.statusPillDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusPillText, { color: statusColor }]}>
            {STATUS_PILL_LABEL[measurement.status]}
          </Text>
        </View>
      </View>

      {/* Direita: valor + unidade */}
      <View style={styles.cardRight}>
        <Text style={[styles.cardValue, { color: statusColor }]} numberOfLines={1}>
          {String(measurement.value)}
        </Text>
        <Text style={styles.cardUnit}>{measurement.unit}</Text>
      </View>
    </Animated.View>
  )
}

function SkeletonCard({
  style,
  bg,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style: any
  bg: string
}) {
  return (
    <Animated.View style={[styles.card, { backgroundColor: bg }, style]}>
      <View style={[styles.iconWrapper, styles.skeletonBlock]} />
      <View style={styles.cardCenter}>
        <View style={[styles.skeletonLine, styles.skeletonBlock]} />
        <View style={[styles.skeletonLineSm, styles.skeletonBlock]} />
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
    fontSize: 14,
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
    paddingVertical: 40,
    gap: 12,
  },
  emptyIconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.iceBlue,
    borderWidth: 1.5,
    borderColor: colors.cerulean + '40',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.navy,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.placeholder,
    textAlign: 'center',
    lineHeight: 22,
  },

  // Ícone colorido
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Status pill
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  statusPillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusPillText: {
    fontSize: 14,
    fontWeight: '700',
  },

  // Acordeão (Grupo)
  groupCard: {
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.sandy + '55',
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
    minHeight: 64,
  },
  groupHeaderLeft: {
    gap: 4,
  },
  groupHeaderRight: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
  },
  groupTimeStr: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  groupCountText: {
    fontSize: 13,
    color: colors.placeholder,
    fontWeight: '500',
  },
  groupContent: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },

  // Card de medição (agora interno ao acordeão)
  card: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.02)', // Fundo sutil para diferenciar as linhas
  },
  cardCenter: {
    flex: 1,
    gap: 5,
  },
  cardTypeName: {
    fontSize: 15,
    fontWeight: '700',
  },
  cardRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  cardUnit: {
    fontSize: 14,
    color: colors.placeholder,
  },

  // Skeleton
  skeletonBlock: {
    backgroundColor: colors.border,
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
