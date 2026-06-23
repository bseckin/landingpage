const VideoSection = () => {
  return (
    <section className="py-24 md:py-32 bg-surface border-b border-outline-variant">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <span className="label-caps text-primary mb-4 block">In Aktion</span>
          <h3 className="text-3xl md:text-5xl font-display font-semibold leading-[1.08] tracking-tight">
            60 Sekunden. Einmal sehen ist besser als zweimal lesen.
          </h3>
          <p className="text-on-surface-variant text-base mt-4">
            Eine echte Anfrage kommt rein — das System qualifiziert sie, Sie
            bekommen die WhatsApp. Unter einer Minute.
          </p>
        </div>

        {/* Video placeholder — hier src="/videos/demo.mp4" oder YouTube-Embed einsetzen */}
        <div className="max-w-3xl mx-auto rounded-xl overflow-hidden border border-outline-variant aspect-video bg-on-surface relative flex items-center justify-center">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.2)' }}
            >
              <span className="material-symbols-outlined text-white text-4xl" style={{ marginLeft: '3px' }}>
                play_arrow
              </span>
            </div>
            <span className="label-caps" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Video wird ergänzt
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
