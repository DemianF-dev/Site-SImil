---
name: deployment-upgrade
description: Especialista em ciclos de upgrade de sites e sistemas, garantindo transições suaves, controle de versão e paridade entre ambientes.
---

# 🆙 Deployment & Upgrade Specialist Skill

Focada no crescimento e manutenção contínua do projeto.

## 🔄 Ciclo de Upgrade

1. **Audit**: Execute `npm audit` e verifique dependências obsoletas.
2. **Major Upgrades**: Atualize versões de bibliotecas core (ex: React 18 -> 19) em branches isoladas.
3. **Regression Testing**: Compare capturas de tela pré e pós upgrade.

## 🚚 Estratégia de Deploy Seguro

- **Blue-Green Deploy**: Garanta que o sistema antigo continue no ar até o novo estar 100% validado.
- **Smoke Tests**: Verifique `/api/health` e rotas críticas imediatamente após o deploy.
- **Rollback Plan**: Tenha sempre o hash do commit anterior pronto em caso de falha catastrófica.

## 📦 Gestão de Versões

- Mantenha um `CHANGELOG.md` rigoroso.
- Use Tags de Git para marcar releases estáveis.
- Automatize a atualização do `package.json` version.

## 🛠️ Checklist de Lançamento

- [ ] Banco de dados sincronizado (`prisma db push` / migração).
- [ ] Variáveis de ambiente configuradas em produção.
- [ ] Cache CDN limpo ou atualizado.
- [ ] Teste de login e fluxo principal realizado.
