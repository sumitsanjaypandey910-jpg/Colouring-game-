import React from 'react';

export const WoodBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#7a4925] flex justify-center">
      {/* Wooden vertical planks background simulation */}
      <div className="absolute inset-0 pointer-events-none flex justify-around opacity-95">
        {/* Plank 1 */}
        <div className="relative w-1/4 h-full border-r border-[#4e270d]/60 bg-gradient-to-r from-[#7a4925] via-[#8d542c] to-[#713f1c]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(168,103,55,0.25)_0%,transparent_70%)]" />
          <div className="absolute top-1/4 left-1/2 w-3 h-20 -translate-x-1/2 rounded-full border-t border-b border-[#4e270d]/30 opacity-40" />
        </div>
        {/* Plank 2 */}
        <div className="relative w-1/4 h-full border-r border-[#4e270d]/60 bg-gradient-to-r from-[#73421d] via-[#854d25] to-[#6d3c19]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_75%,rgba(168,103,55,0.25)_0%,transparent_65%)]" />
          <div className="absolute top-2/3 left-1/3 w-4 h-24 -translate-x-1/2 rounded-full border-t border-b border-[#4e270d]/30 opacity-30" />
        </div>
        {/* Plank 3 */}
        <div className="relative w-1/4 h-full border-r border-[#4e270d]/60 bg-gradient-to-r from-[#7d4b26] via-[#91572d] to-[#75411d]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_45%_25%,rgba(168,103,55,0.25)_0%,transparent_70%)]" />
        </div>
        {/* Plank 4 */}
        <div className="relative w-1/4 h-full bg-gradient-to-r from-[#703f1a] via-[#844c24] to-[#6e3b18]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_60%,rgba(168,103,55,0.25)_0%,transparent_60%)]" />
          <div className="absolute top-1/3 left-2/3 w-3 h-16 -translate-x-1/2 rounded-full border-t border-b border-[#4e270d]/30 opacity-40" />
        </div>
      </div>

      {/* Subtle vertical grain overlay lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(40,15,5,0.25) 19px, transparent 20px, transparent 45px, rgba(230,170,110,0.15) 46px, transparent 48px)`
        }}
      />

      {/* Vignette border shadow for game focus */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(30,10,0,0.6)]" />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-md min-h-screen flex flex-col justify-between py-4 px-3 sm:px-4">
        {children}
      </div>
    </div>
  );
};
