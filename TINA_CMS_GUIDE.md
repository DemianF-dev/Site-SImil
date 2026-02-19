# 🦙 Guia de Configuração: TinaCMS (SIMIL)

O projeto foi migrado para o **TinaCMS**, uma alternativa gratuita, open-source e extremamente poderosa para o gerenciamento de conteúdo.

## 🛠️ O que foi configurado:
1.  **Schema Estruturado**: Criei o arquivo `tina/config.js` que mapeia seu `data/content.json`.
2.  **Scripts de Automação**: O `package.json` agora possui comandos para rodar o CMS localmente.
3.  **Ambiente Limpo**: Removi o Decap CMS e o CloudCannon para evitar conflitos.

## 🚀 Como começar (Ação do Usuário):

### 1. Preparação Local (Node.js)
Como você está corrigindo o Node.js, assim que terminar, abra seu terminal na pasta do projeto e rode:
```bash
npm install
```

### 2. Rodando o Painel de Edição
Para editar o site localmente com o TinaCMS:
```bash
npm run dev
```
O Tina abrirá um painel em `http://localhost:4001/admin/index.html` (ou similar) onde você poderá editar os campos e salvar. O salvamento escreverá diretamente no seu `data/content.json`.

### 3. Configuração na Nuvem (Tina Cloud - Grátis)
Para que o site online (Vercel) também tenha o painel de edição:
1.  Crie uma conta em [Tina.io](https://tina.io/).
2.  Crie um novo projeto e conecte seu GitHub `DemianF-dev/Site-SImil`.
3.  Pegue o **Client ID** e o **Read-only Token** no dashboard da Tina.
4.  Vá na Vercel e adicione essas variáveis de ambiente:
    *   `TINA_CLIENT_ID`
    *   `TINA_TOKEN`
5.  Faça o deploy. O painel estará disponível em `simil.com.br/tina-admin`.

---
*Dica: O TinaCMS permite que você crie novos campos facilmente no arquivo `tina/config.js` se decidir adicionar novas seções ao site.*
