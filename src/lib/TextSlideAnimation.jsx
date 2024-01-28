import { useEffect, useRef, Children } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

// eslint-disable-next-line react/prop-types
const TextSlideAnimation = ({ children }) => {
    const ref = useRef();
    const isInView = useInView(ref,{once : true});

    const mainControls = useAnimation();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
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
    }, [isInView,mainControls]);

    return (
        <div ref={ref} style={{ position: "relative", overflow: "hidden" }}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={mainControls}>
                {isInView &&
                    Children.toArray(children).map((child, index) => (
                        <motion.span variants={childVariants} key={index}>
                            {child}
                        </motion.span>
                    ))}
            </motion.div>
        </div>
    );
};

export default TextSlideAnimation;