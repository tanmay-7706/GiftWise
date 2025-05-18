import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaCheck, FaTimes, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa"

const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        onClose && onClose()
      }, 300) // Wait for exit animation to complete -->
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheck className="h-5 w-5 text-green-500" />
      case "error":
        return <FaTimes className="h-5 w-5 text-red-500" />
      case "warning":
        return <FaExclamationTriangle className="h-5 w-5 text-yellow-500" />
      case "info":
        return <FaInfoCircle className="h-5 w-5 text-blue-500" />
      default:
        return <FaCheck className="h-5 w-5 text-green-500" />
    }
  }

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
      case "error":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
      case "info":
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
      default:
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-xl shadow-lg border ${getBgColor()}`}
        >
          <div className="flex-shrink-0 mr-3">{getIcon()}</div>
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{message}</div>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
          >
            <FaTimes className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
