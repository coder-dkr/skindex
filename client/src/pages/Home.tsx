import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import ProductGallery from "../components/ProductGallery";
import useToggleModal from "../hooks/useToggleModal";
import { useNavigate } from "react-router-dom";

interface DecodedToken {
  username: string;
  selectedCategory: string;
}

const Home = () => {
  const [username, setUsername] = useState("Default user");
  const token: string = localStorage.getItem("authToken") || "no token";
  const Category = localStorage.getItem("category");

  const navigate = useNavigate()

  const { setIsModalOpen } = useToggleModal();

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setUsername(decodedToken?.username);
      } catch (err) {
        console.error("Invalid or expired token", err);
      }
    }
    else{
      navigate('/')
    }
  }, [token, setUsername]);

  const handleUpdate = () => {
    setIsModalOpen(true);
  };

  return ( //  mb-[16.3rem] 
    <section className="bg-white py-10 px-24
    
     flex-1">
      <div className="px-8">
        <h1 className="text-[32px] text-[#785BF8] font-semibold">
          Hey <span className="font-normal">{username}</span>
        </h1>
        <p className="text-[#A4A4A4] text-xl">
          Some recommended product for your problem of {Category}
          <button
            onClick={handleUpdate}
            className="mx-3 text-[#785BF8] text-sm cursor-pointer"
          >
            Update category
          </button>
        </p>
      </div>

      <div className="mt-10">
        <ProductGallery category />
      </div>

      <div className="w-full bg-[#EBE7FF] rounded-[20px] relative h-60 mt-14 flex flex-col justify-center items-center">
        <img
          src="/assets/girls.svg"
          className="absolute top-5  left-14"
          alt=""
        />
        <img
          src="/assets/skindexwhite.svg"
          className="absolute bottom-1 right-10"
          width={260}
          height={260}
        />
        <div className="flex flex-col items-start">
          <h1 className="text-[32px] text-[#785BF8] font-semibold">
            Talk to an Expert today
          </h1>
          <p className="text-[#A4A4A4] text-xl">
            Get an expert advice in just few clicks and let the magic happen
          </p>
          <button className="rounded-[13px] mt-12 bg-white px-7 py-3 text-[#785BF8]">
            Schedule Call
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
