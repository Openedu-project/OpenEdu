import type { CertificateElement } from '../types';

export const ElementRenderer = ({
  element,
}: {
  element: CertificateElement;
}) => {
  switch (element.type) {
    case 'text':
      return (
        <div
          style={{
            fontSize: element.fontSize,
            fontFamily: element.fontFamily,
            color: element.color,
            fontWeight: element.bold ? 'bold' : 'normal',
            fontStyle: element.italic ? 'italic' : 'normal',
            textDecoration: element.underline ? 'underline' : 'none',
            textAlign: element.align || 'left',
            width: '100%',
            height: '100%',
          }}
        >
          {element.text}
        </div>
      );

    // case "datetime":
    //   return (
    //     <div
    //       style={{
    //         fontSize: element.fontSize,
    //         color: element.color,
    //         width: "100%",
    //         height: "100%",
    //       }}
    //     >
    //       {new Date().toLocaleDateString()}
    //     </div>
    //   );

    case 'image':
      return element.src ? (
        <img
          src={element.src}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center border-2 border-gray-300 border-dashed">
          <span className="text-gray-400">Image</span>
        </div>
      );

    // case "signature":
    //   return element.src ? (
    //     <img
    //       src={element.src}
    //       alt=""
    //       style={{
    //         width: "100%",
    //         height: "100%",
    //         objectFit: "contain",
    //       }}
    //     />
    //   ) : (
    //     <div className="flex h-full w-full items-center justify-center border-2 border-gray-300 border-dashed">
    //       <span className="text-gray-400">Signature</span>
    //     </div>
    //   );

    default:
      return null;
  }
};
