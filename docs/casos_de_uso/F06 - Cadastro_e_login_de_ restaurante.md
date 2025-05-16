# Garçom

## Especificação do caso de uso - F06 - Login e cadastro de restaurante

### Histórico da Revisão 

|    Data    |  Versão  |    Descrição    |     Autor     |
|:----------:|:--------:|:---------------:|:-------------:|
| 16/05/2025 | **1.00** | Versão Inicial  | Kilton J. Araújo |

### 1) Resumo

Permite aos usuários que possuem um restaurante podem se cadastrar e acessar o sistema com login e senha seguros.

### 2) Atores

Usuário restaurante (pessoa responsável por um restaurante)

### 3) Precondições

O restaurante ainda não pode estar cadastrado no sistema (para fluxo de cadastro).

O restaurante deve estar cadastrado (para login).


### 4) Pós-condições 

O usuário restaurante terá acesso à página inicial do sistema, podendo gerenciar seu perfil, produtos e pedidos.

### 5) Fluxos de evento

#### 5.1) Fluxo básico
5.1) Fluxo básico – Login
1 - [IN] O usuário acessa a página de login.

2 - [IN] O usuário insere seu e-mail e senha.

3 - [OUT] O sistema valida as credenciais.

4 - [OUT] O sistema libera o acesso ao painel do restaurante.

5.2) Fluxo alternativo – Cadastro de restaurante
1 - [IN] O usuário acessa a tela de cadastro.

2 - [IN] O usuário preenche os seguintes dados: Nome do restaurante, Tipo de restaurante, CNPJ (opcional), Descrição, CEP, Telefone (opcional), Instagram / Facebook (opcional), Endereço completo, Horários de funcionamento, E-mail e Senha.

3 - [OUT] O sistema valida os dados inseridos.

4 - [OUT] O sistema armazena os dados no banco.

5 - [OUT] O sistema redireciona o usuário para a tela de login com mensagem de sucesso.

a) Erro nas credenciais

1 - [IN] O usuário entra com as credenciais(E-mail e senha).
2 - [Out] O sistema mostra um erro falando que as credenciais de E-mail e/ou senha são invalidadas.

b) Credenciais vazias

1 - [IN] O usuário entra sem as credenciais(E-mail e/ou senha).
2 - [Out] O sistema mostra um erro falando que as credenciais E-mail e/ou senha estão vazias e indica onde está o erro.

c) Usuário esqueceu a senha

1 - [IN] O usuário acessa a tela de login.
2 - [OUT] O sistema exibe os campos para inserir e-mail e senha, além da opção "Esqueci minha senha".
3 - [IN] O usuário clica em "Esqueci minha senha".
4 - [OUT] O sistema solicita que o usuário insira o e-mail cadastrado.
5 - [IN] O usuário insere o e-mail e confirma a solicitação.
6 - [OUT] O sistema verifica se o e-mail existe no banco de dados.

Se o e-mail for válido, o sistema envia um link de redefinição para o e-mail informado.

Se o e-mail não for encontrado, o sistema exibe uma mensagem de erro.
7 - [IN] O usuário acessa o link de redefinição de senha.
8 - [OUT] O sistema exibe um campo para inserir e confirmar a nova senha.
9 - [IN] O usuário insere a nova senha e confirma.
10 - [OUT] O sistema valida e armazena a nova senha.
11 - [OUT] O usuário é redirecionado para a tela de login e pode acessar o sistema com a nova senha.

### 6) Dicionário de dados

E-mail - dados alfabeticos;
senha - dados alfanuméricos de mais de 8 caracteres;

### 7) Regras de negócio

senha - deve ter no mínimo 8 caracteres.

### 8) Protótipo(s) de interface do caso de uso
Figura 1: Primeira página do site

<img src="imagens_Prototipo/Login_2.png" alt="Ilustração da primeira página de login.">

Figura 2: Página de login

<img src="imagens_Prototipo/Login_3.png" alt="Ilustração da página de login.">
