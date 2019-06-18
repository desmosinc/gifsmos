import React from 'react';

const burstBlurb = (
  <p>
    Multi-capture mode allows you to generate multiple snapshots from a slider
    in the graphing calculator. Enter the relevant information in the input
    fields...
    <ol>
      <li>
        <strong>Slider Index</strong>
        <p>
          the index of the expression that contains the slider values you want
          to capture.
        </p>
      </li>

      <li>
        <strong>Slider Min</strong>
        <p>The first slider value you want to capture.</p>
      </li>

      <li>
        <strong>Slider Max</strong>
        <p>The last slider value you want to capture.</p>
      </li>

      <li>
        <strong>Slider Step</strong>
        <p>How much to increment the slider in between captures.</p>
      </li>
    </ol>
  </p>
);

export default burstBlurb;
