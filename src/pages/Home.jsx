import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { FaGift, FaSearch, FaHeart, FaUserFriends, FaClock, FaMagic, FaTags, FaStar } from "react-icons/fa"

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <motion.section
        className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* decorative elements lageyenge background ke liye */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-200 dark:bg-pink-900/20 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-teal-200 dark:bg-teal-900/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block p-3 bg-pink-100 dark:bg-pink-900/30 rounded-full mb-6"
          >
            <FaGift className="h-10 w-10 text-pink-500" />
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold pb-7 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-teal-400"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Find the perfect gift in minutes
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Discover thoughtful, personalized gift ideas based on personality, occasion, and vibe. Never stress about
            gift-giving again.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/persona" className="btn-primary">
              Get Started
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto ">
          <motion.h2 className="text-3xl font-bold text-center mb-12" variants={itemVariants}>
            How It Works
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div className="card flex flex-col items-center text-center" variants={itemVariants}>
              <div className="bg-pink-100 dark:bg-pink-900/20 p-4 rounded-full mb-4">
                <FaUserFriends className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tell us about them</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Share the occasion, personality traits, and the vibe you're going for.
              </p>
            </motion.div>

            <motion.div className="card flex flex-col items-center text-center" variants={itemVariants}>
              <div className="bg-pink-100 dark:bg-pink-900/20 p-4 rounded-full mb-4">
                <FaSearch className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get personalized ideas</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse curated gift suggestions tailored to your specific needs.
              </p>
            </motion.div>

            <motion.div className="card flex flex-col items-center text-center" variants={itemVariants}>
              <div className="bg-pink-100 dark:bg-pink-900/20 p-4 rounded-full mb-4">
                <FaHeart className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save your favorites</h3>
              <p className="text-gray-600 dark:text-gray-400">Bookmark gift ideas you love and access them anytime.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Feature Highlights (Why Use GiftWise?) */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-pink-300">Why Use GiftWise?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-gradient p-6 rounded-2xl">
              <div className="mb-4 text-giftwise-pink">
                <FaMagic className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-medium mb-2 text-blue-400">Personalized Recommendations</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our smart algorithm tailors gift suggestions based on multiple factors to ensure you find something truly perfect.
              </p>
            </div>

            <div className="card-gradient p-6 rounded-2xl">
              <div className="mb-4 text-giftwise-turquoise">
                <FaClock className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-medium mb-2 text-blue-400">Save Time</h3>
              <p className="text-gray-600 dark:text-gray-400">
                No more endless browsing. Find thoughtful gift ideas in minutes instead of hours.
              </p>
            </div>

            <div className="card-gradient p-6 rounded-2xl">
              <div className="mb-4 text-giftwise-lavender">
                <FaTags className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-medium mb-2 text-blue-400">Diverse Price Ranges</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Find the perfect gift no matter your budget, from thoughtful DIY options to premium splurges.
              </p>
            </div>

            <div className="card-gradient p-6 rounded-2xl">
              <div className="mb-4 text-giftwise-peach">
                <FaStar className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-medium mb-2 text-blue-400">Unique Ideas</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Discover thoughtful, creative gifts that stand out from typical suggestions.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-pink-300">Ready to find the perfect gift?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Stop stressing about gift-giving and let GiftWise help you find something they'll love.
          </p>
          <Link to="/persona" className="btn-primary">
            Start Your Gift Search
          </Link>
        </div>
      </motion.section>
    </div>
  )
}

export default Home
