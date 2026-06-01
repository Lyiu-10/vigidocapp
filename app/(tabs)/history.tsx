import { useState, useMemo, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import {
  CloudCheck,
  FileDown,
  ChevronDown,
  ChevronUp,
  Activity,
  Heart,
  Thermometer,
  Wind,
  Droplets,
  Scale,
} from 'lucide-react-native'
import { colors } from '@/lib/constants/colors'
import type { MeasurementType, HealthStatus } from '@/types/domain'

/* ─────────────────────── Tokens de Cor ─────────────────────── */

// Azul complementar para gradiente — sem token equivalente em colors.ts
const GRADIENT_END = '#0A4A82'

const NAVY      = colors.navy
const CARD_BG   = colors.white
const TEXT_PRIMARY = '#1E293B'
const TEXT_MUTED   = '#64748B'

/* ─────────────────── Ícone por tipo ──────────────────── */

const TYPE_ICON: Record<MeasurementType, { Icon: typeof Heart; emoji: string }> = {
  blood_pressure:    { Icon: Activity,    emoji: '🩺' },
  heart_rate:        { Icon: Heart,       emoji: '❤️' },
  temperature:       { Icon: Thermometer, emoji: '🌡️' },
  oxygen_saturation: { Icon: Wind,        emoji: '🫁' },
  glucose:           { Icon: Droplets,    emoji: '🩸' },
  weight:            { Icon: Scale,       emoji: '⚖️' },
}

const TYPE_LABEL: Record<MeasurementType, string> = {
  blood_pressure:    'Pressão Arterial',
  heart_rate:        'Freq. Cardíaca',
  temperature:       'Temperatura',
  oxygen_saturation: 'Oxigenação',
  glucose:           'Glicose',
  weight:            'Peso',
}

const TYPE_UNIT: Record<MeasurementType, string> = {
  blood_pressure:    'mmHg',
  heart_rate:        'BPM',
  temperature:       '°C',
  oxygen_saturation: 'SpO₂ %',
  glucose:           'mg/dL',
  weight:            'kg',
}

/* ─────────── Dados (store) ─────────── */

import { useMeasurementStore } from '@/store/measurement.store'

interface VitalItem {
  type:   MeasurementType
  value:  string
  status: HealthStatus
}

interface DailyRecord {
  id:     string
  date:   string
  time:   string
  vitals: VitalItem[]
}

/* ─────────── Cor por status ─────────── */

function statusColor(status: HealthStatus): string {
  switch (status) {
    case 'normal':    return colors.esmeralda
    case 'attention': return colors.amber
    case 'critical':  return colors.critical
  }
}

/* ─────────── Filtros ─────────── */

type FilterKey = '7d' | '30d' | '90d'
const FILTERS: { key: FilterKey; label: string }[] = [
  { key: '7d',  label: '7d'  },
  { key: '30d', label: '30d' },
  { key: '90d', label: '90d' },
]

/* ═══════════════ COMPONENTE PRINCIPAL ═══════════════ */

export default function HistoryScreen() {
  const insets = useSafeAreaInsets()
  const [activeFilter, setActiveFilter] = useState<FilterKey>('7d')
  const [expandedId,   setExpandedId]   = useState<string | null>(null)

  const records = useMeasurementStore((s) => s.records)

  const groupedRecords = useMemo(() => {
    const map = new Map<string, DailyRecord>()

    records.forEach(r => {
      const d       = new Date(r.measuredAt)
      const dayStr  = d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')
      const dateNum = d.getDate()
      const monthStr = d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')

      const dateStr = `${dayStr.charAt(0).toUpperCase() + dayStr.slice(1)}., ${dateNum} de ${monthStr.charAt(0).toUpperCase() + monthStr.slice(1)}.`
      const timeStr = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`

      const key = `${dateStr}-${timeStr}`
      if (!map.has(key)) {
        map.set(key, { id: key, date: dateStr, time: timeStr, vitals: [] })
      }
      map.get(key)!.vitals.push({ type: r.type, value: String(r.value), status: r.status })
    })

    return Array.from(map.values())
  }, [records])

  const allVitals      = groupedRecords.flatMap((r) => r.vitals)
  const totalCount     = allVitals.length
  const attentionCount = allVitals.filter((v) => v.status === 'attention').length
  const criticalCount  = allVitals.filter((v) => v.status === 'critical').length

  useEffect(() => {
    if (expandedId === null && groupedRecords.length > 0) {
      setExpandedId(groupedRecords[0].id)
    }
  }, [expandedId, groupedRecords])

  function toggleCard(id: string) {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <View style={styles.safe}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ──────── 1. Header com gradiente ──────── */}
        <LinearGradient
          colors={[colors.navy, GRADIENT_END]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.header, { paddingTop: insets.top + 16 }]}
        >
          <Text style={styles.headerTitle} allowFontScaling={true}>
            Histórico
          </Text>

          <View style={styles.cloudBadge}>
            <CloudCheck size={14} color={colors.white} strokeWidth={2} />
            <Text style={styles.cloudText} allowFontScaling={true}>
              Sincronizado e salvo na nuvem
            </Text>
          </View>

          {/* Filtros + Exportar */}
          <View style={styles.filterRow}>
            <View style={styles.pillGroup}>
              {FILTERS.map((f) => {
                const isActive = activeFilter === f.key
                return (
                  <Pressable
                    key={f.key}
                    style={[styles.pill, isActive && styles.pillActive]}
                    onPress={() => setActiveFilter(f.key)}
                    accessibilityRole="button"
                    accessibilityLabel={`Filtrar por ${f.label}`}
                    accessibilityState={{ selected: isActive }}
                  >
                    <Text
                      style={[styles.pillText, isActive && styles.pillTextActive]}
                      allowFontScaling={true}
                    >
                      {f.label}
                    </Text>
                  </Pressable>
                )
              })}
            </View>

            <Pressable
              style={({ pressed }) => [styles.exportBtn, pressed && { opacity: 0.7 }]}
              accessibilityRole="button"
              accessibilityLabel="Exportar histórico em PDF"
            >
              <FileDown size={16} color={colors.white} strokeWidth={2} />
              <Text style={styles.exportText} allowFontScaling={true}>
                Exportar PDF
              </Text>
            </Pressable>
          </View>
        </LinearGradient>

        {/* ──────── Zona do corpo ──────── */}
        <View style={styles.bodyZone}>

          {/* ──────── 3. Barra de Resumo — overlap ──────── */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryBlock}>
              <Text style={[styles.summaryValue, { color: TEXT_PRIMARY }]} allowFontScaling={true}>
                {totalCount}
              </Text>
              <Text style={styles.summaryLabel} allowFontScaling={true}>Medições</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryBlock}>
              <Text style={[styles.summaryValue, { color: colors.amber }]} allowFontScaling={true}>
                {attentionCount}
              </Text>
              <Text style={styles.summaryLabel} allowFontScaling={true}>Atenção</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryBlock}>
              <Text style={[styles.summaryValue, { color: colors.critical }]} allowFontScaling={true}>
                {criticalCount}
              </Text>
              <Text style={styles.summaryLabel} allowFontScaling={true}>Críticos</Text>
            </View>
          </View>

          {/* ──────── 4. Cards Diários ──────── */}
          {groupedRecords.map((record) => {
            const isExpanded = expandedId === record.id
            return (
              <View key={record.id} style={styles.dayCard}>
                <Pressable
                  style={styles.dayCardHeader}
                  onPress={() => toggleCard(record.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`${record.date}, medido às ${record.time}. ${isExpanded ? 'Toque para recolher' : 'Toque para expandir'}`}
                  accessibilityState={{ expanded: isExpanded }}
                >
                  <View style={styles.dayCardLeft}>
                    <Text style={styles.dayCardDate} allowFontScaling={true}>
                      {record.date}
                    </Text>
                    <Text style={styles.dayCardTime} allowFontScaling={true}>
                      Medido às {record.time}
                    </Text>
                  </View>
                  {isExpanded
                    ? <ChevronUp   size={22} color={TEXT_MUTED} strokeWidth={2} />
                    : <ChevronDown size={22} color={TEXT_MUTED} strokeWidth={2} />
                  }
                </Pressable>

                {isExpanded && (
                  <View style={styles.vitalsGrid}>
                    {record.vitals.map((vital) => {
                      const info     = TYPE_ICON[vital.type]
                      const label    = TYPE_LABEL[vital.type]
                      const unit     = TYPE_UNIT[vital.type]
                      const valColor = statusColor(vital.status)

                      return (
                        <View key={vital.type} style={styles.vitalCell}>
                          <Text style={styles.vitalLabel} allowFontScaling={true}>
                            {info.emoji} {label}
                          </Text>
                          <Text
                            style={[styles.vitalValue, { color: valColor }]}
                            allowFontScaling={true}
                            numberOfLines={0}
                          >
                            {vital.value}
                          </Text>
                          <Text style={styles.vitalUnit} allowFontScaling={true}>
                            {unit}
                          </Text>
                        </View>
                      )
                    })}
                  </View>
                )}
              </View>
            )
          })}

          <View style={{ height: 32 }} />
        </View>
      </ScrollView>
    </View>
  )
}

/* ═══════════════ ESTILOS ═══════════════ */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.iceBlue,
  },
  scrollView: { flex: 1 },
  scrollContent: {},

  /* ── 1. Header gradiente ── */
  header: {
    paddingHorizontal: 20,
    paddingBottom: 48,
    gap: 16,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: -0.5,
  },
  cloudBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  cloudText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
    opacity: 0.9,
  },

  /* ── 2. Filtros + Exportar ── */
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  pillGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  pillActive: {
    backgroundColor: colors.white,
  },
  pillText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
  },
  pillTextActive: {
    color: NAVY,
  },
  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  exportText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
  },

  /* ── Zona do corpo ── */
  bodyZone: {
    backgroundColor: colors.iceBlue,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  /* ── 3. Resumo — overlap ── */
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_BG,
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: -28,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.sandy + '55',
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  summaryBlock: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  summaryLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: TEXT_MUTED,
  },
  summaryDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
  },

  /* ── 4. Card diário ── */
  dayCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.sandy + '55',
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  dayCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 64,
  },
  dayCardLeft: {
    flex: 1,
    gap: 2,
    marginRight: 12,
  },
  dayCardDate: {
    fontSize: 17,
    fontWeight: '700',
    color: TEXT_PRIMARY,
  },
  dayCardTime: {
    fontSize: 13,
    fontWeight: '500',
    color: TEXT_MUTED,
  },

  /* ── Grid de vitais ── */
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingBottom: 16,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 14,
  },
  vitalCell: {
    width: '47%',
    backgroundColor: colors.iceBlue,
    borderRadius: 12,
    padding: 14,
    gap: 4,
  },
  vitalLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: TEXT_MUTED,
    marginBottom: 2,
  },
  vitalValue: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  vitalUnit: {
    fontSize: 12,
    fontWeight: '600',
    color: TEXT_MUTED,
    marginTop: -2,
  },
})
