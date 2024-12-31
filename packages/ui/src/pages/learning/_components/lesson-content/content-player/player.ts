import type React from 'react';
import { useEffect, useState } from 'react';

export const DEBUG = false;
export const VERSION = '0.0.11';
export const CONTEXT = 'player.js';
export const POST_MESSAGE = !!window.postMessage;

export const EVENTS = {
  READY: 'ready',
  PLAY: 'play',
  PAUSE: 'pause',
  ENDED: 'ended',
  TIMEUPDATE: 'timeupdate',
  PROGRESS: 'progress',
  ERROR: 'error',
} as const;

export const METHODS = {
  PLAY: 'play',
  PAUSE: 'pause',
  GETPAUSED: 'getPaused',
  MUTE: 'mute',
  UNMUTE: 'unmute',
  GETMUTED: 'getMuted',
  SETVOLUME: 'setVolume',
  GETVOLUME: 'getVolume',
  GETDURATION: 'getDuration',
  SETCURRENTTIME: 'setCurrentTime',
  GETCURRENTTIME: 'getCurrentTime',
  SETLOOP: 'setLoop',
  GETLOOP: 'getLoop',
  REMOVEEVENTLISTENER: 'removeEventListener',
  ADDEVENTLISTENER: 'addEventListener',
} as const;

export type Event = (typeof EVENTS)[keyof typeof EVENTS];
export type Method = (typeof METHODS)[keyof typeof METHODS];

export const origin = (url: string): string => {
  let newUrl = '';

  if (url.slice(0, 2) === '//' && typeof window !== 'undefined') {
    newUrl = window.location.protocol + url;
  }
  return newUrl.split('/').slice(0, 3).join('/');
};

export const addEvent = (
  elem: Window | HTMLElement,
  event: string,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  fn: any
): void => {
  if (!elem) {
    return;
  }
  if (elem.addEventListener) {
    elem.addEventListener(event, fn, false);
  } else if ('attachEvent' in elem) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (elem as any).attachEvent(`on${event}`, fn);
  } else {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (elem as any)[`on${event}`] = fn;
  }
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const log = (...args: any[]): void => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  (log as any).history = (log as any).history || [];
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  (log as any).history.push(args);
  if (window.console && DEBUG) {
    console.log(...args);
  }
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isString = (obj: any): obj is string => Object.prototype.toString.call(obj) === '[object String]';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isObject = (obj: any): obj is object => Object.prototype.toString.call(obj) === '[object Object]';

export const { isArray } = Array;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isNone = (obj: any): obj is null | undefined => obj === null || obj === undefined;

export const has = (obj: object, prop: string): boolean => Object.prototype.hasOwnProperty.call(obj, prop);

