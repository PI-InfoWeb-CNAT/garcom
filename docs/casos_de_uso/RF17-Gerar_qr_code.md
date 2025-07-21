# Garçom

## Especificação do caso de uso - F17 - Gerar QR Code das mesas

### Histórico da Revisão

| Data       | Versão | Descrição                                      | Autor           |
|------------|--------|------------------------------------------------|-----------------|
| 17/07/2025 | 1.00   | Versão Inicial                                 | Rodrigo |

---

### 1) Resumo

Permite que o sistema gere automaticamente um QR Code para cada nova mesa cadastrada. Além disso, o restaurante pode gerar novamente todos os QR Codes a qualquer momento, manualmente.

---

### 2) Atores

- Restaurante

---

### 3) Precondições

- O restaurante deve estar autenticado no sistema.
- Deve haver pelo menos uma mesa cadastrada.

---

### 4) Pós-condições

- Ao criar uma mesa, um QR Code será gerado automaticamente.
- O restaurante pode baixar os QR Codes individualmente ou em lote.
- As URLs dos QR Codes permanecem únicas e funcionais.

---

### 5) Fluxos de evento

#### 5.1) Fluxo automático – Geração ao criar uma mesa

1. [IN] O restaurante acessa a área de gerenciamento de mesas.  
2. [IN] Clica em “Adicionar mesa” e preenche os dados.  
3. [OUT] O sistema cria a nova mesa e gera automaticamente um QR Code vinculado a ela.  
4. [OUT] O QR Code fica disponível para visualização, download ou impressão.  
5. [OUT] O sistema exibe mensagem de sucesso.

---

#### 5.2) Fluxo manual – Gerar QR Codes novamente (em lote)

1. [IN] O restaurante acessa a área de mesas.  
2. [IN] Clica em “Gerar todos os QR Codes novamente”.  
3. [OUT] O sistema gera os QR Codes para todas as mesas existentes.  
4. [OUT] Os arquivos são oferecidos para download em lote (.pdf). 
5. [OUT] O sistema exibe confirmação de sucesso.

---

### 6) Dicionário de dados

| Campo           | Tipo                   | Descrição                                          |
|------------------|------------------------|----------------------------------------------------|
| QR Code         | Arquivo                | Representa a URL pública de acesso ao cardápio     |
| URL do cardápio | Texto (link)           | Endereço vinculado à mesa específica               |
| Número da mesa  | Numérico ou texto      | Identificação única da mesa no sistema             |

---

### 7) Regras de negócio

- O QR Code gerado deve estar vinculado exclusivamente à mesa correspondente.
- A URL deve permitir que o cliente acesse diretamente o cardápio daquela mesa.
- O sistema não deve criar QR Codes duplicados para a mesma mesa.

---

