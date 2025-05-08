# Documento de visão

## Comércio Eletrônico

### Histórico da Revisão 
|  Data  | Versão | Descrição | Autor |
|:-------|:-------|:----------|:------|
| 05/05/2025 | **1.00** | Versão Inicial  | Beatriz Maria |

## 1. Objetivo do Projeto 
O projeto __Garçom__ tem como objetivo possibilitar restaurantes utilizarem um sistema de cardápio e comandas eletrônicas
 
## 2. Descrição do problema 
| | |
|:-|:-|
| **_O problema_**    | 	Falta de organização no gerenciamento dos pedidos realizados pelos clientes nos restaurantes.  |
| **_afetando_**      | A eficiência dos funcionários e a experiência dos clientes. |
| **_cujo impacto é_**| Desorganização no atendimento, aumento no tempo de espera, erros nos pedidos e insatisfação dos clientes. |
| **_uma boa solução seria_** | Desenvolver um sistema digital que permita aos restaurantes administrar pedidos de forma rápida, organizada e eficiente. |
| | |

## 3. Descrição dos usuários
| Nome | Descrição | Responsabilidades |
|:- |:- |:- |
| Clientes | Compradores nos restaurantes cadastrados | Pesquisa, visualizar e favoritar restaurantes; Realizar pedidos. |
| Restaurante | Funcionário ou dono do restaurante | Editar o perfil do restaurante e os seus produtos; Visualizar e tratar os pedidos. | 


## 4. Descrição do ambiente dos usuários 
O sistema será utilizado por dois tipos principais de usuários: clientes e funcionários dos restaurantes.

Clientes: Acessam o sistema por meio de dispositivos móveis (smartphones) ou computadores com conexão à internet. Espera-se que o acesso seja feito em ambientes variados, como dentro do próprio restaurante ou em casa.

Restaurantes: Funcionários e administradores dos restaurantes utilizarão o sistema geralmente a partir de tablets, computadores ou smartphones disponíveis no estabelecimento, em ambientes movimentados e com múltiplas demandas simultâneas. O sistema deve ser simples, rápido e estável, mesmo sob pressão.



## 5. Principais necessidades dos usuários
**Clientes:**
- Visualizar cardápios de forma clara e organizada.
- Realizar pedidos de maneira rápida e intuitiva.
- Ter transparência no acompanhamento do pedido (status, tempo estimado, etc.).
- Avaliar e favoritar restaurantes para facilitar pedidos futuros.

**Restaurantes:**
- Gerenciar produtos e cardápios com facilidade.
- Receber e processar pedidos em tempo real.
- Atualizar status dos pedidos rapidamente.
- Melhorar a organização e reduzir erros manuais no atendimento.

## 6. Alternativas concorrentes
Algumas soluções já existentes no mercado que oferecem funcionalidades semelhantes incluem:
- iFood para Restaurantes – Voltado para pedidos online, possui painel de controle para restaurantes.
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
| F04    | Visualizar pedidos em aberto             | O restaurante pode consultar os pedidos realizados pelos clientes que ainda estão em preparo ou aguardando envio para a cozinha. |
| F05    | Atualizar status do pedido               | O restaurante pode alterar o status dos pedidos (ex: recebido, em preparo, pronto, entregue).                                    |
| F06    | Cadastro e login de restaurante          | O restaurante pode se cadastrar e acessar o sistema com login e senha seguros.                                                   |
| F07    | Editar dados do perfil do restaurante    | O restaurante pode atualizar seus dados e personalizar sua página, como nome ou endereço.                           |
| F08    | Cadastro e login de cliente              | O cliente pode criar uma conta ou acessar o sistema para fazer pedidos.                                                          |
| F09    | Visualizar cardápio                      | O cliente pode visualizar o cardápio do restaurante com informações detalhadas dos produtos.                                     |
| F10    | Adicionar ou remover itens no pedido     | O cliente pode montar seu pedido escolhendo os produtos desejados e removê-los antes da confirmação.                             |
| F11    | Finalizar pedido                         | O cliente pode confirmar e enviar seu pedido ao restaurante, que receberá em tempo real.                                         |
| F12    | Acompanhar status do pedido              | O cliente pode acompanhar o andamento do seu pedido, desde o envio até a entrega na mesa.                                        |
| F13    | Avaliar restaurante ou produtos          | O cliente pode deixar avaliações e notas sobre o atendimento ou produtos recebidos.                                              |
| | | | 

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
