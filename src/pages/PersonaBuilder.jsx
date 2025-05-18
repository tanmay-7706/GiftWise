import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { FaArrowRight, FaArrowLeft, FaGift, FaCalendarAlt, FaUserAlt, FaPalette } from "react-icons/fa"
import ProgressBar from "../components/ProgressBar"
import PersonalityTagSelector from "../components/PersonalityTagSelector"

const PersonaBuilder = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    occasion: "",
    personalityTags: [],
    mood: "",
  })

  const totalSteps = 3

  const occasions = [
    { value: "birthday", label: "Birthday", icon: "🎂" },
    { value: "anniversary", label: "Anniversary", icon: "💍" },
    { value: "graduation", label: "Graduation", icon: "🎓" },
    { value: "housewarming", label: "Housewarming", icon: "🏠" },
    { value: "wedding", label: "Wedding", icon: "👰" },
    { value: "babyShower", label: "Baby Shower", icon: "👶" },
    { value: "promotion", label: "Promotion", icon: "💼" },
    { value: "holiday", label: "Holiday", icon: "🎄" },
    { value: "farewell", label: "Farewell", icon: "✈️" },
    { value: "justBecause", label: "Just Because", icon: "❤️" },
  ]

  const personalityTags = [
    { value: "introvert", label: "Introvert", icon: "🧠" },
    { value: "extrovert", label: "Extrovert", icon: "🗣️" },
    { value: "adventurous", label: "Adventurous", icon: "🏔️" },
    { value: "techSavvy", label: "Tech-Savvy", icon: "💻" },
    { value: "artistic", label: "Artistic", icon: "🎨" },
    { value: "athletic", label: "Athletic", icon: "🏃" },
    { value: "bookworm", label: "Bookworm", icon: "📚" },
    { value: "foodie", label: "Foodie", icon: "🍽️" },
    { value: "minimalist", label: "Minimalist", icon: "✨" },
    { value: "practical", label: "Practical", icon: "🛠️" },
  ]

  const moods = [
    { value: "thoughtful", label: "Thoughtful", icon: "💭" },
    { value: "funny", label: "Funny", icon: "😂" },
    { value: "practical", label: "Practical", icon: "🧰" },
    { value: "premium", label: "Premium", icon: "✨" },
    { value: "diy", label: "DIY", icon: "🔨" },
    { value: "unique", label: "Unique", icon: "🦄" },
    { value: "nostalgic", label: "Nostalgic", icon: "📸" },
    { value: "romantic", label: "Romantic", icon: "❤️" },
    { value: "relaxing", label: "Relaxing", icon: "🧘" },
    { value: "adventurous", label: "Adventurous", icon: "🌍" },
  ]

  const handleOccasionSelect = (occasion) => {
    setFormData({
      ...formData,
      occasion,
    })
  }

  const handlePersonalityTagSelect = (tag) => {
    if (formData.personalityTags.includes(tag)) {
      setFormData({
        ...formData,
        personalityTags: formData.personalityTags.filter((t) => t !== tag),
      })
    } else {
      setFormData({
        ...formData,
        personalityTags: [...formData.personalityTags, tag],
      })
    }
  }

  const handleMoodSelect = (mood) => {
    setFormData({
      ...formData,
      mood,
    })
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // session storage mein form ka data save karna hai -->
      sessionStorage.setItem("giftPersona", JSON.stringify(formData))

      // suggestions page par navigate karna hai -->
      navigate("/suggestions")
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return !!formData.occasion
      case 2:
        return formData.personalityTags.length > 0
      case 3:
        return !!formData.mood
      default:
        return false
    }
  }

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-pink-400">Build Your Gift Persona</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Help us understand who you're shopping for</p>
        </div>

        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <div className="card overflow-hidden">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-pink-100 dark:bg-pink-900/20 p-2 rounded-full">
                    <FaCalendarAlt className="h-6 w-6 text-pink-500" />
                  </div>
                  <h2 className="text-xl font-semibold ml-3">What's the occasion?</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {occasions.map((occasion) => (
                    <motion.button
                      key={occasion.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleOccasionSelect(occasion.value)}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                        formData.occasion === occasion.value
                          ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-700"
                      }`}
                    >
                      <div className="text-2xl mb-2">{occasion.icon}</div>
                      <span className="text-sm font-medium">{occasion.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-pink-100 dark:bg-pink-900/20 p-2 rounded-full">
                    <FaUserAlt className="h-6 w-6 text-pink-500" />
                  </div>
                  <h2 className="text-xl font-semibold ml-3">What's their personality like?</h2>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Select all that apply. This helps us find gifts that match their style.
                </p>

                <PersonalityTagSelector
                  tags={personalityTags}
                  selectedTags={formData.personalityTags}
                  onTagSelect={handlePersonalityTagSelect}
                />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-pink-100 dark:bg-pink-900/20 p-2 rounded-full">
                    <FaPalette className="h-6 w-6 text-pink-500" />
                  </div>
                  <h2 className="text-xl font-semibold ml-3">What mood or vibe are you going for?</h2>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Choose the feeling you want your gift to convey.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {moods.map((mood) => (
                    <motion.button
                      key={mood.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleMoodSelect(mood.value)}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                        formData.mood === mood.value
                          ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-700"
                      }`}
                    >
                      <div className="text-2xl mb-2">{mood.icon}</div>
                      <span className="text-sm font-medium">{mood.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={prevStep}
              className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium ${
                currentStep === 1
                  ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              disabled={currentStep === 1}
            >
              <FaArrowLeft className="mr-2" /> Back
            </button>

            <button
              onClick={nextStep}
              disabled={!isStepComplete()}
              className={`flex items-center btn-primary ${!isStepComplete() ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {currentStep === totalSteps ? (
                <>
                  Find Gift Ideas <FaGift className="ml-2" />
                </>
              ) : (
                <>
                  Next <FaArrowRight className="ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonaBuilder
