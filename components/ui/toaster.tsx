"use client"

import { useToast } from "@/hooks/use-toast"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-0 right-0 z-[100] flex flex-col items-end gap-2 p-4 max-h-screen overflow-hidden">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`bg-gray-800 border ${
              toast.variant === "destructive" ? "border-red-500" : "border-gray-700"
            } rounded-lg shadow-lg p-4 max-w-md flex items-start gap-3`}
          >
            <div className="flex-1">
              {toast.title && <div className="font-semibold">{toast.title}</div>}
              {toast.description && <div className="text-sm text-gray-400">{toast.description}</div>}
            </div>
            <button onClick={() => dismiss(toast.id)} className="text-gray-400 hover:text-white transition-colors">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
