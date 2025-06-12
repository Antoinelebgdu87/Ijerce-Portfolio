import { motion } from "framer-motion";

interface LoadingAnimationProps {
  isVisible: boolean;
}

export function LoadingAnimation({ isVisible }: LoadingAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#161616] ${
        isVisible ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#f983e2] to-[#ff6b9d] rounded-full flex items-center justify-center"
        >
          <motion.div
            animate={{
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-8 h-8 bg-[#161616] rounded-full"
          />
        </motion.div>

        <motion.h2
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-xl font-semibold text-[#f8f8f8] mb-2"
        >
          Loading
        </motion.h2>

        <motion.div className="flex space-x-1 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [-4, 4, -4],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              className="w-2 h-2 bg-[#f983e2] rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
