import { defineConfig } from "tinacms";

// Configuração TinaCMS para SIMIL | Reengenharia Imobiliária
export default defineConfig({
  branch: "main",
  clientId: "8dc56619-eacd-4722-b74f-13d80aece224", // Client ID fornecido pelo usuário
  token: "de86876842c7f6d565102264bb9cf3c87d4e6a5a",    // Token fornecido pelo usuário

  build: {
    outputFolder: "tina-admin", // Onde o painel será gerado
    publicFolder: ".",          // Raiz do projeto (Vanilla HTML)
  },
  media: {
    tina: {
      mediaRoot: "assets/uploads",
      publicFolder: ".",
    },
  },
  schema: {
    collections: [
      {
        name: "site_content",
        label: "Conteúdo do Site",
        path: "data",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "object",
            name: "site",
            label: "SEO e Metadados",
            fields: [
              { name: "title", label: "Título do Site", type: "string" },
              { name: "description", label: "Descrição (SEO)", type: "string", ui: { component: "textarea" } },
              { name: "keywords", label: "Palavras-chave", type: "string" },
            ],
          },
          {
            type: "object",
            name: "hero",
            label: "Capa (Hero Section)",
            fields: [
              { name: "label", label: "Nome do Consultor", type: "string" },
              { name: "title_line1", label: "Título Principal - Parte 1", type: "string" },
              { name: "title_line2", label: "Título Principal - Parte 2", type: "string" },
              { name: "title_line3", label: "Destaque (Cabelo do Título)", type: "string" },
              { name: "description", label: "Texto de Apoio", type: "string", ui: { component: "textarea" } },
              { name: "cta_primary", label: "Botão Principal", type: "string" },
              { name: "cta_secondary", label: "Botão Secundário", type: "string" },
            ],
          },
          {
            type: "object",
            name: "method",
            label: "O Método SIMIL",
            fields: [
              { name: "tag", label: "Tag da Seção", type: "string" },
              { name: "title", label: "Título", type: "string" },
              { name: "highlight", label: "Destaque", type: "string" },
              {
                name: "steps",
                label: "Passos da Metodologia",
                type: "object",
                list: true,
                fields: [
                  { name: "number", label: "Número", type: "string" },
                  { name: "title", label: "Título", type: "string" },
                  { name: "description", label: "Descrição", type: "string", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "properties",
            label: "Empreendimentos",
            fields: [
              { name: "title", label: "Título da Seção", type: "string" },
              {
                name: "items",
                label: "Lista de Imóveis",
                type: "object",
                list: true,
                fields: [
                  { name: "name", label: "Nome", type: "string" },
                  { name: "status", label: "Status (Ex: Lançamento)", type: "string" },
                  { name: "type", label: "Tipo", type: "string" },
                  { name: "location", label: "Localização", type: "string" },
                  { name: "description", label: "Resumo", type: "string", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "contact",
            label: "Informações de Contato",
            fields: [
              {
                name: "info",
                label: "Dados da Empresa",
                type: "object",
                fields: [
                  {
                    name: "address",
                    label: "Endereço",
                    type: "object",
                    fields: [
                      { name: "street", label: "Rua/Sala", type: "string" },
                      { name: "city", label: "Cidade/UF", type: "string" },
                    ]
                  },
                  {
                    name: "phone",
                    label: "WhatsApp",
                    type: "object",
                    fields: [
                      { name: "number", label: "Número Formatado", type: "string" },
                    ]
                  },
                ]
              }
            ],
          },
        ],
      },
    ],
  },
});
