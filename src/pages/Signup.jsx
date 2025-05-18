import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FaGoogle, FaFacebookF, FaApple, FaEnvelope, FaLock, FaUser } from "react-icons/fa"
import { useToast } from "../components/ToastContainer"

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({})
  const { addToast } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name) {
      newErrors.name = "Name is required"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validate()) {
      // server ko normally ek request send karega -->
      console.log("Signup form submitted:", formData)
      addToast("Account created successfully!", "success")

      // only for demo purposes, home par redirect karne ke liye -->
      setTimeout(() => {
        window.location.href = "/"
      }, 1000)
    }
  }

  const handleSocialSignup = (provider) => {
    addToast(`Sign up with ${provider} initiated`, "info")
    // provider ke saath normally authenticate karne ke liye -->
    console.log(`Sign up with ${provider}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        className="max-w-md w-full space-y-8 card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold">Create an account</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Join GiftWise to find perfect gifts</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleSocialSignup("Google")}
            className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <FaGoogle className="h-5 w-5 text-red-500 mr-2" />
            Sign up with Google
          </button>

          <button
            onClick={() => handleSocialSignup("Facebook")}
            className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <FaFacebookF className="h-5 w-5 text-white mr-2" />
            Sign up with Facebook
          </button>

          <button
            onClick={() => handleSocialSignup("Apple")}
            className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-sm text-sm font-medium text-white bg-black dark:bg-gray-900 hover:bg-gray-900 dark:hover:bg-black"
          >
            <FaApple className="h-5 w-5 text-white mr-2" />
            Sign up with Apple
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Or sign up with email
            </span>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input pl-10 ${errors.name ? "border-red-500 focus:ring-red-500" : ""}`}
                  placeholder="Tony Stark"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input pl-10 ${errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input pl-10 ${errors.password ? "border-red-500 focus:ring-red-500" : ""}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirm password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`input pl-10 ${errors.confirmPassword ? "border-red-500 focus:ring-red-500" : ""}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div>
            <button type="submit" className="w-full btn-primary">
              Create account
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-pink-500 hover:text-pink-400">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Signup
