import { useState } from "react"
import { motion } from "framer-motion"
import GiftCard from "../components/GiftCard"
import EmptyState from "../components/EmptyState"
import { FaDownload, FaTrash, FaFilter } from "react-icons/fa"

const SavedGifts = ({ savedGifts, removeGift }) => {
  const [groupBy, setGroupBy] = useState(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  // selected property ke basis par gifts ko group karenge -->
  const groupedGifts = () => {
    if (!groupBy || savedGifts.length === 0) {
      return { "All Gifts": savedGifts }
    }

    return savedGifts.reduce((groups, gift) => {
      let key

      if (groupBy === "category") {
        key = gift.category
      } else if (groupBy === "priceRange") {
        key = gift.priceRange
      } else {
        // first match ko default tag kara denge agar grouping personality ke basis par kar rahe hain -->
        key = gift.matchTags[0] || "Other"
      }

      if (!groups[key]) {
        groups[key] = []
      }

      groups[key].push(gift)
      return groups
    }, {})
  }

  const handleRemoveAll = () => {
    if (window.confirm("Are you sure you want to remove all saved gifts?")) {
      savedGifts.forEach((gift) => removeGift(gift.id))
    }
  }

  const handleExportPDF = () => {
    alert("This would export your saved gifts as a PDF in a real application.")
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-pink-400">Saved Gifts</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Your collection of bookmarked gift ideas</p>
          </div>

          {savedGifts.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <button
                onClick={toggleFilter}
                className="flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FaFilter className="mr-2" /> Group By
              </button>

              <button
                onClick={handleExportPDF}
                className="flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FaDownload className="mr-2" /> Export
              </button>

              <button
                onClick={handleRemoveAll}
                className="flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/40"
              >
                <FaTrash className="mr-2" /> Clear All
              </button>
            </div>
          )}
        </div>

        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md"
          >
            <h3 className="font-medium mb-3">Group gifts by:</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setGroupBy(null)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  groupBy === null
                    ? "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                None
              </button>
              <button
                onClick={() => setGroupBy("category")}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  groupBy === "category"
                    ? "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                Category
              </button>
              <button
                onClick={() => setGroupBy("personality")}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  groupBy === "personality"
                    ? "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                Personality
              </button>
              <button
                onClick={() => setGroupBy("priceRange")}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  groupBy === "priceRange"
                    ? "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                Price Range
              </button>
            </div>
          </motion.div>
        )}

        {savedGifts.length === 0 ? (
          <EmptyState
            title="No saved gifts yet"
            message="Start exploring gift ideas and save your favorites to see them here."
            actionText="Find Gift Ideas"
            actionLink="/persona"
          />
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedGifts()).map(([group, gifts]) => (
              <div key={group}>
                {groupBy && (
                  <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                    {group}
                  </h2>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {gifts.map((gift) => (
                    <GiftCard key={gift.id} gift={gift} isSaved={true} onSave={() => {}} onRemove={removeGift} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedGifts
