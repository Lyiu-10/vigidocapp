import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '@/lib/constants/colors'

const SCHEDULED_TIMES = ['08:00', '14:00', '22:00']

function getNextOccurrence(timeStr: string, now: Date) {
  const [hours, minutes] = timeStr.split(':').map(Number)
  const date = new Date(now.getTime())
  date.setHours(hours, minutes, 0, 0)
  if (date.getTime() <= now.getTime()) {
    date.setDate(date.getDate() + 1)
  }
  return date
}

function getTimeDifferenceString(target: Date, now: Date) {
  let diffMs = target.getTime() - now.getTime()
  if (diffMs < 0) diffMs = 0

  const totalMins = Math.floor(diffMs / 1000 / 60)
  const hours = Math.floor(totalMins / 60)
  const minutes = totalMins % 60

  if (hours > 0 && minutes > 0) return `Daqui a ${hours}h ${minutes}min`
  if (hours > 0) return `Daqui a ${hours}h`
  if (minutes > 0) return `Daqui a ${minutes}min`
  return 'Agora mesmo'
}

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets()
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(interval)
  }, [])

  const occurrences = SCHEDULED_TIMES.map(timeStr => ({
    timeStr,
    date: getNextOccurrence(timeStr, now),
  }))
  occurrences.sort((a, b) => a.date.getTime() - b.date.getTime())

  const mainAlarm = occurrences[0]
  const queueAlarms = occurrences.slice(1)

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View
          style={[
            styles.header,
            { paddingTop: insets.top + 16, backgroundColor: colors.navy },
          ]}
        >
          <View style={styles.headerInfo}>
            <Text style={styles.title} accessible={true} accessibilityRole="header">
              Notificações
            </Text>
            <Text style={styles.subtitle}>Gerencie seus lembretes e horários</Text>
          </View>
        </View>

        {/* ──────── Zona de transição ──────── */}
        <View style={styles.bodyZone}>

          {/* Agenda com overlap */}
          <View style={styles.agendaSection}>
            <View style={styles.agendaHeader}>
              <Text style={styles.agendaTitle}>Lembretes agendados</Text>
              <View
                style={styles.badge}
                accessible={true}
                accessibilityLabel={`${SCHEDULED_TIMES.length} lembretes programados`}
              >
                <Text style={styles.badgeText}>{SCHEDULED_TIMES.length} lembretes</Text>
              </View>
            </View>

            {/* Card principal — o mais próximo */}
            <View style={styles.reminderCard}>
              <View style={styles.cardTopLine}>
                <Text style={styles.cardTopTitle}>Próxima aferição</Text>
              </View>

              <View
                style={styles.cardCenter}
                accessible={true}
                accessibilityLabel={`Lembrete principal marcado para as ${mainAlarm.timeStr}`}
              >
                <Text style={styles.timeGiant}>{mainAlarm.timeStr}</Text>
              </View>

              <View style={styles.cardBottomPill}>
                <Text style={styles.cardBottomText}>
                  {getTimeDifferenceString(mainAlarm.date, now)}
                </Text>
              </View>
            </View>

            {/* Fila de próximos */}
            <View style={styles.queueContainer}>
              <Text style={styles.queueTitle}>Próximos horários na fila:</Text>

              {queueAlarms.map((alarm, index) => (
                <View
                  key={index}
                  style={styles.miniCard}
                  accessible={true}
                  accessibilityLabel={`Lembrete marcado para as ${alarm.timeStr}`}
                >
                  <View style={styles.miniCardLeft}>
                    <View style={[styles.miniBadgeDot, { backgroundColor: colors.border }]} />
                    <Text style={styles.miniCardTime}>{alarm.timeStr}</Text>
                  </View>
                  <Text style={styles.miniCardLabel}>
                    {getTimeDifferenceString(alarm.date, now)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.iceBlue,
  },
  scrollView: { flex: 1 },
  scrollContent: {},

  /* ── Header ── */
  header: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    justifyContent: 'flex-end',
    zIndex: 10,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: -0.5,
  },
  headerInfo: {
    gap: 4,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.coolHorizon,
  },

  /* ── Zona do corpo ── */
  bodyZone: {
    backgroundColor: colors.iceBlue,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  agendaSection: {
    marginTop: -24,
    paddingTop: 24,
    zIndex: 1,
    elevation: 1,
  },
  agendaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 4,
  },
  agendaTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.placeholder,
  },
  badge: {
    backgroundColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.navy,
  },

  /* ── Card principal ── */
  reminderCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.sandy + '55',
  },
  cardTopLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTopTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.navy,
  },
  cardCenter: {
    alignItems: 'center',
    marginVertical: 24,
  },
  timeGiant: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.navy,
    letterSpacing: -1,
  },
  cardBottomPill: {
    backgroundColor: colors.iceBlue,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  cardBottomText: {
    fontSize: 14,
    color: colors.placeholder,
    fontWeight: '600',
  },

  /* ── Fila ── */
  queueContainer: {
    marginTop: 24,
    gap: 12,
  },
  queueTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.placeholder,
    marginBottom: 4,
  },
  miniCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.sandy + '55',
  },
  miniCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  miniBadgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  miniCardTime: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.navy,
  },
  miniCardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.placeholder,
  },
})
