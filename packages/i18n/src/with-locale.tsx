import { setRequestLocale } from "next-intl/server";
import type { ComponentType, FC } from "react";

// Kiểm tra nếu API tồn tại
const hasSetRequestLocale = typeof setRequestLocale === "function";

/**
 * HOC để xử lý việc thiết lập locale cho static rendering
 * Hỗ trợ cả layout và pages trong Next.js 15
 * @param Component Component cần được bọc
 * @returns ComponentType mới có xử lý locale
 */
export function withLocale<Props extends object>(
  Component: ComponentType<Props>
): ComponentType<Props> {
  const WithLocaleWrapper: FC<Props> = async (props) => {
    // Lấy params từ props
    const { params } = props as { params: Promise<{ locale: string }> };

    if (params) {
      try {
        // Next.js 15: params luôn phải được await
        const resolvedParams = await params;

        // Kiểm tra xem params có chứa locale không
        if (resolvedParams && "locale" in resolvedParams) {
          const { locale } = resolvedParams;

          // Thiết lập locale cho static rendering
          if (hasSetRequestLocale) {
            setRequestLocale(locale);
          }
        }
      } catch (error) {
        console.error("Lỗi khi xử lý params trong withLocale:", error);
      }
    }

    // Truyền lại props cho component gốc
    return <Component {...props} />;
  };

  // Gán tên hiển thị cho component
  WithLocaleWrapper.displayName = `WithLocale(${
    Component.displayName || Component.name || "Component"
  })`;

  // Sao chép tất cả các phương thức tĩnh từ component gốc
  if (Object.hasOwn(Component, "generateStaticParams")) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (WithLocaleWrapper as any).generateStaticParams =
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      (Component as any).generateStaticParams;
  }

  // Sao chép các phương thức metadata nếu có (cho layout và pages)
  if (Object.hasOwn(Component, "generateMetadata")) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (WithLocaleWrapper as any).generateMetadata =
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      (Component as any).generateMetadata;
  }

  return WithLocaleWrapper as ComponentType<Props>;
}
