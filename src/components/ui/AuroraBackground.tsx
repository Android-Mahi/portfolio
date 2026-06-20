/**
 * Site-wide animated background: a few large, blurred, slowly-drifting
 * colour blobs in the brand palette. Fixed behind all content.
 * Motion is pure CSS, so it's automatically frozen under
 * `prefers-reduced-motion` by the global reset in index.css.
 */
export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="aurora-blob"
        style={{
          top: "-12%",
          left: "-6%",
          width: "46vw",
          height: "46vw",
          background: "var(--color-accent)",
          animation: "drift-a 26s ease-in-out infinite",
        }}
      />
      <div
        className="aurora-blob"
        style={{
          top: "10%",
          right: "-12%",
          width: "40vw",
          height: "40vw",
          background: "var(--color-accent-3)",
          opacity: 0.16,
          animation: "drift-b 32s ease-in-out infinite",
        }}
      />
      <div
        className="aurora-blob"
        style={{
          bottom: "-15%",
          left: "20%",
          width: "44vw",
          height: "44vw",
          background: "var(--color-accent-2)",
          opacity: 0.14,
          animation: "drift-c 30s ease-in-out infinite",
        }}
      />
    </div>
  );
}
