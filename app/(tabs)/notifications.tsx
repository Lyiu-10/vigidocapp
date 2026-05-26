import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShieldCheck } from 'lucide-react-native';

export default function NotificationsScreen() {
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
            <View style={styles.badge} accessible={true} accessibilityLabel="3 lembretes programados para hoje">
              <Text style={styles.badgeText}>3 lembretes</Text>
            </View>
          </View>

          {/* 4. Card de Lembrete Principal (O mais próximo) */}
          <View style={styles.reminderCard}>
            <View style={styles.cardTopLine}>
              <Text style={styles.cardTopTitle}>Primeira aferição do dia</Text>
              <View style={styles.cardBadge}>
                <View style={styles.badgeDot} />
                <Text style={styles.cardBadgeText}>Próximo</Text>
              </View>
            </View>

            <View style={styles.cardCenter} accessible={true} accessibilityLabel="Lembrete principal marcado para as 08:00">
              <Text style={styles.timeGiant}>08:00</Text>
            </View>

            <View style={styles.cardBottomPill}>
              <Text style={styles.cardBottomText}>O alarme tocará em breve</Text>
            </View>
          </View>

          {/* 5. Fila de Próximos Horários (Mini Cards) */}
          <View style={styles.queueContainer}>
            <Text style={styles.queueTitle}>Próximos horários na fila:</Text>

            {/* Mini Card 1 */}
            <View style={styles.miniCard} accessible={true} accessibilityLabel="Lembrete marcado para as 14:00">
              <View style={styles.miniCardLeft}>
                <View style={[styles.miniBadgeDot, { backgroundColor: '#CBD5E1' }]} />
                <Text style={styles.miniCardTime}>14:00</Text>
              </View>
              <Text style={styles.miniCardLabel}>Em breve</Text>
            </View>

            {/* Mini Card 2 */}
            <View style={styles.miniCard} accessible={true} accessibilityLabel="Lembrete marcado para as 22:00">
              <View style={styles.miniCardLeft}>
                <View style={[styles.miniBadgeDot, { backgroundColor: '#CBD5E1' }]} />
                <Text style={styles.miniCardTime}>22:00</Text>
              </View>
              <Text style={styles.miniCardLabel}>Em Breve</Text>
            </View>

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
    backgroundColor: '#E6F7F4', // Fundo levemente verde para destacar ser o próximo
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
    color: '#00A88F', // Cor verde para destaque
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
    gap: 12, // Espaçamento entre os mini cards
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
    color: '#334155', // Cinza mais escuro, mas não tanto quanto o principal
  },
  miniCardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8', // Cinza mais claro para reduzir a carga cognitiva
  },
});
