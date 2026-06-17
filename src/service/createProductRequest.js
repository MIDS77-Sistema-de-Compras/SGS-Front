import { api } from './api';

export async function createFullRequest({ crBranchId, statusName, products }) {
    const createdRequest = await api.post('/requests', {
        crBranchId,
        statusName,
    });

    const requestId = createdRequest.id;

    await Promise.all(
        products.map((product) =>
            api.post('/item-request-products', {
                requestId,
                productName: product.productName,
                measurementUnit: product.measurementUnit,
                quantity: product.quantity,
                statusName,
                additionalInformations: product.additionalInformations ?? '',
            })
        )
    );

    return createdRequest;
}

export async function getInitialStatusName() {
    const statuses = await api.get('/status');
    return statuses?.[0]?.name ?? null;
}

export async function getAllMeasurementUnits() {
    return api.get('/measurement-unit');
}