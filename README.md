# ParaBank Playwright - Automação de Testes BDD

##  Visão Geral

Projeto de automação de testes end-to-end (E2E) para o sistema **ParaBank** utilizando a framework **Playwright** com padrão **BDD (Behavior Driven Development)**.

Este projeto valida os fluxos críticos de um sistema de Internet Banking:
-  Cadastro de usuários
-  Login e autenticação
-  Gerenciamento de contas bancárias
-  Transferência de valores entre contas

---

##  Objetivo do Projeto

Avaliar a capacidade de estruturar uma especificação de testes completa, criar casos de teste automatizados e montar um plano garantidor de cobertura baseado em fluxos críticos de um sistema de Internet Banking, seguindo as melhores práticas.

---

##  Entregáveis

Este projeto inclui três documentos estratégicos:

### 1. **ESPECIFICAÇÃO_TESTES.md**
Especificação formal de testes contendo:
- Objetivos e escopo
- Premissas, hipóteses e riscos
- Tipos de teste aplicados
- Critérios de aceite
- Matriz de rastreabilidade requisitos x testes

 [Leia a Especificação Completa](ESPECIFICACAO_TESTES.md)

### 2. **ROTEIRO_TESTES_BDD.md**
Roteiro detalhado com 15 casos de teste em formato BDD (Gherkin):
- Fluxo de Cadastro (CT-001 a CT-005)
- Fluxo de Login (CT-006 a CT-009)
- Fluxo de Contas (CT-010 a CT-012)
- Fluxo de Transferências (CT-013 a CT-015)

Cada caso inclui: Tipo, Prioridade, Pré-condições, Passos (Given/When/Then) e Resultados Esperados

 [Leia o Roteiro BDD Completo](ROTEIRO_TESTES_BDD.md)

### 3. **PLANO_COBERTURA_RASTREABILIDADE.md**
Plano garantidor de cobertura incluindo:
- Matriz de rastreabilidade (Requisito x Caso de Teste)
- Mapeamento de hipóteses por fluxo
- Estratégia de priorização
- Gap Analysis com riscos identificados
- Matriz de cobertura com heat map
- Plano de ação para mitigação

 [Leia o Plano de Cobertura Completo](PLANO_COBERTURA_RASTREABILIDADE.md)

---

### Pré-requisitos

- **Node.js** 18+ ou superior
- **npm** 9+ ou superior
- **Git** (opcional, para clonar o repositório)
- **Navegador Chromium** (instalado automaticamente pelo Playwright)

### 1. Instalação

Clone ou acesse o diretório do projeto:

```bash
# Instale as dependências
npm install
```

Isso instalará:
- Playwright Test Framework
- TypeScript
- Todas as dependências necessárias

### 2. Configuração

Nenhuma configuração adicional é necessária. O projeto está pronto para usar com as seguintes configurações padrão:

- **URL Base:** http://parabank.parasoft.com
- **Navegador:** Chromium
- **Timeout:** 30 segundos
- **Modo:** Headless (sem interface gráfica)

### 3. Executar Testes

