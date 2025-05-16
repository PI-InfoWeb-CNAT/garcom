# Garçom

## Especificação do caso de uso - F15 - Acesso ao cardápio via QR Code

### Histórico da Revisão

| Data       | Versão | Descrição        | Autor           |
|------------|--------|------------------|-----------------|
| 16/05/2025 | 1.00   | Versão Inicial   | Rodrigo |

---

### 1) Resumo

Permite que o cliente acesse o cardápio digital do restaurante escaneando um QR Code disponível em sua mesa, sem necessidade de cadastro ou login.

---

### 2) Atores

- Cliente

---

### 3) Precondições

- O QR Code precisa estar impresso e disponível na mesa do cliente.
- O cliente deve ter um dispositivo com câmera e acesso à internet.

---

### 4) Pós-condições

- O cliente poderá visualizar o cardápio digital do restaurante diretamente no navegador de seu dispositivo.

---

### 5) Fluxos de evento

#### 5.1) Fluxo básico – Acesso via QR Code

1. [IN] O cliente escaneia o QR Code com a câmera do celular.  
2. [OUT] O sistema abre o navegador do dispositivo e carrega a página do cardápio.  
3. [OUT] O cliente visualiza os produtos disponíveis organizados por categoria.

---

### 5.2) Fluxo alternativo – QR Code inválido

1. [IN] O cliente escaneia um QR Code que está danificado ou inválido.  
2. [OUT] O sistema exibe mensagem de erro: “QR Code inválido ou não reconhecido.”

---

### 5.3) Fluxo de exceção – Sem conexão com a internet

1. [IN] O cliente escaneia o QR Code, mas está sem conexão.  
2. [OUT] O sistema não carrega o cardápio e exibe erro padrão do navegador.

---

### 6) Dicionário de dados

| Campo       | Tipo                   | Descrição                              |
|-------------|------------------------|----------------------------------------|
| QR Code     | Código gráfico (imagem)| Código que representa a URL do cardápio|
| URL do cardápio | Texto (link)        | Link direto para o cardápio do restaurante |

---

### 7) Regras de negócio

- O QR Code deve redirecionar para a URL pública e específica do restaurante.
- O sistema deve garantir que a URL esteja associada à mesa correta, se necessário.
- O cardápio exibido deve conter apenas produtos disponíveis.

---

### 8) Protótipo(s) de interface do caso de uso

**Figura 1: Exemplo de cardápio aberto após escanear o QR Code**

![Mockup ilustrativo](imagens_Prototipo/Cardapio_QRCode.png)  
*Visualização do cardápio no navegador após leitura do QR Code.*
