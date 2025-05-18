import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaFilter, FaTimes } from "react-icons/fa"
import GiftCard from "../components/GiftCard"
import SearchBar from "../components/SearchBar"
import BackToTop from "../components/BackToTop"
import EmptyState from "../components/EmptyState"
import { giftsData } from "../data/giftsData"

const Explore = ({ savedGifts, saveGift, removeGift }) => {
  const [gifts, setGifts] = useState([])
  const [filteredGifts, setFilteredGifts] = useState([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("relevance")
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  // Get all unique categories from gifts -->
  const categories = ["all", ...new Set(giftsData.map((gift) => gift.category))]

  // Sort options -->
  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "priceLowToHigh", label: "Price: Low to High" },
    { value: "priceHighToLow", label: "Price: High to Low" },
    { value: "newest", label: "Newest" },
  ]

  useEffect(() => {
    // Simulate loading data from API -->
    setIsLoading(true)
    setTimeout(() => {
      setGifts(giftsData)
      setFilteredGifts(giftsData)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Filter and sort gifts -->
  useEffect(() => {
    let results = [...gifts]

    // Apply category filter -->
    if (activeCategory !== "all") {
      results = results.filter((gift) => gift.category === activeCategory)
    }

    // Apply search filter -->
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (gift) =>
          gift.name.toLowerCase().includes(query) ||
          gift.description.toLowerCase().includes(query) ||
          gift.category.toLowerCase().includes(query) ||
          gift.matchTags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Apply sorting -->
    switch (sortOption) {
      case "priceLowToHigh":
        results.sort((a, b) => a.priceValue - b.priceValue)
        break
      case "priceHighToLow":
        results.sort((a, b) => b.priceValue - a.priceValue)
        break
      case "newest":
        results.sort((a, b) => b.id - a.id)
        break
      case "relevance":
      default:
        // For relevance, show recommended items first -->
        results.sort((a, b) => {
          if (a.recommended && !b.recommended) return -1
          if (!a.recommended && b.recommended) return 1
          return 0
        })
        break
    }

    setFilteredGifts(results)
  }, [gifts, activeCategory, searchQuery, sortOption])

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const clearFilters = () => {
    setActiveCategory("all")
    setSearchQuery("")
    setSortOption("relevance")
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Explore Gift Ideas</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Browse our curated collection of thoughtful gift ideas for every occasion
          </p>
        </div>

        <SearchBar onSearch={handleSearch} placeholder="Search by name, category, or tag..." />

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <button
                onClick={toggleFilters}
                className="md:hidden flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
              >
                <FaFilter className="mr-1" /> {showFilters ? "Hide" : "Show"} Filters
              </button>
            </div>

            <div className="flex items-center space-x-2">
              {activeCategory !== "all" && (
                <button
                  onClick={clearFilters}
                  className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
                >
                  <FaTimes className="mr-1" /> Clear Filters
                </button>
              )}

              <div className="flex items-center">
                <label htmlFor="sort" className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={handleSortChange}
                  className="text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className={`${showFilters ? "block" : "hidden"} md:block`}>
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {category === "all" ? "All Categories" : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="mb-4"
            >
              <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full"></div>
            </motion.div>
            <p className="text-lg">Loading gift ideas...</p>
          </div>
        ) : filteredGifts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGifts.map((gift) => (
              <GiftCard
                key={gift.id}
                gift={gift}
                isSaved={savedGifts.some((savedGift) => savedGift.id === gift.id)}
                onSave={saveGift}
                onRemove={removeGift}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No gifts found"
            message="Try adjusting your search or filters to find the perfect gift."
            actionText="Clear Filters"
            actionLink="#"
            icon={<FaFilter className="h-8 w-8 text-pink-500" />}
          />
        )}
      </div>

      <BackToTop />
    </div>
  )
}

export default Explore
