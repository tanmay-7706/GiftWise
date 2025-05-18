import { useState } from "react"
import { motion } from "framer-motion"
import { FaChevronLeft, FaChevronRight, FaGift, FaBirthdayCake } from "react-icons/fa"

const CalendarGrid = ({ events, onDateClick, onEventClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  // Get current month and year
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Get days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  // Get first day of month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  // Get month name
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const monthName = monthNames[currentMonth]

  // previous month par navigate karega -->
  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
    setSelectedDate(null)
  }

  // next month par navigate karega -->
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
    setSelectedDate(null)
  }

  // date click event ko handle karega -->
  const handleDateClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day)
    setSelectedDate(clickedDate)
    onDateClick && onDateClick(clickedDate)
  }

  // check if a date has events or not ? -->
  const getEventsForDate = (day) => {
    const date = new Date(currentYear, currentMonth, day)
    return events.filter((event) => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }

  // Generate calendar days -->
  const calendarDays = []

  // empty cells ko add karega jo days mahine ke first day se pehle honge --> 
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(
      <div
        key={`empty-${i}`}
        className="h-24 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
      ></div>,
    )
  }

  // cells ko add karenge for each day of the month -->
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day)
    const isToday = new Date().toDateString() === date.toDateString()
    const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString()
    const dayEvents = getEventsForDate(day)
    const hasEvents = dayEvents.length > 0

    calendarDays.push(
      <motion.div
        key={`day-${day}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleDateClick(day)}
        className={`h-24 p-1 border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer transition-colors ${
          isSelected
            ? "bg-pink-100 dark:bg-pink-900/30 border-pink-300 dark:border-pink-700"
            : isToday
              ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
              : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
        }`}
      >
        <div className="flex justify-between items-start">
          <span className={`text-sm font-medium ${isToday ? "text-blue-600 dark:text-blue-400" : ""}`}>{day}</span>
          {hasEvents && (
            <span className="flex h-5 w-5 items-center justify-center bg-pink-500 text-white text-xs rounded-full">
              {dayEvents.length}
            </span>
          )}
        </div>
        <div className="mt-1 space-y-1 overflow-y-auto max-h-16">
          {dayEvents.map((event, index) => (
            <div
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                onEventClick && onEventClick(event)
              }}
              className="text-xs p-1 rounded bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200 truncate flex items-center"
            >
              {event.occasion === "birthday" ? (
                <FaBirthdayCake className="mr-1 flex-shrink-0" />
              ) : (
                <FaGift className="mr-1 flex-shrink-0" />
              )}
              <span className="truncate">{event.recipient}</span>
            </div>
          ))}
        </div>
      </motion.div>,
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={prevMonth}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Previous month"
        >
          <FaChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
        <h2 className="text-xl font-bold">
          {monthName} {currentYear}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Next month"
        >
          <FaChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
      <div className="grid grid-cols-7 bg-gray-100 dark:bg-gray-700">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">{calendarDays}</div>
    </div>
  )
}

export default CalendarGrid
