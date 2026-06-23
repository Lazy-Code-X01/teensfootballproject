"use client";

import { createContext, useContext, useState } from "react";

export type ModalType = "trial" | "register-team" | "submit-content" | "share-story" | "secure-slot" | null;

export type ModalPrefill = Record<string, string>;

interface ModalContextType {
  openModal: (type: ModalType, prefill?: ModalPrefill) => void;
  closeModal: () => void;
  modalType: ModalType;
  prefill: ModalPrefill;
  isOpen: boolean;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [prefill, setPrefill] = useState<ModalPrefill>({});
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (type: ModalType, prefill: ModalPrefill = {}) => {
    setModalType(type);
    setPrefill(prefill);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setModalType(null);
      setPrefill({});
    }, 300);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modalType, prefill, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
}
