
import { useState } from "react"
import { Filter, ChevronDown } from "lucide-react"

const options = [
  { label: "All Launches", value: "all" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Success", value: "success" },
  { label: "Failed", value: "failed" },
]

function FilterDropdown({ selected, onChange }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 text-sm bg-white border border-gray-200 px-3 py-2 rounded-md shadow-sm hover:bg-gray-50 transition-colors duration-150 font-medium text-gray-700"
      >
        <Filter className="w-4 h-4 text-gray-500" />
        <span>{selected?.label || "Filter"}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 first:rounded-t-md last:rounded-b-md transition-colors duration-150"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FilterDropdown
