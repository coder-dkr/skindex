import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignInModal from "./components/SignInModal";
import SignInContextProvider from "./Providers/SignContextProvider";
import UpdateCategoryModal from "./components/UpdateCategoryModal";
import SearchContextProvider from "./Providers/SearchContextProvider";

const Layout = () => {

  return (
    <SignInContextProvider>
      <SearchContextProvider>
        <Header />
        <Outlet />
        <SignInModal />
        <UpdateCategoryModal />
        <Footer />
      </SearchContextProvider>
    </SignInContextProvider>
  );
};

export default Layout;
