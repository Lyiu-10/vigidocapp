import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '@/lib/constants/colors'
import { fonts } from '@/lib/constants/fonts'
import { HeaderBackButton } from '@/components/shared/HeaderBackButton'
import { User, ShieldCheck, Mail, Calendar, Phone, Lock, ChevronRight } from 'lucide-react-native'

const SUBTITLE_COLOR = colors.coolHorizon

export default function PersonalDataScreen() {
  const insets = useSafeAreaInsets()

  function handleChangePassword() {
    Alert.alert('Em desenvolvimento', 'A funcionalidade de alterar senha estará disponível em breve.')
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
          <Text style={styles.headerTitle}>Dados Pessoais</Text>
          <Text style={styles.headerSubtitle}>Informações cadastradas e senha</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* ── Card 1: Informações Cadastradas ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INFORMAÇÕES CADASTRADAS</Text>
          <View style={styles.card}>
            {/* Nome */}
            <View style={styles.cell}>
              <View style={styles.cellIconWrap}>
                <User size={18} color={colors.navy} />
              </View>
              <View style={styles.cellTextWrap}>
                <Text style={styles.cellLabel}>Nome Completo</Text>
                <Text style={styles.cellValue}>Carlos Eduardo Mendes</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* CPF */}
            <View style={styles.cell}>
              <View style={styles.cellIconWrap}>
                <ShieldCheck size={18} color={colors.navy} />
              </View>
              <View style={styles.cellTextWrap}>
                <Text style={styles.cellLabel}>CPF</Text>
                <Text style={styles.cellValue}>***.458.912-**</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* E-mail */}
            <View style={styles.cell}>
              <View style={styles.cellIconWrap}>
                <Mail size={18} color={colors.navy} />
              </View>
              <View style={styles.cellTextWrap}>
                <Text style={styles.cellLabel}>E-mail</Text>
                <Text style={styles.cellValue}>carlos.mendes@email.com</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Data de Nascimento */}
            <View style={styles.cell}>
              <View style={styles.cellIconWrap}>
                <Calendar size={18} color={colors.navy} />
              </View>
              <View style={styles.cellTextWrap}>
                <Text style={styles.cellLabel}>Data de Nascimento</Text>
                <Text style={styles.cellValue}>14 de Fevereiro de 1968</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Celular */}
            <View style={styles.cell}>
              <View style={styles.cellIconWrap}>
                <Phone size={18} color={colors.navy} />
              </View>
              <View style={styles.cellTextWrap}>
                <Text style={styles.cellLabel}>Número de Telefone</Text>
                <Text style={styles.cellValue}>(11) 98765-4321</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── Card 2: Segurança / Alterar Senha ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SEGURANÇA</Text>
          <View style={styles.card}>
            <Pressable
              style={({ pressed }) => [styles.actionRow, pressed && styles.actionRowPressed]}
              onPress={handleChangePassword}
              accessibilityRole="button"
              accessibilityLabel="Alterar sua senha de acesso"
            >
              <View style={styles.cellIconWrap}>
                <Lock size={18} color={colors.navy} />
              </View>
              <Text style={styles.actionTitle}>Alterar Senha de Acesso</Text>
              <ChevronRight size={18} color={colors.placeholder} />
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 60,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.placeholder,
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 6,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.sandy + '40',
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  cellIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.iceBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellTextWrap: {
    flex: 1,
    gap: 2,
  },
  cellLabel: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.placeholder,
  },
  cellValue: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.navy,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 64,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 12,
  },
  actionRowPressed: {
    backgroundColor: colors.iceBlue,
  },
  actionTitle: {
    flex: 1,
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.navy,
  },
})
