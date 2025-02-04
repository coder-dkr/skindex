import { useState, useEffect } from "react";
import { getCatgories } from "../api/getCatgories";
import useToggleModal from "../hooks/useToggleModal";

interface Category {
  image_url: string;
  name: string;
}

const Landing = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const {setIsModalOpen} = useToggleModal()

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

  const AllowedIfLogin = () => {
    setIsModalOpen(true)
  }

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
            {categories?.length > 0 && categories?.map((category) => (
              <li onClick={AllowedIfLogin} key={category?.name} className="flex flex-col items-center gap-3 cursor-pointer">
                <img className="w-28 h-28" src={category?.image_url} />
                <p className="font-[16px] text-center">{category.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Landing;
