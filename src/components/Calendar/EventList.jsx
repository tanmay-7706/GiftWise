import { motion } from "framer-motion"
import { FaEdit, FaTrash, FaBirthdayCake, FaGift, FaCalendarAlt } from "react-icons/fa"

const EventList = ({ events, onEdit, onDelete }) => {
  // events ko sort karenge by date (closest first) -->
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date))

  // events ko group karega by month -->
  const groupedEvents = sortedEvents.reduce((groups, event) => {
    const date = new Date(event.date)
    const monthYear = `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`

    if (!groups[monthYear]) {
      groups[monthYear] = []
    }

    groups[monthYear].push(event)
    return groups
  }, {})

  // Format date to display -->
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  // days ko calculate karega until the next event -->
  const getDaysUntil = (dateString) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const eventDate = new Date(dateString)
    eventDate.setHours(0, 0, 0, 0)

    const diffTime = eventDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return "Today!"
    } else if (diffDays === 1) {
      return "Tomorrow!"
    } else if (diffDays < 0) {
      return `${Math.abs(diffDays)} days ago`
    } else {
      return `in ${diffDays} days`
    }
  }

  // Get icon based on occasion -->
  const getOccasionIcon = (occasion) => {
    switch (occasion) {
      case "birthday":
        return <FaBirthdayCake className="h-5 w-5 text-pink-500" />
      case "anniversary":
        return <FaCalendarAlt className="h-5 w-5 text-blue-500" />
      default:
        return <FaGift className="h-5 w-5 text-purple-500" />
    }
  }

  // Get color based on days until -->
  const getTimeColor = (dateString) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const eventDate = new Date(dateString)
    eventDate.setHours(0, 0, 0, 0)

    const diffTime = eventDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return "text-gray-500"
    } else if (diffDays <= 7) {
      return "text-red-500 font-medium"
    } else if (diffDays <= 30) {
      return "text-orange-500"
    } else {
      return "text-green-500"
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold">Upcoming Events</h3>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
        {Object.keys(groupedEvents).length > 0 ? (
          Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
            <div key={monthYear} className="p-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">{monthYear}</h4>
              <div className="space-y-3">
                {monthEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex-shrink-0 mr-3">{getOccasionIcon(event.occasion)}</div>
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start">
                        <h5 className="text-base font-medium truncate">{event.recipient}</h5>
                        <span className={`text-xs ${getTimeColor(event.date)}`}>{getDaysUntil(event.date)}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(event.date)} • {event.occasion.charAt(0).toUpperCase() + event.occasion.slice(1)}
                      </p>
                      {event.notes && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">{event.notes}</p>
                      )}
                    </div>
                    <div className="flex-shrink-0 ml-3 space-x-2">
                      <button
                        onClick={() => onEdit(event)}
                        className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        aria-label="Edit event"
                      >
                        <FaEdit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(event.id)}
                        className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                        aria-label="Delete event"
                      >
                        <FaTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">No events scheduled yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventList
