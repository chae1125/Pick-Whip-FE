import EventRedCard from '../EventRedCard'

export type EventInfo = {
  title: string
  body: string
  period: string
}

export default function EventSection({ events }: { events: EventInfo[] }) {
  return (
    <div className="w-full flex flex-col gap-6">
      {events.length === 0 ? (
        <div className="w-full rounded-[10px] bg-white p-3">
          <p className="!text-[12px] !text-[var(--color-sub-gray-100)]">
            진행중인 이벤트가 없습니다.
          </p>
        </div>
      ) : (
        events.map((event, idx) => (
          <EventRedCard key={idx} title={event.title} body={event.body} period={event.period} />
        ))
      )}
    </div>
  )
}
