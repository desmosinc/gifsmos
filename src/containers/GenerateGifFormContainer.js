import { connect } from 'react-redux';
import GenerateGifForm from '../components/GenerateGifForm';
import {
  updateGIFFileName,
  updateText,
  updateTextColor,
  generateGIF,
  updateTextPosition
} from '../actions';

const mapStateToProps = (state, ownProps) => {
  const { images } = state;
  const { caption, fontColor, gifFileName, textAlign, textBaseline } = images;

  return {
    handleGenerateGIF: ownProps.handleGenerateGIF,
    caption,
    fontColor,
    gifFileName,
    textAlign,
    textBaseline
  };
};

const GenerateGifFormContainer = connect(
  mapStateToProps,
  {
    updateText,
    updateTextColor,
    updateGIFFileName,
    generateGIF,
    updateTextPosition
  }
)(GenerateGifForm);

export default GenerateGifFormContainer;
