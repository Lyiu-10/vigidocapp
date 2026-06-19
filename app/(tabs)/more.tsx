import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { User, CreditCard, Stethoscope, HelpCircle, MessageSquare, ChevronRight } from 'lucide-react-native'
import { colors } from '@/lib/constants/colors'
import { router } from 'expo-router'

const SUBTITLE_COLOR = colors.coolHorizon

const MENU_ITEMS = [
  {
    id: 'profile',
    title: 'Meu Perfil',
    subtitle: 'Dados pessoais e configurações',
    icon: User,
    route: '/profile',
  },
  {
    id: 'subscription',
    title: 'Assinatura',
    subtitle: 'Plano, pagamentos e cancelamento',
    icon: CreditCard,
    route: '/subscription',
  },
  {
    id: 'doctor',
    title: 'Meu Médico',
    subtitle: 'Informações do seu médico',
    icon: Stethoscope,
    route: '/doctor',
  },
  {
    id: 'help',
    title: 'Ajuda / FAQ',
    subtitle: 'Dúvidas e suporte',
    icon: HelpCircle,
    route: '/help',
  },
]

export default function MoreScreen() {
  const insets = useSafeAreaInsets()

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ──────── Header ──────── */}
        <View
          style={[
            styles.header,
            { paddingTop: insets.top + 16, backgroundColor: colors.navy },
          ]}
        >
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle} accessible={true} accessibilityRole="header">
              Mais Opções
            </Text>
            <Text style={styles.headerSubtitle}>Gerencie sua conta e suporte</Text>
          </View>
        </View>

        <View style={styles.bodyZone}>
          <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item, index) => {
            const isLast = index === MENU_ITEMS.length - 1
            return (
              <View key={item.id}>
                <Pressable
                  style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
                  onPress={() => router.push(item.route as any)}
                  accessibilityRole="button"
                  accessibilityLabel={`Acessar ${item.title}`}
                >
                  <View style={styles.iconWrap}>
                    <item.icon size={22} color={colors.cerulean} strokeWidth={2} />
                  </View>
                  <View style={styles.menuTextWrap}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                  <ChevronRight size={20} color={colors.placeholder} />
                </Pressable>
                {!isLast && <View style={styles.divider} />}
              </View>
            )
          })}
        </View>
        
        {/* Banner VigiDoc */}
        <Pressable 
          style={({ pressed }) => [styles.supportBanner, pressed && styles.supportBannerPressed]}
          onPress={() => router.push('/chat')}
          accessibilityRole="button"
          accessibilityLabel="Falar com a equipe VigiDoc"
        >
          <View style={styles.supportIconWrap}>
            <MessageSquare size={24} color={colors.white} strokeWidth={2} />
          </View>
          <View style={styles.supportTextWrap}>
            <Text style={styles.supportTitle}>Falar com a VigiDoc</Text>
            <Text style={styles.supportSubtitle}>Nossa equipe está pronta para te ajudar via chat.</Text>
          </View>
        </Pressable>
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
  header: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    zIndex: 10,
    elevation: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: -0.5,
  },
  headerInfo: {
    gap: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: SUBTITLE_COLOR,
    marginTop: 4,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  bodyZone: {
    paddingHorizontal: 20,
  },
  menuContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    marginTop: -24,
    paddingTop: 24,
    zIndex: 1,
    elevation: 1,
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
  menuTextWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.navy,
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.placeholder,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: 20,
  },
  supportBanner: {
    marginTop: 24,
    backgroundColor: colors.cerulean,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: colors.cerulean,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  supportBannerPressed: {
    opacity: 0.85,
  },
  supportIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportTextWrap: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  supportSubtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 18,
  }
})
