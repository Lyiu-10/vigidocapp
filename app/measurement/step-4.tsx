import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  useColorScheme,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react-native'
import { colors } from '@/lib/constants/colors'
import { MEASUREMENT_CONFIG } from '@/lib/constants/measurementTypes'
import { useMeasurementStore } from '@/store/measurement.store'

const DARK = { bg: '#0F172A', card: '#1E293B', text: '#FFFFFF' } as const

function formatTime(date: Date): string {
  const h = String(date.getHours()).padStart(2, '0')
  const m = String(date.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}

export default function Step4Screen() {
  const isDark       = useColorScheme() === 'dark'
  const selectedType = useMeasurementStore((s) => s.selectedType)
  const value        = useMeasurementStore((s) => s.value)
  const systolic     = useMeasurementStore((s) => s.systolic)
  const diastolic    = useMeasurementStore((s) => s.diastolic)
  const resetCurrent = useMeasurementStore((s) => s.resetCurrent)
  const markCompleted= useMeasurementStore((s) => s.markCompleted)

  useEffect(() => {
    if (!selectedType) router.replace('/measurement/step-1')
  }, [])

  if (!selectedType) return null

  const config           = MEASUREMENT_CONFIG[selectedType]
  const isBloodPressure  = selectedType === 'blood_pressure'
  const displayValue     = isBloodPressure ? `${systolic}/${diastolic}` : value
  const timeStr          = formatTime(new Date())
  const textColor        = isDark ? DARK.text : colors.navy

  function handleSave() {
    // TODO: enviar para API via React Query mutation quando disponível
    markCompleted()
    resetCurrent()
    router.replace('/measurement/step-1')
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: isDark ? DARK.bg : colors.iceBlue }]}>

      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.7 }]}
          onPress={() => router.back()}
          accessibilityLabel="Voltar e corrigir o valor"
          accessibilityRole="button"
        >
          <ArrowLeft size={22} color={textColor} strokeWidth={2} />
        </Pressable>
        <Text style={styles.stepLabel}>4 de 4</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Card de resumo */}
        <View style={[styles.card, isDark && styles.cardDark]}>
          <View style={[styles.iconWrap, { backgroundColor: config.color + '1A' }]}>
            <config.Icon size={56} color={config.color} strokeWidth={1.5} />
          </View>

          <Text style={[styles.cardType, { color: textColor }]}>
            {config.label}
          </Text>

          <Text style={styles.cardValue}>{displayValue}</Text>

          <Text style={styles.cardUnit}>{config.unit}</Text>

          <Text style={styles.cardTime}>Hoje às {timeStr}</Text>
        </View>

        <Text style={[styles.confirmText, { color: textColor }]}>
          Tudo certo? Salve a medição.
        </Text>
      </ScrollView>

      {/* Ações */}
      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          onPress={handleSave}
          accessibilityRole="button"
          accessibilityLabel="Salvar medição"
        >
          <Text style={styles.ctaText}>Salvar medição</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.ghostBtn, pressed && { opacity: 0.7 }]}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Voltar e corrigir o valor"
        >
          <Text style={styles.ghostText}>Corrigir valor</Text>
        </Pressable>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 4,
    height: 56,
  },
  iconBtn: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.placeholder,
    paddingRight: 8,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    gap: 24,
  },

  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    gap: 8,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  cardDark: {
    backgroundColor: DARK.card,
  },
  iconWrap: {
    width: 96,
    height: 96,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cardType: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  cardValue: {
    fontSize: 52,
    fontWeight: '700',
    color: colors.ceruleanDeep,
    letterSpacing: -1,
    lineHeight: 64,
  },
  cardUnit: {
    fontSize: 16,
    color: colors.placeholder,
  },
  cardTime: {
    fontSize: 13,
    color: colors.placeholder,
    marginTop: 4,
  },

  confirmText: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '400',
  },

  footer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 8,
  },
  cta: {
    backgroundColor: colors.esmeralda,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaPressed: { opacity: 0.85 },
  ctaText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.navy,
  },
  ghostBtn: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.ceruleanDeep,
  },
})
