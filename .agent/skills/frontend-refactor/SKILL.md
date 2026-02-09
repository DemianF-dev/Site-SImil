---
name: frontend-refactor
description: Especialista em transformar interfaces legadas em designs premium, mobile-first e ultra-velozes usando React e CSS moderno.
---

# 🎨 Frontend Refactor Specialist Skill

Focada na estética e performance da interface do usuário.

## 🚀 Design System & Estética

Sempre aplique estes princípios em qualquer refatoração:

1. **Glassmorphism**: Fundos com `backdrop-blur` e opacidade suave para modais e sidebars.
2. **Gradients Dinâmicos**: Use gradientes lineares e radiais discretos para botões e cards.
3. **Typography**: Substitua fontes padrão por fontes modernas do Google Fonts (Inter, Outfit, Roboto).
4. **Micro-interações**: Adicione `hover:scale-105` e `transition-all` em elementos interativos.

## 🛠️ Guia de Refatoração de Código

- **Componentização**: Quebre arquivos enormes em componentes reutilizáveis.
- **Tailwind Adoption**: Substitua CSS inline ou arquivos legados por classes utilitárias modernas.
- **State Management**: Migre de `useState` excessivo para `Zustand` ou `Context` para estados globais.
- **Performance**:
  - Implemente `Lazy Loading` para componentes pesados.
  - Optimize o Critical Rendering Path.

## 📱 Mobile-First Strategy

- Use `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` como padrão.
- Garanta que todos os touch targets (botões) tenham no mínimo 44x44px.
- Teste sistematicamente no browser subagent em resoluções mobile.

## 🔍 Checklist de Qualidade UI

- [ ] Sem overflow horizontal em nenhuma resolução.
- [ ] Cores acessíveis (Contraste adequado).
- [ ] Skeletons implementados para carregamentos.
- [ ] Mensagens de erro amigáveis em formulários.
