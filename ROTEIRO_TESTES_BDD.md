# ROTEIRO DE TESTES - FORMATO BDD (GHERKIN)

## ÍNDICE

1. [Fluxo de Cadastro (CT-001 a CT-005)](#fluxo-de-cadastro)
2. [Fluxo de Login (CT-006 a CT-009)](#fluxo-de-login)
3. [Fluxo de Contas (CT-010 a CT-012)](#fluxo-de-contas)
4. [Fluxo de Transferências (CT-013 a CT-015)](#fluxo-de-transferências)

---

## FLUXO DE CADASTRO

### CT-001: Cadastro com sucesso

**Tipo:** Funcional (Happy Path)  
**Prioridade:** P0 - Crítica  
**Pré-condições:**
- Navegador aberto e acessando a página inicial do ParaBank
- Página de registro acessível via botão "Register" na página inicial

```gherkin
Feature: Cadastro de usuário no ParaBank

Scenario: CT-001 – Cadastro com sucesso
    Given que estou na página inicial do ParaBank
    When clico no botão "Register"
    And sou redirecionado para a página de cadastro
    And preencho os seguintes dados:
        | Campo            | Valor                    |
        | First Name       | João                     |
        | Last Name        | Silva                    |
        | Street Address   | Rua Principal, 123       |
        | City             | São Paulo                |
        | State            | SP                       |
        | Zip Code         | 01310-100                |
        | Phone            | 11987654321              |
        | SSN              | 123456789                |
        | Username         | joao.silva.2025          |
        | Password         | QA@Secure123             |
        | Confirm Password | QA@Secure123             |
    And clico no botão "Register"
    Then sou redirecionado para a página de overview
    And vejo a mensagem "Your account was created successfully. You are now logged in."
    And sou automaticamente autenticado no sistema
    And posso acessar minhas contas bancárias

Expected Results:
     Usuário criado com sucesso
     Username único foi aceito
     Senhas correspondentes foram validadas
     Redirecionamento para overview realizado
     Sessão de usuário iniciada automaticamente
```

---

### CT-002: Campos obrigatórios vazios

**Tipo:** Negativo (Validação)  
**Prioridade:**  P1 - Alta  
**Pré-condições:**
- Navegador aberto na página de cadastro do ParaBank

```gherkin
Scenario: CT-002 – Campos obrigatórios vazios
    Given que estou na página de cadastro
    When deixo todos os campos vazios
    And clico no botão "Register"
    Then o formulário não é submetido
    And vejo mensagens de erro para cada campo obrigatório
    And especificamente vejo a mensagem "First name is required."
    And os campos vazios são marcados visualmente (border vermelha ou similar)

Expected Results:
     Validação de campos obrigatórios acionada
     Mensagens de erro específicas para cada campo
     Formulário não enviado ao servidor
     Usuário permanece na página de cadastro
     Erros são claros e orientam preenchimento
```

---

### CT-003: Senha e confirmação diferentes

**Tipo:** Negativo (Validação)  
**Prioridade:**  P2 - Média  
**Pré-condições:**
- Navegador aberto na página de cadastro
- Todos os campos opcionais preenchidos com valores válidos

```gherkin
Scenario: CT-003 – Senha e confirmação diferentes
    Given que estou na página de cadastro
    And preencho todos os campos obrigatórios com dados válidos:
        | Campo              | Valor                    |
        | First Name         | Maria                    |
        | Last Name          | Santos                   |
        | Street Address     | Avenida Paulista, 1000   |
        | City               | São Paulo                |
        | State              | SP                       |
        | Zip Code           | 01311-200                |
        | Phone              | 11999887766              |
        | SSN                | 987654321                |
        | Username           | maria.santos.2025        |
        | Password           | QA@Secure123             |
    And preencho o campo "Confirm Password" com valor diferente: "QA@Secure456"
    When clico no botão "Register"
    Then o formulário não é submetido
    And vejo a mensagem de erro "Passwords did not match."
    And os campos de senha são destacados

Expected Results:
     Validação de correspondência de senhas funcionou
     Mensagem de erro específica exibida
     Formulário bloqueado
     Usuário permanece na página com dados preenchidos
```

---

### CT-004: Username já existente

**Tipo:** Negativo (Regra de Negócio)  
**Prioridade:**  P1 - Alta  
**Pré-condições:**
- Username "john123" (do usuário authUser) já existe no sistema
- Navegador aberto na página de cadastro

```gherkin
Scenario: CT-004 – Username já existente
    Given que existe um usuário registrado com username "john123"
    And estou na página de cadastro
    And preencho todos os campos obrigatórios com dados válidos
    And insiro o username "john123" (duplicado)
    And insiro a senha "QA@Secure123" e a confirmação correspondente
    When clico no botão "Register"
    Then o formulário não é submetido
    And vejo a mensagem de erro "This username already exists."
    And os usuários existentes não são expostos em listas públicas

Expected Results:
     Validação de unicidade de username funcionou
     Mensagem de erro específica exibida
     Usuário não é criado
     Formulário permanece preenchido
     Não há vazamento de dados de usuários existentes
```

---

### CT-005: Zip Code inválido

**Tipo:** Borda (Edge Case)  
**Prioridade:**  P2 - Média  
**Pré-condições:**
- Navegador aberto na página de cadastro
- Todos os campos obrigatórios preenchidos

```gherkin
Scenario: CT-005 – Zip Code inválido
    Given que estou na página de cadastro
    And preencho todos os campos com dados válidos:
        | Campo              | Valor                    |
        | First Name         | Pedro                    |
        | Last Name          | Costa                    |
        | Street Address     | Rua das Flores, 456      |
        | City               | Rio de Janeiro           |
        | State              | RJ                       |
        | Zip Code           | !@#$%                    |
        | Phone              | 21987654321              |
        | SSN                | 456789123                |
        | Username           | pedro.costa.2025         |
        | Password           | QA@Secure123             |
        | Confirm Password   | QA@Secure123             |
    When clico no botão "Register"
    Then o sistema processa o cadastro
    And vejo a mensagem "Your account was created successfully. You are now logged in."
    And sou automaticamente autenticado

Expected Results:
     COMPORTAMENTO REAL DO SISTEMA: Zip Code especial é ACEITO
     Usuário criado com sucesso apesar do Zip Code inválido
     Validação de formato Zip Code NÃO está implementada
     NOTA: Este é um comportamento inesperado que indica falha na validação
```

---

##  FLUXO DE LOGIN

### CT-006: Login com sucesso

**Tipo:** Funcional (Happy Path)  
**Prioridade:**  P0 - Crítica  
**Pré-condições:**
- Navegador aberto na página inicial do ParaBank
- Usuário "john123" com senha "qa123456" existe no sistema

```gherkin
Scenario: CT-006 – Login com sucesso
    Given que estou na página inicial do ParaBank
    And vejo o formulário de login
    When insiro o username "john123"
    And insiro a senha "qa123456"
    And clico no botão "Login"
    Then sou redirecionado para a página de overview/dashboard
    And vejo minha lista de contas bancárias
    And vejo a mensagem de boas-vindas com meu nome
    And o sistema mantém minha sessão ativa

Expected Results:
     Autenticação bem-sucedida
     Redirecionamento para página protegida realizado
     Sessão iniciada (cookies de sessão validados)
     Dados do usuário carregados corretamente
```

---

### CT-007: Senha incorreta (sistema aceita)

**Tipo:** Negativo (Validação de Segurança)  
**Prioridade:**  P2 - Média  
**Pré-condições:**
- Navegador aberto na página inicial
- Usuário "john123" existe no sistema com senha "qa123456"

```gherkin
Scenario: CT-007 – Senha incorreta (sistema aceita)
    Given que estou na página inicial do ParaBank
    And vejo o formulário de login
    When insiro o username "john123"
    And insiro a senha "senhaIncorreta"
    And clico no botão "Login"
    Then o sistema processa a requisição
    And sou redirecionado para a página de overview
    And acesso ao sistema é concedido

Expected Results:
     CRÍTICO - COMPORTAMENTO INESPERADO:
     Login COM SENHA INCORRETA é ACEITO
     Sistema NÃO valida corretamente credenciais
     FALHA DE SEGURANÇA IDENTIFICADA
     Requer correção imediata no servidor
```

---

### CT-008: Usuário inexistente

**Tipo:** Negativo (Validação)  
**Prioridade:**  P3 - Baixa  
**Pré-condições:**
- Navegador aberto na página inicial
- Username "user_inexistente" não existe no sistema

```gherkin
Scenario: CT-008 – Usuário inexistente
    Given que estou na página inicial do ParaBank
    When insiro o username "user_inexistente"
    And insiro a senha "qa123"
    And clico no botão "Login"
    Then o sistema processa a requisição
    And sou redirecionado para a página de overview
    And acesso é concedido

Expected Results:
     CRÍTICO - COMPORTAMENTO INESPERADO:
     Login COM USUÁRIO INEXISTENTE é ACEITO
     Sistema NÃO valida existência do usuário
     FALHA CRÍTICA DE SEGURANÇA
     Requer investigação imediata
```

---

### CT-009: Campos vazios no login

**Tipo:** Negativo (Validação)  
**Prioridade:**  P1 - Alta  
**Pré-condições:**
- Navegador aberto na página inicial do ParaBank

```gherkin
Scenario: CT-009 – Campos vazios no login
    Given que estou na página inicial do ParaBank
    When deixo os campos de username e senha vazios
    And clico no botão "Login"
    Then o formulário não é submetido ao servidor
    And vejo mensagem(ns) de erro
    And sou impedido de fazer login sem credenciais

Expected Results:
     Validação de campos obrigatórios no login funcionou
     Mensagem de erro exibida
     Formulário não enviado
     Usuário permanece na página de login
```

---

##  FLUXO DE CONTAS

### CT-010: Abrir conta Savings

**Tipo:** Funcional (Happy Path)  
**Prioridade:**  P0 - Crítica  
**Pré-condições:**
- Usuário autenticado e na página de overview
- Usuário tem pelo menos uma conta bancária

```gherkin
Scenario: CT-010 – Abrir conta Savings
    Given que estou autenticado no ParaBank
    And estou na página de overview
    And clico no menu "Open New Account"
    And sou redirecionado para a página de abertura de conta
    When seleciono o tipo de conta "SAVINGS"
    And clico no botão "Open New Account"
    Then a conta é criada com sucesso
    And vejo a mensagem de sucesso com o número da nova conta
    And o novo número de conta é gerado (ex: "12345")
    And sou redirecionado para a página de overview
    And a nova conta Savings aparece na lista de contas

Expected Results:
     Conta Savings criada com ID único
     Mensagem de sucesso exibida
     Novo número de conta gerado
     Conta aparece imediatamente na lista de contas do usuário
```

---

### CT-011: Abrir conta Checking

**Tipo:** Funcional (Happy Path)  
**Prioridade:**  P0 - Crítica  
**Pré-condições:**
- Usuário autenticado e na página de overview
- Usuário tem pelo menos uma conta bancária

```gherkin
Scenario: CT-011 – Abrir conta Checking
    Given que estou autenticado no ParaBank
    And estou na página de overview
    And clico no menu "Open New Account"
    And sou redirecionado para a página de abertura de conta
    When seleciono o tipo de conta "CHECKING"
    And clico no botão "Open New Account"
    Then a conta é criada com sucesso
    And vejo a mensagem de sucesso com o número da nova conta
    And o novo número de conta é gerado (ex: "12346")
    And sou redirecionado para a página de overview
    And a nova conta Checking aparece na lista de contas

Expected Results:
     Conta Checking criada com ID único
     Mensagem de sucesso exibida
     Novo número de conta gerado
     Conta aparece imediatamente na lista de contas do usuário
     Tipo de conta (Checking vs Savings) é diferenciado
```

---

### CT-012: Accounts Overview

**Tipo:** Funcional + Regressão  
**Prioridade:**  P2 - Média  
**Pré-condições:**
- Usuário autenticado no ParaBank
- Usuário tem pelo menos uma conta existente

```gherkin
Scenario: CT-012 – Accounts Overview (Visualização de contas)
    Given que estou autenticado no ParaBank
    And estou na página de overview
    And clico no menu "Open New Account"
    When seleciono o tipo de conta "CHECKING"
    And clico no botão "Open New Account"
    Then a nova conta é criada com sucesso
    And sou redirecionado para a página de overview
    When clico no link "Accounts Overview"
    Then sou redirecionado para a página de listagem de contas
    And vejo uma lista contendo pelo menos 2 contas (original + criada)
    And cada conta mostra:
        | Campo          | Exemplo      |
        | Account ID     | 12345        |
        | Account Type   | CHECKING     |
        | Balance        | $1000.00     |

Expected Results:
     Página de Accounts Overview acessível
     Lista de contas carregada corretamente
     Múltiplas contas são exibidas
     Informações da conta são completas e corretas
     Saldo é exibido em formato monetário
```

---

##  FLUXO DE TRANSFERÊNCIAS

### CT-013: Transferência com sucesso

**Tipo:** Funcional (Happy Path)  
**Prioridade:**  P0 - Crítica  
**Pré-condições:**
- Usuário autenticado no ParaBank
- Usuário tem pelo menos 2 contas criadas
- As contas têm saldo suficiente

```gherkin
Scenario: CT-013 – Transferência com sucesso
    Given que estou autenticado no ParaBank
    And estou na página de overview
    And tenho 2 contas criadas (ex: conta 1 e conta 2)
    And clico no menu "Transfer Funds"
    And sou redirecionado para a página de transferência
    When seleciono a conta de origem (From Account): "12345"
    And seleciono a conta de destino (To Account): "12346"
    And insiro o valor "100"
    And clico no botão "Transfer"
    Then a transferência é processada com sucesso
    And vejo a mensagem "Transfer Complete!" ou similar
    And vejo o valor transferido "100"
    And o valor é exibido como "$100.00"
    And os saldos das contas são atualizados:
        | Conta | Saldo Anterior | Operação | Saldo Final |
        | 12345 | $1000.00       | -$100    | $900.00     |
        | 12346 | $1000.00       | +$100    | $1100.00    |

Expected Results:
     Transferência processada com sucesso
     Confirmação visual exibida
     Valor formatado corretamente
     Saldos atualizados em tempo real
     Histórico de transferência registrado
```

---

### CT-014: Valor vazio em transferência

**Tipo:** Negativo (Validação)  
**Prioridade:**  P2 - Média  
**Pré-condições:**
- Usuário autenticado no ParaBank
- Usuário está na página de transferência
- Contas de origem e destino selecionadas

```gherkin
Scenario: CT-014 – Valor vazio em transferência
    Given que estou autenticado no ParaBank
    And estou na página de transferência
    And seleciono a conta de origem: "12345"
    And seleciono a conta de destino: "12346"
    And deixo o campo de valor vazio
    When clico no botão "Transfer"
    Then o formulário não é submetido
    And vejo uma mensagem de erro
    And nenhuma transferência é processada
    And os saldos das contas permanecem inalterados

Expected Results:
     Validação de campo obrigatório funcionou
     Mensagem de erro exibida
     Transferência bloqueada
     Saldos não alterados
```

---

### CT-015: Valor inválido em transferência

**Tipo:** Negativo (Validação)  
**Prioridade:**  P2 - Média  
**Pré-condições:**
- Usuário autenticado no ParaBank
- Usuário está na página de transferência
- Contas selecionadas

```gherkin
Scenario: CT-015 – Valor inválido em transferência
    Given que estou autenticado no ParaBank
    And estou na página de transferência
    And seleciono a conta de origem: "12345"
    And seleciono a conta de destino: "12346"
    When insiro um valor inválido (não numérico): "ABC"
    And clico no botão "Transfer"
    Then o formulário não é submetido
    And vejo uma mensagem de erro
    And nenhuma transferência é processada
    And os saldos das contas permanecem inalterados
    And o valor inválido é rejeitado

Expected Results:
     Validação de formato numérico funcionou
     Mensagem de erro exibida
     Transferência bloqueada
     Saldos não alterados
     Campo de valor é resetado ou mantém valor inválido destacado
```

---

## RESUMO DOS CASOS DE TESTE

| CT ID  | Fluxo          | Cenário             | Tipo      | Prioridade    | Status        |
|------- |----------------|---------------------|-----------|---------------|---------------|
| CT-001 | Cadastro       | Sucesso             | Funcional |  P0           |  Implementado |
| CT-002 | Cadastro       | Campos vazios       | Negativo  |  P1           |  Implementado |
| CT-003 | Cadastro       | Senhas diferentes   | Negativo  |  P2           |  Implementado |
| CT-004 | Cadastro       | Username duplicado  | Negativo  |  P1           |  Implementado |
| CT-005 | Cadastro       | Zip Code inválido   | Borda     |  P2           |  Implementado |
| CT-006 | Login          | Sucesso             | Funcional |  P0           |  Implementado |
| CT-007 | Login          | Senha incorreta     | Negativo  |  P2           |  Implementado |
| CT-008 | Login          | Usuário inexistente | Negativo  |  P3           |  Implementado |
| CT-009 | Login          | Campos vazios       | Negativo  |  P1           |  Implementado |
| CT-010 | Contas         | Abrir Savings       | Funcional |  P0           |  Implementado |
| CT-011 | Contas         | Abrir Checking      | Funcional |  P0           |  Implementado |
| CT-012 | Contas         | Overview            | Funcional |  P2           |  Implementado |
| CT-013 | Transferências | Sucesso             | Funcional |  P0           |  Implementado |
| CT-014 | Transferências | Valor vazio         | Negativo  |  P2           |  Implementado |
| CT-015 | Transferências | Valor inválido      | Negativo  |  P2           |  Implementado |

---

##  NOTAS IMPORTANTES

1. **Comportamentos Inesperados Documentados:**
   - CT-007: Senha incorreta é aceita pelo sistema
   - CT-008: Usuário inexistente consegue fazer login
   - CT-005: Zip Code com caracteres especiais é aceito

2. **Dependências Entre Testes:**
   - Testes de Login dependem de usuário criado em Cadastro
   - Testes de Contas exigem sessão ativa
   - Testes de Transferência exigem múltiplas contas


