'use client'

import { useMemo, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    const stored = window.localStorage.getItem(key)
    return stored ? JSON.parse(stored) as T : initialValue
  })

  const update = (next: T) => {
    setValue(next)
    if (typeof window !== 'undefined') window.localStorage.setItem(key, JSON.stringify(next))
  }

  return [value, update] as const
}

export function useFilter<T>(items: T[], query: string, getText: (item: T) => string) {
  return useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(item => getText(item).toLowerCase().includes(q))
  }, [items, query, getText])
}

export function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  return { isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false), setIsOpen }
}

export function useDemoToast() {
  const [message, setMessage] = useState('')
  return {
    message,
    show: (next: string) => setMessage(next),
    clear: () => setMessage(''),
  }
}
