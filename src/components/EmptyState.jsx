import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const EmptyState = ({ title, message, actionText, actionLink, icon }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center p-8 my-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-pink-100 dark:bg-pink-900/20 p-6 rounded-full mb-6">{icon}</div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">{message}</p>
      {actionText && actionLink && (
        <Link to={actionLink} className="btn-primary">
          {actionText}
        </Link>
      )}
    </motion.div>
  )
}

export default EmptyState
