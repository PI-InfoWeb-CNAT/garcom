# Documento de visão

## Comércio Eletrônico

### Histórico da Revisão 
|  Data  | Versão | Descrição | Autor |
|:-------|:-------|:----------|:------|
| 05/05/2025 | **1.00** | Versão Inicial  | Beatriz Maria |
| 15/05/2025 | **2.00** | Modificações nos requisitos e adição da entidade funcionários | Beatriz Maria e Vinicius Henrique |
| 10/07/2025 | **3.00** | Adição de novos casos de uso | Rodrigo |
| 10/07/2025 | **3.50** | Correção dos casos de uso | Kilton J. Araujo |

## 1. Objetivo do Projeto 
O projeto __Garçom__ tem como objetivo possibilitar restaurantes utilizarem um sistema de cardápio e comandas eletrônicas
 
## 2. Descrição do problema 
| | |
|:-|:-|
| **_O problema_**    | 	Falta de organização no gerenciamento dos pedidos realizados pelos clientes nos restaurantes.  |
| **_afetando_**      | A eficiência dos funcionários e a experiência dos clientes. |
| **_cujo impacto é_**| Desorganização no atendimento, aumento no tempo de espera, erros nos pedidos, insatisfação dos clientes e sobrecarga dos garçons. |
| **_uma boa solução seria_** | Desenvolver um sistema digital que permita aos restaurantes administrar pedidos de forma rápida, organizada e eficiente. |
| | |

## 3. Descrição dos usuários
| Nome | Descrição | Responsabilidades |
|:- |:- |:- |
| Clientes | Compradores nos restaurantes cadastrados | Vizualizar cádapio; Realizar pedidos. |
| Restaurante | Gerente do restaurante | Editar o perfil do restaurante e os seus produtos; Gerenciar cardápio. |
| Funcionário | Funcionário do restaurante | Abrir e fechar comandas; Visualizar e tratar os pedidos.


## 4. Descrição do ambiente dos usuários 
O sistema será utilizado por três tipos principais de usuários: clientes e funcionários (gerentes/garçons) dos restaurantes.

Clientes: Acessam o sistema por meio de dispositivos móveis (smartphones) ou computadores com conexão à internet. Espera-se que o acesso seja feito no ambiente do restaurante, e o acesso seja feito através de QRCODE.

Funcionários: Utilizarão o sistema geralmente a partir de tablets, computadores ou smartphones disponíveis no estabelecimento, em ambientes movimentados e com múltiplas demandas simultâneas. O sistema deve ser simples, rápido e estável, mesmo sob pressão.

Restaurantes: Acessam o sistema geralmente por computadores, podendo estar ou não no estabelecimento.


## 5. Principais necessidades dos usuários
**Clientes:**
- Visualizar cardápios de forma clara e organizada.
- Realizar pedidos de maneira rápida e intuitiva.
- Ter transparência no acompanhamento do pedido (status, tempo estimado, etc.).

**Restaurantes:**
- Gerenciar produtos e cardápios com facilidade.
- Cadastrar funcionários responsáveis pelo atendimento e funcionamento do restaurante.

**Funcionários:**
- Receber e processar pedidos em tempo real.
- Atualizar status dos pedidos rapidamente.
- Melhorar a organização e reduzir erros manuais no atendimento.

## 6. Alternativas concorrentes
Algumas soluções já existentes no mercado que oferecem funcionalidades semelhantes incluem:
- iFood – Voltado para pedidos online, possui painel de controle para restaurantes.
- AnotaAi – Plataforma de delivery com gerenciamento de cardápios.
- Goomer – Solução focada em cardápios digitais e autoatendimento em restaurantes.

No entanto, muitos desses sistemas têm custos elevados, foco em delivery ou pouca personalização para restaurantes pequenos, criando espaço para uma solução mais acessível e personalizada como o Garçom.


## 7.	Visão geral do produto
O sistema Garçom será uma plataforma voltada para restaurantes que desejam modernizar o atendimento ao cliente e o gerenciamento de pedidos. Por meio de interfaces intuitivas e responsivas, tanto os clientes quanto os funcionários poderão interagir com o sistema para criar uma experiência de pedido mais ágil, precisa e organizada. O produto visa reduzir o tempo de espera, eliminar erros e aumentar a satisfação dos clientes, promovendo não só uma melhora para os clientes mas também aos funcionários.