```bash
# Executar todos os testes
npx playwright test

# Após executar os testes:
```bash
# Abrir relatório HTML
npx playwright show-report
```

O relatório será aberto em seu navegador padrão mostrando:
- Status de cada teste
- Duração de execução
- Screenshots de falhas
- Traces (rastros de execução)

---

##  Estrutura do Projeto

```
parabank-playwright/
│
├── 📄 README.md                              # Este arquivo
├── 📄 ESPECIFICACAO_TESTES.md                # Documento de especificação
├── 📄 ROTEIRO_TESTES_BDD.md                  # Roteiro com casos BDD
├── 📄 PLANO_COBERTURA_RASTREABILIDADE.md     # Matriz e plano de cobertura
│
├── 📦 package.json                           # Dependências do projeto
├── 🔧 playwright.config.ts                   # Configuração do Playwright
├── 🔧 tsconfig.json                          # Configuração TypeScript
│
├── 📁 global_setup.ts                        # Setup global dos testes
│
├── 📂 tests/                                 # Testes automatizados
│   ├── 📂 e2e/                               # Testes end-to-end
│   │   ├── register.spec.ts                  # CT-001 a CT-005 (Cadastro)
│   │   ├── login.spec.ts                     # CT-006 a CT-009 (Login)
│   │   ├── accounts.spec.ts                  # CT-010 a CT-012 (Contas)
│   │   └── transferFunds.spec.ts             # CT-013 a CT-015 (Transferências)
│   │
│   └── 📂 support/                           # Suporte e utilitários
│       ├── 📂 fixtures/                      # Fixtures Playwright
│       │   ├── index.ts                      # Exportação de fixtures
│       │   └── authUser.ts                   # Dados do usuário autenticado
│       │
│       ├── 📂 pages/                         # Page Object Model
│       │   ├── HomePage.ts                   # Página inicial
│       │   ├── LoginPage.ts                  # Página de login
│       │   ├── RegisterPage.ts               # Página de cadastro
│       │   ├── OpenAccountPage.ts            # Página de abertura de conta
│       │   ├── TransferFundsPage.ts          # Página de transferência
│       │   └── AccountsOverviewPage.ts       # Página de contas
│       │
│       └── 📂 utils/                         # Utilitários
│           ├── User.ts                       # Classe de usuário
│           └── userFake.ts                   # Gerador de dados fake
│
├── 📂 playwright-report/                     # Relatórios de execução
│   └── index.html                            # Relatório HTML
│
└── .gitignore                                # Arquivo de ignorância Git
```

---

##  Detalhes dos Testes

### Fluxo de Cadastro (CT-001 a CT-005)

| Caso       |          Descrição             |   Tipo    | Prioridade  |
|------------|--------------------------------|-----------|-------------|
| **CT-001** | Cadastro com sucesso           | Funcional |  P0         |
| **CT-002** | Campos obrigatórios vazios     | Negativo  |  P1         |
| **CT-003** | Senha e confirmação diferentes | Negativo  |  P2         |
| **CT-004** | Username já existente          | Negativo  |  P1         |
| **CT-005** | Zip Code inválido              | Borda     |  P2         |

📄 [Detalhes em ROTEIRO_TESTES_BDD.md](ROTEIRO_TESTES_BDD.md#-fluxo-de-cadastro)

### Fluxo de Login (CT-006 a CT-009)

| Caso       |     Descrição       |   Tipo    | Prioridade |
|------------|---------------------|-----------|------------|
| **CT-006** | Login com sucesso   | Funcional |  P0        |
| **CT-007** | Senha incorreta     | Negativo  |  P2        |
| **CT-008** | Usuário inexistente | Negativo  |  P3        |
| **CT-009** | Campos vazios       | Negativo  |  P1        |

📄 [Detalhes em ROTEIRO_TESTES_BDD.md](ROTEIRO_TESTES_BDD.md#-fluxo-de-login)

### Fluxo de Contas (CT-010 a CT-012)

| Caso       |      Descrição       |   Tipo    | Prioridade |
|------------|----------------------|-----------|------------|
| **CT-010** | Abrir conta Savings  | Funcional |  P0        |
| **CT-011** | Abrir conta Checking | Funcional |  P0        |
| **CT-012** | Accounts Overview    | Funcional |  P2        |

📄 [Detalhes em ROTEIRO_TESTES_BDD.md](ROTEIRO_TESTES_BDD.md#-fluxo-de-contas)

### Fluxo de Transferências (CT-013 a CT-015)

| Caso       | Descrição                 | Tipo      | Prioridade |
|------------|---------------------------|-----------|------------|
| **CT-013** | Transferência com sucesso | Funcional |  P0        |
| **CT-014** | Valor vazio               | Negativo  |  P2        |
| **CT-015** | Valor inválido            | Negativo  |  P2        |

📄 [Detalhes em ROTEIRO_TESTES_BDD.md](ROTEIRO_TESTES_BDD.md#-fluxo-de-transferências)

---

## 🚨 Questões Críticas Identificadas

###  GAP CRÍTICO #1: Validação de Credenciais

- **CT-007:** Login aceita senhas incorretas
- **CT-008:** Login aceita usuários inexistentes
- **Impacto:** Falha crítica de segurança
- **Status:** ❌ Sistema não valida credenciais

###  GAP MÉDIO #2: Validação de Zip Code

- **CT-005:** Zip Code com caracteres especiais é aceito
- **Impacto:** Qualidade de dados comprometida
- **Status:** ⚠️ Sem validação de formato

Veja mais detalhes em: [PLANO_COBERTURA_RASTREABILIDADE.md#4-gap-analysis](PLANO_COBERTURA_RASTREABILIDADE.md#4-gap-analysis)

---

##  Métricas e KPIs

|     Métrica             | Valor | Alvo  | Status           |
|-------------------------|-------|-------|------------------|
| Casos Implementados     | 15/15 | 15+   |  100%            |
| Fluxos Cobertos         | 4/4   | 4/4   |  100%            |
| Requisitos Validados    | 13/15 | 15/15 |  86.7%           |
| Taxa de Cobertura Geral | 30.6% | 80%+  |  Crítico         |
| P0 (Críticos)           | 5/5   | 5/5   |  100%            |
| Gaps Críticos           | 2     | 0     |  2 encontrados   |

---

**Desenvolvido usando Playwright + TypeScript**
 
**Versão:** 1.0

### 👤 Autor
Francisco George
Analista de Qualidade / QA Automation
