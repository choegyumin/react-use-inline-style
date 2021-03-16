# react-use-inline-style

## Installation

```shell
npm i react-use-inline-style
```

## Usage

```tsx
import { useCallback, useRef } from 'react';
import useInlineStyle from 'react-use-inline-style';

const add = 10;

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);

  const [style, setStyle] = useInlineStyle(() => ({
    width: 100,
    height: 100,
    background: '#5c7bff',
  }), () => [ref.current]);

  const handleButtonClick = useCallback(() => {
    setStyle((prevStyle) => ({
      width: (Number(prevStyle.width) || 0) + add,
      height: (Number(prevStyle.height) || 0) + add,
    }));
  }, []);

  // `setStyle` does not trigger re-render.
  console.log(style);

  return <>
    <button type="button" onClick={handleButtonClick}>Size Up</button>
    <div ref={ref} style={style} />
  </>;
}
```
