
# Garçom

## Especificação do caso de uso - FR16 - Login de funcionários

### Histórico da Revisão

| Data       | Versão | Descrição      | Autor            |
| ---------- | ------ | -------------- | ---------------- |
| 08/08/2025 | **1.00**   | Versão Inicial | Izabel Alice |

---

### 1) Resumo

Permite que o gerente ou funcionário redefina a senha da sua conta.

---

### 2) Atores

- Restaurante (usuário administrador do estabelecimento)
- Funcionário (usuário funcionário do estabelecimento)

---

### 3) Precondições

- O restaurante deve estar cadastrado no sistema.
- O funcionário deve estar cadastrado no sistema.

---

### 4) Pós-condições

* O restaurante deve conseguir fazer login com a senha redefinida.
* O funcionário deve conseguir fazer login com a senha redefinida.

---

### 5) Fluxos de evento

#### 5.1) Fluxo básico – Redefinir senha

1. \[IN] O usuário acessa a página de login.
2. \[IN] O usuário clica em redefinir senha.
3. \[IN] O usuário insere seu email cadastrado.
4. \[OUT] O sistema valida se a conta existe.
5. \[OUT] O sistema envia uma mensagem para o email cadastrado.
6. \[IN] O usuário clica no link para redefinir sau senha.
7. \[OUT] O sistema redireciona o usuário para a pagina de redefinição de senha.
8. \[IN] O usuário insere sua nova senha.
9. \[OUT] O sistema valida e modifica a senha da conta.

#### 5.2) Fluxo de exceção

* Caso algum campo obrigatório não seja preenchido corretamente:
  \[OUT] O sistema destaca o(s) campo(s) com erro e exibe mensagem explicativa.

* Caso algum campo esteja incorreto:
  \[OUT] O sistema envia uma mensagem de erro.

---

### 6) Dicionário de dados

| Campo     | Tipo                  | Restrições                        |
| --------- | --------------------- | --------------------------------- |
| Email      | Texto alfanumérico      | Obrigatório|
| Senha | Texto alfanumérico  | Obrigatório, mínimo de 8 caractéres|

---

### 7) Regras de negócio

---

### 8) Protótipo(s) de interface do caso de uso

(Figura 1: Tela de login)

Quando acabar o protótipo.
