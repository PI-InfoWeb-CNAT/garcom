
# Garçom

## Especificação do caso de uso - FR16 - Login de funcionários

### Histórico da Revisão

| Data       | Versão | Descrição      | Autor            |
| ---------- | ------ | -------------- | ---------------- |
| 16/05/2025 | **1.00**   | Versão Inicial | Vinícius H. |

---

### 1) Resumo

Permite o funcionário entrar autenticado na página do restaurante.

---

### 2) Atores

* Funcionário (usuário funcionário do estabelecimento)

---

### 3) Precondições

* O funcionário deve estar autenticado em um restaurante existente no sistema.

---

### 4) Pós-condições

* O funcionário vai entrar no sistema, podendo gerenciar as comandas e os pedidos.

---

### 5) Fluxos de evento

#### 5.1) Fluxo básico – Login

1. \[IN] O usuário acessa a página de login.
2. \[IN] O usuário insere seu e-mail e senha.
3. \[OUT] O sistema valida as credenciais.
4. \[OUT] O sistema libera o acesso ao painel do restaurante.

#### 5.2) Fluxo de exceção

* Caso algum campo obrigatório não seja preenchido corretamente:
  \[OUT] O sistema destaca o(s) campo(s) com erro e exibe mensagem explicativa.

* Caso algum campo esteja incorreto:
  \[OUT] O sistema envia uma mensagem de erro.

---

### 6) Dicionário de dados

| Campo     | Tipo                  | Restrições                        |
| --------- | --------------------- | --------------------------------- |
| Email do funcionário      | Texto alfanumérico      | Obrigatório|
| Senha | Texto alfanumérico  | Obrigatório, mínimo de 8 caractéres|

---

### 7) Regras de negócio

---

### 8) Protótipo(s) de interface do caso de uso

(Figura 1: Tela de login)

Quando acabar o protótipo.
