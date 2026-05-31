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
import { X, CheckCircle2 } from 'lucide-react-native'
import { colors } from '@/lib/constants/colors'
import { MEASUREMENT_CONFIG, MEASUREMENT_TYPE_LIST } from '@/lib/constants/measurementTypes'
import { useMeasurementStore } from '@/store/measurement.store'
import { useTutorialStore } from '@/store/tutorial.store'
import { TutorialHighlight } from '@/components/shared/TutorialHighlight'
import { HelpButton } from '@/components/shared/HelpButton'
import type { MeasurementType } from '@/types/domain'

export default function Step1Screen() {
  const isDark = useColorScheme() === 'dark'
  const setType = useMeasurementStore((s) => s.setType)
  const completed = useMeasurementStore((s) => s.completed)
  const resetSession = useMeasurementStore((s) => s.resetSession)

  const { currentStep, activeTour, nextStep } = useTutorialStore()
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

  const bgColor = isDark ? '#0F172A' : '#F8FAFC'
  const textColor = isDark ? '#FFFFFF' : '#004B87'

  function handleSelect(type: MeasurementType) {
    if (activeTour === 'measurement' && currentStep === 0) {
      nextStep(2)
    }
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
          { text: 'Sim, Sair', style: 'destructive', onPress: () => { resetSession(); router.replace('/(tabs)') } }
        ]
      )
    } else {
    router.replace('/(tabs)')
    }
  }

  const allCompleted = completed.length === MEASUREMENT_TYPE_LIST.length

  const commitSession = useMeasurementStore((s) => s.commitSession)

  function handleFinish() {
    if (!allCompleted) return
    commitSession()
    resetSession()
    router.replace({ pathname: '/(tabs)', params: { saved: 'true' } })
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bgColor }]} edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Header */}
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.7 }]}
            onPress={handleClose}
            accessibilityLabel="Fechar Nova Medição"
            accessibilityRole="button"
          >
            <X size={24} color="#64748B" strokeWidth={2} />
          </Pressable>
          <Text style={styles.stepIndicator}>1 de 4</Text>
          <HelpButton tourId="measurement" />
        </View>

        <Text style={[styles.title, { color: textColor }]} allowFontScaling={true}>
          O que vamos medir?
        </Text>

        <TutorialHighlight tourId="measurement" stepIndex={0} borderRadius={14}>
          {/* 2. Grid de Opções (Layout Palace) */}
          <View style={styles.gridContainer}>
            {MEASUREMENT_TYPE_LIST.map((type) => {
              const config = MEASUREMENT_CONFIG[type]
              const isCompleted = completed.includes(type)
              
              return (
                <Pressable
                  key={type}
                  style={({ pressed }) => [
                    styles.card,
                    isDark ? { backgroundColor: '#1E293B' } : { backgroundColor: '#FFFFFF' },
                    isCompleted && styles.cardCompleted,
                    pressed && { opacity: 0.8 },
                  ]}
                  onPress={() => handleSelect(type)}
                  accessibilityRole="button"
                  accessibilityLabel={config.label}
                >
                  {/* Ícone */}
                  <View style={[styles.iconWrap, { backgroundColor: config.color + '1A' }]}>
                    <config.Icon size={32} color={config.color} strokeWidth={2} />
                    {isCompleted && (
                      <View style={styles.checkBadge}>
                        <CheckCircle2 size={18} color="#FFFFFF" fill={colors.esmeralda} />
                      </View>
                    )}
                  </View>

                  {/* Textos empilhados */}
                  <View style={styles.cardTextContainer}>
                    <Text 
                      style={[styles.cardTitle, { color: textColor }]} 
                      numberOfLines={0} 
                      allowFontScaling={true}
                    >
                      {config.label}
                    </Text>
                    <Text 
                      style={styles.cardUnit}
                      allowFontScaling={true}
                    >
                      {config.unit}
                    </Text>
                  </View>
                </Pressable>
              )
            })}
          </View>
        </TutorialHighlight>
        </ScrollView>
      {/* 4. Botão Inferior */}
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
          accessibilityLabel="Finalizar medições"
        >
          <Text style={[styles.ctaText, !allCompleted && styles.ctaTextDisabled]}>Finalizar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    marginBottom: 16,
  },
  iconBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9', // Fundo sutil para o X
    borderRadius: 22,
  },
  stepIndicator: {
    fontSize: 15,
    fontWeight: '700',
    color: '#64748B',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    paddingHorizontal: 20,
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 16,
    justifyContent: 'space-between',
  },
  card: {
    width: '47%', // Aprox 47% da tela, deixando espaço pro gap
    minHeight: 140, // Altura flexível que cresce se a fonte for grande
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#002959',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardCompleted: {
    borderColor: '#D1FAE5', // Borda verde suave se estiver completo
    backgroundColor: '#F0FDF4',
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  checkBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  cardTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
    lineHeight: 22,
  },
  cardUnit: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F8FAFC', // Combina com o fundo geral
  },
  cta: {
    backgroundColor: colors.esmeralda,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaDisabled: {
    backgroundColor: '#E2E8F0',
  },
  ctaPressed: {
    opacity: 0.85,
  },
  ctaText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#004B87',
  },
  ctaTextDisabled: {
    color: '#94A3B8',
  },
})
