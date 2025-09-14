import React from 'react';
import { getStatusColor } from '../utils/statusColors';

function LaunchTable({ launches, onSelect }) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="bg-[#f4f5f7] text-[#4b5563] font-medium">
            <th className="px-4 py-3">No.</th>
            <th className="px-4 py-3">Launched (UTC)</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">Mission</th>
            <th className="px-4 py-3">Orbit</th>
            <th className="px-4 py-3">Launch Status</th>
            <th className="px-4 py-3">Rocket</th>
          </tr>
        </thead>
        <tbody>
          {launches?.map((launch, i) => {
            const status =
              launch.success === null
                ? 'Upcoming'
                : launch.success
                ? 'Success'
                : 'Failed';

            return (
              <tr
                key={launch.id}
                onClick={() => onSelect?.(launch)}
                className={`cursor-pointer ${
                  i % 2 === 0 ? 'bg-white' : 'bg-[#f4f5f7]'
                } hover:bg-[#e2e8f0]`}
              >
                <td className="px-4 py-3 text-[#1f2937] font-medium">{i + 1}</td>
                <td className="px-4 py-3 text-[#4b5563]">{new Date(launch.date_utc).toUTCString()}</td>
                <td className="px-4 py-3 text-[#4b5563]">{launch.launchpad?.name || 'N/A'}</td>
                <td className="px-4 py-3 text-[#4b5563]">{launch.name}</td>
<td className="px-4 py-2">
  {launch.payloads?.[0]?.orbit || 'N/A'}
</td>


                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      launch
                    )}`}
                  >
                    {status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#4b5563]">{launch.rocket?.name || 'Falcon 9'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default LaunchTable;

