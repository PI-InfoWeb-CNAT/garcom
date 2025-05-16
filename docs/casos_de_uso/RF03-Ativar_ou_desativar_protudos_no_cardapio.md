# Garçom

## Especificação do caso de uso - F03 - Ativar ou desativar produtos do cardápio

### Histórico da Revisão

| Data       | Versão | Descrição        | Autor           |
|------------|--------|------------------|-----------------|
| 16/05/2025 | 1.00   | Versão Inicial   | Rodrigo         |

---

### 1) Resumo

Permite ao restaurante ativar ou desativar produtos do cardápio temporariamente, de acordo com a disponibilidade de estoque, sem necessidade de excluí-los.

---

### 2) Atores

- Restaurante (usuário administrador do estabelecimento)

---

### 3) Precondições

- O restaurante deve estar autenticado no sistema.
- Devem existir produtos cadastrados no cardápio.

---

### 4) Pós-condições

- O status do produto será atualizado, sendo refletido na interface dos clientes.

---

### 5) Fluxos de evento

#### 5.1) Fluxo básico – Desativar produto

1. [IN] O restaurante acessa a interface de gerenciamento de produtos.  
2. [IN] O restaurante localiza o produto desejado e clica na opção "Desativar".  
3. [OUT] O sistema altera o status do produto para "indisponível".  
4. [OUT] O produto fica indisponível no cardápio visível ao cliente.  
5. [OUT] O sistema exibe mensagem de sucesso.

#### 5.2) Fluxo alternativo – Ativar produto

1. [IN] O restaurante visualiza a lista de produtos inativos.  
2. [IN] O restaurante clica na opção "Ativar" ao lado de um produto.  
3. [OUT] O sistema altera o status do produto para "disponível".  
4. [OUT] O produto volta a ser exibido normalmente no cardápio para os clientes.  
5. [OUT] O sistema exibe mensagem de sucesso.

---

### 6) Dicionário de dados

| Campo         | Tipo              | Restrições                   |
|---------------|-------------------|------------------------------|
| Nome do produto | Texto alfabético | Obrigatório                  |
| Status        | Booleano  |  |

---

### 7) Regras de negócio

- O sistema deve permitir alternar livremente entre ativo e inativo sem perda de dados do produto.
- Produtos inativos não podem ser adicionados a pedidos.

---

### 8) Protótipo(s) de interface do caso de uso

**Figura 1: Tela de gerenciamento com botão de ativar/desativar**
Quando acabar o protótipo.
