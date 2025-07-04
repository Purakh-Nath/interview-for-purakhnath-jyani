
function Loader() {
  return (
    <div className="flex flex-col justify-center items-center py-10">
      <div className="relative w-10 h-10">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-3 bg-gray-300 rounded-full"
            style={{
              left: "50%",
              top: "50%",
              transformOrigin: "0 20px",
              transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
              animation: `fade 1.2s linear infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
   

      <style jsx>{`
        @keyframes fade {
          0%, 39%, 100% {
            opacity: 0.3;
          }
          40% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default Loader
