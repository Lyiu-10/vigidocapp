import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '@/lib/constants/colors'
import { HeaderBackButton } from '@/components/shared/HeaderBackButton'
import { Lock, LogOut, ChevronRight } from 'lucide-react-native'
import { router } from 'expo-router'

const SUBTITLE_COLOR = colors.coolHorizon

export default function ProfileScreen() {
  const insets = useSafeAreaInsets()

  function handleLogout() {
    Alert.alert('Sair da conta', 'Tem certeza que deseja sair do VigiDoc?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => router.replace('/(auth)/login') }
    ])
  }

  function handleChangePassword() {
    Alert.alert('Em desenvolvimento', 'A funcionalidade de alterar senha estará disponível em breve.')
  }

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.header,
          { paddingTop: insets.top + 16, backgroundColor: colors.navy },
        ]}
      >
        <HeaderBackButton />
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Meu Perfil</Text>
          <Text style={styles.headerSubtitle}>Dados pessoais e segurança</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Avatar Central */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitials}>CM</Text>
          </View>
          <Text style={styles.nameHeader}>Carlos Mendes</Text>
          <Text style={styles.emailHeader}>carlos.mendes@email.com</Text>
        </View>

        {/* Card 1: Dados Pessoais */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados Pessoais</Text>
          <View style={styles.card}>
            <View style={styles.cell}>
              <Text style={styles.cellLabel}>Nome Completo</Text>
              <Text style={styles.cellValue}>Carlos Eduardo Mendes</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.cell}>
              <Text style={styles.cellLabel}>E-mail</Text>
              <Text style={styles.cellValue}>carlos.mendes@email.com</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.cell}>
              <Text style={styles.cellLabel}>Data de Nascimento</Text>
              <Text style={styles.cellValue}>14 de Fev de 1968</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.cell}>
              <Text style={styles.cellLabel}>Celular</Text>
              <Text style={styles.cellValue}>(11) 98765-4321</Text>
            </View>
          </View>
        </View>

        {/* Card 2: Segurança */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Segurança</Text>
          <View style={styles.card}>
            <Pressable 
              style={({ pressed }) => [styles.actionRow, pressed && styles.actionRowPressed]}
              onPress={handleChangePassword}
              accessibilityRole="button"
              accessibilityLabel="Alterar sua senha"
            >
              <View style={styles.actionIconWrap}>
                <Lock size={20} color={colors.navy} />
              </View>
              <Text style={styles.actionTitle}>Alterar Senha</Text>
              <ChevronRight size={20} color={colors.placeholder} />
            </Pressable>
          </View>
        </View>

        {/* Botão de Sair */}
        <Pressable 
          style={({ pressed }) => [styles.logoutBtn, pressed && styles.logoutBtnPressed]}
          onPress={handleLogout}
          accessibilityRole="button"
          accessibilityLabel="Sair da sua conta VigiDoc"
        >
          <LogOut size={20} color={colors.critical} />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </Pressable>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    zIndex: 10,
  },
  headerInfo: {
    flex: 1,
    gap: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: SUBTITLE_COLOR,
    lineHeight: 20,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 60,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.cerulean,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: colors.white,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarInitials: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
  },
  nameHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.navy,
    marginBottom: 4,
  },
  emailHeader: {
    fontSize: 14,
    color: colors.placeholder,
    fontWeight: '400',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.placeholder,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
    marginLeft: 8,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.sandy + '30',
    overflow: 'hidden',
  },
  cell: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  cellLabel: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.placeholder,
    marginBottom: 4,
  },
  cellValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.navy,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: 20,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 12,
  },
  actionRowPressed: {
    backgroundColor: colors.iceBlue,
  },
  actionIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.iceBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.navy,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 8,
    gap: 8,
    borderRadius: 16,
    backgroundColor: colors.critical + '10',
    borderWidth: 1,
    borderColor: colors.critical + '20',
  },
  logoutBtnPressed: {
    backgroundColor: colors.critical + '20',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.critical,
  },
})
