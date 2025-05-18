import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import PersonaBuilder from "./pages/PersonaBuilder"
import GiftSuggestions from "./pages/GiftSuggestions"
import GiftDetail from "./pages/GiftDetail"
import SavedGifts from "./pages/SavedGifts"
import Calendar from "./pages/Calendar"
import Explore from "./pages/Explore"
import NotFound from "./pages/NotFound"
import OnboardingTour from "./components/OnboardingTour"
import { ToastProvider } from "./components/ToastContainer"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [savedGifts, setSavedGifts] = useState([])
  const [showOnboarding, setShowOnboarding] = useState(false)

  // dark mode ki preference ke liye system ko check karenge -->
  useEffect(() => {
    const isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    setDarkMode(isDarkMode)

    // agar user new hai to onboarding tour show karenge -->
    const isNewUser = !localStorage.getItem("hasSeenTour")
    setShowOnboarding(isNewUser)
  }, [])

  // initial render hone par gifts ko localstorage se load karenge -->
  useEffect(() => {
    const savedGiftsFromStorage = localStorage.getItem("savedGifts")
    if (savedGiftsFromStorage) {
      setSavedGifts(JSON.parse(savedGiftsFromStorage))
    }
  }, [])

  // jab bhi savedGifts change hoga tab gifts ko localStorage me save karenge -->
  useEffect(() => {
    localStorage.setItem("savedGifts", JSON.stringify(savedGifts))
  }, [savedGifts])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const saveGift = (gift) => {
    if (!savedGifts.some((savedGift) => savedGift.id === gift.id)) {
      setSavedGifts([...savedGifts, gift])
    }
  }

  const removeGift = (giftId) => {
    setSavedGifts(savedGifts.filter((gift) => gift.id !== giftId))
  }

  return (
    <ToastProvider>
      <div
        className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-[#fdfaf6]"}`}
      >
        <Router>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/persona" element={<PersonaBuilder />} />
                <Route
                  path="/suggestions"
                  element={<GiftSuggestions savedGifts={savedGifts} saveGift={saveGift} removeGift={removeGift} />}
                />
                <Route
                  path="/gift/:id"
                  element={<GiftDetail savedGifts={savedGifts} saveGift={saveGift} removeGift={removeGift} />}
                />
                <Route path="/saved" element={<SavedGifts savedGifts={savedGifts} removeGift={removeGift} />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route
                  path="/explore"
                  element={<Explore savedGifts={savedGifts} saveGift={saveGift} removeGift={removeGift} />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </Router>

        {showOnboarding && <OnboardingTour onComplete={() => setShowOnboarding(false)} />}
      </div>
    </ToastProvider>
  )
}

export default App
