---
name: site-recovery-reconstruction
description: Habilidades avançadas para reconstruir sites complexos, restaurar lógica de banco de dados e garantir funcionalidade total pós-recuperação.
---

# 🏗️ Site Recovery & Reconstruction Skill

Focada em reconstruir a funcionalidade e o "motor" por trás de sites estáticos ou recuperados.

## 🔄 Fases de Reconstrução

### FASE 1: Mapeamento de Dados (Schema Reverse Engineering)

Se o site original tinha banco de dados, reconstrua o schema baseado nos formulários e exibições.

- Analise campos de input em páginas de cadastro.
- Deduza relacionamentos (ex: `Post` -> `Author`).
- Crie um `schema.prisma` básico para suportar os dados recuperados.

### FASE 2: Restauração de Rotas

Mantenha a autoridade de SEO reconstruindo a estrutura de URLs.

- Crie redirecionamentos 301 para URLs legadas.
- Implemente `Dynamic Routes` (Next.js/React Router) para lidar com padrões antigos.

### FASE 3: Re-Engenharia de Lógica

- Traduza lógicas de formulários antigos (PHP/ASP) para Serverless Functions modernos.
- Implemente validação moderna (Zod) onde antes não existia.

## 💎 Padrões Premium de Reconstrução

- **Shadow DOM Isolation**: Ao importar HTML legado para um site moderno, use técnicas de isolamento para evitar conflitos de CSS.
- **Asset Modernization**: Converta imagens recuperadas para formatos modernos (WebP/AVIF).
- **Code Hygene**: Substitua loops legados por métodos de array modernos e promessas.

## 🛠️ Comandos de Suporte

- `find_by_name`: Localizar arquivos órfãos.
- `grep_search`: Encontrar referências a domínios antigos ou hardcoded strings.
- `multi_replace_file_content`: Atualizar links em massa.

> [!IMPORTANT]
> A reconstrução não é apenas cópia; é evolução. Sempre adicione melhorias de acessibilidade e performance durante o processo.
