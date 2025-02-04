import { createContext } from "react";

interface ModalContextProps {
  isModalOpen: boolean;
  setIsModalOpen: (state: boolean) => void;
}

export const ModalContext = createContext<ModalContextProps>({
  isModalOpen: false,
  setIsModalOpen: () => {},
});