export const indexOf = <T>(arr: T[], obj: T): number => {
  if (arr === null) {
    return -1;
  }
  if (Array.isArray(obj)) {
    return arr.indexOf(obj);
  }
  for (const [i, element] of arr.entries()) {
    if (element === obj) {
      return i;
    }
  }
  return -1;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const assert = (test: any, msg?: string): void => {
  if (!test) {
    throw new Error(msg || 'Player.js Assert Failed');
  }
};

interface Listener {
  id: string;
  event: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  cb: (data: any) => void;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ctx: any;
  one: boolean;
}

class Keeper {
  private data: { [key: string]: Listener[] } = {};

  // Helper method để truy cập an toàn vào this.data[event]
  private getListeners(event: string): Listener[] {
    return this.data[event] || [];
  }

  // Helper method để set listeners cho một event
  private setListeners(event: string, listeners: Listener[]): void {
    if (listeners.length === 0) {
      delete this.data[event];
    } else {
      this.data[event] = listeners;
    }
  }

  getUUID(): string {
    return 'listener-xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replaceAll(/[xy]/g, c => {
      const r = Math.trunc(Math.random() * 16);
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  has(event: string, id?: string): boolean {
    const listeners = this.getListeners(event);
    if (listeners.length === 0) {
      return false;
    }
    if (isNone(id)) {
      return true;
    }
    return listeners.some(listener => listener.id === id);
  }

  add(
    id: string,
    event: string,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    cb: (data: any) => void,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ctx: any,
    one: boolean
  ): void {
    const listener: Listener = { id, event, cb, ctx, one };
    const listeners = this.getListeners(event);
    this.setListeners(event, [...listeners, listener]);
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  execute(event: string, id: string | undefined, data: any, ctx: any): boolean {
    if (!this.has(event, id)) {
      return false;
    }

    const listeners = this.getListeners(event);
    const keep: Listener[] = [];
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const execute: { cb: (data: any) => void; ctx: any; data: any }[] = [];

    for (const listener of listeners) {
      if (isNone(id) || (!isNone(id) && listener.id === id)) {
        execute.push({
          cb: listener.cb,
          ctx: listener.ctx || ctx,
          data,
        });
        if (!listener.one) {
          keep.push(listener);
        }
      } else {
        keep.push(listener);
      }
    }

    this.setListeners(event, keep);

    for (const e of execute) {
      e.cb.call(e.ctx, e.data);
    }
    return true;
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  on(id: string, event: string, cb: (data: any) => void, ctx: any): void {
    this.add(id, event, cb, ctx, false);
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  one(id: string, event: string, cb: (data: any) => void, ctx: any): void {
    this.add(id, event, cb, ctx, true);
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  off(event: string, cb?: (data: any) => void): string[] {
    const ret: string[] = [];
    const listeners = this.getListeners(event);

    if (listeners.length === 0) {
      return ret;
    }

    const keep: Listener[] = [];

    for (const listener of listeners) {
      if (isNone(cb) || listener.cb === cb) {
        if (!isNone(listener.id)) {
          ret.push(listener.id);
        }
      } else {
        keep.push(listener);
      }
    }

    this.setListeners(event, keep);
    return ret;
  }
}

class Player {
  private elem: HTMLIFrameElement;
  private origin: string;
  private keeper: Keeper;
  private isReady = false;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  private queue: any[] = [];
  private events: string[];
  private methods: string[];
  private loaded = false;

  constructor(elemOrId: string | HTMLIFrameElement) {
    const iframeElement = this.getIframeElement(elemOrId);

    assert(iframeElement.src, "playerjs.Player constructor requires an Iframe with a 'src' attribute.");

    this.elem = iframeElement;
    this.origin = origin(iframeElement.src);
    this.keeper = new Keeper();
    this.events = Object.values(EVENTS);
    this.methods = Object.values(METHODS);

    if (POST_MESSAGE) {
      addEvent(window, 'message', this.receive.bind(this));
    } else {
      log('Post Message is not Available.');
    }

    if (indexOf(READIED, iframeElement.src) > -1) {
      this.loaded = true;
    } else {
      this.elem.addEventListener('load', () => {
        this.loaded = true;
      });
    }
  }

  private getIframeElement(elemOrId: string | HTMLIFrameElement): HTMLIFrameElement {
    if (isString(elemOrId)) {
      const el = document.getElementById(elemOrId);
      assert(el, `No element found with id "${elemOrId}"`);
      assert(el?.nodeName === 'IFRAME', `playerjs.Player constructor requires an Iframe, got "${el?.nodeName}"`);
      return el as HTMLIFrameElement;
    }

    assert(
      elemOrId.nodeName === 'IFRAME',
      `playerjs.Player constructor requires an Iframe, got "${elemOrId.nodeName}"`
    );
    return elemOrId;
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  send(data: any, cb?: (data: any) => void, ctx?: any): boolean {
    data.context = CONTEXT;
    data.version = VERSION;

    if (cb) {
      const id = this.keeper.getUUID();

      data.listener = id;
      this.keeper.one(id, data.method, cb, ctx);
    }

    if (this.isReady || data.value === 'ready') {
      log('Player.send', data, this.origin);
      if (this.loaded && this.elem.contentWindow) {
        this.elem.contentWindow.postMessage(JSON.stringify(data), this.origin === '' ? '*' : this.origin);
      }
      return true;
    }
    log('Player.queue', data);
    this.queue.push(data);
    return false;
  }

  receive(e: MessageEvent): void {
    log('Player.receive', e);
    if (e.origin !== this.origin) {
      return;
    }

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    let data: any;

    try {
      data = JSON.parse(e.data);
    } catch {
      return;
    }

    if (data.context !== CONTEXT) {
      return;
    }

    if (data.event === 'ready' && data.value && data.value.src === this.elem.src) {
      this.ready(data);
    }

    if (this.keeper.has(data.event, data.listener)) {
      this.keeper.execute(data.event, data.listener, data.value, this);
    }
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ready(data: any): void {
    if (this.isReady) {
      return;
    }

    if (data.value.events) {
      this.events = data.value.events;
    }
    if (data.value.methods) {
      this.methods = data.value.methods;
    }

    this.isReady = true;
    this.loaded = true;

    for (const data of this.queue) {
      log('Player.dequeue', data);
      if (data.event === 'ready') {
        this.keeper.execute(data.event, data.listener, true, this);
      }
      this.send(data);
    }

    this.queue = [];
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  on(event: Event, cb: (data: any) => void, ctx?: any): boolean {
    const id = this.keeper.getUUID();

    if (event === 'ready') {
      this.keeper.one(id, event, cb, ctx);
    } else {
      this.keeper.on(id, event, cb, ctx);
    }
    return this.send({
      method: 'addEventListener',
      value: event,
      listener: id,
    });
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  off(event: Event, cb: (data: any) => void): boolean {
    const events = this.keeper.off(event, cb);

    log('Player.off', events);
    if (events.length > 0) {
      return this.send({
        method: 'removeEventListener',
        value: event,
        listener: events[0],
      });
    }
    return false;
  }

  supports(evtOrMethod: 'event' | 'method', nameOrNames: string | string[]): boolean {
    assert(
      ['method', 'event'].includes(evtOrMethod),
      `evtOrMethod needs to be either "event" or "method" got ${evtOrMethod}`
    );
    const names = isArray(nameOrNames) ? nameOrNames : [nameOrNames];
    const all = evtOrMethod === 'event' ? this.events : this.methods;

    return names.every(name => all.includes(name));
  }

  // Add method shortcuts
  play = () => this.send({ method: METHODS.PLAY });
  pause = () => this.send({ method: METHODS.PAUSE });
  getPaused = (cb: (paused: boolean) => void) => this.send({ method: METHODS.GETPAUSED }, cb);
  mute = () => this.send({ method: METHODS.MUTE });
  unmute = () => this.send({ method: METHODS.UNMUTE });
  getMuted = (cb: (muted: boolean) => void) => this.send({ method: METHODS.GETMUTED }, cb);
  setVolume = (volume: number) => this.send({ method: METHODS.SETVOLUME, value: volume });
  getVolume = (cb: (volume: number) => void) => this.send({ method: METHODS.GETVOLUME }, cb);
  getDuration = (cb: (duration: number) => void) => this.send({ method: METHODS.GETDURATION }, cb);
  setCurrentTime = (time: number) => this.send({ method: METHODS.SETCURRENTTIME, value: time });
  getCurrentTime = (cb: (time: number) => void) => this.send({ method: METHODS.GETCURRENTTIME }, cb);
  setLoop = (loop: boolean) => this.send({ method: METHODS.SETLOOP, value: loop });
  getLoop = (cb: (loop: boolean) => void) => this.send({ method: METHODS.GETLOOP }, cb);
}

export const READIED: string[] = [];

// React Hook
export const usePlayer = (iframeRef: React.RefObject<HTMLIFrameElement | null>) => {
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const newPlayer = new Player(iframeRef.current);

      newPlayer.on(EVENTS.READY, () => {
        setPlayer(newPlayer);
      });
    }

    return () => {
      if (player) {
        // Clean up any listeners if necessary
      }
    };
  }, [iframeRef]);

  return player;
};
