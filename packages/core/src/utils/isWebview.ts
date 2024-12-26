const rules = [
  'WebView',
  '(iPhone|iPod|iPad)(?!.*Safari)',
  'Android.*(;\\s+wv|Version/\\d.\\d\\s+Chrome/\\d+(\\.0){3})',
  'Linux; U; Android',
];
const webviewRegExp = new RegExp(`(${rules.join('|')})`, 'ig');

export function isWebview() {
  const ua = typeof window !== 'undefined' ? window.navigator.userAgent : '';
  return !!ua.match(webviewRegExp);
}
