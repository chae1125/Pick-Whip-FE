import { motion, AnimatePresence } from 'framer-motion'

type Pick = { shape: string; sheet: string; cream: string; icingColor: string }

type Props = {
  pick?: Pick
  open: boolean
  onToggle: () => void
}

export default function OwnersPickSection({ pick, open, onToggle }: Props) {
  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        className="mt-3 w-full flex items-center gap-2 text-left"
      >
        <span className="text-[12px] font-medium text-black">사장님&apos;s Pick!</span>
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.18 }}
          className="text-[14px] text-[#2A2929]"
        >
          ▶
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-2 border-t border-[#57504F] pt-3 text-[12px] text-[#57504F]">
              <div className="grid grid-cols-2 gap-y-2">
                <div>모양</div>
                <div className="text-right">{pick?.shape ?? ''}</div>
                <div>시트</div>
                <div className="text-right">{pick?.sheet ?? ''}</div>
                <div>크림</div>
                <div className="text-right">{pick?.cream ?? ''}</div>
                <div>아이싱 컬러</div>
                <div className="text-right">{pick?.icingColor ?? ''}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
