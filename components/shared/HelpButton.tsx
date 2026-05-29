import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useTutorialStore } from '@/store/tutorial.store'
import { colors } from '@/lib/constants/colors'
import type { TourId } from '@/store/tutorial.store'

interface HelpButtonProps {
  tourId: TourId
}

export function HelpButton({ tourId }: HelpButtonProps) {
  const startTour = useTutorialStore((s) => s.startTour)

  return (
    <Pressable
      style={({ pressed }) => [styles.touchTarget, pressed && { opacity: 0.7 }]}
      onPress={() => startTour(tourId)}
      accessibilityLabel="Ver tutorial desta tela"
      accessibilityRole="button"
    >
      <View style={styles.circle}>
        <Text style={styles.label}>?</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  touchTarget: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.iceBlue,
    borderWidth: 1.5,
    borderColor: colors.cerulean,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ceruleanDeep,
    lineHeight: 20,
  },
})
