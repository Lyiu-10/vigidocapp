import { View, Text, ScrollView, StyleSheet, Pressable, useColorScheme } from 'react-native'
import { useEffect } from 'react'
import { router } from 'expo-router'
import { colors } from '@/lib/constants/colors'
import { HomeHeader } from '@/components/home/HomeHeader'
import { PainelRotinaDiaria } from '@/components/home/PainelRotinaDiaria'
import { RecentMeasurements } from '@/components/home/RecentMeasurements'
import { TutorialHighlight } from '@/components/shared/TutorialHighlight'
import { useTutorialStore } from '@/store/tutorial.store'
import { useMeasurementStore } from '@/store/measurement.store'

// Dark mode — mover para colors.ts quando sistema de temas for formalizado
const DARK_BG = '#0F172A'

export default function HomeScreen() {
  const isDark            = useColorScheme() === 'dark'

  const _hydrated          = useTutorialStore((s) => s._hydrated)
  const homeTourCompleted  = useTutorialStore((s) => s.homeTourCompleted)
  const startTour                 = useTutorialStore((s) => s.startTour)

  useEffect(() => {
    if (!_hydrated) return
    if (!homeTourCompleted) {
      const timer = setTimeout(() => startTour('home'), 600)
      return () => clearTimeout(timer)
    }
  }, [_hydrated])

  // TODO: substituir por React Query quando API estiver disponível
  const userName      = 'Claudio Macedo'
  const dailyProgress = { completed: 3, total: 3, nextReminderTime: '22:00' }
  const measurements  = useMeasurementStore((s) => s.records)

  return (
    <View style={[styles.container, { backgroundColor: isDark ? DARK_BG : '#F8FAFC' }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header — apenas contexto, sem CTA ── */}
        <HomeHeader
          userName={userName}
          measurementCount={dailyProgress.completed}
        />

        {/* ── Overlap: PainelRotinaDiaria sobe sobre o header azul ── */}
        <View style={styles.overlapCard}>
          <TutorialHighlight tourId="home" stepIndex={0} borderRadius={24}>
            <PainelRotinaDiaria
              diasSeguidos={12}
              afericoesFeitas={dailyProgress.completed}
              afericoesTotais={dailyProgress.total}
              horarioProxima={dailyProgress.nextReminderTime}
            />
          </TutorialHighlight>
        </View>

        {/* ── Cards complementares ── */}
        <RecentMeasurements
          measurements={measurements}
          isLoading={false}
          onRefresh={() => {}}
        />
      </ScrollView>

      {/* ── CTA Flutuante ── */}
      <View style={styles.floatingCtaContainer}>
        <TutorialHighlight tourId="home" stepIndex={1} borderRadius={16}>
          <Pressable
            style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
            onPress={() => router.push('/measurement/step-1')}
            accessibilityRole="button"
            accessibilityLabel="Registrar nova medição"
          >
            <Text style={styles.ctaText}>Registrar medição</Text>
          </Pressable>
        </TutorialHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },

  /* ── Overlap: card sobe -24 sobre o header ── */
  overlapCard: {
    marginTop: -24,
    zIndex: 10,
    elevation: 10,
    paddingTop: 24,
  },

  /* ── CTA Flutuante ── */
  floatingCtaContainer: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    zIndex: 50,
  },
  cta: {
    backgroundColor: colors.cerulean,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.cerulean,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  ctaPressed: {
    opacity: 0.85,
  },
  ctaText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: 0.2,
  },

  /* ── Card padrão subsequente ── */
  standardCard: {
    marginTop: 16,
  },
})
