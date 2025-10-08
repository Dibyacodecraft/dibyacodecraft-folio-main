const HomeTaskbar = () => {
  return (
    <div className="w-full py-2">
      <div className="relative h-10 rounded-xl overflow-hidden neon-border bg-background/60">
        <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(139,92,246,0.35),transparent_70%)] animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/40 via-electric-cyan/40 to-neon-green/40 animate-[spin_12s_linear_infinite] opacity-30" style={{ maskImage: 'linear-gradient(90deg, transparent, black 20%, black 80%, transparent)' }} />
        <div className="relative h-full flex items-center justify-between px-4 text-xs font-inter text-muted-foreground">
          <span>Python · AI/ML · Data Science</span>
          <span>React · Streamlit · n8n</span>
          <span>Open Source · Cloud</span>
        </div>
      </div>
    </div>
  );
};

export default HomeTaskbar;


