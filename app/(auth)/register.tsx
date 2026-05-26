import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Activity, ArrowLeft } from 'lucide-react-native'
import { colors } from '@/lib/constants/colors'
import { Input } from '@/components/ui/Input'

export default function RegisterScreen() {
  const handleRegister = () => {
    // TODO: integrar com API de cadastro
    router.replace('/')
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior="padding">

        {/* ── Logo ── */}
        <View style={styles.hero}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityLabel="Voltar para login"
            accessibilityRole="button"
          >
            <ArrowLeft size={20} color={colors.navy} strokeWidth={2.5} />
          </Pressable>

          <View style={styles.logoRow}>
            <View style={styles.logoIconWrap}>
              <Activity size={18} color={colors.esmeralda} strokeWidth={2.5} />
            </View>
            <Text style={styles.logoText}>
              Vigi<Text style={styles.logoTextBold}>Doc</Text>
            </Text>
          </View>
        </View>

        {/* ── Form Card ── */}
        <ScrollView
          style={styles.cardScroll}
          contentContainerStyle={styles.card}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.cardTitle}>Criar sua conta</Text>
          <Text style={styles.cardSubtitle}>
            Preencha os dados abaixo. Seu médico receberá a solicitação de acesso.
          </Text>

          <View style={styles.form}>
            <Input
              label="Nome completo"
              placeholder="Seu nome completo"
              autoCapitalize="words"
              autoComplete="name"
              accessibilityLabel="Campo de nome completo"
            />
            <Input
              label="E-mail"
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              accessibilityLabel="Campo de e-mail"
            />
            <Input
              label="Telefone"
              placeholder="(00) 00000-0000"
              keyboardType="phone-pad"
              autoComplete="tel"
              accessibilityLabel="Campo de telefone"
            />
            <Input
              label="Senha"
              placeholder="Crie uma senha"
              isPassword
              autoComplete="new-password"
              accessibilityLabel="Campo de senha"
            />
            <Input
              label="Confirmar senha"
              placeholder="Repita a senha"
              isPassword
              autoComplete="new-password"
              accessibilityLabel="Campo de confirmação de senha"
            />
          </View>

          <Pressable
            style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
            onPress={handleRegister}
            accessibilityLabel="Criar conta no VigiDoc"
            accessibilityRole="button"
          >
            <Text style={styles.ctaText}>Criar conta</Text>
          </Pressable>

          <View style={styles.loginRow}>
            <Text style={styles.loginLabel}>Já tem conta? </Text>
            <TouchableOpacity
              onPress={() => router.back()}
              accessibilityLabel="Ir para login"
              accessibilityRole="button"
            >
              <Text style={styles.loginLink}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.iceBlue,
  },
  flex: { flex: 1 },

  // ── Logo ──
  hero: {
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    marginLeft: -6,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logoIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 26,
    fontWeight: '400',
    color: colors.navy,
    letterSpacing: -0.3,
  },
  logoTextBold: {
    fontWeight: '800',
  },

  // ── Form Card ──
  cardScroll: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 8,
  },
  card: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.navy,
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.placeholder,
    marginBottom: 24,
    lineHeight: 20,
  },
  form: {
    gap: 16,
    marginBottom: 28,
  },

  // CTA
  cta: {
    backgroundColor: colors.esmeralda,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: colors.esmeralda,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  ctaText: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // Login row
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginLabel: {
    fontSize: 14,
    color: colors.placeholder,
    fontWeight: '400',
  },
  loginLink: {
    fontSize: 14,
    color: colors.ceruleanDeep,
    fontWeight: '700',
  },
})
