# VigidocApp — Contrato de Produto

> **Leia este arquivo primeiro.** É o contrato de produto que todo agente deve entender antes de escrever uma linha de código, tomar uma decisão de design ou nomear qualquer variável.

---

## O que é o VigidocApp?

O **VigidocApp** é um aplicativo móvel de uso exclusivo de **pacientes em suas casas**. O objetivo central é o **automonitoramento** da saúde do paciente, garantindo que ele se sinta cuidado, protegido e amparado — daí o nome VigiDoc.

Toda a parte clínica ou ferramentas para médicos existem em um projeto separado. O foco deste app é única e exclusivamente a **experiência do paciente**.

**Contexto de saúde:** Foco em oncologia, Natal/RN. Parte dos usuários está em tratamento de quimioterapia — o que pode causar névoa cognitiva, fadiga e dificuldade de concentração. A interface deve ser a coisa mais simples e clara possível.

Futuramente, o VigidocApp será integrado a um **aparelho físico Bluetooth** que monitorará o paciente continuamente. A fundação do app atual deve estar preparada para receber sinais vitais em curtos intervalos.

---

## Personas

| Persona | Contexto de uso | Necessidade principal |
|---|---|---|
| **Paciente Doméstico** | Em casa, ao longo do dia, geralmente em repouso | Registrar medições rapidamente e sem erro, sentir que está sendo cuidado |
| **Perfil Etário Principal** | Adultos 50+, muitos acima de 65 anos | Interface de alto contraste, fontes grandes, fluxos simples com 1 decisão por tela |

---

## Domínio e Entidades

```
User (Paciente)
  ├── id: string (UUID v4)
  ├── name: string
  ├── birthDate: string (ISO 8601)
  ├── sensitiveData: string (dados clínicos — criptografados via expo-secure-store)
  └── createdAt: string (ISO 8601)

DailyLog (Check-in diário)
  ├── id: string (UUID v4)
  ├── userId: string
  ├── date: string (ISO 8601)
  ├── moodScore: number (1–5)
  ├── notes: string
  ├── hasSymptoms: boolean
  └── deletedAt: string | null

HealthMeasurement (Medição de saúde)
  ├── id: string (UUID v4)
  ├── userId: string
  ├── type: 'blood_pressure' | 'heart_rate' | 'temperature' | 'glucose' | 'oxygen_saturation' | 'weight'
  ├── value: number | string
  ├── unit: string
  ├── status: 'normal' | 'attention' | 'critical'
  └── measuredAt: string (ISO 8601)
```

---

## Tech Stack

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework | Expo | ~54 |
| Runtime | React Native | 0.81 |
| Navegação | Expo Router | v6 (file-based routing) |
| New Architecture | Habilitada | `newArchEnabled: true` |
| React Compiler | Habilitado | `reactCompiler: true` |
| Dados / Cache | React Query (TanStack) | v5 |
| Estado global | Zustand | v5 |
| Estilos | Inline styles + StyleSheet | — |
| Animações | react-native-reanimated | v4 |
| Gestos | react-native-gesture-handler | v2 |
| Dados sensíveis | expo-secure-store | — |

---

## Design System — Tokens de Cor

### Paleta Principal (identidade VigiDoc)
| Token | Hex | Uso |
|---|---|---|
| `navy` | `#002959` | Header, textos primários, fundo escuro |
| `cerulean-deep` | `#0A6F97` | Destaques, ícones ativos, links |
| `cerulean` | `#3672AA` | Elementos secundários, bordas ativas |
| `cool-horizon` | `#5FA7DA` | Badges informativos |

### Paleta Funcional (status e ação)
| Token | Hex | Uso |
|---|---|---|
| `esmeralda` | `#00A878` | **CTA principal** — "Nova Medição", ações primárias |
| `ice-blue` | `#F0F7FF` | Background de cards, superfícies neutras |
| `amber` | `#F59E0B` | Alertas, leituras em nível "atenção" |
| `critical` | `#EF4444` | Emergência, leituras críticas |
| `text-on-dark` | `#FFFFFF` | Texto sobre Navy |
| `text-on-light` | `#002959` | Texto sobre Ice Blue e superfícies claras |

### Regras de Contraste — Não Negociáveis
- ❌ **NUNCA** texto `#00A878` sobre fundo branco — contraste 2.0:1, reprova WCAG
- ✅ Botão CTA: fundo `#00A878` + texto `#002959` (navy) — **nunca branco no botão**
- ✅ Header: fundo `#002959` plano (sem gradiente) + texto `#FFFFFF`
- ✅ Meta de contraste: WCAG AA (4.5:1 texto normal) — ideal AAA

---

## Design System — Tipografia

