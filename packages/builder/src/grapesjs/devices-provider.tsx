import { memo, useEffect, useState } from 'react';

import type { Device } from 'grapesjs';
import type React from 'react';

import { useEditorInstance } from './context/editor-instance';
import { isFunction, noop } from './utils';

export type DevicesState = {
  /**
   * Array of devices.
   */
  devices: Device[];

  /**
   * Selected device id.
   */
  selected: string;

  /**
   * Select new device by id.
   */
  select: (deviceId: string) => void;
};

export type DevicesResultProps = DevicesState;

export interface DevicesProviderProps {
  children: (props: DevicesResultProps) => React.JSX.Element;
}

export const DevicesProvider = memo(({ children }: DevicesProviderProps) => {
  const { editor } = useEditorInstance();
  const [propState, setPropState] = useState<DevicesState>(() => {
    return {
      devices: [],
      selected: '',
      select: noop,
    };
  });

  useEffect(() => {
    if (!editor) {
      return;
    }
    const { Devices } = editor;
    const event = Devices.events.all;

    const up = () => {
      setPropState({
        devices: Devices.getDevices(),
        selected: Devices.getSelected()?.id as string,
        select: id => Devices.select(id),
      });
    };

    editor.on(event, up);
    up();

    return () => {
      editor.off(event, up);
    };
  }, [editor]);

  return editor ? (isFunction(children) ? children(propState) : null) : null;
});

DevicesProvider.displayName = 'DevicesProvider';
