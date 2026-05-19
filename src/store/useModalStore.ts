import { create } from 'zustand'
import type { ReactNode } from 'react'

/**
 * Centralized modal system — any component can open modals via this store.
 */
interface ModalState {
  isOpen: boolean
  title: string
  content: ReactNode | null
  size: 'sm' | 'md' | 'lg' | 'xl'
  openModal: (opts: { title: string; content: ReactNode; size?: 'sm' | 'md' | 'lg' | 'xl' }) => void
  closeModal: () => void
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  title: '',
  content: null,
  size: 'md',

  openModal: ({ title, content, size = 'md' }) =>
    set({ isOpen: true, title, content, size }),

  closeModal: () => set({ isOpen: false, title: '', content: null }),
}))
