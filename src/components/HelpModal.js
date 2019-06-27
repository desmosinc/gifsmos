import React, { Component } from 'react';
import './HelpModal.css';

export default class HelpModal extends Component {
  render() {
    let displayClass = this.props.showHelpModal ? 'show' : 'hide';

    return (
      <div className={`Help-modal ${displayClass}`}>
        <div className="Help-modal-content">
          <span
            onClick={this.props.toggleHelpModal}
            className="Help-modal-close-btn"
          >
            &times;
          </span>
          <div className="Help-modal-header">
            <h1>Using GIFsmos</h1>
          </div>
          <div className="Help-modal-text">
            <h3>Creating, importing and saving graphs</h3>
            <p>
              Start by making something dynamic and awesome in the Desmos
              graphing calculator! You can do that right inside of GIFsmos, or
              you can import one of your saved graphs from desmos.com by pasting
              its URL into the expressions list in GIFsmos, and it will be
              automatically imported for you.
            </p>
            <p>
              Conversely, if you build something great in GIFsmos that you want
              to save to your Desmos account, click "edit graph on Desmos" (at
              the bottom of the expressions list or the graph paper), and it
              will open a copy of your graph on desmos.com.
            </p>
            <p>
              To learn more about using the graphing calculator to build cool
              stuff, check out the Learn Desmos resources.
            </p>
            <h3>Capturing snapshots</h3>
            <p>
              GIFsmos generates your animated GIF from a list of snapshots taken
              from the graph paper. You can add a single frame to the list by
              clicking the camera button.
            </p>
            <p>
              GIFsmos also has a multi-capture mode that lets you generate
              multiple snapshots from a slider in the graphing calculator. Open
              the multi-capture panel and enter the relevant information in the
              input fields:
            </p>
            <h4>Option Description</h4>
            <h5>Slider Index</h5> The index of the expression that contains the
            slider values you want to capture.
            <h5>Slider Min</h5>The first slider value to capture.
            <h5>Slider Max</h5>The last slider value to capture.
            <h5>Slider Step</h5>How much to increment the slider in between
            captures.
            <p>
              Finally, click the "Capture" button, and GIFsmos will
              automatically capture one snapshot for each slider value defined
              by the min, max, and step.
            </p>
            <h3>Previewing</h3>
            <p>
              Click the preview button to open the preview panel. You can
              preview your future GIF either by scrubbing through the snapshots
              with the slider, or by clicking the play/pause button on the
              preview image. The animation will run at (roughly) a speed
              determined by the "Interval" option in the settings panel, so it
              will give you a good idea what the final GIF will look like.
            </p>
            <h3>Adjusting image settings</h3>
            <p>
              Click the settings button to open the settings panel. There you
              can set the desired image dimensions (applies to both the captured
              snapshots and the final GIF), as well as the interval between
              frames in the generated GIF.
            </p>
            <p>
              If the "Oversample" option is checked, images will be captured at
              double the nominal dimensions and at a higher pixel density, which
              is nice for high-density displays. For instance, an oversampled
              300x300 image will actually result in a 600x600 image that looks
              good on high-density displays when rendered at 300x300.
            </p>
            <h3>Generating and downloading a GIF</h3>
            <p>
              Inside the preview panel, once you're happy with the results,
              click the "Generate GIF" button to create your final image. When
              the image processing has completed, a download button will appear
              in the sidebar. Click it to save your GIF (named gifsmos.gif) to
              your browser's default download location.
            </p>
            <h3>Developer quick-start</h3>
            <ol>
              <li>Install Node.</li>
              <li>Clone the repo.</li>
              <li>cd into the project root.</li>
              <li>Run npm install to install project dependencies.</li>
              <li>
                Run npm start to start the development server on
                http://localhost:3000/.
              </li>
            </ol>
            <p>
              To run the test suite: npm test To build a static version of the
              app: npm run build Image credits The sidebar icons in GIFsmos are
              from the "World Wide Web" collection created by Dara Ullrich. It
              can be found here on The Noun Project.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
