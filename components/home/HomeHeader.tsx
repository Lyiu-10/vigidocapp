import { View, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState, useEffect } from 'react'
import { colors } from '@/lib/constants/colors'
import { HelpButton } from '@/components/shared/HelpButton'

// Azul claro suave sobre navy — especificado no design
const SUBTITLE_COLOR = colors.coolHorizon

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
    <View
      style={[styles.container, { paddingTop: insets.top + 16, backgroundColor: colors.navy }]}
    >
      {/* Linha de saudação + botão de ajuda */}
      <View style={styles.row}>
        <View style={styles.textCol}>
          <Text style={styles.greeting} numberOfLines={1}>
            {greeting}
          </Text>
          <Text style={styles.subtitle}>
            {timeStr} · {measurementLabel}
          </Text>
        </View>

        <HelpButton tourId="home" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 24,
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: SUBTITLE_COLOR,
    lineHeight: 20,
  },
})
