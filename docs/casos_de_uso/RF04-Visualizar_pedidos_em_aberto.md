# Garçom

## Especificação do caso de uso - RF04 - 	Visualizar pedidos em aberto

### Histórico da Revisão 

|    Data    |  Versão  |    Descrição    |     Autor     |
|:----------:|:--------:|:---------------:|:-------------:|
| 16/05/2025 | **1.00** | Versão Inicial  | Kilton J. Araujo |

### 1) Resumo

O funcionario pode consultar os pedidos realizados pelos clientes que ainda estão em preparo ou aguardando envio para a cozinha.

### 2) Atores

Funcionário (atendente ou responsável pelo preparo)

### 3) Precondições

O funcionário deve estar autenticado no sistema.

Devem existir ao menos um pedido em um dos seguintes status: "Aguardando envio" ou "Em preparo".

### 4) Pós-condições 

O funcionário visualiza os pedidos pendentes e pode iniciar ou atualizar seu status.

### 5) Fluxos de evento

#### 5.1) Fluxo básico

1. [IN] O funcionário acessa a interface de **Demandas**.
2. [OUT] O sistema exibe os pedidos disponiveis.
3. [IN] O funcionário clica em um pedido para consultar os detalhes.
4. [OUT] O sistema exibe os dados do pedido, incluindo itens, observações, horário, e status atual.

#### 5.2) Fluxo alternativo

2 - [OUT] O sistema retorna uma mensagem afirmando que não há produtos disponiveis.

#### 5.3) fluxo de exceção

a) Funcionário aplica filtros adicionais

1. [IN] O funcionário seleciona um filtro por horário, nome do cliente ou status específico.
2. [OUT] O sistema atualiza a lista de pedidos com base no filtro escolhido.


### 6) Dicionário de dados:

ID do pedido**: valor numérico
Nome do cliente: valor alfabético
Itens do pedido: lista de nomes de produtos
Observações: texto livre
Quantidade por item: valor numérico
*Horário do pedido: data e hora
Status do pedido: valor textual ("Aguardando envio", "Em preparo")
Tempo estimado de preparo: valor numérico (minutos)

### 7) Regras de negócio

O funcionário não pode alterar dados do pedido, apenas visualizar (edições ocorrem em outro caso de uso).

### 8) Protótipo(s) de interface do caso de uso

Figura 1: Página indisponivel

<img src="imagens_Prototipo/Criação_Foto.png"  alt="Ilustração da página foto edição de postagem.">
