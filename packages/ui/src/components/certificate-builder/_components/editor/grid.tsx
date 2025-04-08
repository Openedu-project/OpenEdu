import { useCertificateBuilder } from '../provider/builder-context';

export const Grid = () => {
  const { showGrid } = useCertificateBuilder();

  if (!showGrid) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        height: '100%',
        width: '100%',
        backgroundImage: `
          linear-gradient(to right, var(--border) 1px, transparent 1px),
          linear-gradient(to bottom, var(--border) 1px, transparent 1px)
        `,
        backgroundSize: '10px 10px',
        opacity: 0.5,
        zIndex: 1,
      }}
    />
  );
};
