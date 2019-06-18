import React from 'react';

const settingsBlurb = (
  <p>
    The settings panel allows you to set the desired image dimensions (applies
    to both the captured snapshots and the final GIF), as well as the interval
    between frames in the generated GIF. If the "Oversample" option is checked,
    images will be captured at double the nominal dimensions and at a higher
    pixel density, which is nice for high-density displays. For instance, an
    oversampled 300x300 image will actually result in a 600x600 image that looks
    good on high-density displays when rendered at 300x300.
  </p>
);

export default settingsBlurb;
