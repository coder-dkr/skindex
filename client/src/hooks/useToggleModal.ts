import { useContext } from "react";
import { ModalContext } from "../contexts/SignInModalContext";

const useToggleModal = () => {
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

  return { isModalOpen, setIsModalOpen };
};

export default useToggleModal;
