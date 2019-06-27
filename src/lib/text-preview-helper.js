//Create a classname for the text preview position while previewing the position of text on a GIF before download.
const getTextPosition = (textAlign, textBaseline) => {
  return `${textBaseline}-${textAlign}`;
};

export default getTextPosition;
