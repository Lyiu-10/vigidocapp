import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react-native'
import { colors } from '@/lib/constants/colors'

interface InputProps extends TextInputProps {
  label: string
  error?: string
  isPassword?: boolean
}

export function Input({ label, error, isPassword = false, ...props }: InputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.container, !!error && styles.containerError]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={isPassword && !visible}
          autoCapitalize={isPassword ? 'none' : props.autoCapitalize}
          autoCorrect={false}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setVisible(v => !v)}
            style={styles.eyeButton}
            accessibilityLabel={visible ? 'Ocultar senha' : 'Mostrar senha'}
            accessibilityRole="button"
          >
            {visible
              ? <EyeOff size={20} color={colors.placeholder} />
              : <Eye size={20} color={colors.placeholder} />
            }
          </TouchableOpacity>
        )}
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.navy,
    letterSpacing: 0.1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    minHeight: 52,
  },
  containerError: {
    borderColor: colors.critical,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: colors.navy,
    paddingVertical: 14,
  },
  eyeButton: {
    padding: 8,
    minWidth: 40,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    fontSize: 13,
    color: colors.critical,
    fontWeight: '400',
  },
})
