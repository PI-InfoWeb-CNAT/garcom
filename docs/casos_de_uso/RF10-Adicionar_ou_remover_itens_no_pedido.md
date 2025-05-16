# Garçom

## Especificação do caso de uso - F10 - Adicionar ou remover itens no pedido

### Histórico da Revisão 

|    Data    |  Versão  |    Descrição    |     Autor     |
|:----------:|:--------:|:---------------:|:-------------:|
| 16/05/2025 | **1.00** | Versão Inicial  | Kilton J. Araujo |

### 1) Resumo

Permite ao cliente montar seu pedido selecionando os itens desejados do cardápio do restaurante, com a possibilidade de adicionar ou remover produtos antes da confirmação do pedido.

### 2) Atores

Usuário cliente

### 3) Precondições

O cliente deve ter acesso ao cardápio de um restaurante.
Um funcionario deve abrir uma comanda para a mesa do cliente.
Para remover um item do pedido, a preparação do mesmo não pode ter sido iniciada.

### 4) Pós-condições 

O cliente terá um pedido personalizado, pronto para ser preparado e enviado para a sua mesa.

### 5) Fluxos de evento

#### 5.1) Fluxo básico

1 - [IN] O cliente acessa o cardápio de um restaurante.

2 - [IN] O cliente seleciona os itens que deseja adicionar ao pedido.

3 - [OUT] O sistema adiciona os itens ao carrinho/pedido em aberto.

4 - [IN] O cliente visualiza o resumo do pedido com os itens selecionados.

5 - [IN] O cliente pode clicar em "remover" para tirar itens do pedido.

6 - [OUT] O sistema atualiza o pedido em tempo real.

7 - [IN] O cliente clica em “Confirmar pedido”.

8 - [OUT] O sistema envia o pedido para o restaurante.

#### 5.2) Fluxo alternativo

1 - [IN] O cliente clica no campo de quantidade de um item no carrinho.

2 - [IN] O cliente altera o número de unidades.

3 - [OUT] O sistema recalcula o valor total do pedido em tempo real.

#### 5.3) fluxo de exceção

1 - [IN] O cliente tenta adicionar um item que está temporariamente indisponível.

2 - [OUT] O sistema exibe uma mensagem de erro: “Produto indisponível no momento”.

### 6) Dicionário de dados:

Foto do produto: imagem.

Nome do produto: valor alfabético.

Descrição do produto: valores alfanuméricos.

Quantidade: valor numérico inteiro.

Preço unitário: valor numérico com duas casas decimais.

Subtotal do item: valor numérico com duas casas decimais.

Total do pedido: valor numérico com duas casas decimais.

Status do item (disponível/indisponível): valor booleano.

Horário de funcionamento do restaurante: valor horário (hh:mm).

Mensagem de erro: valor textual.

### 7) Regras de negócio

O pedido só pode ser confirmado com pelo menos um item.

Produtos indisponíveis não devem ser adicionáveis ao pedido.

O cliente pode alterar quantidades ou remover produtos antes da confirmação.

O valor total do pedido deve ser atualizado automaticamente.

### 8) Protótipo(s) de interface do caso de uso

Figura 1: Página indisponivel

<img src="imagens_Prototipo/Criação_Foto.png"  alt="Ilustração da página foto
