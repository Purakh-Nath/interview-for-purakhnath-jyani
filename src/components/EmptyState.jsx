import React from 'react';

function EmptyState({ message = 'No launches found.' }) {
  return (
    <div className="text-center text-gray-400 py-10 text-sm">
      {message}
    </div>
  );
}

export default EmptyState;
