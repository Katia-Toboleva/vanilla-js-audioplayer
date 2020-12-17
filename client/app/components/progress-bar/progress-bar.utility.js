const setStyles = (element, styleObject) => {
  Object.entries(styleObject).forEach(([key, value]) => {
    element.style[key] = value;
  });
};

export default setStyles;
