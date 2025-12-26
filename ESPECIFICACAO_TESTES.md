# ESPECIFICAÇÃO DE TESTES - SISTEMA PARABANK

---

## 1. OBJETIVO DOS TESTES

O objetivo dos testes é validar a funcionalidade, confiabilidade e segurança dos fluxos críticos do sistema ParaBank, garantindo:

- **Criação de contas de usuário** com validações de campos obrigatórios e regras de negócio
- **Autenticação segura** com tratamento adequado de credenciais inválidas
- **Gestão de contas bancárias** com suporte a múltiplos tipos de conta
- **Transferências de valores** com validações de entrada e confirmação de sucesso
- **Identificação de comportamentos inesperados** e gaps de segurança

---

## 2. ESCOPO E FORA DE ESCOPO

### Escopo (IN)

| Fluxo              | Funcionalidades                                                                                                                    |
|--------------------|------------------------------------------------------------------------------------------------------------------------------------|
| **Cadastro**       | Validação de campos obrigatórios, detecção de usernames duplicados, validação de senha, validação de dados de endereço             |
| **Login**          | Autenticação com credenciais válidas, rejeição de senhas incorretas, rejeição de usuários inexistentes, validação de campos vazios |
| **Contas**         | Abertura de conta Savings, abertura de conta Checking, visualização de contas criadas (Accounts Overview)                          |
| **Transferências** | Transferência entre contas, validação de valores numéricos, rejeição de valores vazios ou inválidos                                |

### Fora de Escopo (OUT)

- Testes de performance e carga
- Testes de segurança avançada (SQL Injection, XSS, CSRF)
- Testes de compatibilidade entre navegadores (foco em Chromium)
- Testes de integração com sistemas bancários reais
- Testes de recuperação de senha
- Testes de auditoria de logs
- Testes mobile

---

## 3. PREMISSAS E HIPÓTESES

### Premissas

1. O sistema ParaBank está disponível e acessível em `http://parabank.parasoft.com`
2. A base de dados é resetada ou possui dados de teste consistentes entre execuções
3. Existe um usuário de teste válido (`authUser`) com credenciais conhecidas
4. O navegador Chrome/Chromium está disponível na máquina de teste
5. A framework Playwright está corretamente configurada e instrada
6. Não há restrições geográficas ou de IP para acesso ao sistema

### Hipóteses

1. **H1:** O sistema valida corretamente campos obrigatórios no cadastro
2. **H2:** O sistema impede o cadastro de usernames duplicados
3. **H3:** O sistema rejeita senhas que não correspondem à confirmação
4. **H4:** O sistema aceita apenas valores numéricos válidos em transferências
5. **H5:** O sistema mantém histórico de contas criadas
6. **H6:** O sistema diferencia tipos de conta (Savings vs Checking)
7. **H7:** O sistema valida formato de CEP/Zip Code (nota: comportamento real pode diferir)
8. **H8:** O sistema rejeita login com campos vazios

---

## 4. RISCOS E PONTOS DE ATENÇÃO

| Risco                                        | Impacto                | Mitigação                                        | Nível    |
|----------------------------------------------|------------------------|--------------------------------------------------|----------|
| **Fluxo de login aceita dados inválidos**    | Alto - Segurança       | Documentar comportamento real; requerer correção |  Crítico |
| **Zip Code não valida formato corretamente** | Médio - Qualidade      | Testes aceitam comportamento atual               |  Médio   |
| **Dependência entre testes**                 | Médio - Confiabilidade | Uso de fixtures e setup/teardown apropriados     |  Médio   |
| **Reset de dados entre execuções**           | Alto - Confiabilidade  | Validar estado inicial; usar dados únicos        |  Crítico |
| **Campos opcionais não documentados**        | Baixo - Completude     | Validar através de testes; documentar            |  Baixo   |

---

## 5. TIPOS DE TESTE APLICADOS

### 5.1 Testes Funcionais (Happy Path)

Validam os fluxos principais do sistema sob condições normais:

- **CT-001:** Cadastro com sucesso
- **CT-006:** Login com sucesso
- **CT-010:** Abrir conta Savings
- **CT-011:** Abrir conta Checking
- **CT-013:** Transferência com sucesso

### 5.2 Testes Negativos (Erro Handling)

Validam o comportamento do sistema quando há erros ou dados inválidos:

- **CT-002:** Campos obrigatórios vazios
- **CT-003:** Senha e confirmação diferentes
- **CT-004:** Username já existente
- **CT-007:** Senha incorreta
- **CT-008:** Usuário inexistente
- **CT-009:** Campos vazios no login
- **CT-014:** Valor vazio em transferência
- **CT-015:** Valor inválido em transferência

### 5.3 Testes de Borda (Edge Cases)

Validam comportamentos não documentados e casos extremos:

