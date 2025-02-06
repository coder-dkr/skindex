import useToggleModal from "../hooks/useToggleModal";
import { LogoutUser } from "../api/auth/logtout";
import { useNavigate  , useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import { getSearchedProducts } from "../api/search";
import useSearch from "../hooks/useSearch";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { setIsModalOpen } = useToggleModal();
  const navigate = useNavigate();

  const [text, setText] = useState("");

  const { setSearchResults, setQuery } = useSearch();
  const location = useLocation();
  const [previousRoute, setPreviousRoute] = useState("/");

  useEffect(() => {
    if (location.pathname !== "/search") {
      setPreviousRoute(location.pathname); // Store previous route if it's not '/search'
    }
  }, [location.pathname]);

  const handleOnClick = () => {
    if (token) {
      const logoutconfirm = confirm('Logout ?')
      if(logoutconfirm) { LogoutUser();
      navigate("/");}
      return;
    }
    setIsModalOpen(true);
  };
  const token = localStorage.getItem("authToken");

  const handleSearch = async () => {
    try {
      const data = await getSearchedProducts(text);
      setSearchResults(data);
      setQuery(text);
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
  };

  useEffect(() => {
    if (text.trim() === "") {
      navigate(previousRoute);
      return;
    } else {
      navigate("/search");
    }
  }, [setText, text, navigate,previousRoute]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    handleSearch();
  };

  return (
    <header className="w-full h-24 bg-[#785BF8] flex items-center justify-between px-11 sticky top-0 z-[39]">
      <Link to='/'>
        <img src="/assets/skindex.svg" />
      </Link>

      <div className="flex w-[41rem] items-center bg-white rounded-full  px-7 gap-2">
        <button className="cursor-pointer">
          <img src="/assets/search.svg" />
        </button>
        <input
          type="text"
          value={text}
          onChange={handleOnChange}
          onClick={handleSearch}
          placeholder="Search here"
          className="text-[16px] w-full outline-0 border-none bg-white py-3.5"
        />
      </div>

      <button
        onClick={handleOnClick}
        className="text-white cursor-pointer font-[14px]"
      >
        {token ? "Logout" : "Login"}
      </button>
    </header>
  );
};

export default Header;
