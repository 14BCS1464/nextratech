'use client'

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFEBE9] via-[#FFF8E1] to-[#D7B7A3] flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-[#3E2723] to-[#5D4037] rounded-full animate-bounce mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl"></span>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#3E2723] to-[#BF8B67] bg-clip-text text-transparent">
         Nexttratech 
        </h2>
        <p className="text-[#5D4037] mt-2">Preparing something sweet...</p>
      </div>
    </div>
  );
}