- **CT-005:** Zip Code inválido (comportamento real: aceita)
- **CT-012:** Accounts Overview (validar múltiplas contas)

### 5.4 Testes de Regressão

Casos que cobrem fluxos completos e interdependências:

- **CT-012:** Criar conta e visualizar em Accounts Overview

---

## 6. CRITÉRIOS DE ACEITE

### 6.1 Critérios Globais

-  Todos os testes devem ser automatizados com Playwright
-  Testes devem ser independentes e executáveis isoladamente
-  Mensagens de erro/sucesso devem ser exatamente as esperadas
-  Testes devem limpeza de estado quando necessário
-  Testes devem documentar comportamentos inesperados do sistema

### 6.2 Critérios Específicos por Fluxo

#### Cadastro
-  Usuário criado com sucesso é imediatamente autenticado
-  Username duplicado é rejeitado com mensagem clara
-  Senhas diferentes são rejeitadas
-  Todos os campos obrigatórios são validados
-  Mensagem de sucesso contém texto esperado

#### Login
-  Login com credenciais válidas leva à página de overview
-  Campos vazios mostram mensagem de erro específica
-  Credenciais inválidas são rejeitadas (nota: sistema aceita)

#### Contas
-  Conta é criada com sucesso e ID é gerado
-  Tipos de conta (Savings/Checking) são claramente diferenciados
-  Contas aparecem na lista de Accounts Overview

#### Transferências
-  Transferência é processada e confirmada com valor exato
-  Valores inválidos são rejeitados
-  Valores vazios geram mensagem de erro

### 6.3 Asserções Técnicas

-  Status HTTP 200-299 para operações bem-sucedidas
-  Redirecionamento apropriado após operações
-  Mensagens de validação presentes no DOM
-  Campos de entrada resetam após submit bem-sucedido
-  Storage (cookies/localStorage) correto para manutenção de sessão

---

## 7. MATRIZ DE RASTREABILIDADE (REQUIREMENTS vs TESTES)

| ID      | Requisito                                        | CT     | Tipo      |
|---------|--------------------------------------------------|--------|-----------|
| REQ-001 | Usuário pode se cadastrar com dados válidos      | CT-001 | Funcional |
| REQ-002 | Sistema valida campos obrigatórios               | CT-002 | Negativo  |
| REQ-003 | Sistema impede senhas diferentes                 | CT-003 | Negativo  |
| REQ-004 | Sistema impede usernames duplicados              | CT-004 | Negativo  |
| REQ-005 | Sistema aceita zip codes especiais               | CT-005 | Borda     |
| REQ-006 | Usuário pode fazer login com credenciais válidas | CT-006 | Funcional |
| REQ-007 | Sistema trata senha incorreta                    | CT-007 | Negativo  |
| REQ-008 | Sistema trata usuário inexistente                | CT-008 | Negativo  |
| REQ-009 | Sistema valida login com campos vazios           | CT-009 | Negativo  |
| REQ-010 | Usuário pode abrir conta Savings                 | CT-010 | Funcional |
| REQ-011 | Usuário pode abrir conta Checking                | CT-011 | Funcional |
| REQ-012 | Sistema lista contas criadas                     | CT-012 | Funcional |
| REQ-013 | Usuário pode transferir valores                  | CT-013 | Funcional |
| REQ-014 | Sistema valida valor vazio em transferência      | CT-014 | Negativo  |
| REQ-015 | Sistema valida valor inválido em transferência   | CT-015 | Negativo  |

---

## 8. ESTRATÉGIA DE EXECUÇÃO

### Ordem de Execução Recomendada

1. **Fase 1 - Cadastro:** CT-001 a CT-005 (criar usuários de teste)
2. **Fase 2 - Login:** CT-006 a CT-009 (validar autenticação)
3. **Fase 3 - Contas:** CT-010 a CT-012 (validar gestão de contas)
4. **Fase 4 - Transferências:** CT-013 a CT-015 (validar transferências)

### Priorização

| Prioridade    | Casos                                          | Justificativa                    |
|---------------|------------------------------------------------|----------------------------------|
|  P0 - Crítica | CT-001, CT-006, CT-010, CT-013                 | Fluxos principais do sistema     |
|  P1 - Alta    | CT-002, CT-004, CT-009, CT-011                 | Validações críticas de segurança |
|  P2 - Média   | CT-003, CT-005, CT-007, CT-012, CT-014, CT-015 | Testes complementares            |
|  P3 - Baixa   | CT-008                                         | Validação de caso raro           |

---

### Dados de Teste

- **Usuário Válido:** authUser (definido em `authUser.ts`)
- **Geração de Usuários:** `buildUser()` função em `userFake.ts`
- **Fixtures:** StorageState com cookies/origins vazios para testes isolados

---

