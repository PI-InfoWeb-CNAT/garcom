# Garçom

## Especificação do caso de uso - F13 - Habilitar comanda para mesa

### Histórico da Revisão
|  Data  | Versão | Descrição | Autor |
|:-------|:-------|:----------|:------|
| 16/05/2023 | **1.00** | Versão inicial  | Beatriz Maria |


### 1. Resumo 
Permite que o usuário com perfil de funcionário habilite uma mesa no sistema, que funcionará como comanda, permitindo ou não que essa mesa receba pedidos.

### 2. Atores 
- Funcionário

### 3. Pré-condições
São pré-condições para iniciar este caso de uso:
- O restaurante deve conter ao menos uma mesa no estabelecimento.


### 4.Pós-condições
Após a execução deste casos de uso, espera que o sistema:
- Mostre a mesa como habilitada para a interface dos funcionários
- Permita que pedidos sejam vinculados a mesa aberta

### 5. Fluxos de evento

#### 5.1. Fluxo Principal

1. **\[IN]** O funcionário acessa a interface de controle de mesas.
2. **\[OUT]** O sistema exibe a lista de mesas e seus respectivos status.
3. **\[IN]** O funcionário seleciona uma mesa e clica em **"Habilitar Mesa"**.
4. **\[OUT]** O sistema processa a solicitação e altera o status da mesa para **"habilitada"**.
5. **\[OUT]** O sistema exibe uma mensagem de confirmação de habilitação.
6. **\[OUT]** A mesa passa a aparecer como habilitada na interface do Garçom.


#### 5.2. Fluxo de Exceção

**a) Mesa não selecionada**

1. **\[IN]** O funcionário clica em **"Habilitar Mesa"** sem selecionar uma mesa.
2. **\[OUT]** O sistema exibe uma mensagem de erro solicitando a seleção de uma mesa.

### 6) Dicionário de dados:
| Campo                        | Tipo de Dado                       | Descrição                                                  |
| ---------------------------- | ---------------------------------- | ---------------------------------------------------------- |
| ID da mesa                   | Valor numérico                     | Identificador único da mesa no sistema                     |
| Número da mesa               | Valor numérico                     | Número visível da mesa no restaurante                      |
| Status da mesa               | Valor textual                      | Indica se a mesa está "Habilitada" ou "Desabilitada"       |
| Data/hora de habilitação     | Data e hora                        | Momento em que a mesa foi habilitada pelo funcionário      |
| Responsável pela habilitação | Valor alfabético                   | Nome do funcionário que realizou a habilitação             |
| Pedidos vinculados           | Lista de IDs de pedidos (opcional) | Lista com os identificadores dos pedidos associados à mesa |



### 7) Regras de negócio

- Uma mesa já habilitada não pode ser habilitada novamente.
- O sistema deve registrar o horário e o responsável sempre que uma mesa for habilitada.

### 8) Protótipo(s) de interface do caso de uso
`vazio`
