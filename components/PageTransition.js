import { motion } from "framer-motion";
import React from "react";

function PageTransition({ children }) {
  const pageVariants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };
  return (
    <motion.main
      variants={pageVariants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "linear" }}
      className="bg-base-100"
      data-theme="garden"
    >
      {children}
    </motion.main>
  );
}

export default PageTransition;
