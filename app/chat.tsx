import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { useState, useRef } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { Send } from 'lucide-react-native'
import { colors } from '@/lib/constants/colors'
import { HeaderBackButton } from '@/components/shared/HeaderBackButton'

const GRADIENT_END = '#0A4A82'

interface Message {
  id: string
  text: string
  from: 'user' | 'support'
  time: string
}

function formatTime(date: Date) {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Olá! 👋 Bem-vindo ao suporte VigiDoc. Como podemos te ajudar hoje?',
    from: 'support',
    time: formatTime(new Date()),
  },
]

export default function ChatScreen() {
  const insets = useSafeAreaInsets()
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const scrollRef = useRef<ScrollView>(null)

  function handleSend() {
    const text = input.trim()
    if (!text) return

    const newMsg: Message = {
      id: String(Date.now()),
      text,
      from: 'user',
      time: formatTime(new Date()),
    }

    setMessages(prev => [...prev, newMsg])
    setInput('')
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100)
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <LinearGradient
        colors={[colors.navy, GRADIENT_END]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 16 }]}
      >
        <HeaderBackButton />
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Suporte VigiDoc</Text>
          <View style={styles.onlineRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Online agora</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Mensagens */}
      <ScrollView
        ref={scrollRef}
        style={styles.messageList}
        contentContainerStyle={[styles.messageContent, { paddingBottom: 16 }]}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
      >
        {messages.map(msg => (
          <View
            key={msg.id}
            style={[
              styles.bubbleWrap,
              msg.from === 'user' ? styles.bubbleWrapUser : styles.bubbleWrapSupport,
            ]}
          >
            {msg.from === 'support' && (
              <View style={styles.supportAvatar}>
                <Text style={styles.supportAvatarText}>V</Text>
              </View>
            )}
            <View
              style={[
                styles.bubble,
                msg.from === 'user' ? styles.bubbleUser : styles.bubbleSupport,
              ]}
              accessible
              accessibilityLabel={`${msg.from === 'user' ? 'Você' : 'Suporte'}: ${msg.text}`}
            >
              <Text
                style={[
                  styles.bubbleText,
                  msg.from === 'user' ? styles.bubbleTextUser : styles.bubbleTextSupport,
                ]}
              >
                {msg.text}
              </Text>
              <Text style={[styles.bubbleTime, msg.from === 'user' && styles.bubbleTimeUser]}>
                {msg.time}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={[styles.inputBar, { paddingBottom: insets.bottom + 8 }]}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Digite sua mensagem..."
          placeholderTextColor={colors.placeholder}
          multiline
          maxLength={500}
          accessibilityLabel="Campo de mensagem"
          returnKeyType="send"
          onSubmitEditing={handleSend}
        />
        <Pressable
          style={({ pressed }) => [styles.sendBtn, pressed && { opacity: 0.75 }, !input.trim() && styles.sendBtnDisabled]}
          onPress={handleSend}
          disabled={!input.trim()}
          accessibilityRole="button"
          accessibilityLabel="Enviar mensagem"
        >
          <Send size={20} color={colors.white} strokeWidth={2.5} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.iceBlue,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  onlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.esmeralda,
  },
  onlineText: {
    fontSize: 13,
    color: '#B0C4DE',
    fontWeight: '500',
  },

  // Mensagens
  messageList: {
    flex: 1,
  },
  messageContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  bubbleWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  bubbleWrapUser: {
    justifyContent: 'flex-end',
  },
  bubbleWrapSupport: {
    justifyContent: 'flex-start',
  },
  supportAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.cerulean,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  supportAvatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  bubbleUser: {
    backgroundColor: colors.cerulean,
    borderBottomRightRadius: 4,
  },
  bubbleSupport: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bubbleText: {
    fontSize: 15,
    lineHeight: 21,
  },
  bubbleTextUser: {
    color: colors.white,
    fontWeight: '500',
  },
  bubbleTextSupport: {
    color: colors.navy,
    fontWeight: '400',
  },
  bubbleTime: {
    fontSize: 11,
    color: colors.placeholder,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  bubbleTimeUser: {
    color: 'rgba(255,255,255,0.7)',
  },

  // Input bar
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    backgroundColor: colors.iceBlue,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.navy,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.cerulean,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.cerulean,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  sendBtnDisabled: {
    backgroundColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
})
