import { ColorPicker } from '@oe/ui/components/color-picker';
import type { CertificateElement } from '../types';

interface ElementSettingsProps {
  element: CertificateElement;
  onUpdate: (updates: Partial<CertificateElement>) => void;
}

export const ElementSettings = ({ element, onUpdate }: ElementSettingsProps) => {
  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = event => {
      onUpdate({ src: event.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const renderCommonSettings = () => (
    <div className="space-y-4">
      <div>
        <p className="block text-sm font-medium">Position</p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-xs">X</p>
            <input
              type="number"
              value={element.x}
              onChange={e => onUpdate({ x: Number(e.target.value) })}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <p className="text-xs">Y</p>
            <input
              type="number"
              value={element.y}
              onChange={e => onUpdate({ y: Number(e.target.value) })}
              className="w-full border rounded px-2 py-1"
            />
          </div>
        </div>
      </div>

      <div>
        <p className="block text-sm font-medium">Size</p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-xs">Width</p>
            <input
              type="number"
              value={element.width}
              onChange={e => onUpdate({ width: Number(e.target.value) })}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <p className="text-xs">Height</p>
            <input
              type="number"
              value={element.height}
              onChange={e => onUpdate({ height: Number(e.target.value) })}
              className="w-full border rounded px-2 py-1"
            />
          </div>
        </div>
      </div>

      <div>
        <p className="block text-sm font-medium">Rotation</p>
        <input
          type="number"
          value={element.rotation || 0}
          onChange={e => onUpdate({ rotation: Number(e.target.value) })}
          className="w-full border rounded px-2 py-1"
        />
      </div>
    </div>
  );

  const renderTextSettings = () => {
    if (element.type !== 'text') {
      return null;
    }
    return (
      <div className="space-y-4">
        <div>
          <p className="block text-sm font-medium">Text</p>
          <input
            type="text"
            value={element.text}
            onChange={e => onUpdate({ text: e.target.value })}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <p className="block text-sm font-medium">Font Size</p>
          <input
            type="number"
            value={element.fontSize}
            onChange={e => onUpdate({ fontSize: Number(e.target.value) })}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <p className="block text-sm font-medium">Font Family</p>
          <select
            value={element.fontFamily}
            onChange={e => onUpdate({ fontFamily: e.target.value })}
            className="w-full border rounded px-2 py-1"
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
          </select>
        </div>

        <div>
          <p className="block text-sm font-medium">Color</p>
          <ColorPicker color={element.color} onChange={color => onUpdate({ color })} />
        </div>

        <div className="flex space-x-4">
          <p className="flex items-center">
            <input type="checkbox" checked={element.bold} onChange={e => onUpdate({ bold: e.target.checked })} />
            <span className="ml-2">Bold</span>
          </p>
          <p className="flex items-center">
            <input type="checkbox" checked={element.italic} onChange={e => onUpdate({ italic: e.target.checked })} />
            <span className="ml-2">Italic</span>
          </p>
          <p className="flex items-center">
            <input
              type="checkbox"
              checked={element.underline}
              onChange={e => onUpdate({ underline: e.target.checked })}
            />
            <span className="ml-2">Underline</span>
          </p>
        </div>

        <div>
          <p className="block text-sm font-medium">Alignment</p>
          <select
            value={element.align}
            onChange={e => onUpdate({ align: e.target.value as 'left' | 'center' | 'right' })}
            className="w-full border rounded px-2 py-1"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        <div>
          <p className="flex items-center">
            <input type="checkbox" checked={element.dynamic} onChange={e => onUpdate({ dynamic: e.target.checked })} />
            <span className="ml-2">Dynamic Content</span>
          </p>
          {element.dynamic && (
            <select
              value={element.dynamicKey}
              onChange={e => onUpdate({ dynamicKey: e.target.value })}
              className="mt-2 w-full border rounded px-2 py-1"
            >
              <option value="studentName">Student Name</option>
              <option value="courseName">Course Name</option>
              <option value="issueDate">Issue Date</option>
            </select>
          )}
        </div>
      </div>
    );
  };

  const renderImageSettings = () => {
    if (element.type !== 'image') {
      return null;
    }
    return (
      <section>
        <h3 className="font-medium mb-2">Image</h3>
        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                handleFileUpload(file);
              }
            }}
            className="w-full"
          />
          {element.src && (
            <div className="relative">
              <img src={element.src} alt="" className="w-full h-auto border rounded" style={{ maxHeight: '100px' }} />
              <button
                type="button"
                onClick={() => onUpdate({ src: undefined })}
                className="absolute top-1 right-1 p-1 bg-white rounded-full shadow hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </section>
    );
  };

  // const renderSignatureSettings = () => {
  //   if (element.type !== "signature") {
  //     return null;
  //   }
  //   return (
  //     <section>
  //       <h3 className="font-medium mb-2">Signature</h3>
  //       <div className="space-y-4">
  //         <input
  //           type="file"
  //           accept="image/*"
  //           onChange={(e) => {
  //             const file = e.target.files?.[0];
  //             if (file) {
  //               handleFileUpload(file);
  //             }
  //           }}
  //           className="w-full"
  //         />
  //         {element.src && (
  //           <div className="relative">
  //             <img
  //               src={element.src}
  //               alt=""
  //               className="w-full h-auto border rounded"
  //               style={{ maxHeight: "100px" }}
  //             />
  //             <button
  //               type="button"
  //               onClick={() => onUpdate({ src: undefined })}
  //               className="absolute top-1 right-1 p-1 bg-white rounded-full shadow hover:bg-gray-100"
  //             >
  //               ✕
  //             </button>
  //           </div>
  //         )}
  //       </div>
  //     </section>
  //   );
  // };

  return (
    <div className="space-y-6">
      <h3 className="font-medium">Element Settings</h3>
      {renderCommonSettings()}
      {renderTextSettings()}
      {renderImageSettings()}
      {/* {renderSignatureSettings()} */}
    </div>
  );
};
