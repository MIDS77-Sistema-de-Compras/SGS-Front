//pronto
export const docenteRoutes = [
    {
        label: "Início",
        href: "/",
        icon: "/images/icons/home.png",
    },
    {
        label: "Minhas Solicitações",
        href: "/solicitacoes",
        icon: "/images/icons/my-requests.png",
    },
    {
        label: "Nova Solicitação",
        href: "/solicitacoes/criar",
        icon: "/images/home/nova-solicitacao.png",
    },
    {
        label: "Notificações",
        href: "/notificacoes",
        icon: "/images/icons/notifications.png",
    },
    {
        label: "Configurações",
        href: "/configuracoes",
        icon: "/images/icons/config.png",
    },
]

export const admRoutes = [
    {
        label: "Início",
        href: "/admin",
        icon: "/images/icons/home.png",
    },
    {
        label: "Gerenciar Usuários",
        href: "/usuarios/admin",
        icon: "/images/icons/gerenciar-users.png",
    },
    {
        label: "Análise de Registros",
        href: "/admin/auditoria",
        icon: "/images/icons/analise-registros.png",
    },
    {
        label: "Notificações",
        href: "/notificacoes",
        icon: "/images/icons/notifications.png",
    },
    {
        label: "Configurações",
        href: "/configuracoes",
        icon: "/images/icons/config.png",
    },
]

//pronto
export const compradorRoutes = [
    {
        label: "Início",
        href: "/",
        icon: "/images/icons/home.png",
    },
    {
        label: "Solicitações de compra",
        href: "/usuarios/comprador/solicitacao",
        icon: "/images/icons/request-compra.png",
    },
    {
        label: "Notificações",
        href: "/notificacoes",
        icon: "/images/icons/notifications.png",
    },
    {
        label: "Configurações",
        href: "/configuracoes",
        icon: "/images/icons/config.png",
    },
];

export const supervisorRoutes = [
    {
        label: "Início",
        href: "/",
        icon: "/images/icons/home.png",
    },
    {
        label: "Gerenciar Usuários",
        href: "/comprador/solicitacao", //arrumar
        icon: "/images/icons/gerenciar-users.png",
    },
    {
        label: "Minhas Solicitações",
        href: "/solicitacoes",
        icon: "/images/icons/my-requests.png",
    },
    {
        label: "Nova Solicitação",
        href: "/solicitacoes/criar",
        icon: "/images/home/nova-solicitacao.png",
    },
    {
        label: "Monitoramento",
        href: "/usuarios/supervisor", //arrumar
        icon: "/images/icons/monitoramento.png",
    },
    {
        label: "Notificações",
        href: "/notificacoes",
        icon: "/images/icons/notifications.png",
    },
    {
        label: "Configurações",
        href: "/configuracoes",
        icon: "/images/icons/config.png",
    },
]

export const coordenadorRoutes = [
    {
        label: "Início",
        href: "/",
        icon: "/images/icons/home.png",
    },
    {
        label: "Gerenciar Usuários",
        href: "/coordenador/usuarios",
        icon: "/images/icons/gerenciar-users.png",
    },
    {
        label: "Solicitações em análise",
        href: "/coordenador/solicitacoes",
        icon: "/images/home/nova-solicitacao.png",
    },
    {
        label: "Monitoramento",
        href: "/coordenador/monitoramento",
        icon: "/images/icons/monitoramento.png",
    },
    {
        label: "Analítico",
        href: "/coordenador/analitico",
        icon: "/images/icons/my-requests.png",
    },
    {
        label: "Notificações",
        href: "/notificacoes",
        icon: "/images/icons/notifications.png",
    },
    {
        label: "Configurações",
        href: "/configuracoes",
        icon: "/images/icons/config.png",
    },
]