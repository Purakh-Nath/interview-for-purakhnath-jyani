import React from 'react';

function LaunchModal({ isOpen, onClose, launch }) {
  if (!isOpen || !launch) return null;

  const {
    links,
    name,
    rocket,
    details,
    flight_number,
    success,
    date_utc,
    payloads = [],
    launchpad,
  } = launch;

  const statusClass = success === null
    ? { bg: '#d1d5db', text: '#1f2937' }
    : success
    ? { bg: '#def7ec', text: '#03543f' }
    : { bg: '#fde8e8', text: '#981b1c' };

  const launchDate = new Date(date_utc).toLocaleString('en-GB', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2">
      <div className="bg-white rounded-md shadow-lg max-w-xl w-full p-5 relative overflow-y-auto max-h-[85vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-lg"
        >
          &times;
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <img
            src={links?.patch?.small || '/spacex-patch.png'}
            alt="Patch"
            className="w-16 h-16 rounded-full object-contain"
          />

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-semibold text-[#1f2937]">{name}</h2>
              <span
                className="px-2.5 py-0.5 text-xs font-medium rounded"
                style={{ backgroundColor: statusClass.bg, color: statusClass.text }}
              >
                {success === null ? 'Upcoming' : success ? 'Success' : 'Failed'}
              </span>
            </div>
            <p className="text-sm text-gray-500">{rocket?.name || 'Falcon 9'}</p>

            <div className="flex items-center gap-2 mt-2">
              {links?.article && (
                <a href={links.article} target="_blank" rel="noopener noreferrer" className="text-sm">📰</a>
              )}
              {links?.wikipedia && (
                <a href={links.wikipedia} target="_blank" rel="noopener noreferrer" className="text-sm">🌐</a>
              )}
              {links?.webcast && (
                <a href={links.webcast} target="_blank" rel="noopener noreferrer" className="text-sm">▶️</a>
              )}
            </div>
          </div>
        </div>

        {/* Details */}
        {details && (
          <p className="text-sm text-gray-700 leading-relaxed mb-5">
            {details}{' '}
            {links?.wikipedia && (
              <a
                href={links.wikipedia}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikipedia
              </a>
            )}
          </p>
        )}

        {/* Info Table */}
        <div className="space-y-3 text-sm">
          {[
            { label: "Flight Number", value: flight_number },
            { label: "Mission Name", value: name },
            { label: "Rocket Type", value: rocket?.type || 'v1.0' },
            { label: "Rocket Name", value: rocket?.name || 'Falcon 9' },
            { label: "Manufacturer", value: rocket?.company || 'SpaceX' },
            { label: "Nationality", value: rocket?.company || 'SpaceX' },
            { label: "Launch Date", value: launchDate },
            { label: "Payload Type", value: payloads[0]?.type || 'Dragon 1.0' },
            { label: "Orbit", value: payloads[0]?.orbit || 'N/A' },
            { label: "Launch Site", value: launchpad?.name || 'CCAFS SLC 40' },
          ].map((item, index) => (
            <div key={index} className="flex justify-between border-b pb-2 border-gray-200">
              <span className="text-gray-500 font-medium w-44">{item.label}</span>
              <span className="text-gray-800">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LaunchModal;
