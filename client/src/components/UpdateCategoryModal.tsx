import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useToggleModal from "../hooks/useToggleModal";

const UpdateCategoryModal = () => {
  const categories = ["Face", "Acne", "Pigmentation", "Wrinkles", "Under-eye"];
  const { isModalOpen, setIsModalOpen } = useToggleModal();
  const token = localStorage.getItem("authToken") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("category", selectedCategory);
    window.dispatchEvent(new Event("storage"));
    handleCloseModal();
  };

  if (!isModalOpen || token === "") return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/15 z-40"
        onClick={() => console.log("cliclk")}
      />

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <motion.div
          initial={{ y: 650, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.1, ease: "linear", delay: 0 }}
          className="bg-white rounded-[20px] shadow-lg w-[31rem] pb-12 p-6 px-[3.8rem] relative transition-all duration-300"
        >
          <button
            onClick={handleCloseModal}
            className="absolute top-6.5 right-4 cursor-pointer"
          >
            <img src="/assets/cross.svg" width={24} height={24} alt="" />
          </button>
          <h2 className="text-xl font-semibold text-center">Update Category</h2>
          <p className="text-[#939393] text-xs text-center mt-1 mb-6">
            Glow naturally, care effortlessly.
          </p>

          <form onSubmit={handleUpdateCategory}>
            {/* Category Selection */}

            <div className={`mb-4 transition-all duration-200`}>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category);
                      console.log("Selected category:", category);
                    }}
                    className={`p-2 border border-[#785BF8] rounded-[8px] text-xs cursor-pointer ${
                      selectedCategory === category
                        ? "bg-[#785BF8] text-white"
                        : "border-[#785BF8] text-[#785BF8] hover:bg-purple-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#785BF8] text-white py-2 rounded-lg cursor-pointer transition mt-5 h-11"
            >
              Submit
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default UpdateCategoryModal;
