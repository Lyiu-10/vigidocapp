import { useRef, useCallback, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated'
import { useTutorialStore } from '@/store/tutorial.store'
import { colors } from '@/lib/constants/colors'
import type { TourId } from '@/store/tutorial.store'

interface TutorialHighlightProps {
  tourId: TourId
  stepIndex: number
  children: React.ReactNode
  borderRadius?: number
}

export function TutorialHighlight({
  tourId,
  stepIndex,
  children,
  borderRadius = 12,
}: TutorialHighlightProps) {
  const ref            = useRef<View>(null)
  const registerLayout = useTutorialStore((s) => s.registerLayout)
  const activeTour     = useTutorialStore((s) => s.activeTour)
  const currentStep    = useTutorialStore((s) => s.currentStep)

  const isActive = activeTour === tourId && currentStep === stepIndex

  const borderOpacity = useSharedValue(0)

  useEffect(() => {
    if (isActive) {
      borderOpacity.value = 1
      borderOpacity.value = withRepeat(withTiming(0.4, { duration: 600 }), -1, true)
    } else {
      cancelAnimation(borderOpacity)
      borderOpacity.value = 0
    }
    return () => {
      cancelAnimation(borderOpacity)
    }
  }, [isActive])

  const animatedBorderStyle = useAnimatedStyle(() => ({
    opacity: borderOpacity.value,
  }))

  const handleLayout = useCallback(() => {
    ref.current?.measureInWindow((x, y, width, height) => {
      if (width > 0 && height > 0) {
        registerLayout(tourId, stepIndex, { x, y, width, height })
      }
    })
  }, [tourId, stepIndex, registerLayout])

  return (
    <View
      ref={ref}
      onLayout={handleLayout}
      style={isActive ? styles.elevated : undefined}
    >
      {children}
      {isActive && (
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            styles.border,
            { borderRadius },
            animatedBorderStyle,
          ]}
          pointerEvents="none"
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  elevated: {
    zIndex: 999,
    elevation: 999,
  },
  border: {
    borderWidth: 2,
    borderColor: colors.esmeralda,
  },
})
