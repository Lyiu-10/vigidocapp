import { View, Text, Pressable, Modal, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Settings, LogOut, ChevronRight } from 'lucide-react-native'
import { useState } from 'react'
import { colors } from '@/lib/constants/colors'

const HEADER_HEIGHT = 56

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

interface AppHeaderProps {
  userName: string
  userEmail: string
  currentTheme: 'light' | 'dark'
  onThemeChange: (theme: 'light' | 'dark') => void
  onSettingsPress: () => void
  onLogout: () => void
}

export function AppHeader({
  userName,
  userEmail,
  currentTheme,
  onThemeChange,
  onSettingsPress,
  onLogout,
}: AppHeaderProps) {
  const insets = useSafeAreaInsets()
  const [sheetVisible, setSheetVisible] = useState(false)
  const initials = getInitials(userName)

  function closeSheet() {
    setSheetVisible(false)
  }

  return (
    <>
      {/* ── Barra superior ── */}
      <View
        style={[
          styles.header,
          { paddingTop: insets.top, height: HEADER_HEIGHT + insets.top },
        ]}
      >
        <Text style={styles.logoText}>
          Vigi<Text style={styles.logoBold}>Doc</Text>
        </Text>

        <Pressable
          style={({ pressed }) => [styles.avatarTouchable, pressed && { opacity: 0.8 }]}
          onPress={() => setSheetVisible(true)}
          accessibilityLabel="Abrir perfil"
          accessibilityRole="button"
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
        </Pressable>
      </View>

      {/* ── Bottom sheet de perfil ── */}
      <Modal
        visible={sheetVisible}
        transparent
        animationType="slide"
        onRequestClose={closeSheet}
      >
        {/*
          Outer Pressable = backdrop semitransparente — fecha o sheet
          Inner Pressable = sheet — onPress vazio captura o toque e impede
          que ele chegue ao backdrop
        */}
        <Pressable style={styles.overlay} onPress={closeSheet}>
          <Pressable style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]} onPress={() => {}}>

            {/* Alça */}
            <View style={styles.handle} />

            {/* Seção usuário */}
            <View style={styles.userSection}>
              <View style={styles.avatarLarge}>
                <Text style={styles.avatarLargeText}>{initials}</Text>
              </View>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userEmail}>{userEmail}</Text>
              <View style={styles.roleBadge}>
                <Text style={styles.roleText}>Paciente</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Seção tema */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>APARÊNCIA</Text>
              <View style={styles.themeToggle}>
                <Pressable
                  style={[styles.themeBtn, currentTheme === 'light' && styles.themeBtnActive]}
                  onPress={() => onThemeChange('light')}
                  accessibilityRole="button"
                  accessibilityLabel="Tema claro"
                  accessibilityState={{ selected: currentTheme === 'light' }}
                >
                  <Text
                    style={[
                      styles.themeBtnText,
                      currentTheme === 'light' && styles.themeBtnTextActive,
                    ]}
                  >
                    ☀ Claro
                  </Text>
                </Pressable>

                <Pressable
                  style={[styles.themeBtn, currentTheme === 'dark' && styles.themeBtnActive]}
                  onPress={() => onThemeChange('dark')}
                  accessibilityRole="button"
                  accessibilityLabel="Tema escuro"
                  accessibilityState={{ selected: currentTheme === 'dark' }}
                >
                  <Text
                    style={[
                      styles.themeBtnText,
                      currentTheme === 'dark' && styles.themeBtnTextActive,
                    ]}
                  >
                    🌙 Escuro
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Seção ações */}
            <View style={styles.section}>
              <Pressable
                style={({ pressed }) => [styles.actionItem, pressed && { opacity: 0.7 }]}
                onPress={() => { closeSheet(); onSettingsPress() }}
                accessibilityRole="button"
                accessibilityLabel="Configurações da Conta"
              >
                <Settings size={18} color={colors.navy} strokeWidth={2} />
                <Text style={styles.actionLabel}>Configurações da Conta</Text>
                <ChevronRight size={16} color={colors.placeholder} strokeWidth={2} />
              </Pressable>

              <Pressable
                style={({ pressed }) => [styles.actionItem, pressed && { opacity: 0.7 }]}
                onPress={() => { closeSheet(); onLogout() }}
                accessibilityRole="button"
                accessibilityLabel="Sair da conta"
              >
                <LogOut size={18} color={colors.critical} strokeWidth={2} />
                <Text style={[styles.actionLabel, styles.actionLabelDanger]}>Sair</Text>
              </Pressable>
            </View>

            {/* Versão */}
            <Text style={styles.version}>v2.6.0 Beta</Text>

          </Pressable>
        </Pressable>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: colors.navy,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.white,
    letterSpacing: -0.3,
  },
  logoBold: {
    fontWeight: '800',
  },
  avatarTouchable: {
    minWidth: 48,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.cerulean,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: 0.5,
  },

  // ── Modal / overlay ──
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 24,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: 24,
  },

  // ── Seção usuário ──
  userSection: {
    alignItems: 'center',
    gap: 6,
    marginBottom: 24,
  },
  avatarLarge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.cerulean,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  avatarLargeText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: 0.5,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.navy,
  },
  userEmail: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.placeholder,
  },
  roleBadge: {
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    backgroundColor: colors.iceBlue,
  },
  roleText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.cerulean,
  },

  // ── Layout interno ──
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 20,
  },
  section: {
    gap: 10,
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.placeholder,
    letterSpacing: 0.8,
  },

  // ── Toggle de tema ──
  themeToggle: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  themeBtn: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.iceBlue,
  },
  themeBtnActive: {
    backgroundColor: colors.navy,
  },
  themeBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.placeholder,
  },
  themeBtnTextActive: {
    color: colors.white,
    fontWeight: '600',
  },

  // ── Ações ──
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 48,
  },
  actionLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '400',
    color: colors.navy,
  },
  actionLabelDanger: {
    color: colors.critical,
  },

  // ── Versão ──
  version: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '400',
    color: colors.placeholder,
    marginTop: 8,
  },
})
