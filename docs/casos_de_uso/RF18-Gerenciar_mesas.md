# Garçom

## Especificação do caso de uso - F18 - Gerenciar mesas

### Histórico da Revisão

| Data       | Versão | Descrição        | Autor           |
|------------|--------|------------------|-----------------|
| 17/07/2025 | 1.00   | Versão Inicial   | Rodrigo |

---

### 1) Resumo

Permite ao restaurante adicionar, editar ou excluir mesas do sistema, organizando o ambiente e vinculando comandas e QR Codes a cada mesa.

---

### 2) Atores

- Restaurante

---

### 3) Precondições

- O restaurante deve estar autenticado no sistema.

---

### 4) Pós-condições

- A lista de mesas será atualizada no sistema.
- As mesas poderão ser utilizadas para gerar QR Codes e abrir comandas.

---

### 5) Fluxos de evento

#### 5.1) Fluxo básico – Adicionar mesa

1. [IN] O restaurante acessa a área de gerenciamento de mesas.  
2. [IN] Clica em “Adicionar mesa”.  
3. [IN] Informa o número ou nome da mesa.  
4. [OUT] O sistema valida e adiciona a mesa.  
5. [OUT] Exibe confirmação de sucesso.

#### 5.2) Fluxo alternativo – Excluir mesa

1. [IN] O restaurante clica em “Excluir” ao lado da mesa.  
2. [OUT] O sistema verifica se há comandas ativas.  
3. [IN] O restaurante confirma a exclusão.  
4. [OUT] O sistema exclui a mesa e exibe mensagem de sucesso.

---

### 5.3) Fluxo de exceção

- Tentativa de excluir mesa com comanda ativa:  
  [OUT] Mensagem: “Não é possível excluir uma mesa com comanda em andamento.”

---

### 6) Dicionário de dados

| Campo          | Tipo               | Restrições                          |
|----------------|--------------------|-------------------------------------|
| Número da mesa | Texto ou número    | Deve ser único por restaurante      |
| Status         | Texto (ativa/inativa) | Usado para controle de ocupação   |

---

### 7) Regras de negócio

- Não é permitido excluir mesas com comandas abertas.
- O número da mesa deve ser único dentro do restaurante.

---

