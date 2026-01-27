import type { ReviewOwnerReply } from '../../types/review'

export function OwnerReply({ reply }: { reply?: ReviewOwnerReply }) {
  if (!reply?.content) return null

  return (
    <section className="mt-4 rounded-xl bg-[#F7E6E6] p-4 border-l-3 border-[#F4D3D3]">
      <div className="text-review-owner-title text-[15px]">{reply.title ?? '사장님 답변'}</div>
      <div className="mt-1 text-review-default text-[15px]">{reply.content}</div>
    </section>
  )
}
