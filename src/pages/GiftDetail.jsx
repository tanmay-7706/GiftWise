import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FaArrowLeft, FaHeart, FaRegHeart, FaTag } from "react-icons/fa"
import { giftsData } from "../data/giftsData"
import ShareButton from "../components/ShareButton"
import { useToast } from "../components/ToastContainer"
import EmptyState from "../components/EmptyState"

const GiftDetail = ({ savedGifts, saveGift, removeGift }) => {
  const { id } = useParams()
  const [gift, setGift] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { addToast } = useToast()

  useEffect(() => {
    // Simulate API call -->
    setIsLoading(true)
    setTimeout(() => {
      const foundGift = giftsData.find((g) => g.id === Number.parseInt(id))
      setGift(foundGift)
      setIsLoading(false)
    }, 500)
  }, [id])

  const isSaved = gift ? savedGifts.some((savedGift) => savedGift.id === gift.id) : false

  const handleSaveClick = () => {
    if (!isSaved) {
      saveGift(gift)
      addToast(`${gift.name} added to your saved gifts!`, "success")
    } else {
      removeGift(gift.id)
      addToast(`${gift.name} removed from your saved gifts`, "info")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  if (!gift) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <EmptyState
          title="Gift Not Found"
          message="We couldn't find the gift you're looking for."
          actionText="Browse Gifts"
          actionLink="/suggestions"
          icon={<FaTag className="h-8 w-8 text-pink-500" />}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            to="/suggestions"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
          >
            <FaArrowLeft className="mr-2" />
            Back to Suggestions
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 md:p-8">
              <div className="aspect-w-1 aspect-h-1 rounded-xl overflow-hidden mb-6">
                <img
                  src={gift.image || `https://source.unsplash.com/random/600x600/?${gift.category.toLowerCase()},gift`}
                  alt={gift.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {gift.matchTags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-3 py-1 rounded-full"
                  >
                    <FaTag className="h-3 w-3 mr-2" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold">{gift.name}</h1>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSaveClick}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700"
                  aria-label={isSaved ? "Remove from saved" : "Save gift"}
                >
                  {isSaved ? (
                    <FaHeart className="h-6 w-6 text-pink-500" />
                  ) : (
                    <FaRegHeart className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                  )}
                </motion.button>
              </div>

              <div className="flex items-center mb-6">
                <span className="text-lg font-medium bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg mr-3">
                  {gift.priceRange}
                </span>
                <span className="text-lg font-medium bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
                  {gift.category}
                </span>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{gift.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Why this gift?</h2>
                <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    This gift is perfect for people who are {gift.matchTags.join(", ")}. It's ideal for occasions like{" "}
                    {gift.occasions.join(", ")} and creates a {gift.moods.join(", ")} mood.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button onClick={handleSaveClick} className="flex-1 btn-primary flex items-center justify-center">
                  {isSaved ? (
                    <>
                      <FaHeart className="mr-2" /> Saved
                    </>
                  ) : (
                    <>
                      <FaRegHeart className="mr-2" /> Save Gift
                    </>
                  )}
                </button>

                <ShareButton url={window.location.href} title={`Check out this gift idea: ${gift.name}`} />
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Perfect For</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <h3 className="font-medium mb-2">Occasions</h3>
                <div className="flex flex-wrap gap-2">
                  {gift.occasions.map((occasion, index) => (
                    <span key={index} className="text-sm bg-white dark:bg-gray-600 px-3 py-1 rounded-full">
                      {occasion.charAt(0).toUpperCase() + occasion.slice(1)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <h3 className="font-medium mb-2">Personality</h3>
                <div className="flex flex-wrap gap-2">
                  {gift.matchTags.map((tag, index) => (
                    <span key={index} className="text-sm bg-white dark:bg-gray-600 px-3 py-1 rounded-full">
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <h3 className="font-medium mb-2">Mood</h3>
                <div className="flex flex-wrap gap-2">
                  {gift.moods.map((mood, index) => (
                    <span key={index} className="text-sm bg-white dark:bg-gray-600 px-3 py-1 rounded-full">
                      {mood.charAt(0).toUpperCase() + mood.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GiftDetail
