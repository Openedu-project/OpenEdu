import type { Plugin, PluginOptions } from 'grapesjs';

import { loadScripts } from './dom';

export type GrapesPlugins = string | Plugin<PluginOptions>;

export type PluginTypeToLoad = GrapesPlugins | PluginToLoad | false | null | undefined;

export type PluginToLoad = {
  id: string;
  src: string;
  options?: PluginOptions;
};

const isPluginToLoad = (plugin: PluginTypeToLoad): plugin is PluginToLoad =>
  !!(plugin && !Array.isArray(plugin) && typeof plugin === 'object');

export async function loadPlugins(plugins: PluginToLoad[]) {
  const scripts = plugins.map(({ id, src }) => {
    return { id, src };
  });
  const pluginsMap = plugins.reduce(
    (res, item) => {
      res[item.id] = item;
      return res;
    },
    {} as Record<string, PluginToLoad>
  );
  const loaded: PluginToLoad[] = [];
  const failed: PluginToLoad[] = [];
  const results = await loadScripts(scripts);

  for (const result of results) {
    if (result.status === 'fulfilled') {
      loaded.push(pluginsMap[result.value] as PluginToLoad);
    } else {
      failed.push(pluginsMap[result.reason as string] as PluginToLoad);
    }
  }

  return { loaded, failed };
}

export const initPlugins = async (plugins: PluginTypeToLoad[]) => {
  const pluginsToInit = [...plugins];
  const pluginOptions: PluginToLoad['options'] = {};

  if (pluginsToInit.length > 0) {
    const pluginToLoadMap: Record<string, { index: number; loaded?: boolean }> = {};
    const pluginsToLoad: PluginToLoad[] = [];

    for (const [index, plugin] of pluginsToInit.entries()) {
      if (isPluginToLoad(plugin)) {
        pluginToLoadMap[plugin.id] = { index };
        pluginsToLoad.push(plugin);
      }
    }

    if (pluginsToLoad.length > 0) {
      const { loaded } = await loadPlugins(pluginsToLoad);

      for (const { id, options } of loaded) {
        if (pluginToLoadMap[id]) {
          pluginToLoadMap[id].loaded = true;
        }
        pluginOptions[id] = options || {};
      }
    }

    for (const id of Object.keys(pluginToLoadMap)) {
      const plugin = pluginToLoadMap[id];

      if (plugin) {
        pluginsToInit[plugin.index] = plugin.loaded ? id : false;
      }
    }
  }

  return {
    plugins: pluginsToInit.filter(Boolean) as GrapesPlugins[],
    pluginOptions,
  };
};
