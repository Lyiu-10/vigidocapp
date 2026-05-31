import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useRef, useState, useEffect } from 'react'
import { Heart, Activity, BarChart3, Stethoscope } from 'lucide-react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated'
import { colors } from '@/lib/constants/colors'
import { secureStorage } from '@/lib/storage/secureStorage'
import { OnboardingSlide } from '@/components/onboarding/OnboardingSlide'
import type { LucideIcon } from 'lucide-react-native'

interface SlideData {
  id: string
  icon: LucideIcon
  iconColor: string
  iconFilled: boolean
  illustrationBg: string
  title: string
  body: string
}

const SLIDES: SlideData[] = [
  {
    id: '1',
    icon: Heart,
    iconColor: colors.esmeralda,
    iconFilled: true,
    illustrationBg: '#D9F5EC',
    title: 'Bem-vindo ao VigiDoc',
    body: 'Seu companheiro de saúde em casa. Feito com carinho para acompanhar você durante o tratamento.',
  },
  {
    id: '2',
    icon: Activity,
    iconColor: colors.cerulean,
    iconFilled: false,
    illustrationBg: '#D6EBF5',
    title: 'Registre suas medições',
    body: 'Pressão, temperatura, saturação e muito mais. Simples de registrar com apenas alguns toques.',
  },
  {
    id: '3',
    icon: BarChart3,
    iconColor: colors.cerulean,
    iconFilled: false,
    illustrationBg: '#DAE8F5',
    title: 'Acompanhe sua evolução',
    body: 'Veja como você está evoluindo com um histórico claro e organizado. Sua saúde em um só lugar.',
  },
  {
    id: '4',
    icon: Stethoscope,
    iconColor: colors.navy,
    iconFilled: false,
    illustrationBg: '#D8E3F0',
    title: 'Conectado ao seu médico',
    body: 'Seu médico acompanha suas medições. Você nunca está sozinho nessa jornada.',
  },
]

export default function OnboardingScreen() {
  const { width } = useWindowDimensions()
  const flatListRef = useRef<FlatList<SlideData>>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const isLast = currentIndex === SLIDES.length - 1

  function handleMomentumScrollEnd(event: { nativeEvent: { contentOffset: { x: number } } }) {
    const index = Math.round(event.nativeEvent.contentOffset.x / width)
    setCurrentIndex(index)
  }

  async function completeOnboarding() {
    await secureStorage.set('onboarding_completed', 'true')
    router.replace('/(tabs)')
  }

  function handleNext() {
    if (isLast) {
      completeOnboarding()
      return
    }
    flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true })
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* ── Logo ── */}
      <View style={styles.logoRow}>
        <Text style={styles.logoText}>
          Vigi<Text style={styles.logoTextBold}>Doc</Text>
        </Text>
      </View>

      {/* ── Slides ── */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OnboardingSlide
            icon={item.icon}
            iconColor={item.iconColor}
            iconFilled={item.iconFilled}
            illustrationBg={item.illustrationBg}
            title={item.title}
            body={item.body}
          />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        bounces={false}
        style={styles.list}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      {/* ── Controls ── */}
      <View style={styles.controls}>
        <View
          style={styles.dotsRow}
          accessibilityLabel={`Passo ${currentIndex + 1} de ${SLIDES.length}`}
          accessibilityRole="progressbar"
        >
          {SLIDES.map((_, i) => (
            <DotItem key={i} index={i} currentIndex={currentIndex} />
          ))}
        </View>

        <Pressable
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          onPress={handleNext}
          accessibilityLabel={isLast ? 'Começar a usar o VigiDoc' : 'Ir para o próximo passo'}
          accessibilityRole="button"
        >
          <Text style={styles.ctaText}>{isLast ? 'Começar' : 'Próximo'}</Text>
        </Pressable>

        {!isLast ? (
          <TouchableOpacity
            style={styles.skipWrap}
            onPress={completeOnboarding}
            accessibilityLabel="Pular apresentação"
            accessibilityRole="button"
          >
            <Text style={styles.skipText}>Pular</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.skipPlaceholder} />
        )}
      </View>
    </SafeAreaView>
  )
}

function DotItem({ index, currentIndex }: { index: number; currentIndex: number }) {
  const progress = useSharedValue(index === 0 ? 1 : 0)

  useEffect(() => {
    progress.value = withTiming(index === currentIndex ? 1 : 0, { duration: 250 })
  }, [index, currentIndex])

  const animStyle = useAnimatedStyle(() => ({
    width: interpolate(progress.value, [0, 1], [8, 24]),
    opacity: interpolate(progress.value, [0, 1], [0.35, 1]),
  }))

  return <Animated.View style={[styles.dot, animStyle]} />
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },

  // ── Logo ──
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 4,
  },
  logoIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.navy,
    letterSpacing: -0.3,
  },
  logoTextBold: {
    fontWeight: '800',
  },

  // ── Slides ──
  list: {
    flex: 1,
  },

  // ── Controls ──
  controls: {
    paddingHorizontal: 24,
    paddingBottom: 12,
    alignItems: 'center',
    gap: 16,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    height: 24,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.navy,
  },
  cta: {
    backgroundColor: colors.cerulean,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: colors.cerulean,
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
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  skipWrap: {
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  skipPlaceholder: {
    height: 48,
  },
  skipText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.placeholder,
  },
})
