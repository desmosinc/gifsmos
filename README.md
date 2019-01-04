# GIFsmos

GIFsmos is a web app for creating animated GIFs from
[Desmos](https://www.desmos.com/calculator) graphs.

## Using GIFsmos

### Creating, importing and saving graphs

Start by making something dynamic and awesome in the Desmos graphing calculator.
You can do that right inside of GIFsmos, or you can import one of your saved
graphs from desmos.com by pasting its URL into the expressions list in GIFsmos,
and it will be automatically imported for you.

Conversely, if you build something great in GIFsmos that you want to save to
your Desmos account, click "edit graph on Desmos" (at the bottom of the
expressions list or the graph paper), and it will open a copy of your graph on
desmos.com.

To learn more about using the graphing calculator to build cool stuff, check out
the [Learn Desmos](https://learn.desmos.com/graphing) resources.

### Capturing snapshots

GIFsmos generates your animated GIF from a list of snapshots taken from the
graphpaper. You can add a single frame to the list by clicking the camera
button.

GIFsmos also has a multi-capture mode that lets you generate multiple
snapshots from a slider in the graphing calculator. Open the multi-capture panel
and enter the relevant information in the input fields:

- **Slider Index**: the index of the expression that contains the slider values
  you want to capture
- **Slider Min**: the first slider value to capture
- **Slider Max**: the last slider value to capture
- **Slider Step**: how much to increment the slider in between captures

Finally, click the "Capture" button, and GIFSmos will automatically capture one
snapshot for each slider value defined by the min, max, and step.

### Previewing

Click the preview button to open the preview panel. You can preview your future
GIF either by scrubbing through the snapshots with the slider, or by clicking
the play/pause button on the preview image. The animation will run at a speed
determined by the "Interval" option in the settings panel, so it will give you a
good idea what the final GIF will look like.

### Adjusting image settings

Click the settings button to open the settings panel. There you can set the
desired image dimensions (for both the captured snapshots and the final GIF), as
well as the interval between frames in the generated GIF.

If the "Oversample" option is checked, images will be captured at double the
nominal dimensions and at a higher pixel density. It's nice for high-density
displays. For instance, an oversampled 300x300 image will actually result in a
high-density 600x600 image that looks good on high-density displays when
rendered at 300x300.

### Generating and downloading a GIF

Inside the preview panel, once you're happy with the results, click the
"Generate GIF" button to create your final image. When the image processing has
completed, a download button will appear in the sidebar. Click it to save your
GIF (named `gifsmos.gif`) to your browser's default download location.

## Developer quick-start

1. Install [Node](https://nodejs.org/en/).
1. Clone the repo.
1. `cd` into the project root.
1. Run `npm install` to install project dependencies.
1. Run `npm start` to start the development server on http://localhost:3000/.

To run the test suite:

```bash
npm test
```

To build a static version of the app:

```bash
npm run build
```

### Image credits

The sidebar icons in GIFsmos are from the "World Wide Web" collection created by
Dara Ullrich. It can be found on [The Noun
Project](https://thenounproject.com/Dara%20Ullrich/collection/world-wide-web/).
