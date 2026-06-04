import { Pressable, StyleSheet } from 'react-native'
import { ChevronLeft } from 'lucide-react-native'
import { router } from 'expo-router'
import { colors } from '@/lib/constants/colors'

interface Props {
  color?: string
}

export function HeaderBackButton({ color = colors.white }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, pressed && { opacity: 0.7 }]}
      onPress={() => router.back()}
      accessibilityRole="button"
      accessibilityLabel="Voltar"
    >
      <ChevronLeft size={28} color={color} strokeWidth={2.5} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  btn: {
    minWidth: 48,
    minHeight: 48,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: -4,
  },
})
