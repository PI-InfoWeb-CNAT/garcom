# Garçom

## Especificação do caso de uso - RF07 - Gerenciar funcionários

### Histórico da Revisão

| Data       | Versão | Descrição        | Autor           |
|------------|--------|------------------|-----------------|
| 16/05/2025 | 1.00   | Versão Inicial   | Izabel         |
| 01/08/2025 | 2.00   | Versão revisada pós implementação | Rodrigo |

---

### 1) Resumo

Permite adicionar, editar, excluir e vizualizar os funcionários que estão cadastrados no restaurante.

---

### 2) Atores

- Restaurante (usuário administrador do estabelecimento)
- Funcionário (usuário funcionário do estabelecimento)

---

### 3) Precondições

- O restaurante deve estar autenticado no sistema.
- O restaurante deve estar logado no sistema.

---

### 4) Pós-condições

- Funcionários adicionados ou removidos serão salvos e refletidos automaticamente no sistema exibido para o restaurante.

---

### 5) Fluxos de evento

#### 5.1) Fluxo básico – Adicionar funcionário

1. [IN] O restaurante acessa a interface de gerenciamento de funcionários.  
2. [IN] Insere as credenciais do funcionários.  
3. [IN] Clica em "Adicionar funcionário".  
4. [OUT] O sistema valida as credenciais do funcionário.  
5. [OUT] O sistema salva o novo funcionário.  
6. [OUT] O sistema exibe mensagem de sucesso.

#### 5.2) Fluxo alternativo – Editar funcionário

1. [IN] O restaurante seleciona um funcionário existente.  
2. [IN] Altera o campo necessário.  
3. [OUT] O sistema valida a alteração.  
4. [OUT] O sistema atualiza as credenciais do funcionário no banco de dados.  
5. [OUT] O sistema exibe mensagem de confirmação.

#### 5.3) Fluxo alternativo – Remover funcionário

1. [IN] O restaurante clica em "Remover" ao lado de um funcionário.  
2. [OUT] O sistema solicita confirmação.  
3. [IN] O restaurante confirma a remoção.  
4. [OUT] O sistema remove o funcionário do banco de dados.
5. [OUT] Exibe mensagem de sucesso.

#### 5.4) Fluxo de exceção

- não possúi
---

### 6) Dicionário de dados

| Campo             | Tipo            | Restrições                         |
|-------------------|-----------------|------------------------------------|
| Nome do funcionário | Texto alfabético| Obrigatório |
| Email do funcionário | Texto alfanumérico | Obrigatório, único por funcionário |
| Senha | Texto alfanumérico | Obrigatório, mínimo de 8 caractéres |

---

### 7) Regras de negócio

- O email do funcionário deve ser único dentro do contexto do sistema.

---

