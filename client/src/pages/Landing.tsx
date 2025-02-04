import { useState, useEffect } from "react";
import { getCatgories } from "../api/getCatgories";
import useToggleModal from "../hooks/useToggleModal";
import { useNavigate } from "react-router-dom";
import { p } from "framer-motion/client";

interface Category {
  image_url: string;
  name: string;
}

const Landing = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const token = localStorage.getItem('authToken')

  const { setIsModalOpen } = useToggleModal();
  
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data: Category[] = await getCatgories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setCategories([]);
      }
    }

    fetchCategories();
  }, []);

  const AllowedIfLogin = (value : string) => {
    if(token) {
      localStorage.setItem('category',value)
      navigate('/home')
    }
    else{
      setIsModalOpen(true);
    }
      
  };

  return (
    <section className="h-[37rem] bg-white">
      <div className="w-full h-full py-28 pt-7 flex flex-col gap-20 justify-center items-center">
        <div className="text-center">
          <h1 className="text-[32px] font-medium text-[#5F5858]">
            Choose your Skin issue
          </h1>
          <p className="text-[16px] font-normal text-[#939393]">
            Glow naturally, care effortlessly.
          </p>
        </div>
        <div>
          <ul className="flex items-center gap-16">
            {categories?.length > 0 ?
              (categories?.map((category) => (
                <li
                  onClick={() => AllowedIfLogin(category.name)}
                  key={category?.name}
                  className="flex flex-col items-center gap-3 cursor-pointer"
                >
                  <img className="w-28 h-28" src={category?.image_url} />
                  <p className="font-[16px] text-center">{category.name}</p>
                </li>
              ))) : 
              (<p>Loading..</p>)}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Landing;
