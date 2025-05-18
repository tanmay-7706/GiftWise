import { motion } from "framer-motion"
import { FaCheck } from "react-icons/fa"

const PersonalityTagSelector = ({ tags, selectedTags, onTagSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag.value)

        return (
          <motion.button
            key={tag.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTagSelect(tag.value)}
            className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
              isSelected
                ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                : "border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-700"
            }`}
          >
            {isSelected && (
              <div className="absolute top-2 right-2 bg-pink-500 text-white rounded-full p-1">
                <FaCheck className="h-3 w-3" />
              </div>
            )}
            <div className="text-2xl mb-2">{tag.icon}</div>
            <span className="text-sm font-medium">{tag.label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}

export default PersonalityTagSelector
