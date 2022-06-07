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
      variants={pageVariants} // Pass the variant object into Framer Motion
      initial="hidden" // Set the initial state to variants.hidden
      animate="enter" // Animated state to variants.enter
      exit="exit" // Exit state (used later) to variants.exit
      transition={{ type: "linear" }} // Set the transition to linear
      className="bg-base-100"
      data-theme="garden"
    >
      {children}
    </motion.main>
  );
}

export default PageTransition;
