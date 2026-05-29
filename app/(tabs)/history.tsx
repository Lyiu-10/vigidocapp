import { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
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

const NAVY        = colors.navy       // #002959 — mesmo do HomeHeader
const NAVY_BADGE  = '#0A6F97'
const BG          = '#F8FAFC'
const CARD_BG     = '#FFFFFF'
const TEXT_PRIMARY = '#1E293B'
const TEXT_MUTED   = '#64748B'
const ORANGE      = '#FF9F1C'
const RED         = '#E71D36'
const GREEN       = colors.esmeralda
const BORDER      = '#E2E8F0'

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

/* ─────────── Dados Simulados (mock) ─────────── */

interface VitalItem {
  type: MeasurementType
  value: string
  status: HealthStatus
}

interface DailyRecord {
  id: string
  date: string         // ex: "Sáb., 24 de Mai."
  time: string         // ex: "09:41"
  vitals: VitalItem[]
}

const MOCK_RECORDS: DailyRecord[] = [
  {
    id: '1',
    date: 'Sáb., 24 de Mai.',
    time: '09:41',
    vitals: [
      { type: 'blood_pressure',    value: '120/80',  status: 'normal' },
      { type: 'heart_rate',        value: '72',      status: 'normal' },
      { type: 'temperature',       value: '36.5',    status: 'normal' },
      { type: 'oxygen_saturation', value: '98',      status: 'normal' },
      { type: 'glucose',           value: '95',      status: 'normal' },
      { type: 'weight',            value: '74.2',    status: 'normal' },
    ],
  },
  {
    id: '2',
    date: 'Sex., 23 de Mai.',
    time: '08:15',
    vitals: [
      { type: 'blood_pressure',    value: '145/95',  status: 'critical' },
      { type: 'heart_rate',        value: '100',     status: 'attention' },
      { type: 'temperature',       value: '37.8',    status: 'attention' },
      { type: 'oxygen_saturation', value: '96',      status: 'normal' },
      { type: 'glucose',           value: '180',     status: 'attention' },
      { type: 'weight',            value: '74.5',    status: 'normal' },
    ],
  },
  {
    id: '3',
    date: 'Qui., 22 de Mai.',
    time: '07:50',
    vitals: [
      { type: 'blood_pressure',    value: '130/85',  status: 'attention' },
      { type: 'heart_rate',        value: '68',      status: 'normal' },
      { type: 'temperature',       value: '36.7',    status: 'normal' },
      { type: 'oxygen_saturation', value: '97',      status: 'normal' },
    ],
  },
  {
    id: '4',
    date: 'Qua., 21 de Mai.',
    time: '10:20',
    vitals: [
      { type: 'blood_pressure',    value: '118/76',  status: 'normal' },
      { type: 'heart_rate',        value: '65',      status: 'normal' },
      { type: 'temperature',       value: '36.4',    status: 'normal' },
      { type: 'oxygen_saturation', value: '99',      status: 'normal' },
      { type: 'glucose',           value: '88',      status: 'normal' },
      { type: 'weight',            value: '73.9',    status: 'normal' },
    ],
  },
]

/* ─────────── Cor por status ─────────── */

function statusColor(status: HealthStatus): string {
  switch (status) {
    case 'normal':    return GREEN
    case 'attention': return ORANGE
    case 'critical':  return RED
  }
}

/* ─────────── Filtros ─────────── */

type FilterKey = '7d' | '30d' | '90d'
const FILTERS: { key: FilterKey; label: string }[] = [
  { key: '7d',  label: '7d' },
  { key: '30d', label: '30d' },
  { key: '90d', label: '90d' },
]

/* ═══════════════ COMPONENTE PRINCIPAL ═══════════════ */

export default function HistoryScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('7d')
  const [expandedId, setExpandedId]     = useState<string | null>('2') // 2º card pré-expandido p/ demo

  // Resumo semântico (calculados a partir do mock)
  const allVitals      = MOCK_RECORDS.flatMap((r) => r.vitals)
  const totalCount     = allVitals.length
  const attentionCount = allVitals.filter((v) => v.status === 'attention').length
  const criticalCount  = allVitals.filter((v) => v.status === 'critical').length

  function toggleCard(id: string) {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <View style={styles.safe}>
      {/* Fundo navy atrás da SafeArea (status bar) */}
      <SafeAreaView style={{ backgroundColor: NAVY }} edges={['top']} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ──────── 1. Header navy (dentro do scroll) ──────── */}
        <View style={styles.header}>
          <Text style={styles.headerTitle} allowFontScaling={true}>
            Histórico
          </Text>

          <View style={styles.cloudBadge}>
            <CloudCheck size={14} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.cloudText} allowFontScaling={true}>
              Sincronizado e salvo na nuvem
            </Text>
          </View>

          {/* Filtros + Exportar — dentro da área azul */}
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
              <FileDown size={16} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.exportText} allowFontScaling={true}>
                Exportar PDF
              </Text>
            </Pressable>
          </View>
        </View>

        {/* ──────── Zona de transição (fundo cinza, card sobe com marginTop negativo) ──────── */}
        <View style={styles.bodyZone}>

          {/* ──────── 3. Barra de Resumo — overlap card ──────── */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryBlock}>
              <Text style={[styles.summaryValue, { color: TEXT_PRIMARY }]} allowFontScaling={true}>
                {totalCount}
              </Text>
              <Text style={styles.summaryLabel} allowFontScaling={true}>
                Medições
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryBlock}>
              <Text style={[styles.summaryValue, { color: ORANGE }]} allowFontScaling={true}>
                {attentionCount}
              </Text>
              <Text style={styles.summaryLabel} allowFontScaling={true}>
                Atenção
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryBlock}>
              <Text style={[styles.summaryValue, { color: RED }]} allowFontScaling={true}>
                {criticalCount}
              </Text>
              <Text style={styles.summaryLabel} allowFontScaling={true}>
                Críticos
              </Text>
            </View>
          </View>

          {/* ──────── 4. Cards Diários ──────── */}
          {MOCK_RECORDS.map((record) => {
            const isExpanded = expandedId === record.id
            return (
              <View key={record.id} style={styles.dayCard}>
                {/* Header do Card */}
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

                {/* Conteúdo expandido — Grid 2x2 */}
                {isExpanded && (
                  <View style={styles.vitalsGrid}>
                    {record.vitals.map((vital) => {
                      const info     = TYPE_ICON[vital.type]
                      const label    = TYPE_LABEL[vital.type]
                      const unit     = TYPE_UNIT[vital.type]
                      const valColor = statusColor(vital.status)

                      return (
                        <View key={vital.type} style={styles.vitalCell}>
                          {/* Rótulo com emoji */}
                          <Text style={styles.vitalLabel} allowFontScaling={true}>
                            {info.emoji} {label}
                          </Text>
                          {/* Valor */}
                          <Text
                            style={[styles.vitalValue, { color: valColor }]}
                            allowFontScaling={true}
                            numberOfLines={0}
                          >
                            {vital.value}
                          </Text>
                          {/* Unidade */}
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

          {/* Espaço inferior para não colar no tab bar */}
          <View style={{ height: 32 }} />
        </View>
      </ScrollView>
    </View>
  )
}

/* ═══════════════ ESTILOS ═══════════════ */

const styles = StyleSheet.create({
  /* ── Container raiz ── */
  safe: {
    flex: 1,
    backgroundColor: BG,
  },

  /* ── ScrollView ── */
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    // Sem paddingTop — o header faz isso
  },

  /* ── 1. Header (azul escuro, dentro do scroll) ── */
  header: {
    backgroundColor: NAVY,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 48,               // Ajustado para 48px para conexão mais elegante
    gap: 16,                         // Aumentado o gap para separar melhor os elementos internos
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  cloudBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Fundo azul/branco translúcido
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  cloudText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.9,
  },

  /* ── 2. Filtros + Exportar (dentro do header azul) ── */
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
    backgroundColor: '#FFFFFF',
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
    color: '#FFFFFF',
  },

  /* ── Zona do corpo (fundo cinza) ── */
  bodyZone: {
    backgroundColor: BG,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  /* ── 3. Resumo Semântico — overlap card ── */
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_BG,
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: -28,                  // ← Overlap refinado (-28px)
    marginBottom: 20,
    shadowColor: '#002959',
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
    backgroundColor: BORDER,
  },

  /* ── 4. Card diário ── */
  dayCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#002959',
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

  /* ── Grid de vitais (2 colunas, wrap) ── */
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingBottom: 16,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 14,
    marginHorizontal: 0,
  },
  vitalCell: {
    width: '47%',
    backgroundColor: '#F8FAFC',
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