| Elemento | Tamanho | Peso |
|---|---|---|
| Títulos de tela | 22–28px | Bold 700 |
| Subtítulos / labels | 16–18px | SemiBold 600 |
| Corpo / descrições | 14–16px | Regular 400 (line-height 1.5) |
| Valores de saúde ("120/80") | 28–32px | Bold 700 |
| **Mínimo absoluto** | **14px** | — |

---

## Design System — Componentes Padrão

### Card padrão
```js
{
  borderRadius: 12,
  backgroundColor: '#F0F7FF',
  padding: 16,
  shadowColor: '#000',
  shadowOpacity: 0.06,
  shadowRadius: 8,
  elevation: 2,
}
```

### Botão CTA primário
```js
{
  backgroundColor: '#00A878',
  color: '#002959',  // NUNCA '#FFFFFF' no botão CTA
  height: 56,
  borderRadius: 12,
  fontSize: 18,
  fontWeight: '700',
}
```

### Status Dot
```js
const STATUS_COLORS = {
  normal:    '#00A878',
  attention: '#F59E0B',
  critical:  '#EF4444',
}
// width: 10, height: 10, borderRadius: 5
// SEMPRE acompanhe de label textual — nunca cor sozinha
```

### Input numérico
```js
{
  fontSize: 32,
  fontWeight: '700',
  color: '#002959',
  textAlign: 'center',
  keyboardType: 'numeric',
}
```

### Touch Targets
- Mínimo: **48×48px** em qualquer elemento interativo
- Botões principais: **56px** de altura

---

## Arquitetura de Navegação

### Bottom Navigation (4 itens fixos)
1. **Início** — ícone home
2. **Histórico** — ícone gráfico/calendário
3. **Notificações** — ícone sino
4. **Meu Médico** — ícone estetoscópio

> Sem 5º item "Menu". Acesso ao perfil via avatar no header.

### Fluxo principal
```
Login → Home → [Nova Medição] → Wizard (4 passos) → Confirmação → Home
              ↓
        [Histórico] → Lista → Detalhe
              ↓
       [Meu Médico] → Chat / perfil
              ↓
    [Notificações] → Lista de alertas
```

### Wizard "Nova Medição" (substituiu o grid de 6 cards)
- **Passo 1:** "O que vamos medir hoje?" — lista vertical, 1 item por linha
- **Passo 2:** Instruções de preparo — card simples + botão "Estou pronto"
- **Passo 3:** Inserção do valor — input numérico grande com range de referência visual
- **Passo 4:** Confirmação — resumo + botão "Salvar Medição"

Regras do wizard:
- Máximo 1 decisão por tela
- Progress indicator textual no topo: "Passo 2 de 4"
- Botão "Voltar" sempre visível (não depende de swipe)
- Nunca esconder o teclado sem ação do usuário

---

## Acessibilidade — Regras Não Negociáveis

- Fonte mínima: **14px** (corpo), **22px** (títulos de seção)
- Touch target mínimo: **48×48px**
- Contraste mínimo: 4.5:1 para texto normal, 3:1 para texto grande
- Nunca usar cor sozinha para comunicar estado — sempre ícone ou label junto
- Sem gestos complexos — tudo acessível por toque simples
- Feedback de ação sempre visível (loading, success, error)
- `accessibilityLabel` em todos os elementos interativos

---

## Tom de Voz / Microcopy

- **Idioma:** Português brasileiro, simples e caloroso
- ✅ "Vamos registrar sua pressão?" — não "Iniciar aferição de PA"
- ✅ Erros: "Não conseguimos salvar. Tente novamente." — nunca culpe o usuário
- ✅ Sucesso: "Medição salva! Tudo certo."
- ❌ Evitar: termos técnicos, abreviações médicas sem explicação, jargão de gamificação

---

## Restrições Não Negociáveis

1. **API Client Limpo:** Trate loading/error de forma fluida. Não misture lógica de UI com camada de dados.
2. **UI Acolhedora e Acessível:** A interface exala cuidado, segurança e tranquilidade.
3. **Privacidade de dados:** Campos clínicos sensíveis nunca em texto puro. Use `expo-secure-store`.
4. **Sem libs removidas do core:** `AsyncStorage`, `Picker`, `WebView`, `SafeAreaView` do core RN — proibidos.
5. **WCAG AA mínimo:** Todo elemento visível deve passar no teste de contraste. Meta é AAA.

---

## Status do Rebranding (Maio 2026)

| Tela | Status |
|---|---|
| Design System / Tokens | ✅ Definido neste documento |
| Home | 🔄 Implementando |
| Nova Medição (Wizard) | 📋 Direção entregue, aguardando |
| Histórico | ⏳ Pendente |
| Meu Médico | ⏳ Pendente |
| Notificações | ⏳ Pendente |
| Handoff para devs | ⏳ Fase 3 |
