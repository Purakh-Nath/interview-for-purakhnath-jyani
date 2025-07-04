import { useState } from "react"
import { X, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import { format, addMonths, subMonths, getDaysInMonth, getDay, startOfMonth } from "date-fns"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

const options = [
  { label: "Past week", value: "1week" },
  { label: "Past month", value: "1month" },
  { label: "Past 3 months", value: "3months" },
  { label: "Past 6 months", value: "6months" },
  { label: "Past year", value: "1year" },
  { label: "Past 2 years", value: "2years" },
]

export default function DateFilterModal({ isOpen, onClose, selected, onChange }) {
  const [showCustomRange, setShowCustomRange] = useState(selected?.value === "custom")
  const [currentDate, setCurrentDate] = useState(new Date(2021, 0, 1)) // January 2021 to match image
  const [selectedRange, setSelectedRange] = useState({
    startDate: null,
    endDate: null,
  })
  const [isSelectingEnd, setIsSelectingEnd] = useState(false)

  if (!isOpen) return null

  const handleOptionClick = (opt) => {
    if (opt.value === "custom") {
      setShowCustomRange(true)
    } else {
      setShowCustomRange(false)
      onChange(opt)
      onClose()
    }
  }

  const handleDateClick = (date, monthOffset = 0) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset, date)

    if (!selectedRange.startDate || (selectedRange.startDate && selectedRange.endDate)) {
      // Start new selection
      setSelectedRange({ startDate: clickedDate, endDate: null })
      setIsSelectingEnd(true)
    } else if (isSelectingEnd) {
      // Complete the range
      if (clickedDate >= selectedRange.startDate) {
        setSelectedRange({ ...selectedRange, endDate: clickedDate })
      } else {
        setSelectedRange({ startDate: clickedDate, endDate: selectedRange.startDate })
      }
      setIsSelectingEnd(false)
    }
  }

  const handleApply = () => {
    if (selectedRange.startDate && selectedRange.endDate) {
onChange({
  label: `${format(selectedRange.startDate, 'MMM d, yyyy')} → ${format(selectedRange.endDate, 'MMM d, yyyy')}`,
  value: 'custom',
  from: selectedRange.startDate,
  to: selectedRange.endDate,
});

onClose();

    }
  }

  const renderCalendar = (monthOffset = 0) => {
    const displayDate = addMonths(currentDate, monthOffset)
    const daysInMonth = getDaysInMonth(displayDate)
    const firstDayOfMonth = getDay(startOfMonth(displayDate))
    const days = []

  
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(displayDate.getFullYear(), displayDate.getMonth(), day)
      const isSelected =
        (selectedRange.startDate && date.getTime() === selectedRange.startDate.getTime()) ||
        (selectedRange.endDate && date.getTime() === selectedRange.endDate.getTime())
      const isInRange =
        selectedRange.startDate &&
        selectedRange.endDate &&
        date >= selectedRange.startDate &&
        date <= selectedRange.endDate

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day, monthOffset)}
          className={`h-8 w-8 flex items-center justify-center text-sm rounded hover:bg-gray-100 transition-colors ${
            isSelected
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : isInRange
                ? "bg-blue-100 text-blue-800"
                : "text-gray-700"
          }`}
        >
          {day}
        </button>,
      )
    }

    return days
  }

  const nextMonth = addMonths(currentDate, 1)

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4">
      <div
        className={`bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden ${
          showCustomRange ? "lg:h-auto" : "max-w-sm"
        }`}
      >
        <div className={`flex ${showCustomRange ? "flex-col lg:flex-row" : "flex-col"} h-full`}>
          {/* Left sidebar with options */}
          <div
            className={`${showCustomRange ? "lg:w-64 lg:border-r" : "w-full"} border-gray-200 bg-gray-50 p-4 lg:p-6`}
          >
            <div className="flex justify-between items-center mb-4 lg:mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Select Date Range</h2>
              {!showCustomRange && (
                <button onClick={onClose} className="hover:bg-gray-200 p-1 rounded">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <ul className="space-y-0">
              {options.map((opt) => (
                <li key={opt.value}>
                  <button
                    onClick={() => handleOptionClick(opt)}
                    className={`w-full text-left px-0 py-2 lg:py-3 text-sm lg:text-base border-b border-gray-200 last:border-b-0 transition-colors ${
                      selected?.value === opt.value && !showCustomRange
                        ? "text-blue-600 font-medium"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleOptionClick({ label: "Custom Range", value: "custom" })}
                  className={`w-full text-left px-0 py-2 lg:py-3 text-sm lg:text-base transition-colors ${
                    showCustomRange ? "text-blue-600 font-medium" : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  Custom Range
                </button>
              </li>
            </ul>
          </div>

          {/* Right side calendar */}
          {showCustomRange && (
            <div className="flex-1 p-4 lg:p-6 relative overflow-auto">
              <button
                onClick={onClose}
                className="absolute top-2 right-2 lg:top-4 lg:right-4 hover:bg-gray-100 p-1 rounded z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Calendar Navigation */}
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <button
                  onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>

                <div className="flex gap-4 lg:gap-16">
                  <div className="flex items-center gap-1 lg:gap-2">
                    <span className="text-base lg:text-lg font-semibold">{format(currentDate, "MMMM")}</span>
                    <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span className="text-base lg:text-lg font-semibold">{format(currentDate, "yyyy")}</span>
                    <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4" />
                  </div>

                  <div className="hidden lg:flex items-center gap-2">
                    <span className="text-lg font-semibold">{format(nextMonth, "MMMM")}</span>
                    <ChevronDown className="w-4 h-4" />
                    <span className="text-lg font-semibold">{format(nextMonth, "yyyy")}</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>

                <button
                  onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 mb-6">
                {/* First Month */}
                <div className="flex-1 min-w-0">
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div
                        key={day}
                        className="h-8 flex items-center justify-center text-xs lg:text-sm font-medium text-gray-600"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">{renderCalendar(0)}</div>
                </div>

                {/* Second Month - Hidden on mobile */}
                <div className="hidden lg:block flex-1 min-w-0">
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-600">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">{renderCalendar(1)}</div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  disabled={!selectedRange.startDate || !selectedRange.endDate}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
