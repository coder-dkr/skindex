import { useEffect, useState } from "react";
import useToggleModal from "../hooks/useToggleModal";
import { LoginUser } from "../api/auth/login";
import { SignUpUser } from "../api/auth/signup";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SignUpModal = () => {
  const navigate = useNavigate();

  const { isModalOpen, setIsModalOpen } = useToggleModal();

  const categories = ["Face", "Acne", "Pigmentation", "Wrinkles", "Under-eye"];

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [containerHeight, setcontainerHeight] = useState("24.5rem");

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmpassword, setConfirmpassword] = useState<string>("");
  const [userNotExist, setUserNotExist] = useState<boolean>(false);

  const token = localStorage.getItem("authToken");

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

  useEffect(() => {
    if (isSigningIn) {
      setcontainerHeight("34.5rem");
    } else {
      setcontainerHeight("24.5rem");
    }
  }, [isModalOpen, setcontainerHeight, isSigningIn]);

  const toggleSignIn = () => {
    setIsSigningIn((prev) => !prev);
    setUserNotExist(false);
  };

  const handleCloseModal = () => {
    setIsSigningIn(false);
    setIsModalOpen(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const message = await LoginUser({
        username,
        password,
      });
      if (message.status == 404) {
        setUserNotExist(true);
      } else {
        console.log(message);
        handleCloseModal();
        navigate("/home");
      }
    } catch (err) {
      console.log("error log in", username, err);
    } finally {
      setPassword("");
      setUsername("");
      setConfirmpassword("");
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      console.log("Passwords do not match");
      return;
    }
    try {
      const message = await SignUpUser({
        username,
        password,
        selectedCategory,
      });
      console.log(message);
      navigate("/home");
    } catch (err) {
      console.log("error log in", username, err);
    } finally {
      handleCloseModal();
    }
  };

  if (!isModalOpen || token) return null;

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black/15 z-40"
        onClick={() => console.log("cliclk")}
      />

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <motion.div
          initial={{ y: 650, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.1, ease: "linear", delay: 0 }}
          className="bg-white rounded-[20px] shadow-lg w-[31rem] min-h-[24.5rem] p-6 px-[3.8rem] relative transition-all duration-300"
          style={{ height: containerHeight }}
        >
          <button
            onClick={handleCloseModal}
            className="absolute top-6.5 right-4 cursor-pointer"
          >
            <img src="/assets/cross.svg" width={24} height={24} alt="" />
          </button>
          <h2 className="text-xl font-semibold text-center">
            {isSigningIn ? "Sign up" : "Login for next Action!"}
          </h2>
          <p className="text-[#939393] text-xs text-center mt-1 mb-6">
            Glow naturally, care effortlessly.
          </p>

          <form onSubmit={isSigningIn ? handleSignIn : handleLogin}>
            <div className="mb-4">
              <input
                value={username}
                onFocus={() => setUserNotExist(false)}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                required
                placeholder={isSigningIn ? "Enter your Username" : "Username"}
                className="w-full px-4 py-2 border placeholder:text-[#AFAFAF] font-[14px] border-gray-300 rounded-lg focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <input
                value={password}
                onFocus={() => setUserNotExist(false)}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder={isSigningIn ? "Create Password" : "Password"}
                className="w-full px-4 py-2 border placeholder:text-[#AFAFAF] font-[14px] border-gray-300 rounded-lg focus:outline-none"
              />
            </div>

            {isSigningIn && (
              <div className="mb-4 transition-all duration-200 ">
                <input
                  value={confirmpassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                  type="password"
                  required
                  placeholder="Confirm Passowrd"
                  className="w-full px-4 py-2 border placeholder:text-[#AFAFAF] font-[14px] border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
            )}

            {/* Category Selection */}
            {isSigningIn && (
              <div className={`mb-4 transition-all duration-200`}>
                <p className="font-semibold mb-2">Choose category</p>
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
            )}
            {userNotExist && (
              <p className="text-red-500 text-xs text-center">
                User Not Found. Try Again or Sign up
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-[#785BF8] text-white py-2 rounded-lg cursor-pointer transition mt-5 h-11"
            >
              Submit
            </button>
          </form>

          {/* Divider */}
          <hr className="my-9 border border-[#D8D8D8]" />

          {/* Sign-up Link */}
          <p className="text-center text-gray-500 text-xs">
            {isSigningIn ? "Already have an account? " : "Or? "}
            <button
              onClick={toggleSignIn}
              className="text-[#785BF8] font-semibold cursor-pointer"
            >
              {isSigningIn ? "Log In" : "Sign UP"}
            </button>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default SignUpModal;
