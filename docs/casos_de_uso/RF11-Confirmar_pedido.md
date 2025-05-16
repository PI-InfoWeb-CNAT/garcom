# Garçom

## Especificação do caso de uso - RF11 - Confirmar pedido

### Histórico da Revisão 

|    Data    |  Versão  |    Descrição    |     Autor     |
|:----------:|:--------:|:---------------:|:-------------:|
| 16/05/2025 | **1.00** | Versão Inicial  | Kilton J. Araujo |

### 1) Resumo

O cliente pode confirmar e enviar seu pedido ao restaurante, que receberá em tempo real.

### 2) Atores

Cliente e Restaurante

### 3) Precondições

Deve haver pelo menos um item no pedido.
Deve existir pelo menos um produto disponivel no cardapio do restaurante.

### 4) Pós-condições 

O cliente pode acompanhar o andamento do pedido.

### 5) Fluxos de evento

#### 5.1) Fluxo básico

1. **\[IN]** O cliente visualiza o carrinho com seus itens.
2. **\[OUT]** O sistema exibe os produtos, quantidades, preços e total.
3. **\[IN]** O cliente clica em **"Confirmar pedido"**.
4. **\[OUT]** O sistema salva o pedido e notifica o restaurante em tempo real.
5. **\[OUT]** O cliente é redirecionado para a tela de acompanhamento.

#### 5.2) Fluxo alternativo

**a) Cliente deseja editar o pedido antes de confirmar**

1. **\[IN]** O cliente clica em "adicionar mais" ou "retirar item".
2. **\[OUT]** O sistema atualiza o carrinho.

#### 5.3) Fluxo de exceção

**a) Falha de conexão ou instabilidade**

1. **\[OUT]** O sistema tenta enviar o pedido.
2. **\[OUT]** Se houver erro, exibe mensagem informando a falha.
3. **\[IN]** O cliente pode tentar reenviar ou voltar ao carrinho.

### 6) Dicionário de dados:

Foto do produto: imagem
Nome do produto: valor alfabético
Descrição do produto: valores alfanuméricos
Quantidade: valor numérico inteiro
Preço unitário: valor numérico com duas casas decimais
Subtotal do item: valor numérico com duas casas decimais
Total do pedido: valor numérico com duas casas decimais
Endereço de entrega: valores alfanuméricos (opcional, se for retirada)
Forma de pagamento: valor alfabético
Status do pedido: valor textual (ex: "Enviado", "Em preparo")
Horário do pedido: valor de data e horário (ex: 16/05/2025 19:42:00)

### 7) Regras de negócio

O pedido só pode ser enviado com pelo menos 1 item no carrinho.

O restaurante deve estar disponível no momento da confirmação.

### 8) Protótipo(s) de interface do caso de uso

Figura 1: Página indisponivel

<img src="imagens_Prototipo/Criação_Foto.png"  alt="Ilustração da página foto edição de postagem.">
