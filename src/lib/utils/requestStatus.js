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
        key: "auto_aprovado",
        label: "Auto-aprovado",
        color: "bg-[#0EA5E9]",
        category: "pendente",
        selectable: true,
        aliases: ["auto aprovado", "auto-aprovado"],
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
        key: "atrasada",
        label: "Atrasada",
        color: "bg-[#DC2626]",
        category: "pendente",
        selectable: true,
        aliases: ["atrasada"],
    },
    {
        key: "recebimento_parcial",
        label: "Recebimento parcial",
        color: "bg-[#F97316]",
        category: "pendente",
        selectable: true,
        aliases: ["recebimento parcial"],
    },
    {
        key: "fundo_rotativo",
        label: "Fundo rotativo",
        color: "bg-[#14B8A6]",
        category: "pendente",
        selectable: true,
        aliases: ["fundo rotativo"],
    },
    {
        key: "cd_central",
        label: "CD Central",
        color: "bg-[#6366F1]",
        category: "pendente",
        selectable: true,
        aliases: ["cd central"],
    },
    {
        key: "solicitado_portal",
        label: "Solicitado Portal",
        color: "bg-[#EC4899]",
        category: "pendente",
        selectable: true,
        aliases: ["solicitado portal"],
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
        key: "parcialmente_aprovada",
        label: "Parcialmente aprovada",
        color: "bg-[#8B5CF6]",
        category: "pendente",
        selectable: true,
        aliases: ["parcialmente aprovada", "parcial aprovado", "parcialmente aprovado"],
    },
    {
        key: "parcialmente_atendida",
        label: "Parcialmente atendida",
        color: "bg-[#A855F7]",
        category: "pendente",
        selectable: true,
        aliases: ["parcialmente atendida"],
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

export function getStatusHexColor(rawStatus) {
    const color = resolveRequestStatus(rawStatus).color;
    const match = color.match(/^bg-\[(#[0-9A-Fa-f]{6})\]$/);
    return match ? match[1] : null;
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

// Status customizados (criados pelo comprador via "+ Adicionar status") não têm
// entrada no STATUS_CATALOG estático, então sua cor vem do backend (hex) e é
// aplicada via style inline em vez de classe Tailwind.
export function buildCustomStatusColorMap(apiStatuses = []) {
    const map = new Map();

    for (const status of apiStatuses) {
        if (!status?.color) continue;

        const normalized = normalizeStatusName(status.name);
        if (ALIAS_TO_ENTRY.has(normalized)) continue;

        map.set(normalized, status.color);
    }

    return map;
}

export function getCustomStatusColor(rawStatus, colorMap) {
    if (!colorMap) return null;
    return colorMap.get(normalizeStatusName(rawStatus)) ?? null;
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

// Único status em que o supervisor/coordenador ainda pode decidir. Qualquer outro
// (Aprovado, Recusado, Auto-aprovado, Parcialmente aprovada, ou qualquer status que o
// comprador já tenha atribuído depois disso) significa que a etapa dele já terminou —
// por isso a checagem é negativa (não é mais o pendente) em vez de listar cada status
// "final", que cresceria a cada novo status do fluxo do comprador.
const PENDING_LABEL = "Aguardando aprovação";

// Todo o ciclo de vida que o comprador acompanha: os 3 status de entrada (Recusado não
// vai pro comprador) + os status que ele mesmo vai atribuindo dali pra frente.
export const COMPRADOR_VISIBLE_LABELS = [
    "Aprovado", "Auto-aprovado", "Parcialmente aprovada",
    "Em atendimento", "Atrasada", "Recebimento parcial",
    "Fundo rotativo", "CD Central", "Solicitado Portal", "Parcialmente atendida",
    "Entregue", "Cancelado",
];

export function isFinalizedForSupervisor(rawStatus) {
    return getStatusLabel(rawStatus) !== PENDING_LABEL;
}

export function isRequestEditable(rawStatus) {
    return getStatusLabel(rawStatus) === PENDING_LABEL;
}

export function isVisibleToComprador(rawStatus) {
    return COMPRADOR_VISIBLE_LABELS.includes(getStatusLabel(rawStatus));
}

// Numa solicitação "Parcialmente aprovada" o comprador só deve ver/comprar os itens
// que o supervisor aprovou — os recusados não geram trabalho de compra.
export function keepOnlyApprovedItemsIfPartial(request) {
    if (getStatusLabel(request.status) !== "Parcialmente aprovada") return request;

    return {
        ...request,
        produtos: (request.produtos || []).filter((item) => getStatusLabel(item.status) === "Aprovado"),
        servicos: (request.servicos || []).filter((item) => getStatusLabel(item.status) === "Aprovado"),
    };
}

// Nomes literais exatos cadastrados no banco (Status.name) — usados no PATCH de status.
// Alguns usam "_" ao inves de espaco; findByNameIgnoreCase so ignora maiusculas/minusculas,
// entao o valor aqui precisa bater caractere a caractere com o que esta no banco.
export const COMPRADOR_STATUS_OPTIONS = [
    { value: "Em atendimento", label: "Em atendimento", color: getStatusHexColor("Em atendimento") },
    { value: "Entregue", label: "Entregue", color: getStatusHexColor("Entregue") },
    { value: "PEDIDO CANCELADO", label: "Pedido cancelado", color: getStatusHexColor("Cancelado") },
    { value: "RECEBIMENTO_PARCIAL", label: "Recebimento parcial", color: getStatusHexColor("Recebimento parcial") },
    { value: "FUNDO_ROTATIVO", label: "Fundo rotativo", color: getStatusHexColor("Fundo rotativo") },
    { value: "CD_CENTRAL", label: "CD Central", color: getStatusHexColor("CD Central") },
    { value: "SOLICITADO_PORTAL", label: "Solicitado Portal", color: getStatusHexColor("Solicitado Portal") },
];