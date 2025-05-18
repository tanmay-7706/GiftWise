import { useState } from "react"
import { motion } from "framer-motion"
import { FaTimes, FaCalendarAlt, FaUser, FaGift, FaStickyNote } from "react-icons/fa"

const EventForm = ({ initialEvent = {}, onSave, onCancel }) => {
  const [event, setEvent] = useState({
    id: initialEvent.id || Date.now(),
    recipient: initialEvent.recipient || "",
    occasion: initialEvent.occasion || "birthday",
    date: initialEvent.date
      ? new Date(initialEvent.date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    notes: initialEvent.notes || "",
  })

  const [errors, setErrors] = useState({})

  const occasions = [
    { value: "birthday", label: "Birthday" },
    { value: "anniversary", label: "Anniversary" },
    { value: "graduation", label: "Graduation" },
    { value: "wedding", label: "Wedding" },
    { value: "babyShower", label: "Baby Shower" },
    { value: "holiday", label: "Holiday" },
    { value: "other", label: "Other" },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setEvent({ ...event, [name]: value })

    // error ko clear karega jab user typing start karega -->
    if (errors[name]) {
      setErrors({ ...errors, [name]: null })
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!event.recipient.trim()) {
      newErrors.recipient = "Recipient name is required"
    }

    if (!event.date) {
      newErrors.date = "Date is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validate()) {
      onSave(event)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold">{initialEvent.id ? "Edit Event" : "Add New Event"}</h3>
        <button
          onClick={onCancel}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Close"
        >
          <FaTimes className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        <div className="space-y-4">
          <div>
            <label htmlFor="recipient" className="block text-sm font-medium mb-1">
              Recipient Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="recipient"
                name="recipient"
                value={event.recipient}
                onChange={handleChange}
                className={`input pl-10 ${errors.recipient ? "border-red-500 focus:ring-red-500" : ""}`}
                placeholder="Who is this gift for?"
              />
            </div>
            {errors.recipient && <p className="mt-1 text-sm text-red-500">{errors.recipient}</p>}
          </div>

          <div>
            <label htmlFor="occasion" className="block text-sm font-medium mb-1">
              Occasion
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaGift className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="occasion"
                name="occasion"
                value={event.occasion}
                onChange={handleChange}
                className="input pl-10"
              >
                {occasions.map((occasion) => (
                  <option key={occasion.value} value={occasion.value}>
                    {occasion.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">
              Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="date"
                name="date"
                value={event.date}
                onChange={handleChange}
                className={`input pl-10 ${errors.date ? "border-red-500 focus:ring-red-500" : ""}`}
              />
            </div>
            {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-1">
              Notes
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <FaStickyNote className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="notes"
                name="notes"
                value={event.notes}
                onChange={handleChange}
                rows="3"
                className="input pl-10"
                placeholder="Any gift ideas or special notes?"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl text-sm font-medium bg-pink-500 text-white hover:bg-pink-600"
          >
            {initialEvent.id ? "Update Event" : "Add Event"}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default EventForm
