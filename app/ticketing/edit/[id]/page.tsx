import { EditTicket } from '@/components/EditTicket';

export default function EditTicketPage({ params }: { params: { id: string } }) {
  return <EditTicket id={params.id} />;
}