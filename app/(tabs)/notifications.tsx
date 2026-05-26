import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShieldCheck } from 'lucide-react-native';

const SCHEDULED_TIMES = ['08:00', '14:00', '22:00'];

// Calcula a próxima data/hora exata que esse alarme deve tocar
function getNextOccurrence(timeStr: string, now: Date) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date(now.getTime());
  date.setHours(hours, minutes, 0, 0);

  // Se o horário já passou hoje, joga para amanhã
  if (date.getTime() <= now.getTime()) {
    date.setDate(date.getDate() + 1);
  }
  return date;
}

// Formata a diferença de tempo de forma amigável
function getTimeDifferenceString(target: Date, now: Date) {
  let diffMs = target.getTime() - now.getTime();
  if (diffMs < 0) diffMs = 0;

  const totalMins = Math.floor(diffMs / 1000 / 60);
  const hours = Math.floor(totalMins / 60);
  const minutes = totalMins % 60;

  if (hours > 0 && minutes > 0) {
    return `Daqui a ${hours}h ${minutes}min`;
  }
  if (hours > 0) {
    return `Daqui a ${hours}h`;
  }
  if (minutes > 0) {
    return `Daqui a ${minutes}min`;
  }
  return 'Agora mesmo';
}

export default function NotificationsScreen() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // Atualiza o relógio interno a cada 30 segundos
    const interval = setInterval(() => {
      setNow(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // 1. Criar objetos de data/hora para todos os alarmes
  const occurrences = SCHEDULED_TIMES.map(timeStr => ({
    timeStr,
    date: getNextOccurrence(timeStr, now)
  }));

  // 2. Ordenar para descobrir quem está mais próximo (o menor tempo)
  occurrences.sort((a, b) => a.date.getTime() - b.date.getTime());

  // 3. Separar o alarme principal (mais próximo) dos restantes (fila)
  const mainAlarm = occurrences[0];
  const queueAlarms = occurrences.slice(1);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. Header da Tela */}
        <View style={styles.header}>
          <Text style={styles.title} accessible={true} accessibilityRole="header">
            Notificações
          </Text>
        </View>

        {/* 2. Banner de Segurança do Sistema */}
        <View 
          style={styles.securityBanner}
          accessible={true}
          accessibilityRole="text"
          accessibilityLabel="Sistema operando normalmente. Seus lembretes estão ativos e precisos."
        >
          <ShieldCheck size={24} color="#004B87" />
          <Text style={styles.securityText}>
            Sistema operando normalmente. Seus lembretes estão ativos e precisos.
          </Text>
        </View>

        {/* 3. Seção "Agenda de Hoje" */}
        <View style={styles.agendaSection}>
          <View style={styles.agendaHeader}>
            <Text style={styles.agendaTitle}>Lembretes agendados</Text>
            <View style={styles.badge} accessible={true} accessibilityLabel={`${SCHEDULED_TIMES.length} lembretes programados`}>
              <Text style={styles.badgeText}>{SCHEDULED_TIMES.length} lembretes</Text>
            </View>
          </View>

          {/* 4. Card de Lembrete Principal (O mais próximo) */}
          <View style={styles.reminderCard}>
            <View style={styles.cardTopLine}>
              <Text style={styles.cardTopTitle}>Próxima aferição</Text>
              <View style={styles.cardBadge}>
                <View style={styles.badgeDot} />
                <Text style={styles.cardBadgeText}>Em destaque</Text>
              </View>
            </View>

            <View style={styles.cardCenter} accessible={true} accessibilityLabel={`Lembrete principal marcado para as ${mainAlarm.timeStr}`}>
              <Text style={styles.timeGiant}>{mainAlarm.timeStr}</Text>
            </View>

            <View style={styles.cardBottomPill}>
              <Text style={styles.cardBottomText}>
                {getTimeDifferenceString(mainAlarm.date, now)}
              </Text>
            </View>
          </View>

          {/* 5. Fila de Próximos Horários (Mini Cards) */}
          <View style={styles.queueContainer}>
            <Text style={styles.queueTitle}>Próximos horários na fila:</Text>

            {queueAlarms.map((alarm, index) => (
              <View key={index} style={styles.miniCard} accessible={true} accessibilityLabel={`Lembrete marcado para as ${alarm.timeStr}`}>
                <View style={styles.miniCardLeft}>
                  <View style={[styles.miniBadgeDot, { backgroundColor: '#CBD5E1' }]} />
                  <Text style={styles.miniCardTime}>{alarm.timeStr}</Text>
                </View>
                <Text style={styles.miniCardLabel}>
                  {getTimeDifferenceString(alarm.date, now)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#004B87',
  },
  securityBanner: {
    backgroundColor: '#E6F7F4',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  securityText: {
    flex: 1,
    fontSize: 14,
    color: '#004B87',
    fontWeight: '600',
    lineHeight: 20,
  },
  agendaSection: {
    marginTop: 32,
  },
  agendaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  agendaTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#475569',
  },
  badge: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  reminderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#002959',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardTopLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTopTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#004B87',
  },
  cardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F7F4', 
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00A88F',
  },
  cardBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00A88F', 
  },
  cardCenter: {
    alignItems: 'center',
    marginVertical: 24,
  },
  timeGiant: {
    fontSize: 48,
    fontWeight: '800',
    color: '#004B87',
    letterSpacing: -1,
  },
  cardBottomPill: {
    backgroundColor: '#F8FAFC',
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  cardBottomText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  queueContainer: {
    marginTop: 24,
    gap: 12, 
  },
  queueTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 4,
  },
  miniCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
    color: '#334155', 
  },
  miniCardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8', 
  },
});
