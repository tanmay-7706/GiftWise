import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FaGoogle, FaFacebookF, FaApple, FaEnvelope, FaLock } from "react-icons/fa"
import { useToast } from "../components/ToastContainer"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const { addToast } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // jab user typing start karega to error clear ho jayega -->
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validate()) {
      // yeh server ko normally ek request send karega -->
      console.log("Login form submitted:", formData)
      addToast("Login successful!", "success")

      // only for demo purposes, home par redirect karne ke liye -->
      setTimeout(() => {
        window.location.href = "/"
      }, 1000)
    }
  }

  const handleSocialLogin = (provider) => {
    addToast(`Login with ${provider} initiated`, "info")
    // provider ke saath normally authenticate karne ke liye -->
    console.log(`Login with ${provider}`)
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
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Sign in to your GiftWise account</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleSocialLogin("Google")}
            className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <FaGoogle className="h-5 w-5 text-red-500 mr-2" />
            Continue with Google
          </button>

          <button
            onClick={() => handleSocialLogin("Facebook")}
            className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <FaFacebookF className="h-5 w-5 text-white mr-2" />
            Continue with Facebook
          </button>

          <button
            onClick={() => handleSocialLogin("Apple")}
            className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-sm text-sm font-medium text-white bg-black dark:bg-gray-900 hover:bg-gray-900 dark:hover:bg-black"
          >
            <FaApple className="h-5 w-5 text-white mr-2" />
            Continue with Apple
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Or continue with email
            </span>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input pl-10 ${errors.password ? "border-red-500 focus:ring-red-500" : ""}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-pink-500 focus:ring-pink-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-pink-500 hover:text-pink-400">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button type="submit" className="w-full btn-primary">
              Sign in
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-pink-500 hover:text-pink-400">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
