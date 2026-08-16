# Amanda Cleaner

Plataforma web para conectar clientes a profissionais de limpeza, com descoberta de cleaners, agendamentos, comunicação e áreas específicas para operação e administração.

## Visão do produto

A aplicação combina uma experiência pública de descoberta e conteúdo com fluxos autenticados para contratação e gestão dos serviços. Há também uma jornada dedicada para profissionais interessados em entrar na plataforma.

## Funcionalidades presentes no código

- autenticação de usuários;
- listagem e perfil individual de profissionais de limpeza;
- cadastro/jornada para se tornar cleaner;
- criação e acompanhamento de agendamentos;
- área autenticada do profissional;
- painel administrativo;
- chat;
- páginas institucionais, FAQ e contato;
- blog com páginas individuais por slug;
- integrações de backend via rotas de API.

## Stack

- React 19
- TypeScript
- TanStack Start
- TanStack Router
- TanStack Query
- Supabase
- Tailwind CSS 4
- Zod
- AI SDK
- Vite

## Desenvolvimento local

```bash
git clone https://github.com/steamconta2030-star/Amanda-Cleaner-.git
cd Amanda-Cleaner-
npm install
npm run dev
```

Validação:

```bash
npm run lint
npm run build
```

## Status

Projeto em evolução. Os fluxos de autenticação, agendamento, permissões, comunicação e operações administrativas devem ser testados ponta a ponta antes de uso em produção.

## Segurança

Use variáveis de ambiente para configurações e credenciais. Tokens, chaves privadas e outros segredos não devem ser versionados ou incluídos na documentação.
