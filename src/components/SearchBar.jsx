import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaSearch, FaTimes } from "react-icons/fa"

const SearchBar = ({ onSearch, placeholder = "Search gifts..." }) => {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  const clearSearch = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <div
        className={`flex items-center bg-white dark:bg-gray-800 rounded-full shadow-md transition-all ${
          isFocused ? "ring-2 ring-pink-300 dark:ring-pink-600" : ""
        }`}
      >
        <div className="pl-4 py-2">
          <FaSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full py-3 px-4 bg-transparent border-none focus:outline-none text-gray-800 dark:text-gray-200"
        />
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={clearSearch}
              className="pr-4 py-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Clear search"
            >
              <FaTimes className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SearchBar
