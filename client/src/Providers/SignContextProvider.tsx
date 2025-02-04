import { ModalContext} from "../contexts/SignInModalContext";

import { useState , ReactNode } from "react";

const ModalContextProvider = ({ children }: { children: ReactNode }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  
    return (
      <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
        {children}
      </ModalContext.Provider>
    );
  };

  export default ModalContextProvider