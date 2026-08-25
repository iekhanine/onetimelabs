type ProductVideoProps = {
  src: string;
  poster?: string;
  label?: string;
  className?: string;
};

export function ProductVideo({ src, poster, label = "Actual product footage", className = "" }: ProductVideoProps) {
  return (
    <div className={`product-video ${className}`.trim()}>
      <div className="product-video__bar">
        <span><i aria-hidden="true" />{label}</span>
        <span>Muted loop</span>
      </div>
      <video autoPlay muted loop playsInline preload="metadata" poster={poster} aria-label={label}>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
