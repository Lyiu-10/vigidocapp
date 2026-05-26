import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Plus } from 'lucide-react-native'
import { useState, useEffect } from 'react'
import { router } from 'expo-router'
import { colors } from '@/lib/constants/colors'

// Azul claro suave sobre navy — especificado no design mas sem token equivalente em colors.ts
const SUBTITLE_COLOR = '#B0C4DE'

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

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
  onAvatarPress: () => void
  measurementCount: number
}

export function HomeHeader({ userName, onAvatarPress, measurementCount }: HomeHeaderProps) {
  const insets = useSafeAreaInsets()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  const initials         = getInitials(userName)
  const greeting         = getGreeting(userName, now.getHours())
  const timeStr          = formatTime(now)
  const measurementLabel = measurementCount === 1
    ? '1 medição hoje'
    : `${measurementCount} medições hoje`

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>

      {/* Linha de saudação + avatar */}
      <View style={styles.row}>
        <View style={styles.textCol}>
          <Text style={styles.greeting} numberOfLines={1}>
            {greeting}
          </Text>
          <Text style={styles.subtitle}>
            {timeStr} · {measurementLabel}
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [styles.avatarTouchable, pressed && { opacity: 0.8 }]}
          onPress={onAvatarPress}
          accessibilityLabel="Abrir perfil"
          accessibilityRole="button"
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
        </Pressable>
      </View>

      {/* CTA principal — visualmente faz parte do header (mesmo fundo navy) */}
      <Pressable
        style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
        onPress={() => router.push('/measurement/step-1')}
        accessibilityRole="button"
        accessibilityLabel="Registrar nova medição"
      >
        <Plus size={20} color={colors.navy} strokeWidth={2.5} />
        <Text style={styles.ctaText}>Registrar medição</Text>
      </Pressable>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.navy,
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 16,
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
  avatarTouchable: {
    minWidth: 48,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.ceruleanDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: 0.5,
  },
  cta: {
    backgroundColor: colors.esmeralda,
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
    fontSize: 17,
    fontWeight: '700',
    color: colors.navy,
  },
})
