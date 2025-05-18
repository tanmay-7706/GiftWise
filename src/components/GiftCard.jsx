import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FaHeart, FaRegHeart, FaTag, FaEye } from "react-icons/fa"
import confetti from "canvas-confetti"
import { useToast } from "./ToastContainer"

const GiftCard = ({ gift, isSaved, onSave, onRemove }) => {
  const [isHovered, setIsHovered] = useState(false)
  const { addToast } = useToast()

  const handleSaveClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isSaved) {
      // Trigger confetti effect when saving a gift (AI help taken from canvas-confetti) -->
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
      onSave(gift)
      addToast(`${gift.name} added to your saved gifts!`, "success")
    } else {
      onRemove(gift.id)
      addToast(`${gift.name} removed from your saved gifts`, "info")
    }
  }

  return (
    <motion.div
      className="card h-full flex flex-col"
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/gift/${gift.id}`} className="flex flex-col h-full">
        <div className="relative h-48 rounded-xl overflow-hidden mb-4">
          <img
            src={gift.image || `https://source.unsplash.com/random/300x200/?${gift.category.toLowerCase()},gift`}
            alt={gift.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 right-0 p-2">
            <motion.button
              onClick={handleSaveClick}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md"
              aria-label={isSaved ? "Remove from saved" : "Save gift"}
            >
              {isSaved ? (
                <FaHeart className="h-5 w-5 text-pink-500" />
              ) : (
                <FaRegHeart className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </motion.button>
          </div>
          {gift.recommended && (
            <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
              Top Pick
            </div>
          )}

          {/* button ko hover karne pat details visible hongi */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-full flex items-center">
              <FaEye className="mr-2" />
              View Details
            </div>
          </motion.div>
        </div>

        <div className="flex-grow">
          <h3 className="text-lg font-semibold mb-1">{gift.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{gift.description}</p>

          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
              {gift.priceRange}
            </span>
            <span className="text-sm font-medium bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
              {gift.category}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-auto">
            {gift.matchTags.slice(0, 3).map((tag, index) => (
              <div
                key={index}
                className="flex items-center text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-2 py-1 rounded-full"
              >
                <FaTag className="h-3 w-3 mr-1" />
                {tag}
              </div>
            ))}
            {gift.matchTags.length > 3 && (
              <div className="flex items-center text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                +{gift.matchTags.length - 3} more
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default GiftCard
