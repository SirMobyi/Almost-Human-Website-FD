const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <p className="text-white font-mono text-sm md:text-base tracking-wider">
          Almosthuman.in
        </p>
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-white font-mono text-3xl md:text-5xl lg:text-6xl text-center px-4">
          Chill, it's generating
        </h1>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
      </div>
    </div>
  );
};

export default LoadingScreen;
