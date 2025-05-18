import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaTimes, FaArrowRight, FaArrowLeft, FaGift, FaSearch, FaCalendarAlt, FaHeart } from "react-icons/fa"

const OnboardingTour = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // agar user ne already tour seen kara hua hai to usko tour nahi dikhana -->
  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour")
    if (hasSeenTour) {
      setIsVisible(false)
    }
  }, [])

  const steps = [
    {
      title: "Welcome to GiftWise!",
      description: "Let us show you around and help you find the perfect gifts for your loved ones.",
      icon: <FaGift className="h-8 w-8 text-pink-500" />,
    },
    {
      title: "Personalized Recommendations",
      description: "Tell us about the recipient's personality, the occasion, and the mood you're going for.",
      icon: <FaSearch className="h-8 w-8 text-pink-500" />,
    },
    {
      title: "Never Miss an Occasion",
      description: "Set reminders for birthdays, anniversaries, and other special events.",
      icon: <FaCalendarAlt className="h-8 w-8 text-pink-500" />,
    },
    {
      title: "Save Your Favorites",
      description: "Bookmark gift ideas you love and access them anytime.",
      icon: <FaHeart className="h-8 w-8 text-pink-500" />,
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    localStorage.setItem("hasSeenTour", "true")
    setIsVisible(false)
    onComplete && onComplete()
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <button
              onClick={handleComplete}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close tour"
            >
              <FaTimes className="h-5 w-5" />
            </button>

            <div className="p-6">
              <div className="flex justify-center mb-6">
                <div className="bg-pink-100 dark:bg-pink-900/20 p-4 rounded-full">{steps[currentStep].icon}</div>
              </div>

              <h2 className="text-2xl font-bold text-center mb-2">{steps[currentStep].title}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-8">{steps[currentStep].description}</p>

              <div className="flex justify-center mb-6">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full mx-1 ${
                      index === currentStep ? "bg-pink-500" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-between p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handlePrevious}
                className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium ${
                  currentStep === 0
                    ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                disabled={currentStep === 0}
              >
                <FaArrowLeft className="mr-2" /> Previous
              </button>

              <button
                onClick={handleNext}
                className="flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-pink-500 text-white hover:bg-pink-600"
              >
                {currentStep === steps.length - 1 ? (
                  "Get Started"
                ) : (
                  <>
                    Next <FaArrowRight className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default OnboardingTour
