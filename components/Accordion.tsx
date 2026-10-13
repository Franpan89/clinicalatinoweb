'use client'

import { useId, useState, type ReactNode } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export type AccordionItem = {
  id: string
  title: string
  content: ReactNode
}

/** Acordeón de un solo panel abierto a la vez. Accesible: botones con aria-expanded + regiones etiquetadas. */
export default function Accordion({
  items,
  defaultOpenId,
}: {
  items: AccordionItem[]
  defaultOpenId?: string
}) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null)
  const baseId = useId()

  return (
    <MotionConfig reducedMotion="user">
      <div className="border-t border-brand-dark/10">
        {items.map((item) => {
          const isOpen = openId === item.id
          const triggerId = `${baseId}-${item.id}-trigger`
          const panelId = `${baseId}-${item.id}-panel`

          return (
            <div key={item.id} className="relative border-b border-brand-dark/10">
              {/* Barra lateral de marca cuando el panel está abierto */}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-0 h-full w-[3px] bg-brand-gradient transition-opacity duration-300 ${
                  isOpen ? 'opacity-100' : 'opacity-0'
                }`}
              />

              <h3>
                <button
                  type="button"
                  id={triggerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-6 py-6 pl-5 pr-2 text-left group"
                >
                  <span
                    className={`font-lato text-base md:text-lg font-bold uppercase tracking-wide transition-colors ${
                      isOpen ? 'text-brand-blue' : 'text-brand-dark group-hover:text-brand-blue'
                    }`}
                  >
                    {item.title}
                  </span>
                  <span
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center border transition-all duration-300 ${
                      isOpen
                        ? 'bg-brand-gradient border-transparent text-white rotate-180'
                        : 'border-brand-dark/20 text-brand-dark group-hover:border-brand-blue group-hover:text-brand-blue'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pl-5 pr-2 md:pr-16 font-lato text-brand-gray text-[15px] leading-relaxed">
                      {item.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </MotionConfig>
  )
}
