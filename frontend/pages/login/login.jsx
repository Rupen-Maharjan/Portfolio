import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoginForm, RegisterForm } from "../../components/export";

const Login = () => {
  const [activeButton, setActiveButton] = useState("Login");
  const isRegister = activeButton === "Register";

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <header className="min-h-screen flex justify-center items-center bg-[#0f1018]">
      <motion.div
        className="w-full max-w-md p-8 bg-[#141521] rounded-2xl shadow-xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="space-y-2 mb-8">
          <h2 className="text-3xl font-bold text-center text-white">Get in touch</h2>
          <p className="text-gray-300 text-center text-sm">
            {isRegister ? "Create a new account" : "Sign in to continue to your account"}
          </p>
        </motion.div>

        <motion.div
          className="w-full mx-auto relative flex items-center bg-[#1e1f2d] p-1 rounded-xl mb-8"
          variants={itemVariants}
        >
          <motion.div
            className="absolute rounded-lg bg-[#2d2f45] h-[90%] w-[49%] shadow-md"
            animate={{
              x: activeButton === "Login" ? 0 : "100%",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />
          <div className="flex justify-between items-center w-full z-10">
            <motion.button
              type="button"
              className={`py-2.5 rounded-lg text-sm font-semibold text-center w-[50%] transition-colors ${
                activeButton === "Login" ? "text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveButton("Login")}
            >
              Login
            </motion.button>
            <motion.button
              type="button"
              className={`py-2.5 rounded-lg text-sm font-semibold text-center w-[50%] transition-colors ${
                activeButton === "Register" ? "text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveButton("Register")}
            >
              Register
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeButton}
            className="space-y-6"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
          >
            {isRegister ? <RegisterForm /> : <LoginForm />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Login;
