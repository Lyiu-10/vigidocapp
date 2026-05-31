import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import type { LucideIcon } from 'lucide-react-native'
import { colors } from '@/lib/constants/colors'

interface OnboardingSlideProps {
  icon: LucideIcon
  iconColor: string
  iconFilled: boolean
  illustrationBg: string
  title: string
  body: string
}

export function OnboardingSlide({
  icon: Icon,
  iconColor,
  iconFilled,
  illustrationBg,
  title,
  body,
}: OnboardingSlideProps) {
  const { width } = useWindowDimensions()

  return (
    <View style={[styles.slide, { width }]}>
      <View style={[styles.illustrationOuter, { backgroundColor: illustrationBg }]}>
        <View style={styles.illustrationInner}>
          <Icon
            size={68}
            color={iconColor}
            fill={iconFilled ? iconColor : 'none'}
            strokeWidth={iconFilled ? 0 : 1.8}
          />
        </View>
      </View>

      <View style={styles.textArea}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 32,
  },
  illustrationOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationInner: {
    width: 148,
    height: 148,
    borderRadius: 74,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.10,
    shadowRadius: 20,
    elevation: 6,
  },
  textArea: {
    alignItems: 'center',
    gap: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.navy,
    textAlign: 'center',
    letterSpacing: -0.4,
    lineHeight: 34,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.cerulean,
    textAlign: 'center',
    lineHeight: 26,
  },
})
