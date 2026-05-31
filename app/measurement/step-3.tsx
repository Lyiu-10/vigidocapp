import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  useColorScheme,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { ArrowLeft, AlertTriangle } from 'lucide-react-native'
import { colors } from '@/lib/constants/colors'
import {
  MEASUREMENT_CONFIG,
  VALIDATION_RANGES,
} from '@/lib/constants/measurementTypes'
import { useMeasurementStore } from '@/store/measurement.store'
import { useTutorialStore } from '@/store/tutorial.store'
import { TutorialHighlight } from '@/components/shared/TutorialHighlight'
import type { MeasurementType } from '@/types/domain'

const DARK = { bg: '#0F172A', text: '#FFFFFF' } as const

function isOutOfRange(type: MeasurementType, val: string): boolean {
  const range = VALIDATION_RANGES[type]
  if (!range || val.trim() === '') return false
  const num = parseFloat(val)
  return !isNaN(num) && (num < range.min || num > range.max)
}

export default function Step3Screen() {
  const isDark       = useColorScheme() === 'dark'
  const selectedType = useMeasurementStore((s) => s.selectedType)
  const value        = useMeasurementStore((s) => s.value)
  const systolic     = useMeasurementStore((s) => s.systolic)
  const diastolic    = useMeasurementStore((s) => s.diastolic)
  const setValue     = useMeasurementStore((s) => s.setValue)
  const setSystolic  = useMeasurementStore((s) => s.setSystolic)
  const setDiastolic = useMeasurementStore((s) => s.setDiastolic)
  const { currentStep, activeTour, nextStep } = useTutorialStore()

  const [focused, setFocused] = useState<'main' | 'sys' | 'dia' | null>(null)

  useEffect(() => {
    if (!selectedType) router.replace('/measurement/step-1')
  }, [])

  if (!selectedType) return null

  const config           = MEASUREMENT_CONFIG[selectedType]
  const isBloodPressure  = selectedType === 'blood_pressure'
  const textColor        = isDark ? DARK.text : colors.navy

  const isEmpty = isBloodPressure
    ? systolic.trim() === '' || diastolic.trim() === ''
    : value.trim() === ''

  const showWarning = isBloodPressure
    ? isOutOfRange(selectedType, systolic)
    : isOutOfRange(selectedType, value)

  function borderColor(field: typeof focused) {
    return focused === field ? colors.cerulean : colors.border
  }

  function handleConfirm() {
    if (activeTour === 'measurement_input' && currentStep === 0) {
      nextStep(1)
    }
    router.push('/measurement/step-4')
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: isDark ? DARK.bg : colors.iceBlue }]}>

      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.7 }]}
          onPress={() => router.back()}
          accessibilityLabel="Voltar para instruções"
          accessibilityRole="button"
        >
          <ArrowLeft size={22} color={textColor} strokeWidth={2} />
        </Pressable>
        <Text style={styles.stepLabel}>3 de 4</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Tipo selecionado */}
        <View style={styles.typeRow}>
          <View style={[styles.iconWrap, { backgroundColor: config.color + '1A' }]}>
            <config.Icon size={48} color={config.color} strokeWidth={1.5} />
          </View>
          <Text style={[styles.typeName, { color: textColor }]}>{config.label}</Text>
        </View>

        {/* Campos de entrada */}
        <TutorialHighlight tourId="measurement_input" stepIndex={0} borderRadius={12}>
        {isBloodPressure ? (
          // Pressão arterial: dois campos lado a lado
          <View style={styles.bpWrapper}>
            <View style={styles.bpRow}>
              <TextInput
                style={[
                  styles.inputLarge,
                  { color: textColor, borderBottomColor: borderColor('sys'), flex: 1 },
                ]}
                value={systolic}
                onChangeText={setSystolic}
                keyboardType="numeric"
                placeholder="120"
                placeholderTextColor={colors.placeholder}
                onFocus={() => setFocused('sys')}
                onBlur={() => setFocused(null)}
                accessibilityLabel="Campo para inserir pressão sistólica"
                maxLength={3}
                returnKeyType="next"
              />
              <Text style={[styles.bpSeparator, { color: colors.placeholder }]}>/</Text>
              <TextInput
                style={[
                  styles.inputLarge,
                  { color: textColor, borderBottomColor: borderColor('dia'), flex: 1 },
                ]}
                value={diastolic}
                onChangeText={setDiastolic}
                keyboardType="numeric"
                placeholder="80"
                placeholderTextColor={colors.placeholder}
                onFocus={() => setFocused('dia')}
                onBlur={() => setFocused(null)}
                accessibilityLabel="Campo para inserir pressão diastólica"
                maxLength={3}
                returnKeyType="done"
              />
            </View>
            <Text style={styles.bpHint}>sistólica / diastólica</Text>
          </View>
        ) : (
          // Campo único
          <TextInput
            style={[
              styles.inputLarge,
              { color: textColor, borderBottomColor: borderColor('main') },
            ]}
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={colors.placeholder}
            onFocus={() => setFocused('main')}
            onBlur={() => setFocused(null)}
            accessibilityLabel={`Campo para inserir ${config.label}`}
            returnKeyType="done"
          />
        )}

        </TutorialHighlight>

        {/* Unidade */}
        <Text style={styles.unit}>{config.unit}</Text>

        {/* Aviso de valor fora do range — não bloqueador */}
        {showWarning && (
          <View style={styles.warningRow}>
            <AlertTriangle size={14} color={colors.amber} strokeWidth={2} />
            <Text style={styles.warningText}>
              Verifique o valor — parece fora do esperado
            </Text>
          </View>
        )}
      </ScrollView>

      {/* CTA */}
      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [
            styles.cta,
            isEmpty && styles.ctaDisabled,
            pressed && !isEmpty && styles.ctaPressed,
          ]}
          onPress={handleConfirm}
          disabled={isEmpty}
          accessibilityRole="button"
          accessibilityLabel="Confirmar valor e continuar"
          accessibilityState={{ disabled: isEmpty }}
        >
          <Text style={styles.ctaText}>Confirmar valor</Text>
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
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },

  typeRow: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 48,
  },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeName: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.2,
  },

  // Input único
  inputLarge: {
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
    borderBottomWidth: 2,
    height: 80,
    paddingHorizontal: 8,
    minWidth: 120,
  },

  // Pressão arterial
  bpWrapper: {
    alignItems: 'center',
    width: '100%',
  },
  bpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bpSeparator: {
    fontSize: 32,
    fontWeight: '400',
  },
  bpHint: {
    fontSize: 12,
    color: colors.placeholder,
    marginTop: 8,
    textAlign: 'center',
  },

  unit: {
    fontSize: 16,
    color: colors.placeholder,
    marginTop: 12,
    marginBottom: 16,
  },

  warningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  warningText: {
    fontSize: 13,
    color: colors.amber,
    flexShrink: 1,
  },

  footer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  cta: {
    backgroundColor: colors.cerulean,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaPressed:  { opacity: 0.85 },
  ctaDisabled: { opacity: 0.4 },
  ctaText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.white,
  },
})
