import { useState } from "react"
import { FaFilter, FaSortAmountDown, FaSortAmountUp, FaTimes } from "react-icons/fa"

const FilterSection = ({
  categories,
  personalityTags,
  priceRanges,
  filters,
  setFilters,
  sortOption,
  setSortOption,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleCategoryChange = (category) => {
    if (filters.categories.includes(category)) {
      setFilters({
        ...filters,
        categories: filters.categories.filter((c) => c !== category),
      })
    } else {
      setFilters({
        ...filters,
        categories: [...filters.categories, category],
      })
    }
  }

  const handlePersonalityChange = (personality) => {
    if (filters.personalities.includes(personality)) {
      setFilters({
        ...filters,
        personalities: filters.personalities.filter((p) => p !== personality),
      })
    } else {
      setFilters({
        ...filters,
        personalities: [...filters.personalities, personality],
      })
    }
  }

  const handlePriceRangeChange = (priceRange) => {
    setFilters({
      ...filters,
      priceRange,
    })
  }

  const clearFilters = () => {
    setFilters({
      categories: [],
      personalities: [],
      priceRange: null,
    })
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Filter & Sort</h2>
        <div className="flex space-x-2">
          {(filters.categories.length > 0 || filters.personalities.length > 0 || filters.priceRange) && (
            <button
              onClick={clearFilters}
              className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
            >
              <FaTimes className="mr-1" /> Clear
            </button>
          )}
          <button
            onClick={toggleExpanded}
            className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 md:hidden"
          >
            <FaFilter className="mr-1" /> {isExpanded ? "Hide" : "Show"} Filters
          </button>
        </div>
      </div>

      <div className={`md:grid md:grid-cols-4 gap-4 ${isExpanded ? "block" : "hidden md:grid"}`}>
        {/* Categories */}
        <div className="mb-4 md:mb-0">
          <h3 className="font-medium mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`tag ${filters.categories.includes(category) ? "tag-selected" : ""}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Personality Tags */}
        <div className="mb-4 md:mb-0">
          <h3 className="font-medium mb-2">Personality</h3>
          <div className="flex flex-wrap gap-2">
            {personalityTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handlePersonalityChange(tag)}
                className={`tag ${filters.personalities.includes(tag) ? "tag-selected" : ""}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-4 md:mb-0">
          <h3 className="font-medium mb-2">Price Range</h3>
          <div className="flex flex-wrap gap-2">
            {priceRanges.map((range) => (
              <button
                key={range.label}
                onClick={() => handlePriceRangeChange(range.value)}
                className={`tag ${filters.priceRange === range.value ? "tag-selected" : ""}`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sorting */}
        <div>
          <h3 className="font-medium mb-2">Sort By</h3>
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setSortOption("relevance")}
              className={`flex items-center px-3 py-2 rounded-xl text-sm ${
                sortOption === "relevance"
                  ? "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              Relevance
            </button>
            <button
              onClick={() => setSortOption("priceLowToHigh")}
              className={`flex items-center px-3 py-2 rounded-xl text-sm ${
                sortOption === "priceLowToHigh"
                  ? "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              <FaSortAmountUp className="mr-2" /> Price: Low to High
            </button>
            <button
              onClick={() => setSortOption("priceHighToLow")}
              className={`flex items-center px-3 py-2 rounded-xl text-sm ${
                sortOption === "priceHighToLow"
                  ? "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              <FaSortAmountDown className="mr-2" /> Price: High to Low
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterSection
