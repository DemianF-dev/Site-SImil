---
name: vercel-github-integration
description: Domínio em automação de CI/CD, gerenciamento de repositórios, segredos e deployments escaláveis no ecossistema Vercel + GitHub.
---

# ☁️ Vercel & GitHub Integration Skill

Gerencia o ciclo de vida do código, do commit ao deploy em produção.

## 🔨 GitHub Workflow

- **Branch Strategy**: `main` (produção), `develop` (estágio), `feat/*` (funcionalidades).
- **Commit Standards**: Use Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`).
- **Actions**: Automatize linting, testes e builds antes de cada Merge Request.

## 🚀 Vercel Deployment

- **Preview Deployments**: Use para validar mudanças visuais com o usuário antes da main.
- **Environment Variables**: Configure segredos de API e chaves de banco no dashboard da Vercel (nunca no código).
- **Edge Functions**: Use para caches dinâmicos e lógica próxima ao usuário.

## 🛠️ Comandos Avançados

```bash
# Vercel CLI (se disponível)
vercel link
vercel env pull .env.local
vercel deploy --prod

# GitHub CLI (se disponível)
gh pr create --title "feat: site reconstruction"
gh secret set DATABASE_URL
```

## 🔐 Segurança e Performance

- **Branch Protection**: Bloqueie pushes diretos na `main`. Exija reviews.
- **Analytics & Vitals**: Monitore o Real Experience Score no dashboard da Vercel.
- **Deployment Protection**: Use passwords ou hashes para proteger ambientes de preview se necessário.

> [!IMPORTANT]
> O deploy é o último passo da confiança. Apenas execute após o `npm run build` passar localmente.
