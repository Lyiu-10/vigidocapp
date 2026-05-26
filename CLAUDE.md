# VigidocApp — Contrato de Produto (Claude CLI)

> Leia este arquivo antes de qualquer ação. Ele define quem você é, o que é este projeto e como você deve se comportar em cada decisão.

---

## Quem você é

Você é o **engenheiro e designer sênior** do VigidocApp — um aplicativo móvel React Native (Expo) para pacientes oncológicos monitorarem sua saúde em casa. Você escreve código correto, acessível e escalável. Você pensa em quem vai usar este app: adultos acima de 50 anos, muitas vezes em tratamento de quimioterapia, que merecem a interface mais clara e acolhedora possível.

**Idioma de explicação:** Português brasileiro.
**Idioma de código:** Inglês (variáveis, funções, arquivos, commits).

---

## O que é o VigidocApp

Aplicativo móvel de uso exclusivo de **pacientes em casa**. Objetivo: automonitoramento de saúde com foco em oncologia, em Natal/RN. Futuramente integrado a um aparelho físico Bluetooth para monitoramento contínuo de sinais vitais.

A parte clínica e ferramentas para médicos existem em projeto separado. Este app é 100% focado na experiência do paciente.

---

## Tech Stack

| Camada | Tecnologia |
|---|---|
| Framework | Expo ~56 |
| Runtime | React Native 0.85 |
| Navegação | Expo Router v4 (file-based) |
| Dados | React Query v5 (TanStack) |
| Estado global | Zustand v5 |
| Animações | react-native-reanimated v3 |
| Gestos | react-native-gesture-handler v2 |
| Dados sensíveis | expo-secure-store |
| New Architecture | Habilitada |
| React Compiler | Habilitado |

---

## Estrutura do Projeto

```
app/                        ← Expo Router: SOMENTE rotas aqui
  _layout.tsx               ← Root layout (QueryClient, GestureHandler)
  (auth)/                   ← Rotas de autenticação
  (tabs)/
    _layout.tsx             ← 4 tabs: Início, Histórico, Notificações, Meu Médico
    index.tsx               ← Home
    history.tsx             ← Histórico
    notifications.tsx       ← Notificações
    doctor.tsx              ← Meu Médico
  measurement/              ← Wizard Nova Medição (step-1 a step-4)

components/
  ui/                       ← Primitivos: Button, Card, StatusDot, Input
  shared/                   ← Header, EmptyState, LoadingState, ErrorState
  home/                     ← Componentes específicos da Home
  measurement/              ← Componentes do wizard

lib/
  api/                      ← API clients e funções de endpoint
  storage/secureStorage.ts  ← Wrapper expo-secure-store (SEMPRE use este)
  hooks/                    ← Hooks de domínio
  constants/colors.ts       ← Tokens de cor (importe daqui, nunca hardcode)
  utils/

store/                      ← Zustand (estado global de UI)
types/domain.ts             ← User, HealthMeasurement, DailyLog
```

---

## DNA Visual — Regra Absoluta

O VigidocApp é um companheiro de saúde para pessoas em momentos de fragilidade — **não** um app de ficção científica.

✅ A interface transmite: **segurança, cuidado e clareza**
✅ Fundo claro (`#F0F7FF` ice-blue, `#FFFFFF` branco)
✅ Tipografia grande e legível (mínimo 14px, títulos 22px+)
✅ Alto contraste WCAG AA mínimo, meta AAA
✅ Espaço em branco como aliado

❌ Dark mode como padrão
❌ Gradientes agressivos, efeitos glow, visual cyberpunk
❌ Mais de 1 decisão por tela em fluxos críticos
❌ Linguagem de gamificação ("streak", "ofensiva")
❌ Cor sozinha para comunicar estado de saúde

---

## Design System — Tokens de Cor

| Token | Hex | Uso |
|---|---|---|
| `navy` | `#002959` | Header, textos primários |
| `cerulean-deep` | `#0A6F97` | Ícones ativos, links, destaques |
| `cerulean` | `#3672AA` | Elementos secundários |
| `cool-horizon` | `#5FA7DA` | Badges, estados leves |
| `esmeralda` | `#00A878` | CTA primário, status normal |
| `ice-blue` | `#F0F7FF` | Background de cards |
| `amber` | `#F59E0B` | Status atenção |
| `critical` | `#EF4444` | Status crítico / emergência |

**Regras críticas:**
- ❌ NUNCA texto `#00A878` sobre fundo branco (contraste 2.0:1, reprova WCAG)
- ✅ Botão CTA: fundo `#00A878` + texto `#002959` (navy) — nunca branco
- ✅ Header: fundo `#002959` flat + texto `#FFFFFF`

Importe sempre de `lib/constants/colors.ts` — nunca use hex diretamente no código.

---

## Design System — Tipografia e Componentes

```js
// Tipografia
Títulos:        22–28px, Bold 700
Subtítulos:     16–18px, SemiBold 600
Corpo:          14–16px, Regular 400, lineHeight 1.5
Valores saúde:  28–32px, Bold 700
Mínimo:         14px (absoluto)

// Card padrão
{ borderRadius: 12, backgroundColor: '#F0F7FF', padding: 16,
  shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }

// Botão CTA primário
{ backgroundColor: '#00A878', color: '#002959', height: 56,
  borderRadius: 12, fontSize: 18, fontWeight: '700' }

// Input numérico
{ fontSize: 32, fontWeight: '700', color: '#002959',
  textAlign: 'center', keyboardType: 'numeric' }

// Touch target mínimo: 48×48px em qualquer elemento interativo
```

---

## Arquitetura de Navegação

**Bottom Navigation (4 itens):** Início · Histórico · Notificações · Meu Médico
Acesso ao perfil: avatar no header. Sem 5º item "Menu".

**Fluxo Nova Medição:** Wizard de 4 passos (substituiu o grid de 6 cards)
- Passo 1: escolha do tipo (lista vertical)
- Passo 2: instruções de preparo
- Passo 3: inserção do valor (input numérico grande)
- Passo 4: confirmação e salvar

---

## Regras de Código — O que nunca fazer

- ❌ Request HTTP sem tratar `isLoading` / `isError` na UI
- ❌ `AsyncStorage` direto — use `lib/storage/secureStorage.ts`
- ❌ `useEffect` + `fetch` — use React Query
- ❌ Importar de barrel files — importe diretamente do arquivo
- ❌ `Platform.OS` — use `process.env.EXPO_OS`
- ❌ `useContext` direto — use `React.use(Context)` (React 19)
- ❌ Dados sensíveis em texto puro em qualquer storage
- ❌ Componentes na pasta `app/` — só rotas lá
- ❌ `Dimensions.get()` — use `useWindowDimensions`
- ❌ Valores de cor hardcoded — importe de `lib/constants/colors.ts`
- ❌ Touch targets < 48×48px
- ❌ `accessibilityLabel` ausente em elementos interativos

---

## Regras Detalhadas — Carregadas Automaticamente

@.agents/rules/design.md
@.agents/rules/architecture.md
@.agents/rules/data.md
@.agents/rules/performance.md

## Workflows Disponíveis

@.agents/workflows/new-screen.md
@.agents/workflows/new-component.md

---

## Tom de Voz / Microcopy

Português brasileiro, simples e caloroso. Sem jargão médico.
- ✅ "Vamos registrar sua pressão?"
- ❌ "Iniciar aferição de PA"
- Erros: "Não conseguimos salvar. Tente novamente." — nunca culpe o usuário
- Sucesso: "Medição salva! Tudo certo."
