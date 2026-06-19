import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { Plus } from 'lucide-react-native'
import { useState, useEffect } from 'react'
import { router } from 'expo-router'
import { colors } from '@/lib/constants/colors'
import { HelpButton } from '@/components/shared/HelpButton'
import { TutorialHighlight } from '@/components/shared/TutorialHighlight'

// Azul claro suave sobre navy — especificado no design
const SUBTITLE_COLOR = colors.coolHorizon
// Azul complementar para gradiente do header
const GRADIENT_END = colors.cerulean



function getGreeting(name: string, hours: number): string {
  const firstName = name.trim().split(/\s+/)[0] ?? name
  if (hours >= 5 && hours < 12) return `Bom dia, ${firstName}! ☀️`
  if (hours >= 12 && hours < 18) return `Boa tarde, ${firstName}! 🌤️`
  return `Boa noite, ${firstName}! 🌙`
}

function formatTime(date: Date): string {
  const h = String(date.getHours()).padStart(2, '0')
  const m = String(date.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}

interface HomeHeaderProps {
  userName: string
  measurementCount: number
}

export function HomeHeader({ userName, measurementCount }: HomeHeaderProps) {
  const insets = useSafeAreaInsets()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])


  const greeting         = getGreeting(userName, now.getHours())
  const timeStr          = formatTime(now)
  const measurementLabel = measurementCount === 1
    ? '1 medição hoje'
    : `${measurementCount} medições hoje`

  return (
    <LinearGradient
      colors={[colors.navy, GRADIENT_END]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { paddingTop: insets.top + 16 }]}
    >

      {/* Linha de saudação + avatar */}
      <View style={styles.row}>
        <View style={styles.textCol}>
          <View style={{ gap: 4 }}>
            <Text style={styles.greeting} numberOfLines={1}>
              {greeting}
            </Text>
            <Text style={styles.subtitle}>
              {timeStr} · {measurementLabel}
            </Text>
          </View>
        </View>

        <HelpButton tourId="home" />


      </View>

      {/* CTA principal — visualmente faz parte do header (mesmo fundo navy) */}
      <TutorialHighlight tourId="home" stepIndex={1} borderRadius={14}>
        <Pressable
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          onPress={() => router.push('/measurement/step-1')}
          accessibilityRole="button"
          accessibilityLabel="Registrar nova medição"
        >
          <Text style={styles.ctaText}>Registrar medição</Text>
        </Pressable>
      </TutorialHighlight>

    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 16,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    zIndex: 10,
    elevation: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textCol: {
    flex: 1,
    gap: 4,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textOnDark,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: SUBTITLE_COLOR,
  },

  cta: {
    backgroundColor: colors.cerulean,
    height: 56,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  ctaPressed: {
    opacity: 0.85,
  },
  ctaText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
  },
})
