
# Garçom

## Especificação do caso de uso - F01 - Gerenciar produtos do cardápio

### Histórico da Revisão

| Data       | Versão | Descrição      | Autor            |
| ---------- | ------ | -------------- | ---------------- |
| 16/05/2025 | 1.00   | Versão Inicial | Rodrigo |
| 01/08/2025 | 2.00   | Versão revisada pós implementação | Rodrigo |

---

### 1) Resumo

Permite ao restaurante adicionar, remover ou editar produtos do cardápio, incluindo nome, descrição, imagem e preço, organizando melhor a exibição para os clientes.

---

### 2) Atores

* Restaurante (usuário administrador do estabelecimento)

---

### 3) Precondições

* O restaurante deve estar autenticado no sistema.
* Deve existir ao menos uma categoria criada para vincular produtos (RF02).

---

### 4) Pós-condições

* O produto será incluído, removido ou alterado na base de dados do cardápio, sendo refletido para os clientes visualizarem.

---

### 5) Fluxos de evento

#### 5.1) Fluxo básico – Adicionar produto

1. \[IN] O restaurante acessa a interface de gerenciamento de cardápio.
2. \[IN] O restaurante clica em "Adicionar novo item".
3. \[IN] O restaurante preenche os campos: Image, Nome, Descrição, Valor e Categoria.
4. \[OUT] O sistema valida os dados inseridos.
5. \[OUT] O sistema salva o novo produto no banco de dados.
6. \[OUT] O sistema exibe mensagem de sucesso.

#### 5.2) Fluxo alternativo – Editar produto

1. \[IN] O restaurante seleciona um produto existente.
2. \[IN] O restaurante edita os campos desejados.
3. \[OUT] O sistema valida as alterações.
4. \[OUT] O sistema atualiza o produto.
5. \[OUT] O sistema confirma a atualização com uma mensagem.

#### 5.3) Fluxo alternativo – Remover produto

1. \[IN] O restaurante clica em "Remover" ao lado de um item.
2. \[OUT] O sistema solicita confirmação.
3. \[IN] O restaurante confirma a remoção.
4. \[OUT] O sistema remove o produto do banco.
5. \[OUT] O sistema exibe mensagem de sucesso.

#### 5.4) Fluxo de exceção

* Caso algum campo obrigatório não seja preenchido corretamente:
  \[OUT] O sistema destaca o(s) campo(s) com erro e exibe mensagem explicativa.

---

### 6) Dicionário de dados

| Campo     | Tipo                  | Restrições                        |
| --------- | --------------------- | --------------------------------- |
| Nome      | Texto alfabético      | Obrigatório                       |
| Descrição | Texto alfanumérico    | Obrigatório                          |
| Imagem    | Arquivo (PNG/JPG)     | Obrigatório                |
| Valor     | Número decimal        | Maior que zero                    |
| Categoria | Texto (chave externa) | Deve estar cadastrada previamente |
---

### 7) Regras de negócio

* Nome e Preço são campos obrigatórios.
* O preço do produto deve ser maior que zero.
* A imagem deve estar em formato JPG, JPEG ou PNG.
* Produtos desativados não devem ser exibidos ao cliente (RF03).

---

### 8) Protótipo(s) de interface do caso de uso

(Figura 1: Tela de gerenciamento de produtos)

Quando acabar o protótipo.
