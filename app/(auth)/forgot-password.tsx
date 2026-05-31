import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Pressable,
  Modal,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useState } from 'react'
import { Activity, ArrowLeft, CheckCircle } from 'lucide-react-native'
import { colors } from '@/lib/constants/colors'
import { Input } from '@/components/ui/Input'

export default function ForgotPasswordScreen() {
  const [successVisible, setSuccessVisible] = useState(false)

  const handleSend = () => {
    // TODO: integrar com API de recuperação de senha
    setSuccessVisible(true)
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
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recuperar senha</Text>
          <Text style={styles.cardSubtitle}>
            Informe o e-mail cadastrado. Enviaremos um link para você criar uma nova senha.
          </Text>

          <View style={styles.form}>
            <Input
              label="E-mail"
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              accessibilityLabel="Campo de e-mail para recuperação"
            />
          </View>

          <Pressable
            style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
            onPress={handleSend}
            accessibilityLabel="Enviar link de recuperação"
            accessibilityRole="button"
          >
            <Text style={styles.ctaText}>Enviar link</Text>
          </Pressable>

          <TouchableOpacity
            style={styles.backToLogin}
            onPress={() => router.back()}
            accessibilityLabel="Voltar para login"
            accessibilityRole="button"
          >
            <Text style={styles.backToLoginText}>Voltar para o login</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>

      {/* ── Modal de Confirmação ── */}
      <Modal
        visible={successVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSuccessVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setSuccessVisible(false)}>
          <Pressable style={styles.successSheet}>
            <View style={styles.successHandle} />

            <View style={styles.successIconWrap}>
              <CheckCircle size={40} color={colors.esmeralda} strokeWidth={2} />
            </View>

            <Text style={styles.successTitle}>E-mail enviado!</Text>
            <Text style={styles.successText}>
              Se esse endereço estiver cadastrado, você receberá um link de recuperação em breve. Verifique também sua caixa de spam.
            </Text>

            <Pressable
              style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed, styles.successBtn]}
              onPress={() => {
                setSuccessVisible(false)
                router.replace('/login')
              }}
              accessibilityLabel="Voltar para o login"
              accessibilityRole="button"
            >
              <Text style={styles.ctaText}>Voltar para o login</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
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
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 8,
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
    marginBottom: 32,
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

  // Back to login
  backToLogin: {
    alignItems: 'center',
    minHeight: 48,
    justifyContent: 'center',
  },
  backToLoginText: {
    fontSize: 14,
    color: colors.cerulean,
    fontWeight: '600',
  },

  // ── Modal de sucesso ──
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  successSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 12,
    alignItems: 'center',
  },
  successHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.placeholder,
    alignSelf: 'center',
    marginBottom: 24,
    opacity: 0.4,
  },
  successIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.iceBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.navy,
    marginBottom: 12,
    textAlign: 'center',
  },
  successText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.placeholder,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 28,
  },
  successBtn: {
    width: '100%',
    marginBottom: 0,
  },
})
