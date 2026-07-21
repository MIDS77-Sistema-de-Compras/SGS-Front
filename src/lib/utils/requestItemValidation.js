export const DUPLICATE_PRODUCT_MESSAGE = "Este produto já foi adicionado à solicitação.";
export const DUPLICATE_SERVICE_MESSAGE = "Este serviço já foi adicionado à solicitação.";
export const CATALOG_SERVICE_MESSAGE = "Este serviço já está cadastrado. Selecione-o na lista.";
export const DEFAULT_REQUEST_ERROR_MESSAGE = "Não foi possível concluir a operação.";

/**
 * Mantém os acentos e normaliza apenas os espaços e a capitalização para a
 * comparação de itens digitados no formulário.
 */
export function normalizeRequestItemName(value) {
    return String(value ?? "")
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();
}

export function hasEquivalentRequestItem(items, name) {
    const normalizedName = normalizeRequestItemName(name);

    return Boolean(normalizedName) && items.some(
        (item) => normalizeRequestItemName(item?.name) === normalizedName
    );
}

export function hasCatalogServiceWithName(services, name) {
    const normalizedName = normalizeRequestItemName(name);

    return Boolean(normalizedName) && services.some(
        (service) => normalizeRequestItemName(service?.name) === normalizedName
    );
}

export function getRequestErrorMessage(error) {
    return (
        error?.details?.message ||
        error?.response?.data?.message ||
        error?.message ||
        DEFAULT_REQUEST_ERROR_MESSAGE
    );
}
