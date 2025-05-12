import { setRequestLocale } from "next-intl/server";
import type { FC } from "react";
import type { ComponentType } from "react";

// Kiểm tra nếu API tồn tại
const hasSetRequestLocale = typeof setRequestLocale === "function";

/**
 * HOC để xử lý việc thiết lập locale cho static rendering
 * Sẽ giữ nguyên tất cả các props của component ban đầu
 */
export function withLocale<Props extends object>(
  Component: ComponentType<Props>
): ComponentType<Props> {
  // Định nghĩa một wrapper component mới
  const WithLocaleWrapper: FC<Props> = async (props) => {
    if ("params" in props) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const paramsObj = props.params as any;

      // Xử lý cả trường hợp params là Promise và object thông thường
      const paramsData =
        paramsObj instanceof Promise ? await paramsObj : paramsObj;

      // Kiểm tra xem params có chứa locale không
      if (paramsData && "locale" in paramsData) {
        const { locale } = paramsData;

        // Thiết lập locale nếu API tồn tại
        if (hasSetRequestLocale) {
          setRequestLocale(locale);
        }

        // Trong tương lai, có thể thay thế bằng API mới ở đây
        // else if (typeof newAPI === 'function') { newAPI(locale); }
      }
    }

    // Truyền lại tất cả props cho component gốc
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

  return WithLocaleWrapper as ComponentType<Props>;
}
