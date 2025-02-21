import { ColorPicker } from '#components/color-picker';
import { useBuilder } from '../../builder-context';

export const TemplateSettings = () => {
  const { template, showGrid, snapToGrid, updateTemplate, toggleGrid, toggleSnapToGrid } = useBuilder();
  return (
    <div className="space-y-6">
      <section>
        <h3 className="mb-2 font-medium">Background</h3>
        <div className="space-y-4">
          <div>
            <p className="mb-1 block text-sm">Color</p>
            <ColorPicker
              color={template.backgroundColor}
              onChange={color =>
                updateTemplate({
                  ...template,
                  backgroundColor: color,
                })
              }
            />
          </div>
          <div>
            <p className="mb-1 block text-sm">Image</p>
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = event => {
                      const img = new Image();
                      img.onload = () => {
                        updateTemplate({
                          ...template,
                          width: img.width,
                          height: img.height,
                          maxWidth: template.maxWidth,
                          maxHeight: Math.round(template.maxWidth * (img.height / img.width)),
                          backgroundImage: event.target?.result as string,
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        });
                      };
                      img.src = event.target?.result as string;
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full"
              />
              {template.backgroundImage && (
                <div className="relative">
                  <img
                    src={template.backgroundImage}
                    alt="Background preview"
                    className="h-auto w-full rounded border"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '200px',
                      objectFit: 'contain',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updateTemplate({
                        ...template,
                        backgroundImage: undefined,
                      })
                    }
                    className="absolute top-1 right-1 rounded-full bg-white p-1 shadow hover:bg-gray-100"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="mb-2 font-medium">Grid Settings</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" checked={showGrid} onChange={toggleGrid} className="mr-2" />
            Show Grid
          </label>
          <label className="flex items-center">
            <input type="checkbox" checked={snapToGrid} onChange={toggleSnapToGrid} className="mr-2" />
            Snap to Grid
          </label>
        </div>
      </section>
    </div>
  );
};
