# Garçom

## Especificação do caso de uso - F02 - Gerenciar categorias do cardápio

### Histórico da Revisão

| Data       | Versão | Descrição        | Autor           |
|------------|--------|------------------|-----------------|
| 16/05/2025 | 1.00   | Versão Inicial   | Rodrigo         |
| 01/08/2025 | 2.00   | Versão revisada pós implementação | Rodrigo |

---

### 1) Resumo

Permite ao restaurante organizar os produtos do cardápio em categorias, como "Entradas", "Pratos principais", "Bebidas", entre outras, facilitando a navegação e usabilidade para os clientes.

---

### 2) Atores

- Restaurante (usuário administrador do estabelecimento)

---

### 3) Precondições

- O restaurante deve estar autenticado no sistema.

---

### 4) Pós-condições

- Categorias criadas, editadas ou removidas serão salvas e refletidas no cardápio exibido aos clientes.

---

### 5) Fluxos de evento

#### 5.1) Fluxo básico – Adicionar categoria

1. [IN] O restaurante acessa a interface de gerenciamento de cardápio.  
2. [IN] Clica em "Adicionar nova categoria".  
3. [IN] Insere o nome da nova categoria.  
4. [OUT] O sistema valida o nome da categoria.  
5. [OUT] O sistema salva a nova categoria.  
6. [OUT] O sistema exibe mensagem de sucesso.

#### 5.2) Fluxo alternativo – Editar categoria

1. [IN] O restaurante seleciona uma categoria existente.  
2. [IN] Altera o nome da categoria.  
3. [OUT] O sistema valida a alteração.  
4. [OUT] O sistema atualiza a categoria no banco de dados.  
5. [OUT] O sistema exibe mensagem de confirmação.

#### 5.3) Fluxo alternativo – Remover categoria

1. [IN] O restaurante clica em "Remover" ao lado de uma categoria.  
2. [OUT] O sistema solicita confirmação.  
3. [IN] O restaurante confirma a remoção.  
4. [OUT] O sistema verifica se a categoria está vinculada a produtos:  
   - Se **sim**: o sistema exibe mensagem de erro.  
   - Se **não**: o sistema remove a categoria.  
5. [OUT] Exibe mensagem de sucesso.

#### 5.4) Fluxo de exceção

- Caso o nome da categoria esteja em branco:  
  [OUT] O sistema impede a criação.  

- Tentativa de excluir categoria com produtos vinculados sem tratativa:  
  [OUT] O sistema impede a exclusão.

---

### 6) Dicionário de dados

| Campo             | Tipo            | Restrições                         |
|-------------------|-----------------|------------------------------------|
| Nome da categoria | Texto alfabético| Obrigatório, único por restaurante |

---

### 7) Regras de negócio

- O nome da categoria deve ser único dentro do contexto do restaurante.
- Uma categoria não pode ser removida enquanto estiver vinculada a produtos, a menos que esses produtos sejam realocados ou removidos.

---

### 8) Protótipo(s) de interface do caso de uso

**Figura 1: Tela de gerenciamento de categorias**

Colocar quando acabar o protótipo.
