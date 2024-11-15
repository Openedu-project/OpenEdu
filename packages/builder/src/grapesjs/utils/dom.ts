// export const isDef = (value: any) => value !== undefined;

type ScriptToLoad = { id: string; src: string };

export const isString = (value: string | HTMLElement | ScriptToLoad): value is string => typeof value === 'string';

export const prevent = (ev?: Event) => ev?.preventDefault();

export const stop = (ev?: Event) => ev?.stopPropagation();

export const loadStyle = (href: string) => {
  const link = document.createElement('link');

  link.href = href;
  link.rel = 'stylesheet';
  document.head.append(link);
};

export const loadScript = (src: string | ScriptToLoad) => {
  const scriptToLoad = isString(src) ? { id: src, src } : src;

  return new Promise<string>((res, rej) => {
    const script = document.createElement('script');

    if (document.querySelector(`script[src="${scriptToLoad.src}"]`)) {
      return res(scriptToLoad.id);
    }

    script.src = scriptToLoad.src;
    script.addEventListener('load', () => res(scriptToLoad.id));
    script.addEventListener('error', () => rej(new Error(scriptToLoad.id)));
    // script.onerror = () => rej(new Error(scriptToLoad.id));
    document.head.append(script);
  });
};

export const loadScripts = (scripts: { id: string; src: string }[]) => {
  const promises = scripts.map(script => loadScript(script));

  return Promise.allSettled(promises);
};
