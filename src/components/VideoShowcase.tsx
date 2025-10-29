const VideoShowcase = () => {
  return (
    <section className="relative w-full h-screen" aria-label="Video showreel">
      <div className="absolute inset-0 bg-black flex items-center justify-center">
        {/* Placeholder for video */}
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-4 border-2 border-primary rounded-full flex items-center justify-center" aria-hidden="true">
              <svg
                className="w-8 h-8 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
            <p className="text-muted-foreground" role="status">Video Showreel</p>
            <p className="text-sm text-muted-foreground/60 mt-2">Upload your video here</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
