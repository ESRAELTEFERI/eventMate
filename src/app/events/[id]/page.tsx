interface Props {
  params: { id: string };
}

export default function EventDetailPage({ params }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Event Details - {params.id}</h1>
      <p className="text-gray-700">Details about the event will appear here.</p>
    </div>
  );
}
