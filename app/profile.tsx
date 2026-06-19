import { View, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '@/lib/constants/colors'
import { HeaderBackButton } from '@/components/shared/HeaderBackButton'

const SUBTITLE_COLOR = colors.coolHorizon

export default function ProfileScreen() {
  const insets = useSafeAreaInsets()

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
          <Text style={styles.headerSubtitle}>Dados pessoais e configurações</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitials}>CM</Text>
        </View>
        <Text style={styles.name}>Carlos Mendes</Text>
        <Text style={styles.email}>carlos.mendes@email.com</Text>

        <View style={styles.card}>
          <Text style={styles.comingSoon}>Configurações de perfil em breve...</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.iceBlue },
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
  },
  headerInfo: {
    flex: 1,
    gap: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: SUBTITLE_COLOR,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.cerulean,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: colors.white,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarInitials: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.white,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.navy,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: colors.placeholder,
    marginBottom: 32,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 32,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  comingSoon: {
    color: colors.placeholder,
    fontSize: 16,
    fontWeight: '500',
  }
})
