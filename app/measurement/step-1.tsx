import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  useColorScheme,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { X, ChevronRight, CheckCircle2 } from 'lucide-react-native'
import { colors } from '@/lib/constants/colors'
import { MEASUREMENT_CONFIG, MEASUREMENT_TYPE_LIST } from '@/lib/constants/measurementTypes'
import { useMeasurementStore } from '@/store/measurement.store'
import { useTutorialStore } from '@/store/tutorial.store'
import { TutorialHighlight } from '@/components/shared/TutorialHighlight'
import { HelpButton } from '@/components/shared/HelpButton'
import type { MeasurementType } from '@/types/domain'

// Dark mode — mover para colors.ts quando sistema de temas for formalizado
const DARK = { bg: '#0F172A', card: '#1E293B', text: '#FFFFFF' } as const

export default function Step1Screen() {
  const isDark       = useColorScheme() === 'dark'
  const setType      = useMeasurementStore((s) => s.setType)
  const completed    = useMeasurementStore((s) => s.completed)
  const resetSession = useMeasurementStore((s) => s.resetSession)

  const _hydrated                 = useTutorialStore((s) => s._hydrated)
  const measurementTourCompleted  = useTutorialStore((s) => s.measurementTourCompleted)
  const startTour                 = useTutorialStore((s) => s.startTour)

  useEffect(() => {
    if (!_hydrated) return
    if (!measurementTourCompleted) {
      const timer = setTimeout(() => startTour('measurement'), 600)
      return () => clearTimeout(timer)
    }
  }, [_hydrated])

  const bgColor   = isDark ? DARK.bg   : colors.iceBlue
  const textColor = isDark ? DARK.text : colors.navy

  function handleSelect(type: MeasurementType) {
    setType(type)
    router.push('/measurement/step-2')
  }

  function handleClose() {
    if (completed.length > 0) {
      Alert.alert(
        'Sair sem finalizar?',
        'Você já preencheu alguns dados. Se sair agora, essas informações não serão salvas na sua rotina. Deseja sair mesmo assim?',
        [
          { text: 'Não', style: 'cancel' },
          { text: 'Sim, Sair', style: 'destructive', onPress: () => { resetSession(); router.replace('/(tabs)/') } }
        ]
      )
    } else {
      router.replace('/(tabs)/')
    }
  }

  const allCompleted = completed.length === MEASUREMENT_TYPE_LIST.length

  function handleFinish() {
    if (!allCompleted) return
    resetSession()
    router.replace({ pathname: '/(tabs)/', params: { saved: 'true' } })
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bgColor }]}>

      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.7 }]}
          onPress={handleClose}
          accessibilityLabel="Fechar Nova Medição"
          accessibilityRole="button"
        >
          <X size={22} color={textColor} strokeWidth={2} />
        </Pressable>
        <Text style={styles.stepLabel}>1 de 4</Text>
        <HelpButton tourId="measurement" />
      </View>

      {/* Título */}
      <Text style={[styles.title, { color: textColor }]}>
        O que vamos medir?
      </Text>

      {/* Lista vertical de tipos */}
      <TutorialHighlight tourId="measurement" stepIndex={0} borderRadius={14}>
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {MEASUREMENT_TYPE_LIST.map((type) => {
          const config = MEASUREMENT_CONFIG[type]
          const isCompleted = completed.includes(type)
          return (
            <Pressable
              key={type}
              style={({ pressed }) => [
                styles.card,
                { backgroundColor: isDark ? DARK.card : colors.white },
                pressed && { opacity: 0.82 },
              ]}
              onPress={() => handleSelect(type)}
              accessibilityRole="button"
              accessibilityLabel={config.label}
            >
              {/* Ícone com fundo colorido suave */}
              <View style={[styles.iconWrap, { backgroundColor: config.color + '1A' }]}>
                <config.Icon size={24} color={config.color} strokeWidth={2} />
              </View>

              {/* Texto */}
              <View style={styles.cardText}>
                <Text style={[styles.cardLabel, { color: textColor }]}>
                  {config.label}
                </Text>
                <Text style={styles.cardUnit}>{config.unit}</Text>
              </View>

              {isCompleted ? (
                <CheckCircle2 size={22} color={colors.esmeralda} strokeWidth={2} />
              ) : (
                <ChevronRight size={18} color={colors.placeholder} strokeWidth={2} />
              )}
            </Pressable>
          )
        })}
      </ScrollView>
      </TutorialHighlight>

      {/* Footer */}
      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [
            styles.cta,
            !allCompleted && styles.ctaDisabled,
            pressed && allCompleted && styles.ctaPressed,
          ]}
          onPress={handleFinish}
          disabled={!allCompleted}
          accessibilityRole="button"
          accessibilityLabel="Finalizar"
        >
          <Text style={[styles.ctaText, !allCompleted && styles.ctaTextDisabled]}>Finalizar</Text>
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

  title: {
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 20,
    paddingBottom: 20,
    letterSpacing: -0.3,
  },

  list: { flex: 1 },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 10,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 14,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: { flex: 1 },
  cardLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  cardUnit: {
    fontSize: 13,
    color: colors.placeholder,
  },

  footer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
  },
  cta: {
    backgroundColor: colors.esmeralda,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaDisabled: {
    backgroundColor: colors.border,
  },
  ctaPressed: {
    opacity: 0.85,
  },
  ctaText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.navy,
  },
  ctaTextDisabled: {
    color: colors.placeholder,
  },
})
