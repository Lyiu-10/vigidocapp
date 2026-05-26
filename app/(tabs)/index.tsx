import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// TODO: Implementar tela Home conforme direção em project.md
// Estrutura:
// 1. Header — Navy #002959, avatar, saudação "Bom dia, [Nome]"
// 2. CTA Principal — botão Esmeralda "Registrar Nova Medição"
// 3. Card "Seu Acompanhamento" — 7 círculos semanais
// 4. Seção "Últimas Aferições" — cards com valor, unidade, status dot

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>VigidocApp</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.placeholder}>Tela Home — em construção</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    backgroundColor: '#002959',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    fontSize: 16,
    color: '#002959',
  },
})
