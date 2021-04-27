import React from 'react';
import { styleAreEqual } from './utils/react';
import { parseReactStyle } from './utils/reactDOM';

export type SetStyleAction = React.CSSProperties | ((prevStyle: React.CSSProperties) => React.CSSProperties);

export default function useInlineStyle(
  factory: () => React.CSSProperties,
  selector: () => NodeListOf<HTMLElement | SVGElement> | Array<HTMLElement | SVGElement | null> = () => [],
): [
    () => React.CSSProperties,
    React.Dispatch<SetStyleAction>,
  ] {
  const styleRef = React.useRef<React.CSSProperties>({});
  const dirtyStyleRef = React.useRef<React.CSSProperties>({});

  const factoryRef = React.useRef<typeof factory>(factory);
  const selectorRef = React.useRef<typeof selector>(selector);

  factoryRef.current = factory;
  selectorRef.current = selector;

  const updateStyleRef = React.useCallback(() => {
    const newStyle = { ...factoryRef.current(), ...dirtyStyleRef.current };
    const shouldUpdate = !styleAreEqual(styleRef.current, newStyle);
    if (shouldUpdate) { styleRef.current = newStyle; }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getStyle = React.useCallback(() => styleRef.current, []);

  const setStyle = React.useCallback((action: SetStyleAction) => {
    const newStyle = typeof action === 'function' ? action(styleRef.current) : action;

    dirtyStyleRef.current = { ...dirtyStyleRef.current, ...newStyle };
    updateStyleRef();

    const domStyle = parseReactStyle(newStyle);
    const entries = Object.entries(domStyle);
    const elements = selectorRef.current();

    for (let i = 0; i < elements.length; i += 1) {
      const element = elements[i];
      if (element == null) { continue; }
      for (let j = 0; j < entries.length; j += 1) {
        const [key, value] = entries[j];
        element.style[key] = value ?? '';
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  updateStyleRef();

  return [getStyle, setStyle];
}
