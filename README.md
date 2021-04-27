# react-use-inline-style

## Installation

```shell
npm i react-use-inline-style
```

## Usage

```tsx
import { useCallback, useRef, useState } from 'react';
import useInlineStyle from 'react-use-inline-style';

const multiple = 10;

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);

  const [count, setCount] = useState(0);

  const [getStyle, setStyle] = useInlineStyle(() => ({
    width: 100,
    height: 100,
    background: '#5c7bff',
  }), () => [ref.current]);

  const handleCountUpClick = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  const handleSizeUpClick = useCallback(() => {
    setStyle((prevStyle) => ({
      width: (Number(prevStyle.width) || 0) + multiple,
      height: (Number(prevStyle.height) || 0) + multiple,
    }));
  }, []);

  // `setStyle` does not trigger re-render.
  console.log('count:', count);
  console.log('style:', getStyle());

  return <>
    <button type="button" onClick={handleCountUpClick}>Count Up ({count})</button>
    <hr />
    <button type="button" onClick={handleSizeUpClick}>Size Up</button>
    <div ref={ref} style={getStyle()} />
  </>;
}

export default UseStyleSample;
```
