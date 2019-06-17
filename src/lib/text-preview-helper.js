//Create a classname for the text preview position while previewing the position of text on a GIF before download.
const getTextPosition = (textAlign, textBaseline) => {
  if (textAlign === 'left' && textBaseline === 'top') {
    return 'top-left';
  } else if (textAlign === 'center' && textBaseline === 'top') {
    return 'top-center';
  } else if (textAlign === 'right' && textBaseline === 'top') {
    return 'top-right';
  } else if (textAlign === 'left' && textBaseline === 'bottom') {
    return 'bottom-left';
  } else if (textAlign === 'center' && textBaseline === 'bottom') {
    return 'bottom-center';
  } else {
    return 'bottom-right';
  }
};

export default getTextPosition;
