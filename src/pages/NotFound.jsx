import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { FaGift, FaHome } from "react-icons/fa"

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
          transition={{ duration: 1, delay: 0.5 }}
          className="inline-block mb-6"
        >
          <div className="bg-pink-100 dark:bg-pink-900/20 p-6 rounded-full">
            <FaGift className="h-16 w-16 text-pink-500" />
          </div>
        </motion.div>

        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Oops! Looks like this gift has been misplaced. Let's help you find your way back.
        </p>

        <Link to="/" className="inline-flex items-center btn-primary">
          <FaHome className="mr-2" /> Return Home
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound
