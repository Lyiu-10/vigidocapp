import { View, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '@/lib/constants/colors'
import { HeaderBackButton } from '@/components/shared/HeaderBackButton'

const SUBTITLE_COLOR = colors.coolHorizon

export default function HelpScreen() {
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
          <Text style={styles.headerTitle}>Ajuda / FAQ</Text>
          <Text style={styles.headerSubtitle}>Dúvidas e suporte</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.comingSoon}>Perguntas frequentes em breve...</Text>
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
    marginTop: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 32,
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
