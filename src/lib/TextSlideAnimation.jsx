import { useEffect, useRef, Children } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

// eslint-disable-next-line react/prop-types
const TextSlideAnimation = ({ children }) => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true });
  const text = String(children);

  const mainControls = useAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 * i },
    }),
  };

  const childVariants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  useEffect(() => {
    isInView && mainControls.start("visible");
  }, [isInView, mainControls]);

  return (
    <div ref={ref} style={{ position: "relative", overflow: "hidden" }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={mainControls}
      >
        {isInView &&
          text.split(" ").map((child, index) => (
            <motion.span
              variants={childVariants}
              key={index}
              style={{ paddingRight: "5px" }}
            >
              {child}
            </motion.span>
          ))}
      </motion.div>
    </div>
  );
};

export default TextSlideAnimation;
