# Garçom

## Especificação do caso de uso - RF05 - Atualizar status de pedido

### Histórico da Revisão 

|    Data    |  Versão  |    Descrição    |     Autor     |
|:----------:|:--------:|:---------------:|:-------------:|
| 16/05/2025 | **1.00** | Versão Inicial  | Izabel Alice |

---

### 1) Resumo

O funcionário pode mudar o status dos pedidos realizados pelos clientes para "Em preparo", "Aguardando envio para a cozinha" ou "Finalizado".

---

### 2) Atores

- Funcionário (atendente ou responsável pelo preparo)

---

### 3) Precondições

- O funcionário deve estar autenticado no sistema.
- Deve existir ao menos um pedido com status "Aguardando envio" ou "Em preparo".

---

### 4) Pós-condições 

- O funcionário visualiza os pedidos pendentes.
- O funcionário pode iniciar ou atualizar o status de um pedido.

---

### 5) Fluxos de evento

#### 5.1) Fluxo básico

1. [IN] O funcionário acessa a interface de **Comandas**.
2. [OUT] O sistema exibe os pedidos disponíveis.
3. [IN] O funcionário clica em um pedido para consultar os detalhes.
4. [OUT] O sistema exibe os dados do pedido, incluindo:
   - Itens
   - Observações
   - Horário
   - Status atual
5. [IN] O funcionário clica em atualizar o status do pedido.
6. [IN] O funcionário clica em salvar alterações.
7. [OUT] O sistema atualiza o status do pedido imediatamente para o cliente.
8. [OUT] O sistema retorna uma mensagem de sucesso.

#### 5.2) Fluxo alternativo

- 2a. [OUT] O sistema retorna uma mensagem informando que não há pedidos disponíveis no momento.

#### 5.3) Fluxo de exceção

**Aplicação de filtros**

Não possúi.

---

### 6) Dicionário de dados

| Campo                      | Tipo de Dado                |
|---------------------------|-----------------------------|
| ID do pedido              | Numérico                    |
| Itens do pedido           | Lista de produtos           |
| Observações               | Texto livre                 |
| Quantidade por item       | Numérico                    |
| Horário do pedido         | Data e hora                 |
| Status do pedido          | Texto ("Aguardando envio", "Em preparo", "Finalizado") |

---

### 7) Regras de negócio

- O funcionário **não pode alterar os dados** do pedido neste caso de uso — apenas visualizar.
- Edições no pedido ocorrem em outro caso de uso.

---

### 8) Protótipo(s) de interface do caso de uso
