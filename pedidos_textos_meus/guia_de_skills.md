# Guia de Habilidades (Skills) do Agente - VigiDoc (Mobile Clean-up)

Este arquivo resume as habilidades (skills) atualmente configuradas e instaladas na pasta [.agents/skills/](file:///c:/Users/Pericles/Desktop/Projetos/Vigidoc/app/.agents/skills/) do seu espaço de trabalho [app](file:///c:/Users/Pericles/Desktop/Projetos/Vigidoc/app), otimizadas para o **Design e Desenvolvimento de Aplicativos Mobile**.

---

## 1. Design de Interface Premium & Usabilidade (Aesthetics & UI)

### 1.1 [high-end-visual-design](file:///c:/Users/Pericles/Desktop/Projetos/Vigidoc/app/.agents/skills/high-end-visual-design/SKILL.md)
*   **O que faz:** Orienta o agente a projetar interfaces com estética moderna e de alto padrão (padrão Awwwards). Define regras específicas para espaçamento (grid de 8px), sombras sutis, tipografia refinada e micro-animações (como GSAP). Bloqueia padrões visuais genéricos que deixam o design parecer barato.
*   **Quando utilizar:** Sempre que você solicitar a criação de novas seções, páginas ou componentes que requeiram apelo estético "premium", moderno, com translucidez (glassmorphism), modo escuro refinado ou transições elegantes.

### 1.2 [minimalist-ui](file:///c:/Users/Pericles/Desktop/Projetos/Vigidoc/app/.agents/skills/minimalist-ui/SKILL.md)
*   **O que faz:** Foca na estética minimalista utilitária, inspirada em grandes ferramentas de produtividade. Bane o uso de fontes genéricas, sombras pesadas, gradientes coloridos e ícones Lucide padrão (favorecendo ícones customizados ou SVGs puros), aplicando paletas de tons pastéis quentes e neutros calibrados.
*   **Quando utilizar:** Quando o aplicativo exigir um visual extremamente limpo, focado em texto e dados clínicos sem distrações visuais ou saturação de cores (excelente para a parte clínica de prontuários/dados médicos).

---

## 2. Geração de Imagens & Layouts de Referência (Image Gen & Mockups)

### 2.1 [imagegen-frontend-mobile](file:///c:/Users/Pericles/Desktop/Projetos/Vigidoc/app/.agents/skills/imagegen-frontend-mobile/SKILL.md)
*   **O que faz:** Focado em conceitos visuais de apps nativos (iOS e Android). Prioriza consistência de telas, tipografia altamente legível e, por padrão, exibe os designs aplicados dentro de mockups de celulares premium (ex: iPhones).
*   **Quando utilizar:** Para idealizar o visual e a navegação das telas do aplicativo móvel de monitoramento ou visualização de sinais vitais do paciente.

### 2.2 [brandkit](file:///c:/Users/Pericles/Desktop/Projetos/Vigidoc/app/.agents/skills/brandkit/SKILL.md)
*   **O que faz:** Focado na direção criativa de logotipos, guias de diretrizes de marca e apresentações visuais de identidade para marcas minimalistas, de tecnologia, segurança e saúde.
*   **Quando utilizar:** Ao criar a identidade visual, logotipo ou decidir a paleta de cores institucional oficial do projeto VigiDoc.

---

## 3. Conversão e Refatoração de Código (Development & Refactoring)

### 3.1 [image-to-code](file:///c:/Users/Pericles/Desktop/Projetos/Vigidoc/app/.agents/skills/image-to-code/SKILL.md)
*   **O que faz:** Traduz imagens de design e mockups visuais em código real Next.js, HTML ou Tailwind, garantindo que o agente analise a imagem profundamente antes de codificar, evitando duplicidade e layouts desalinhados.
*   **Quando utilizar:** Quando você fornecer uma imagem (como uma captura de tela do Figma ou desenho de UI) e pedir para o agente recriá-la em código.

### 3.2 [full-output-enforcement](file:///c:/Users/Pericles/Desktop/Projetos/Vigidoc/app/.agents/skills/full-output-enforcement/SKILL.md)
*   **O que faz:** Impede que o agente resuma ou use placeholders (como `// código anterior continua aqui`) em arquivos grandes, garantindo que o arquivo seja gerado inteiramente sem cortes.
*   **Quando utilizar:** Em tarefas de codificação complexas onde qualquer truncamento de código quebraria a aplicação.

---

## 4. Raspagem de Dados e Pesquisa de Referências (Firecrawl)

### 4.1 [firecrawl](file:///c:/Users/Pericles/Desktop/Projetos/Vigidoc/app/.agents/skills/firecrawl/SKILL.md) (Central)
*   **O que faz:** Habilidade central da CLI do Firecrawl para interagir com a web, pesquisar, raspar e processar conteúdos online.
*   **Quando utilizar:** Sempre que você referenciar sites externos, pedir para buscar documentações, ou precisar coletar dados diretamente da internet.

### 4.2 [firecrawl-search](file:///c:/Users/Pericles/Desktop/Projetos/Vigidoc/app/.agents/skills/firecrawl-search/SKILL.md)
*   **O que faz:** Realiza buscas na web e extrai o conteúdo principal das páginas encontradas, retornando markdown limpo otimizado.
*   **Quando utilizar:** Para encontrar referências estéticas, documentações de APIs, novas bibliotecas mobile ou exemplos de interfaces.

### 4.3 [firecrawl-scrape](file:///c:/Users/Pericles/Desktop/Projetos/Vigidoc/app/.agents/skills/firecrawl-scrape/SKILL.md)
*   **O que faz:** Extrai o conteúdo em markdown limpo de uma URL específica que você fornecer.
*   **Quando utilizar:** Quando você já tiver a URL de uma referência e quiser que o agente estude seu conteúdo.

### 4.4 [firecrawl-deep-research](file:///c:/Users/Pericles/Desktop/Projetos/Vigidoc/app/.agents/skills/firecrawl-deep-research/SKILL.md)
*   **O que faz:** Consolida múltiplas fontes de dados da web para fazer uma pesquisa profunda sobre determinado tema e produzir relatórios formatados.
*   **Quando utilizar:** Para pesquisas abrangentes sobre boas práticas de design médico, novos frameworks ou padrões de acessibilidade mobile.

### 4.5 [firecrawl-website-design-clone](file:///c:/Users/Pericles/Desktop/Projetos/Vigidoc/app/.agents/skills/firecrawl-website-design-clone/SKILL.md)
*   **O que faz:** Extrai o sistema de design (cores, fontes, espaçamento) de qualquer site de referência.
*   **Quando utilizar:** Se você quiser que o agente recrie ou se inspire na identidade visual de algum site de referência mobile.

### 4.6 [firecrawl-workflows](file:///c:/Users/Pericles/Desktop/Projetos/Vigidoc/app/.agents/skills/firecrawl-workflows/SKILL.md)
*   **O que faz:** Permite orquestrar fluxos de trabalho avançados do Firecrawl.
*   **Quando utilizar:** Como dependência interna para a execução de análises complexas.