## 8.	Requisitos funcionais
| | | | 
|:---  |:--- |:--- |
| Código | Nome | Descrição |
| F01    | Gerenciar produtos do cardápio           | O restaurante pode adicionar, remover ou alterar os produtos disponíveis no cardápio, incluindo nome, descrição, imagem e preço. |
| F02    | Gerenciar categorias do cardápio         | O restaurante pode organizar seus produtos em categorias (por exemplo: entradas, pratos principais, bebidas, sobremesas).        |
| F03    | Ativar ou desativar produtos do cardápio | O restaurante pode disponibilizar ou ocultar temporariamente produtos no cardápio, conforme a disponibilidade.                   |
| F04    | Visualizar pedidos em aberto             | O funcionario pode consultar os pedidos realizados pelos clientes que ainda estão em preparo ou aguardando envio para a cozinha. |
| F05    | Atualizar status do pedido               | O funcionario pode alterar o status dos pedidos (ex: recebido, em preparo, pronto, entregue).                                    |
| F06    | Cadastro e login de restaurante          | O restaurante pode se cadastrar e acessar o sistema com login e senha seguros.                                                   |
| F07    | Gerenciar funcionario                    | O restaurante pode cadastrar, editar ou remover funcionarios.                               |
| F08    | Editar dados do perfil do restaurante    | O restaurante pode atualizar seus dados e personalizar sua página, como nome ou endereço.                                        |
| F09    | Visualizar cardápio                      | O cliente pode visualizar o cardápio do restaurante com informações detalhadas dos produtos.                                     |
| F10    | Adicionar ou remover itens no pedido     | O cliente pode montar seu pedido escolhendo os produtos desejados e removê-los antes da confirmação.                             |
| F11    | Confirmar pedido                         | O cliente pode confirmar e enviar seu pedido ao restaurante, que receberá em tempo real.                                         |
| F12    | Acompanhar status do pedido              | O cliente pode acompanhar o andamento do seu pedido, desde o envio até a entrega na mesa.                                        |
| F13    | Habilitar comanda para mesa              | O funcionário pode habilitar ou desabilitar mesas, disponibilizando-as para uso no sistema e permitindo o início de comandas vinculadas a elas.|
| F14    | Encerrar comanda                         | O funcionário finaliza a comanda que contém os pedidos de determinada mesa.                                                      |
| F15    | Acesso ao cardápio via QR Code           | O cliente pode acessar o cardápio digital escaneando um QR Code em sua mesa.                                                     |
| F16    | Login de funcionário                     | O funcionar pode acessar o sistema com login e senha seguros.                                                                    |
| F17    | Gerar QR Code                            | O restaurante pode gerar o QR das mesas para acesso do cliente.                                                                  | 
| F18    | Gerenciar mesas                            | O restaurante adicionar ou excluir mesas.                                                                  | 


## 9.	Requisitos não-funcionais 
| | | | | |
|:---  |:--- |:--- |:--- |:--- |
| Código | Nome | Descrição | Categoria | Classificação |
| NF01   | Design responsivo               | A interface do sistema se adapta a diferentes dispositivos (smartphones, tablets, desktops), garantindo conforto na navegação.             | Usabilidade     | Obrigatório   |
| NF02   | Acesso com conexão à internet   | O sistema depende de conexão contínua à internet para funcionar corretamente, especialmente para comunicação em tempo real dos pedidos.    | Disponibilidade | Obrigatório   |
| NF03   | Criptografia de dados sensíveis | Dados sensíveis, como senhas e informações pessoais, são armazenados de forma criptografada no banco de dados.                             | Segurança       | Obrigatório   |
| NF04   | Interface objetiva e intuitiva  | O sistema apresenta uma interface clara e organizada, facilitando o uso tanto para os clientes quanto para os funcionários do restaurante. | Usabilidade     | Obrigatório   |
| NF05   | Tempo de resposta rápido        | O sistema deve apresentar respostas rápidas às ações dos usuários para não comprometer o atendimento.                                      | Performance     | Recomendado   |
| | | | | |
