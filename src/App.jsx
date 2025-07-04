import React from 'react';
import LaunchesPage from './features/launches/LaunchesPage';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <header className="w-full flex justify-center py-6 shadow-sm bg-white">
        <img src="/Logo.png" alt="SpaceX Logo" className="h-12 w-auto" />
      </header>
      <main className="p-4">
        <LaunchesPage />
      </main>
    </div>
  );
}

export default App;
