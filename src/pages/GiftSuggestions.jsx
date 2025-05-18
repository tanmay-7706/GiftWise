import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import GiftCard from "../components/GiftCard"
import FilterSection from "../components/FilterSection"
import BackToTop from "../components/BackToTop"
import { FaGift } from "react-icons/fa"
import { giftsData } from "../data/giftsData"

const GiftSuggestions = ({ savedGifts, saveGift, removeGift }) => {
  const [gifts, setGifts] = useState([])
  const [filteredGifts, setFilteredGifts] = useState([])
  const [filters, setFilters] = useState({
    categories: [],
    personalities: [],
    priceRange: null,
  })
  const [sortOption, setSortOption] = useState("relevance")
  const [isLoading, setIsLoading] = useState(true)

  // Get all unique categories from gifts -->
  const categories = [...new Set(giftsData.map((gift) => gift.category))]

  // Get all unique personality tags from gifts -->
  const personalityTags = [...new Set(giftsData.flatMap((gift) => gift.matchTags))]

  // Price ranges -->
  const priceRanges = [
    { label: "Under $25", value: "under25" },
    { label: "$25-$50", value: "25to50" },
    { label: "$50-$100", value: "50to100" },
    { label: "$100-$200", value: "100to200" },
    { label: "Over $200", value: "over200" },
  ]

  useEffect(() => {
    // Simulate loading data from API -->
    const loadGifts = async () => {
      setIsLoading(true)

      // Get persona data from session storage -->
      const personaData = sessionStorage.getItem("giftPersona")
      let persona = {}

      if (personaData) {
        persona = JSON.parse(personaData)
      }

      // persona ke basis par gifts ko filter karenge -->
      let filteredResults = [...giftsData]

      if (persona.occasion) {
        filteredResults = filteredResults.filter((gift) => gift.occasions.includes(persona.occasion))
      }

      if (persona.personalityTags && persona.personalityTags.length > 0) {
        filteredResults = filteredResults.filter((gift) =>
          persona.personalityTags.some((tag) => gift.matchTags.includes(tag)),
        )
      }

      if (persona.mood) {
        filteredResults = filteredResults.filter((gift) => gift.moods.includes(persona.mood))
      }

      // kuch gifts ko recommended mark ker denge -->
      filteredResults = filteredResults.map((gift) => ({
        ...gift,
        recommended: Math.random() > 0.7, // Randomly mark some gifts as recommended
      }))

      // Simulate API delay -->
      setTimeout(() => {
        setGifts(filteredResults)
        setFilteredGifts(filteredResults)
        setIsLoading(false)
      }, 1000)
    }

    loadGifts()
  }, [])

  // Apply filters and sorting -->
  useEffect(() => {
    let results = [...gifts]

    // Apply category filter -->
    if (filters.categories.length > 0) {
      results = results.filter((gift) => filters.categories.includes(gift.category))
    }

    // Apply personality filter -->
    if (filters.personalities.length > 0) {
      results = results.filter((gift) => filters.personalities.some((tag) => gift.matchTags.includes(tag)))
    }

    // Apply price range filter -->
    if (filters.priceRange) {
      switch (filters.priceRange) {
        case "under25":
          results = results.filter((gift) => gift.priceValue < 25)
          break
        case "25to50":
          results = results.filter((gift) => gift.priceValue >= 25 && gift.priceValue <= 50)
          break
        case "50to100":
          results = results.filter((gift) => gift.priceValue > 50 && gift.priceValue <= 100)
          break
        case "100to200":
          results = results.filter((gift) => gift.priceValue > 100 && gift.priceValue <= 200)
          break
        case "over200":
          results = results.filter((gift) => gift.priceValue > 200)
          break
        default:
          break
      }
    }

    // Apply sorting -->
    switch (sortOption) {
      case "priceLowToHigh":
        results.sort((a, b) => a.priceValue - b.priceValue)
        break
      case "priceHighToLow":
        results.sort((a, b) => b.priceValue - a.priceValue)
        break
      case "relevance":
      default:
        // For relevance, recommended items ko pehle show karayenge -->
        results.sort((a, b) => {
          if (a.recommended && !b.recommended) return -1
          if (!a.recommended && b.recommended) return 1
          return 0
        })
        break
    }

    setFilteredGifts(results)
  }, [gifts, filters, sortOption])

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Gift Suggestions</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Based on your selections, here are some gift ideas we think they'll love
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="mb-4"
            >
              <FaGift className="h-12 w-12 text-pink-500" />
            </motion.div>
            <p className="text-lg">Finding the perfect gifts...</p>
          </div>
        ) : (
          <>
            <FilterSection
              categories={categories}
              personalityTags={personalityTags}
              priceRanges={priceRanges}
              filters={filters}
              setFilters={setFilters}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />

            {filteredGifts.length > 0 ? (
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
              <div className="text-center py-12">
                <div className="bg-pink-100 dark:bg-pink-900/20 p-4 rounded-full inline-block mb-4">
                  <FaGift className="h-8 w-8 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No gifts match your filters</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your filters to see more gift options.
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      categories: [],
                      personalities: [],
                      priceRange: null,
                    })
                  }
                  className="btn-secondary"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <BackToTop />
    </div>
  )
}

export default GiftSuggestions
