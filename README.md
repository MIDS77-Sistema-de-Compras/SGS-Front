<div align="center">

# 🛒 SGS — Sistema de Gestão de Solicitações

**Frontend do sistema de gestão de solicitações e compras do SENAI/CentroWEG.**

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://sgc-front-nine.vercel.app/)

[🌐 Acessar aplicação](https://sgc-front-nine.vercel.app/) · [⚙️ Repositório Back-end](https://github.com/MIDS77-Sistema-de-Compras/SGC-Back) · [🐛 Issues](https://github.com/MIDS77-Sistema-de-Compras/SGS-Front/issues)

</div>

---

## 📖 Sobre o projeto

O **SGS (Sistema de Gestão de Solicitações)** digitaliza e centraliza todo o fluxo de solicitações de compra de produtos e serviços de uma instituição de ensino — da abertura da solicitação pelo docente até a confirmação da entrega.

O sistema substitui processos manuais e planilhas por um fluxo com **aprovação hierárquica**, **rastreabilidade completa** e **notificações automáticas**, garantindo que cada solicitação passe pelos responsáveis corretos de cada Centro de Resultado (CR).

### Principais funcionalidades

| Módulo | Descrição |
| :--- | :--- |
| 🔐 **Autenticação** | Login com JWT, recuperação de senha e incorporação de usuário (impersonation) pelo administrador |
| 📝 **Solicitações** | Criação de solicitações de produtos e serviços com múltiplos itens, anexos e informações adicionais |
| ✅ **Aprovação** | Fluxo de aprovação por supervisor e coordenador, com decisão item a item e status parcial |
| 🛍️ **Comprador** | Painel dedicado com as solicitações liberadas para compra e controle de status de atendimento |
| 🏢 **Centros de Resultado** | Cadastro e gestão de CRs, filiais e vínculo de responsáveis por role |
| 👥 **Usuários** | CRUD completo, gestão de roles e ativação/desativação de contas |
| 🔔 **Notificações** | Notificações internas e por e-mail a cada mudança de status |
| 📊 **Analítico** | Painel com indicadores e visão geral das solicitações |
| 🕵️ **Auditoria** | Log detalhado de atividades com data, hora e responsável |
| 🌗 **Tema escuro** | Dark mode completo em todas as telas, com persistência da preferência |

---

## 🛠️ Tecnologias

**Core**
- [Next.js 16](https://nextjs.org/) — App Router, Server Components e Route Handlers
- [React 19](https://react.dev/) — com React Compiler habilitado
- [Tailwind CSS 4](https://tailwindcss.com/) — estilização utilitária e sistema de temas

**Bibliotecas**
- `lucide-react` — ícones
- `js-cookie` — gerenciamento do token de sessão
- `clsx` + `tailwind-merge` — composição condicional de classes

**Qualidade e documentação**
- [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/) — testes unitários e de browser
- [Storybook 10](https://storybook.js.org/) — documentação de componentes, com addon de acessibilidade
- [ESLint](https://eslint.org/) — padronização de código

**Infraestrutura**
- **Vercel** — deploy do frontend
- **AWS EC2 + Docker** — hospedagem da API

---

## 📂 Estrutura do projeto

```
src/
├── app/                      # Rotas (App Router)
│   ├── (auth)/               # Login, recuperação e nova senha
│   ├── (home)/               # Página inicial e home do admin
│   ├── (sistema)/            # Área autenticada
│   │   ├── (admin)/          # Auditoria
│   │   ├── (comprador)/      # Solicitações de compra
│   │   ├── (coordenador)/    # Criação de CR
│   │   ├── solicitacoes/     # Listagem, criação, detalhes e gestão
│   │   ├── usuarios/         # Criação, edição e gerenciamento
│   │   ├── analitico/
│   │   ├── notificacoes/
│   │   └── configuracoes/
│   └── api/                  # Route Handlers (proxy da API e auth)
├── components/
│   ├── ui/                   # Componentes base reutilizáveis
│   ├── layout/               # Sidebar e topbar
│   └── features/             # Componentes por domínio
├── contexts/                 # ThemeContext e NotificationContext
├── hooks/                    # Hooks de dados e regras de tela
├── service/                  # Camada de comunicação com a API
└── lib/                      # Utilitários
```

---

## 🚀 Como rodar localmente

### Pré-requisitos
- Node.js 20 ou superior
- npm
- API do [SGC-Back](https://github.com/MIDS77-Sistema-de-Compras/SGC-Back) em execução

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/MIDS77-Sistema-de-Compras/SGS-Front.git
cd SGS-Front

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

> 💡 Caso a porta 3000 esteja ocupada, o Next.js sobe automaticamente na 3001 — a API já aceita ambas as origens.

### Variáveis de ambiente

```env
API_TARGET_URL=http://localhost:8081
NEXT_PUBLIC_API_URL=http://localhost:8081
```

---

## 👥 Perfis de acesso

| Perfil | Permissões principais |
| :--- | :--- |
| **Docente** | Cria solicitações, acompanha status e confirma entregas |
| **Supervisor** | Aprova ou recusa solicitações do seu CR (auto-aprovação nas próprias) |
| **Coordenador** | Gerencia CRs e aprova solicitações da sua área |
| **Comprador** | Atua nas solicitações aprovadas e registra o atendimento |
| **Administrador** | Gestão de usuários, vínculos de CR, auditoria e incorporação de usuários |

---

## 👨‍💻 Equipe

<div align="center">

<table>
  <tr>
    <td align="center" width="150">
      <a href="https://github.com/viviihyy">
        <img src="https://github.com/viviihyy.png" width="90" style="border-radius:50%" alt="Viviane"/><br/>
        <sub><b>Gabrielli Glowatski</b></sub>
      </a><br/>
      <sub>Scrum Master</sub><br/>
      <a href="https://github.com/viviihyy">GitHub</a> ·
      <a href="https://www.linkedin.com/in/gabi-vitoria/">LinkedIn</a>
    </td>
    <td align="center" width="150">
      <a href="https://github.com/Liiiiisssz">
        <img src="https://github.com/Liiiiisssz.png" width="90" style="border-radius:50%" alt="Elis Jasper"/><br/>
        <sub><b>Elis Jasper</b></sub>
      </a><br/>
      <sub>Tech Lead Front-end</sub><br/>
      <a href="https://github.com/Liiiiisssz">GitHub</a> ·
      <a href="https://www.linkedin.com/in/elis-jasper/">LinkedIn</a>
    </td>
    <td align="center" width="150">
      <a href="https://github.com/HugoDeleonP">
        <img src="https://github.com/HugoDeleonP.png" width="90" style="border-radius:50%" alt="Hugo Deleon"/><br/>
        <sub><b>Hugo Deleon</b></sub>
      </a><br/>
      <sub>Tech Lead Back-end</sub><br/>
      <a href="https://github.com/HugoDeleonP">GitHub</a> ·
      <a href="https://www.linkedin.com/in/hugo-deleon-221a23317/">LinkedIn</a>
    </td>
    <td align="center" width="150">
      <a href="https://github.com/AnaRiibeiro">
        <img src="https://github.com/AnaRiibeiro.png" width="90" style="border-radius:50%" alt="Ana Ribeiro"/><br/>
        <sub><b>Ana Ribeiro</b></sub>
      </a><br/>
      <sub>Desenvolvedora</sub><br/>
      <a href="https://github.com/AnaRiibeiro">GitHub</a> ·
      <a href="https://www.linkedin.com/in/ana-ribeiro-653a44413/">LinkedIn</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="150">
      <a href="https://github.com/andrMiotto">
        <img src="https://github.com/andrMiotto.png" width="90" style="border-radius:50%" alt="André Miotto"/><br/>
        <sub><b>André Miotto</b></sub>
      </a><br/>
      <sub>Desenvolvedor</sub><br/>
      <a href="https://github.com/andrMiotto">GitHub</a> ·
      <a href="https://www.linkedin.com/in/andr%C3%A9-luis-miotto-pereira-baba003b4/">LinkedIn</a>
    </td>
    <td align="center" width="150">
      <a href="https://github.com/Catarina0830">
        <img src="https://github.com/Catarina0830.png" width="90" style="border-radius:50%" alt="Catarina"/><br/>
        <sub><b>Catarina Klein</b></sub>
      </a><br/>
      <sub>Desenvolvedora</sub><br/>
      <a href="https://github.com/Catarina0830">GitHub</a>
    </td>
    <td align="center" width="150">
      <a href="https://github.com/Dudazabel">
        <img src="https://github.com/Dudazabel.png" width="90" style="border-radius:50%" alt="Maria Zabel"/><br/>
        <sub><b>Maria Zabel</b></sub>
      </a><br/>
      <sub>Desenvolvedora</sub><br/>
      <a href="https://github.com/Dudazabel">GitHub</a> ·
      <a href="https://www.linkedin.com/in/maria-zabel-464856401/">LinkedIn</a>
    </td>
    <td align="center" width="150">
      <a href="https://github.com/gabrielEFagundes">
        <img src="https://github.com/gabrielEFagundes.png" width="90" style="border-radius:50%" alt="Gabriel Fagundes"/><br/>
        <sub><b>Gabriel Fagundes</b></sub>
      </a><br/>
      <sub>Desenvolvedor</sub><br/>
      <a href="https://github.com/gabrielEFagundes">GitHub</a> ·
      <a href="https://www.linkedin.com/in/gabriel-ehrat-fagundes/">LinkedIn</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="150">
      <a href="https://github.com/Jose7764">
        <img src="https://github.com/Jose7764.png" width="90" style="border-radius:50%" alt="José Azarías"/><br/>
        <sub><b>José Azarías</b></sub>
      </a><br/>
      <sub>Desenvolvedor</sub><br/>
      <a href="https://github.com/Jose7764">GitHub</a> ·
      <a href="https://www.linkedin.com/in/jos%C3%A9-azar%C3%ADas-p%C3%A9rez-torres-0b86473b5/">LinkedIn</a>
    </td>
    <td align="center" width="150">
      <a href="https://github.com/leandroFilipy">
        <img src="https://github.com/leandroFilipy.png" width="90" style="border-radius:50%" alt="Leandro Filipy"/><br/>
        <sub><b>Leandro Filipy</b></sub>
      </a><br/>
      <sub>Desenvolvedor</sub><br/>
      <a href="https://github.com/leandroFilipy">GitHub</a> ·
      <a href="https://www.linkedin.com/in/leandro-filipy-de-lima-5356733b5/">LinkedIn</a>
    </td>
    <td align="center" width="150">
      <a href="https://github.com/lucasschlei">
        <img src="https://github.com/lucasschlei.png" width="90" style="border-radius:50%" alt="Lucas Schlei"/><br/>
        <sub><b>Lucas Schlei</b></sub>
      </a><br/>
      <sub>Desenvolvedor</sub><br/>
      <a href="https://github.com/lucasschlei">GitHub</a> ·
      <a href="https://www.linkedin.com/in/lucas-schlei-431b433bb/">LinkedIn</a>
    </td>
    <td align="center" width="150">
      <a href="https://github.com/manu-hostin">
        <img src="https://github.com/manu-hostin.png" width="90" style="border-radius:50%" alt="Emanuelle Hostin"/><br/>
        <sub><b>Emanuelle Hostin</b></sub>
      </a><br/>
      <sub>Desenvolvedora</sub><br/>
      <a href="https://github.com/manu-hostin">GitHub</a> ·
      <a href="https://www.linkedin.com/in/emanuelle-cristina-hostin-764728364/">LinkedIn</a>
    </td>
  </tr>
</table>

</div>

---

## 🔗 Links do projeto

- 🌐 **Aplicação:** [sgc-front-nine.vercel.app](https://sgc-front-nine.vercel.app/)
- 💻 **Frontend:** [SGS-Front](https://github.com/MIDS77-Sistema-de-Compras/SGS-Front)
- ⚙️ **Backend:** [SGC-Back](https://github.com/MIDS77-Sistema-de-Compras/SGC-Back)
- 🏛️ **Organização:** [MIDS77-Sistema-de-Compras](https://github.com/MIDS77-Sistema-de-Compras)
