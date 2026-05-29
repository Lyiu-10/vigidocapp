import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  useColorScheme,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { ArrowLeft, CheckCircle } from 'lucide-react-native'
import { colors } from '@/lib/constants/colors'
import { MEASUREMENT_CONFIG } from '@/lib/constants/measurementTypes'
import { useMeasurementStore } from '@/store/measurement.store'
import { TutorialHighlight } from '@/components/shared/TutorialHighlight'

const DARK = { bg: '#0F172A', text: '#FFFFFF' } as const

export default function Step2Screen() {
  const isDark      = useColorScheme() === 'dark'
  const selectedType = useMeasurementStore((s) => s.selectedType)

  // Guarda de entrada: se chegar sem tipo selecionado, volta ao início
  useEffect(() => {
    if (!selectedType) router.replace('/measurement/step-1')
  }, [])

  if (!selectedType) return null

  const config    = MEASUREMENT_CONFIG[selectedType]
  const textColor = isDark ? DARK.text : colors.navy

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: isDark ? DARK.bg : colors.iceBlue }]}>

      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.7 }]}
          onPress={() => router.back()}
          accessibilityLabel="Voltar para escolha do tipo"
          accessibilityRole="button"
        >
          <ArrowLeft size={22} color={textColor} strokeWidth={2} />
        </Pressable>
        <Text style={styles.stepLabel}>2 de 4</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Ícone + nome do tipo */}
        <View style={styles.typeSection}>
          <View style={[styles.iconWrap, { backgroundColor: config.color + '1A' }]}>
            <config.Icon size={64} color={config.color} strokeWidth={1.5} />
          </View>
          <Text style={[styles.typeName, { color: textColor }]}>{config.label}</Text>
          <Text style={styles.subtitle}>Antes de medir...</Text>
        </View>

        {/* Instruções */}
        <TutorialHighlight tourId="measurement" stepIndex={1} borderRadius={16}>
          <View style={styles.instructionList}>
            {config.instructions.map((instruction, i) => (
              <View key={i} style={styles.instructionRow}>
                <CheckCircle
                  size={18}
                  color={colors.esmeralda}
                  strokeWidth={2}
                />
                <Text style={[styles.instructionText, { color: textColor }]}>
                  {instruction}
                </Text>
              </View>
            ))}
          </View>
        </TutorialHighlight>
      </ScrollView>

      {/* CTA */}
      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          onPress={() => router.push('/measurement/step-3')}
          accessibilityRole="button"
          accessibilityLabel="Continuar para inserir o valor"
        >
          <Text style={styles.ctaText}>Estou pronto</Text>
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
    paddingTop: 16,
    paddingBottom: 24,
  },
  typeSection: {
    alignItems: 'center',
    gap: 12,
    paddingBottom: 40,
  },
  iconWrap: {
    width: 112,
    height: 112,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  typeName: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.placeholder,
  },

  instructionList: {
    gap: 20,
    paddingHorizontal: 4,
  },
  instructionRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  instructionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 23,
  },

  footer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
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
})
