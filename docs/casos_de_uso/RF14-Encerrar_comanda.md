# Garçom

## Especificação do caso de uso - F13 - Encerrar comanda

### Histórico da Revisão
|  Data  | Versão | Descrição | Autor |
|:-------|:-------|:----------|:------|
| 16/05/2023 | **1.00** | Versão inicial  | Beatriz Maria |


### 1. Resumo 
Permite que o usuário com perfil de funcionário encerre a comanda de uma determinada mesa, fazendo com que os pedidos vinculados a essa mesa sejam somados e retornando o valor total da compra.

### 2. Atores 
- Funcionário

### 3. Pré-condições
São pré-condições para iniciar este caso de uso:
- O restaurante deve conter ao menos uma mesa habilitada no estabelecimento.


### 4.Pós-condições
Após a execução deste casos de uso, espera que o sistema:
- Mostre a mesa como desabilitada na a interface dos funcionários
- Não permita que pedidos sejam vinculados a mesa aberta

### 5. Fluxos de evento

#### 5.1. Fluxo Principal

1. **\[IN]** O funcionário acessa a interface de controle de mesas.
2. **\[OUT]** O sistema exibe a lista de mesas e seus respectivos status.
3. **\[IN]** O funcionário seleciona uma mesa e clica em **"Encerrar comanda"**.
4. **\[OUT]** O sistema soma os valores dos pedidos vinculados à mesa.
5. **\[OUT]** O sistema exibe o valor total da compra ao funcionário.
6. **\[OUT]** O sistema altera o status da mesa para "Desabilitada".
7. **\[OUT]** O sistema exibe uma mensagem de confirmação da desativação da mesa.
8. **\[OUT]** A mesa passa a aparecer como desabilitada na interface do Garçom.


#### 5.2. Fluxo de Exceção

**a) Mesa não selecionada**

1. **\[IN]** O funcionário clica em "Encerrar Comanda" sem selecionar uma mesa.
2. **\[OUT]** O sistema exibe uma mensagem de erro solicitando a seleção de uma mesa.

### 6) Dicionário de dados:
| Campo                         | Tipo de Dado            | Descrição                                              |
| ----------------------------- | ----------------------- | ------------------------------------------------------ |
| ID da mesa                    | Valor numérico          | Identificador único da mesa no sistema                 |
| Número da mesa                | Valor numérico          | Número visível da mesa no restaurante                  |
| Status da mesa                | Valor textual           | Indica se a mesa está "Habilitada" ou "Desabilitada"   |
| Data/hora de encerramento     | Data e hora             | Momento em que a mesa foi desabilitada                 |
| Responsável pelo encerramento | Valor alfabético        | Nome do funcionário que encerrou a comanda             |
| Pedidos vinculados            | Lista de IDs de pedidos | Lista de identificadores dos pedidos associados à mesa |
| Valor total da comanda        | Valor numérico          | Soma dos valores dos pedidos vinculados à mesa         |


### 7) Regras de negócio

- Uma mesa com status "Desabilitada" não pode ser encerrada novamente.
- O sistema deve registrar o horário e o responsável sempre que uma mesa for habilitada.
- O sistema deve calcular e apresentar o valor total dos pedidos ao encerrar uma comanda.

### 8) Protótipo(s) de interface do caso de uso
`vazio`
