import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaPlus, FaCalendarAlt } from "react-icons/fa"
import CalendarGrid from "../components/Calendar/CalendarGrid"
import EventForm from "../components/Calendar/EventForm"
import EventList from "../components/Calendar/EventList"
import { useToast } from "../components/ToastContainer"
import EmptyState from "../components/EmptyState"

const Calendar = () => {
  const [events, setEvents] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [currentEvent, setCurrentEvent] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const { addToast } = useToast()

  // initial render hone par localstorage se events ko load karenge -->
  useEffect(() => {
    const savedEvents = localStorage.getItem("giftWiseEvents")
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents))
    }
  }, [])

  // jab bhi events change honge to localstorage me save karenge -->
  useEffect(() => {
    localStorage.setItem("giftWiseEvents", JSON.stringify(events))
  }, [events])

  // Check for upcoming events and show notifications -->
  useEffect(() => {
    const checkUpcomingEvents = () => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      events.forEach((event) => {
        const eventDate = new Date(event.date)
        eventDate.setHours(0, 0, 0, 0)

        const diffTime = eventDate - today
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        // Show notification for events 3 days away -->
        if (diffDays === 3) {
          addToast(`${event.recipient}'s ${event.occasion} is coming up in 3 days!`, "info")
        }
      })
    }

    checkUpcomingEvents()

    // Check daily for upcoming events -->
    const interval = setInterval(checkUpcomingEvents, 24 * 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [events, addToast])

  const handleAddEvent = () => {
    setCurrentEvent(selectedDate ? { date: selectedDate.toISOString().split("T")[0] } : null)
    setShowForm(true)
  }

  const handleEditEvent = (event) => {
    setCurrentEvent(event)
    setShowForm(true)
  }

  const handleDeleteEvent = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== eventId))
      addToast("Event deleted successfully", "info")
    }
  }

  const handleSaveEvent = (eventData) => {
    if (eventData.id && events.some((event) => event.id === eventData.id)) {
      // Update existing event -->
      setEvents(events.map((event) => (event.id === eventData.id ? eventData : event)))
      addToast("Event updated successfully", "success")
    } else {
      // Add new event -->
      setEvents([...events, { ...eventData, id: Date.now() }])
      addToast("Event added successfully", "success")
    }

    setShowForm(false)
    setCurrentEvent(null)
  }

  const handleDateClick = (date) => {
    setSelectedDate(date)
  }

  const handleEventClick = (event) => {
    handleEditEvent(event)
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-pink-400">Gift Calendar</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Never miss an important occasion with our gift reminder calendar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CalendarGrid events={events} onDateClick={handleDateClick} onEventClick={handleEventClick} />
          </div>

          <div>
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-blue-400">Reminders</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddEvent}
                className="flex items-center px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors"
              >
                <FaPlus className="mr-2" />
                Add Event
              </motion.button>
            </div>

            {events.length > 0 ? (
              <EventList events={events} onEdit={handleEditEvent} onDelete={handleDeleteEvent} />
            ) : (
              <EmptyState
                title="No events yet"
                message="Add your first gift reminder to get started"
                actionText="Add Event"
                actionLink="#"
                icon={<FaCalendarAlt className="h-8 w-8 text-pink-500" />}
              />
            )}
          </div>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            >
              <div className="max-w-md w-full">
                <EventForm
                  initialEvent={currentEvent}
                  onSave={handleSaveEvent}
                  onCancel={() => {
                    setShowForm(false)
                    setCurrentEvent(null)
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Calendar
