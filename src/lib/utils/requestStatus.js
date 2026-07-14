function normalizeStatusName(value = "") {
    return String(value ?? "")
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/_/g, " ")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
}

const STATUS_CATALOG = [
    {
        key: "aguardando_aprovacao",
        label: "Aguardando aprovação",
        color: "bg-[#EDAE28]",
        category: "pendente",
        selectable: true,
        aliases: ["em andamento", "aguardando aprovacao", "aguardando aprovação", "em analise", "pendente"],
    },
    {
        key: "aprovado",
        label: "Aprovado",
        color: "bg-[#4CAF50]",
        category: "pendente",
        selectable: true,
        aliases: ["aprovado"],
    },
    {
        key: "em_atendimento",
        label: "Em atendimento",
        color: "bg-[#13BAD6]",
        category: "pendente",
        selectable: true,
        aliases: ["em atendimento"],
    },
    {
        key: "recusado",
        label: "Recusado",
        color: "bg-[#E30613]",
        category: "concluida",
        selectable: true,
        aliases: ["recusado", "reprovado"],
    },
    {
        key: "cancelado",
        label: "Cancelado",
        color: "bg-[#71717A]",
        category: "concluida",
        selectable: true,
        aliases: ["cancelado", "pedido cancelado"],
    },
    {
        key: "entregue",
        label: "Entregue",
        color: "bg-[#0084FF]",
        category: "concluida",
        selectable: true,
        aliases: ["entregue"],
    },
    {
        key: "parcial_aprovado",
        label: "Parcial Aprovado",
        color: "bg-[#0084FF]",
        category: null,
        selectable: false,
        aliases: ["parcial aprovado"],
    },
    {
        key: "sem_produtos",
        label: "Sem produtos",
        color: "bg-gray-400",
        category: null,
        selectable: false,
        aliases: ["sem produtos"],
    },
];

const ALIAS_TO_ENTRY = new Map();
for (const entry of STATUS_CATALOG) {
    for (const alias of entry.aliases) {
        ALIAS_TO_ENTRY.set(alias, entry);
    }
}

const API_CATEGORY_TO_LOCAL = {
    PENDENTE: "pendente",
    CONCLUIDA: "concluida",
};

/**
 * Resolve um statusName cru (vindo da API ou ja um label) para o status canonico
 * conhecido pelo front. Nunca retorna null: se nao reconhecer o valor (ex.: um status
 * novo cadastrado por um admin via /status), devolve um fallback neutro preservando
 * o texto original como label.
 *
 * @param rawStatus texto do status (ex.: request.statusName)
 * @param apiCategory categoria já resolvida pelo back-end (request.statusCategory,
 *   "PENDENTE" | "CONCLUIDA" | null/undefined) — usada apenas quando o nome não é
 *   reconhecido localmente, para não deixar um status novo sem categoria nas abas.
 */
export function resolveRequestStatus(rawStatus, apiCategory) {
    const normalized = normalizeStatusName(rawStatus);
    const entry = ALIAS_TO_ENTRY.get(normalized);

    if (entry) return entry;

    return {
        key: null,
        label: rawStatus || "Sem status",
        color: "bg-gray-400",
        category: API_CATEGORY_TO_LOCAL[apiCategory] ?? null,
        selectable: false,
        aliases: [],
    };
}

export function getStatusLabel(rawStatus) {
    return resolveRequestStatus(rawStatus).label;
}

export function getStatusColor(rawStatus) {
    return resolveRequestStatus(rawStatus).color;
}

export function getStatusCategory(rawStatus, apiCategory) {
    return resolveRequestStatus(rawStatus, apiCategory).category;
}

export function isPendingStatus(rawStatus, apiCategory) {
    return getStatusCategory(rawStatus, apiCategory) === "pendente";
}

export function isConcludedStatus(rawStatus, apiCategory) {
    return getStatusCategory(rawStatus, apiCategory) === "concluida";
}

// Opcoes para os selects de filtro por status exato (valor = label, pelo mesmo
// motivo de sempre: os componentes de filtro atuais usam o proprio texto exibido
// como valor comparavel).
export const REQUEST_STATUS_FILTER_OPTIONS = [
    { value: "", label: "Todos os status" },
    ...STATUS_CATALOG.filter((entry) => entry.selectable).map((entry) => ({
        value: entry.label,
        label: entry.label,
    })),
];
