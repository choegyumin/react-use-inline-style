// https://github.com/facebook/react/blob/v16.14.0/packages/react-dom/src/shared/CSSProperty.js#L8
const isUnitlessNumberCSSProperties = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true,
};

// https://github.com/facebook/react/blob/v16.14.0/packages/react-dom/src/shared/dangerousStyleValue.js#L10
export const parseReactStyleValue = (name: string, value: unknown, isCustomProperty: boolean = name.indexOf('--') === 0): string => {
  const isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }

  if (
    !isCustomProperty
    && typeof value === 'number'
    && value !== 0
    && !(
      Object.prototype.hasOwnProperty.call(isUnitlessNumberCSSProperties, name)
      && isUnitlessNumberCSSProperties[name]
    )
  ) {
    return `${value}px`; // Presumes implicit 'px' suffix for unitless numbers
  }

  return String(value).trim();
};

export const parseReactStyle = (reactStyle: React.CSSProperties): Partial<CSSStyleDeclaration> => {
  const domStyle: Partial<CSSStyleDeclaration> = {};
  const entries = Object.entries(reactStyle);
  for (let i = 0; i < entries.length; i += 1) {
    const [key, value] = entries[i] as [string, unknown];
    domStyle[key] = parseReactStyleValue(key, value);
  }
  return domStyle;
};
