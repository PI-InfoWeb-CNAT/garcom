# Garçom

## Especificação do caso de uso - F12 - Acompanhar status do pedido

### Histórico da Revisão 

|    Data    |  Versão  |    Descrição    |     Autor     |
|:----------:|:--------:|:---------------:|:-------------:|
| 16/05/2025 | **1.00** | Versão Inicial  | Kilton J. Araujo |

### 1) Resumo

Permite que o cliente visualize em tempo real o status do seu pedido, acompanhando cada etapa desde o envio, preparo e entrega à mesa.
### 2) Atores

Usuário cliente

### 3) Precondições

O cliente deve ter realizado um pedido válido.
O pedido precisa estar em algum dos status definidos pelo sistema.

### 4) Pós-condições 

O cliente visualiza o progresso completo do pedido.

### 5) Fluxos de evento

#### 5.1) Fluxo básico

1. [IN] O cliente acessa a interface de acompanhamento.
2. [OUT] O sistema exibe o status atual do pedido com etapas visuais e texto.
3. [OUT] Conforme o restaurante atualiza o status (ex: “Em preparo”, “Pronto”, “A caminho”), a interface pode ser atualizada.
4. [OUT] Ao final, o status muda para “Entregue” e o pagamento pode ser realizado.

---

#### 5.2) Fluxo alternativo

a) Cliente acessa a página após o pedido estar pronto ou entregue**

1. [OUT] O sistema mostra o status atual do pedido (por exemplo, "Pronto", "Entregue").

#### 5.3) fluxo de exceção

Nenhum por enquanto

### 6) Dicionário de dados:

ID do pedido: valor numérico

Nome do cliente: valor alfabético

Itens do pedido: lista de nomes de produtos

Observações: texto livre

Quantidade por item: valor numérico

Horário do pedido: data e hora

Status do pedido: valor textual ("Aguardando envio", "Em preparo")

Tempo estimado de preparo: valor numérico (minutos)

### 7) Regras de negócio

Um pedido não pode regredir de status.

O cliente não pode editar um pedido que esteja em preparo.

### 8) Protótipo(s) de interface do caso de uso

Figura 1: Página indisponivel

<img src="imagens_Prototipo/Criação_Foto.png"  alt="Ilustração da página foto edição de postagem.">
