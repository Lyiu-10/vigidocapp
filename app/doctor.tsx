import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import {
  Clock,
  ShieldCheck,
  FileText,
  Heart,
  Building2,
} from 'lucide-react-native'
import { colors } from '@/lib/constants/colors'
import { HeaderBackButton } from '@/components/shared/HeaderBackButton'

// Azul complementar para gradiente — sem token equivalente em colors.ts
const GRADIENT_END  = colors.cerulean
// Azul claro sobre navy — sem token equivalente em colors.ts
const SUBTITLE_COLOR = colors.coolHorizon

const MOCK_DOCTOR = {
  name: 'Dr. Carlos Souza',
  specialty: 'Oncologia Clínica',
  crm: '12345 - RN',
  isOnline: true,
  about:
    'Médico especialista cadastrado e verificado na plataforma VigiDoc. Acompanha seu tratamento e analisa suas medições diárias para garantir o melhor cuidado.',
}

export default function DoctorScreen() {
  const insets = useSafeAreaInsets()

  return (
    <View style={styles.root}>
      {/* 1. Header com gradiente */}
      <LinearGradient
        colors={[colors.navy, GRADIENT_END]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.header,
          { paddingTop: insets.top + 16, minHeight: insets.top + 140 },
        ]}
      >
        <HeaderBackButton />
        <View>
          <Text style={styles.headerTitle}>Meu Médico</Text>
          <Text style={styles.headerSubtitle}>Acompanhamento e monitoramento</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* 2. Card de perfil com overlap */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Text style={styles.avatarInitials}>CS</Text>
            </View>
            <View
              style={[
                styles.onlineDot,
                { backgroundColor: MOCK_DOCTOR.isOnline ? colors.esmeralda : colors.placeholder },
              ]}
            />
          </View>

          <Text style={styles.doctorName}>{MOCK_DOCTOR.name}</Text>
          <Text style={styles.doctorSpecialty}>{MOCK_DOCTOR.specialty}</Text>

          <View style={styles.crmBadge}>
            <Text style={styles.crmText}>CRM: {MOCK_DOCTOR.crm}</Text>
          </View>


        </View>



        {/* 4. Atendimento Integrado */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Building2 size={16} color={colors.cerulean} strokeWidth={2} />
            <Text style={styles.sectionTitle}>Atendimento Integrado</Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIconWrap}>
                <Clock size={20} color={colors.cerulean} strokeWidth={2} />
              </View>
              <View style={styles.infoTexts}>
                <Text style={styles.infoLabel}>ANÁLISE DE PRONTUÁRIO</Text>
                <Text style={styles.infoValue}>Acompanhamento Semanal</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIconWrap}>
                <ShieldCheck size={20} color={colors.esmeralda} strokeWidth={2} />
              </View>
              <View style={styles.infoTexts}>
                <Text style={styles.infoLabel}>VÍNCULO INSTITUCIONAL</Text>
                <Text style={styles.infoValue}>Rede Médica VigiDoc</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 5. Sobre o Profissional */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FileText size={16} color={colors.cerulean} strokeWidth={2} />
            <Text style={styles.sectionTitle}>Sobre o Profissional</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.aboutText}>{MOCK_DOCTOR.about}</Text>
          </View>
        </View>

        {/* 6. Card educativo */}
        <View style={styles.eduCard}>
          <View style={styles.sectionHeader}>
            <Heart size={18} color={colors.cerulean} strokeWidth={2} />
            <Text style={styles.sectionTitle}>Como colaborar com seu tratamento?</Text>
          </View>
          <Text style={styles.eduText}>
            Manter suas medições de sinais vitais atualizadas diariamente ajuda seu médico a
            monitorar sua evolução e tomar as melhores decisões para o seu cuidado.
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.iceBlue },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 100 },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingBottom: 32,
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
    marginTop: 4,
  },

  // Profile card
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 16,
    marginTop: -16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.sandy + '55',
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.cerulean,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.cerulean + '55',
  },
  avatarInitials: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2.5,
    borderColor: colors.white,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.navy,
  },
  doctorSpecialty: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.placeholder,
    marginTop: 2,
  },
  crmBadge: {
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: colors.iceBlue,
    borderWidth: 1,
    borderColor: colors.cerulean,
  },
  crmText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.cerulean,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 14,
  },
  verifiedText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.esmeralda,
  },

  // Action buttons
  actionsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionBtnPrimary: {
    backgroundColor: colors.cerulean,
  },
  actionBtnPrimaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  actionBtnSecondary: {
    backgroundColor: colors.iceBlue,
    borderWidth: 1.5,
    borderColor: colors.cerulean,
  },
  actionBtnSecondaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.cerulean,
  },

  // Sections
  section: { marginHorizontal: 16, marginTop: 24 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.navy,
  },

  // Info card
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.sandy + '55',
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 14,
    minHeight: 64,
  },
  infoIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.iceBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTexts: { flex: 1, gap: 2 },
  infoLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.placeholder,
    letterSpacing: 0.6,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.navy,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  aboutText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.placeholder,
    lineHeight: 22,
    padding: 18,
  },

  // Edu card
  eduCard: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 32,
    backgroundColor: colors.iceBlue,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.sandy + '55',
  },
  eduText: {
    fontSize: 14,
    color: colors.placeholder,
    lineHeight: 21,
    marginTop: 10,
  },
})
