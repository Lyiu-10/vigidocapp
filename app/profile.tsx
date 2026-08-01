import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '@/lib/constants/colors'
import { fonts } from '@/lib/constants/fonts'
import { HeaderBackButton } from '@/components/shared/HeaderBackButton'
import { User, CreditCard, LogOut, ChevronRight } from 'lucide-react-native'
import { router } from 'expo-router'

const SUBTITLE_COLOR = colors.coolHorizon

const PROFILE_MENU_ITEMS = [
  {
    id: 'personal_data',
    title: 'Dados Pessoais',
    subtitle: 'Nome, CPF, e-mail, data de nascimento, telefone e senha',
    icon: User,
    route: '/personal-data',
  },
  {
    id: 'subscription',
    title: 'Assinatura',
    subtitle: 'Plano VigiDoc Plus, pagamentos e cancelamento',
    icon: CreditCard,
    route: '/subscription',
  },
]

export default function ProfileScreen() {
  const insets = useSafeAreaInsets()

  function handleLogout() {
    Alert.alert('Sair da conta', 'Tem certeza que deseja sair do VigiDoc?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => router.replace('/(auth)/login') },
    ])
  }

  return (
    <View style={styles.root}>
      {/* ── Header ── */}
      <View
        style={[
          styles.header,
          { paddingTop: insets.top + 16, backgroundColor: colors.navy },
        ]}
      >
        <HeaderBackButton />
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Meu Perfil</Text>
          <Text style={styles.headerSubtitle}>Gerencie sua conta e configurações</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bodyZone}>
          <View style={styles.menuContainer}>
            {/* Itens de Navegação (Dados Pessoais & Assinatura) */}
            {PROFILE_MENU_ITEMS.map((item, index) => {
              const Icon = item.icon
              return (
                <View key={item.id}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.menuItem,
                      pressed && styles.menuItemPressed,
                    ]}
                    onPress={() => router.push(item.route as any)}
                    accessibilityRole="button"
                    accessibilityLabel={item.title}
                  >
                    <View style={styles.iconWrap}>
                      <Icon size={24} color={colors.navy} strokeWidth={2} />
                    </View>

                    <View style={styles.itemTextContainer}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                    </View>

                    <ChevronRight size={20} color={colors.placeholder} />
                  </Pressable>

                  <View style={styles.divider} />
                </View>
              )
            })}

            {/* Opção de Sair da Conta (Estilo idêntico com destaque crítico) */}
            <Pressable
              style={({ pressed }) => [
                styles.menuItem,
                pressed && styles.logoutItemPressed,
              ]}
              onPress={handleLogout}
              accessibilityRole="button"
              accessibilityLabel="Sair da Conta"
            >
              <View style={[styles.iconWrap, styles.logoutIconWrap]}>
                <LogOut size={24} color={colors.critical} strokeWidth={2} />
              </View>

              <View style={styles.itemTextContainer}>
                <Text style={styles.logoutTitle}>Sair da Conta</Text>
                <Text style={styles.itemSubtitle}>Desconectar da sua conta VigiDoc</Text>
              </View>

              <ChevronRight size={20} color={colors.critical + '80'} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.iceBlue,
  },

  /* ── Header ── */
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
    fontFamily: fonts.title,
    fontSize: 28,
    color: colors.white,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: SUBTITLE_COLOR,
    lineHeight: 20,
  },

  /* ── Scroll & Body ── */
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  bodyZone: {
    paddingHorizontal: 20,
  },

  /* ── Card Menu Container (Idêntico ao Mais Opções) ── */
  menuContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    marginTop: 16,
    zIndex: 1,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.sandy + '55',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  menuItemPressed: {
    backgroundColor: colors.iceBlue,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.iceBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTextContainer: {
    flex: 1,
    gap: 2,
  },
  itemTitle: {
    fontFamily: fonts.bold,
    fontSize: 17,
    color: colors.navy,
    letterSpacing: -0.2,
  },
  itemSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.placeholder,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 84,
  },

  /* ── Opção de Sair ── */
  logoutIconWrap: {
    backgroundColor: colors.critical + '12',
  },
  logoutTitle: {
    fontFamily: fonts.bold,
    fontSize: 17,
    color: colors.critical,
    letterSpacing: -0.2,
  },
  logoutItemPressed: {
    backgroundColor: colors.critical + '08',
  },
})
