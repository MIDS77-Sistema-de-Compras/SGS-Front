import PurchaseRequestDetailPage from '@/components/features/purchase-requests/PurchaseRequestDetailPage';
import { findPurchaseRequestById } from '@/components/features/purchase-requests/purchaseRequestsMock';

export default async function DetalheSolicitacaoPage({ params }) {
  const { id } = await params;
  const request = findPurchaseRequestById(id);

  return <PurchaseRequestDetailPage request={request} />;
}
