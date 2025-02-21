import { useBuilder } from '../../builder-context';

export const Grid = () => {
  const { showGrid, template } = useBuilder();

  if (!showGrid) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        height: '100%',
        width: '100%',
        minHeight: template.maxHeight,
        minWidth: template.maxWidth,
        backgroundImage: `
          linear-gradient(to right, #e5e7eb 1px, transparent 1px),
          linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
        `,
        backgroundSize: '10px 10px',
        opacity: 0.5,
        zIndex: 1,
      }}
    />
  );
};
