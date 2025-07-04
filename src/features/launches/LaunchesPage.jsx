import React, { useState, useEffect } from 'react';
import FilterDropdown from '../../components/FilterDropdown';
import LaunchTable from '../../components/LaunchTable';
import Pagination from '../../components/Pagination';
import LaunchModal from '../../components/LaunchModal';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';
import DateFilterModal from '../../components/DateFilterModal'; // 👈 add this
import { fetchLaunches } from './launchesApi';
import { CalendarDays, ChevronDown } from "lucide-react"

const filterToQuery = {
  all: {},
  upcoming: { upcoming: true },
  success: { success: true },
  failed: { success: false },
};

function LaunchesPage() {
  const [filter, setFilter] = useState({ label: 'All Launches', value: 'all' });
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [dateFilter, setDateFilter] = useState({ label: 'All Time', value: 'all' });
  const [showDateModal, setShowDateModal] = useState(false);
 

  useEffect(() => {
    const query = filterToQuery[filter.value] || {};
    setLoading(true);
 fetchLaunches({ ...query, page, limit: 12, dateFilter })

      .then((data) => {
        setLaunches(data.docs);
        setTotalPages(data.totalPages || 1);
      })
      .catch((err) => console.error('Error fetching:', err))
      .finally(() => setLoading(false));
      console.log("Filter:", filter);
console.log("Date Filter:", dateFilter);

  }, [filter, page, dateFilter]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowDateModal(true)}
          className="flex items-center gap-2 text-sm bg-white border border-gray-200 px-3 py-2 rounded-md shadow-sm hover:bg-gray-50 transition-colors duration-150 font-medium text-gray-700"
        >
          <CalendarDays className="w-4 h-4 text-gray-500" />
          <span>{dateFilter.label}</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>



        <FilterDropdown
          selected={filter}
          onChange={(f) => { setFilter(f); setPage(1); }}
          options={[
            { label: 'All Launches', value: 'all' },
            { label: 'Success', value: 'success' },
            { label: 'Failed', value: 'failed' },
            { label: 'Upcoming', value: 'upcoming' }
          ]}
        />
      </div>

      {loading ? (
        <Loader />
      ) : launches.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <LaunchTable launches={launches} onSelect={setSelectedLaunch} />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      <LaunchModal isOpen={!!selectedLaunch} onClose={() => setSelectedLaunch(null)} launch={selectedLaunch} />
<DateFilterModal
  isOpen={showDateModal}
  onClose={() => setShowDateModal(false)}
  selected={dateFilter}
  onChange={(d) => {
    setDateFilter(d); // <-- whether preset or custom
    setPage(1);
    setShowDateModal(false); // <-- Always close modal
  }}
/>



    </div>
  );
}

export default LaunchesPage;
