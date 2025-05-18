import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaShareAlt, FaLink, FaFacebookF, FaTwitter, FaWhatsapp, FaTimes } from "react-icons/fa"
import { useToast } from "./ToastContainer"

const ShareButton = ({ url, title }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { addToast } = useToast()

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleShare = async (platform) => {
    // Check if the Web Share API is available -->
    if (navigator.share && platform === "native") {
      try {
        await navigator.share({
          title: title,
          url: url,
        })
        addToast("Shared successfully!", "success")
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback for platforms or when Web Share API is not available -->
      let shareUrl = ""

      switch (platform) {
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
          break
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
          break
        case "whatsapp":
          shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`
          break
        case "copy":
          navigator.clipboard.writeText(url)
          addToast("Link copied to clipboard!", "success")
          setIsOpen(false)
          return
        default:
          break
      }

      if (shareUrl) {
        window.open(shareUrl, "_blank", "noopener,noreferrer")
      }
    }

    setIsOpen(false)
  }

  // Check if the Web Share API is available -->
  const canUseNativeShare = !!navigator.share

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={canUseNativeShare ? () => handleShare("native") : toggleOpen}
        className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <FaShareAlt className="mr-2" />
        Share
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-10 overflow-hidden"
          >
            <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium">Share via</span>
              <button
                onClick={toggleOpen}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FaTimes className="h-4 w-4" />
              </button>
            </div>
            <div className="p-2">
              <button
                onClick={() => handleShare("copy")}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <FaLink className="h-4 w-4 mr-3 text-gray-500" />
                Copy Link
              </button>
              <button
                onClick={() => handleShare("facebook")}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <FaFacebookF className="h-4 w-4 mr-3 text-blue-600" />
                Facebook
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <FaTwitter className="h-4 w-4 mr-3 text-blue-400" />
                Twitter
              </button>
              <button
                onClick={() => handleShare("whatsapp")}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <FaWhatsapp className="h-4 w-4 mr-3 text-green-500" />
                WhatsApp
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ShareButton
