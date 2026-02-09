---
name: wayback-specialist
description: Especialista em extração, análise e reconstrução de sites a partir de arquivos históricos do Internet Archive (Wayback Machine).
---

# 🕰️ Wayback Machine Specialist Skill

Esta skill transforma o agente em um arqueólogo digital capaz de recuperar sites perdidos ou arquivados.

## 📋 Fluxo de Recuperação

### 1. Descoberta de Arquivos

Utilize a API CDX para listar snapshots disponíveis e identificar a melhor versão para recuperação.

**Comando Útil:**

```bash
# Ver snapshots de um domínio (fictício - requer curl/fetch via tool)
curl -s "https://web.archive.org/cdx/search/cdx?url=exemplo.com&output=json"
```

### 2. Scraping de Estrutura

- Explore a página inicial e subpáginas usando `read_url_content`.
- Identifique padrões de URL (ex: `/blog/`, `/products/`).
- Mapeie a arquitetura de informação original.

### 3. Recuperação de Ativos (Assets)

- **CSS/JS**: Frequentemente fragmentados. Tente localizar o arquivo original sem o wrapper do Internet Archive.
- **Imagens**: Verifique se há redirecionamentos ou se as imagens estão hospedadas em servidores de terceiros ainda ativos.

## 🛠️ Estratégias de Reconstrução

1. **HTML para React/Markdown**: Converta seções estáticas em componentes funcionais.
2. **Limpeza de Código**: Remova scripts de rastreamento antigos, comentários de debug e o próprio código de inserção da Wayback Machine (`wb-static`).
3. **Restauração de Mídia**: Se imagens estiverem perdidas, use `generate_image` para criar versões modernas baseadas na descrição do alt-text antigo.

## ⚠️ Checklist de Integridade

- [ ] Links externos corrigidos ou removidos.
- [ ] Formulários antigos desativados/redirecionados.
- [ ] Meta-tags atualizadas (SEO atual vs original).
- [ ] Remoção de caminhos absolutos do arquivo (`web.archive.org/web/...`).

> [!TIP]
> Use a ferramenta de browser para navegar visualmente pelo arquivo e capturar a "alma" do design original antes de modernizá-lo.
