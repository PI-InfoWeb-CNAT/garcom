# Garçom

## Especificação do caso de uso - F08 - Editar dados do perfil do restaurante

### Histórico da Revisão 

|    Data    |  Versão  |    Descrição    |     Autor     |
|:----------:|:--------:|:---------------:|:-------------:|
| 16/05/2025 | **1.00** | Versão Inicial  | Beatriz Maria |
| 01/08/2025 | **2.00**   | Versão revisada pós implementação | Rodrigo |

### 1) Resumo

Permite que o restaurante altere seus dados de cadastro.

### 2) Atores

Usuário restaurante (pessoa responsável por um restaurante)

### 3) Precondições

O restaurante deve estar cadastrado no sistema.

### 4) Pós-condições 

Os dados do perfil são atualizados no banco de dados e refletidos imediatamente nas telas do sistema.

### 5) Fluxos de evento

#### 5.1) Fluxo básico
5.1) Fluxo básico – Edição de perfil
1 - [IN]  O restaurante acessa a área de editar perfil.
2 - [OUT] O sistema exibe os dados atuais do restaurante.
3 - [IN] O restaurante edita os campos desejados (nome, e-mail, telefone, endereço, descrição etc).
4 - [OUT] O sistema valida os dados alterados.
5 - [OUT] O sistema atualiza os dados no banco de dados.
6 - [OUT] O sistema exibe uma mensagem de confirmação da atualização com sucesso.


a) Campos obrigatórios em branco

1 - [IN] O restaurante tenta salvar o perfil com campos obrigatórios vazios.
2 - [Out] O sistema exibe mensagem de erro indicando os campos que devem ser preenchidos.

b) E-mail ou CNPJ já utilizados por outro restaurante

1 - [IN] O restaurante insere um e-mail ou CNPJ já cadastrados.
2 - [Out] O sistema exibe mensagem de erro e impede a atualização.

c) Dados inválidos (formato errado de telefone, CNPJ etc.)

1 - [IN] O restaurante insere dados em formatos inválidos.
2 - [OUT] O sistema valida os campos e indica os erros específicos.

### 6) Regras de negócio

- Campos obrigatórios não podem estar vazios.
- O e-mail deve ser único no sistema.
- O CNPJ, se fornecido, também deve ser único e válido.
- Os dados inseridos devem respeitar o formato adequado de cada campo.



### 8) Protótipo(s) de interface do caso de uso
`vazio`
