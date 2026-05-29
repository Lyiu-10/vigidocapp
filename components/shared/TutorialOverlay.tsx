import { View, Text, Pressable, StyleSheet, useWindowDimensions } from 'react-native'
import { useTutorialStore } from '@/store/tutorial.store'
import { HOME_TOUR_STEPS, MEASUREMENT_TOUR_STEPS } from '@/lib/constants/tours'
import { colors } from '@/lib/constants/colors'

const DARK_BG      = 'rgba(0, 0, 0, 0.65)'
const SCREEN_MARGIN = 16
const ARROW_SIZE    = 10

export function TutorialOverlay() {
  const { width: sw, height: sh } = useWindowDimensions()

  const activeTour  = useTutorialStore((s) => s.activeTour)
  const currentStep = useTutorialStore((s) => s.currentStep)
  const layouts     = useTutorialStore((s) => s.layouts)
  const nextStep    = useTutorialStore((s) => s.nextStep)
  const skipTour    = useTutorialStore((s) => s.skipTour)

  if (!activeTour) return null

  const steps  = activeTour === 'home' ? HOME_TOUR_STEPS : MEASUREMENT_TOUR_STEPS
  const step   = steps[currentStep]
  const layout = layouts[`${activeTour}:${currentStep}`]
  const isLast = currentStep === steps.length - 1

  if (!step) return null

  const handleNext = () => nextStep(steps.length)

  // Fallback rect when element layout not yet registered
  const rect = layout ?? {
    x: sw * 0.1,
    y: sh * 0.4,
    width: sw * 0.8,
    height: 60,
  }

  // Show tooltip below element when it's in the top half, above otherwise
  const showBelow = rect.y < sh * 0.55

  // Arrow horizontal center: clamp within tooltip
  const elementCenterX  = rect.x + rect.width / 2
  const arrowRawLeft    = elementCenterX - SCREEN_MARGIN - ARROW_SIZE
  const tooltipMaxWidth = sw - SCREEN_MARGIN * 2
  const arrowLeft       = Math.max(8, Math.min(arrowRawLeft, tooltipMaxWidth - ARROW_SIZE * 2 - 8))

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">

      {/* ── Dark panels (hole-punch around highlighted element) ── */}
      <View style={[styles.dark, { top: 0, left: 0, right: 0, height: Math.max(0, rect.y) }]} />
      <View style={[styles.dark, { top: rect.y + rect.height, left: 0, right: 0, bottom: 0 }]} />
      <View style={[styles.dark, { top: rect.y, left: 0, width: Math.max(0, rect.x), height: rect.height }]} />
      <View style={[styles.dark, { top: rect.y, left: rect.x + rect.width, right: 0, height: rect.height }]} />

      {/* ── Tooltip ── */}
      <View
        style={[
          styles.tooltip,
          showBelow
            ? { top: rect.y + rect.height + ARROW_SIZE + 4, left: SCREEN_MARGIN, right: SCREEN_MARGIN }
            : { bottom: sh - rect.y + ARROW_SIZE + 4, left: SCREEN_MARGIN, right: SCREEN_MARGIN },
        ]}
      >
        {/* Arrow up (tooltip below element) */}
        {showBelow && (
          <View style={[styles.arrowUp, { left: arrowLeft }]} />
        )}

        {/* Step indicator */}
        <Text style={styles.stepIndicator}>
          {currentStep + 1} de {steps.length}
        </Text>

        <Text style={styles.title}>{step.title}</Text>
        <Text style={styles.description}>{step.description}</Text>

        <View style={styles.actions}>
          {/* Pular — sempre visível */}
          <Pressable
            style={({ pressed }) => [styles.skipBtn, pressed && { opacity: 0.7 }]}
            onPress={skipTour}
            accessibilityLabel="Pular tutorial"
            accessibilityRole="button"
          >
            <Text style={styles.skipText}>Pular</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.nextBtn, pressed && { opacity: 0.85 }]}
            onPress={handleNext}
            accessibilityLabel={isLast ? 'Finalizar tutorial' : 'Próximo passo'}
            accessibilityRole="button"
          >
            <Text style={styles.nextText}>{isLast ? 'Entendi!' : 'Próximo'}</Text>
          </Pressable>
        </View>

        {/* Arrow down (tooltip above element) */}
        {!showBelow && (
          <View style={[styles.arrowDown, { left: arrowLeft }]} />
        )}
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  dark: {
    position: 'absolute',
    backgroundColor: DARK_BG,
  },

  tooltip: {
    position: 'absolute',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 16,
  },

  arrowUp: {
    position: 'absolute',
    top: -ARROW_SIZE,
    width: 0,
    height: 0,
    borderLeftWidth: ARROW_SIZE,
    borderRightWidth: ARROW_SIZE,
    borderBottomWidth: ARROW_SIZE,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.white,
  },

  arrowDown: {
    position: 'absolute',
    bottom: -ARROW_SIZE,
    width: 0,
    height: 0,
    borderLeftWidth: ARROW_SIZE,
    borderRightWidth: ARROW_SIZE,
    borderTopWidth: ARROW_SIZE,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.white,
  },

  stepIndicator: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.placeholder,
    marginBottom: 8,
    letterSpacing: 0.4,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.navy,
    marginBottom: 8,
    letterSpacing: -0.2,
  },

  description: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.navy,
    lineHeight: 22,
    marginBottom: 20,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  skipBtn: {
    minHeight: 48,
    minWidth: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  skipText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.placeholder,
  },

  nextBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.esmeralda,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.navy,
  },
})
