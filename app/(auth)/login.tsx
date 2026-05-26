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
import { Activity, HelpCircle, X } from 'lucide-react-native'
import { colors } from '@/lib/constants/colors'
import { Input } from '@/components/ui/Input'

export default function LoginScreen() {
  const [helpVisible, setHelpVisible] = useState(false)

  const handleLogin = () => {
    router.replace('/')
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior="padding">

        {/* ── Logo ── */}
        <View style={styles.hero}>
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
          <Text style={styles.cardTitle}>Entrar na sua conta</Text>

          <View style={styles.form}>
            <Input
              label="E-mail"
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              accessibilityLabel="Campo de e-mail"
            />
            <Input
              label="Senha"
              placeholder="Sua senha"
              isPassword
              autoComplete="password"
              accessibilityLabel="Campo de senha"
            />
          </View>

          <TouchableOpacity
            style={styles.forgotWrap}
            accessibilityLabel="Recuperar senha"
            accessibilityRole="button"
          >
            <Text style={styles.forgotText}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <Pressable
            style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
            onPress={handleLogin}
            accessibilityLabel="Entrar no VigiDoc"
            accessibilityRole="button"
          >
            <Text style={styles.ctaText}>Entrar</Text>
          </Pressable>

          <View style={styles.signupRow}>
            <Text style={styles.signupLabel}>Ainda não tem conta? </Text>
            <TouchableOpacity
              accessibilityLabel="Criar conta"
              accessibilityRole="button"
            >
              <Text style={styles.signupLink}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => setHelpVisible(true)}
            accessibilityLabel="Abrir ajuda"
            accessibilityRole="button"
          >
            <HelpCircle size={15} color={colors.placeholder} strokeWidth={2} />
            <Text style={styles.helpText}>Precisa de ajuda?</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>

      {/* ── Help Modal ── */}
      <Modal
        visible={helpVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setHelpVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setHelpVisible(false)}>
          <Pressable style={styles.helpSheet}>
            <View style={styles.helpHandle} />

            <View style={styles.helpHeader}>
              <Text style={styles.helpTitle}>Como posso ajudar?</Text>
              <TouchableOpacity
                onPress={() => setHelpVisible(false)}
                style={styles.closeButton}
                accessibilityLabel="Fechar ajuda"
                accessibilityRole="button"
              >
                <X size={20} color={colors.navy} />
              </TouchableOpacity>
            </View>

            <View style={styles.helpSection}>
              <Text style={styles.helpSectionTitle}>Como me cadastrar?</Text>
              <Text style={styles.helpSectionText}>
                Toque em "Cadastre-se" abaixo do botão Entrar. Informe seu nome, e-mail e crie uma senha. O médico responsável receberá sua solicitação de acesso.
              </Text>
            </View>

            <View style={styles.helpDivider} />

            <View style={styles.helpSection}>
              <Text style={styles.helpSectionTitle}>Esqueci minha senha</Text>
              <Text style={styles.helpSectionText}>
                Toque em "Esqueci minha senha" acima do botão Entrar. Enviaremos um link de recuperação para o seu e-mail cadastrado.
              </Text>
            </View>
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
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 32,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 24,
    letterSpacing: -0.2,
  },
  form: {
    gap: 16,
    marginBottom: 12,
  },

  // Forgot
  forgotWrap: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    marginBottom: 28,
    minHeight: 48,
    justifyContent: 'center',
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.ceruleanDeep,
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

  // Signup row
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  signupLabel: {
    fontSize: 14,
    color: colors.placeholder,
    fontWeight: '400',
  },
  signupLink: {
    fontSize: 14,
    color: colors.ceruleanDeep,
    fontWeight: '700',
  },

  // Help button
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    minHeight: 48,
  },
  helpText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.placeholder,
  },

  // ── Help Modal ──
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  helpSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 12,
  },
  helpHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.placeholder,
    alignSelf: 'center',
    marginBottom: 20,
    opacity: 0.4,
  },
  helpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.navy,
  },
  closeButton: {
    minWidth: 48,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpSection: {
    gap: 6,
    paddingVertical: 4,
  },
  helpSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.navy,
  },
  helpSectionText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.ceruleanDeep,
    lineHeight: 21,
  },
  helpDivider: {
    height: 1,
    backgroundColor: colors.iceBlue,
    marginVertical: 16,
  },
})
