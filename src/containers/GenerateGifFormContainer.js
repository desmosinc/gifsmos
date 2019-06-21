import { connect } from 'react-redux';
import GenerateGifForm from '../components/GenerateGifForm';
import { updateGIFFileName, updateText, updateTextColor } from '../actions';

const mapStateToProps = (state, ownProps) => {
  const { images } = state;
  const { caption, fontColor, gifFileName } = images;

  return {
    handleGenerateGIF: ownProps.handleGenerateGIF,
    caption,
    fontColor,
    gifFileName
  };
};

const GenerateGifFormContainer = connect(
  mapStateToProps,
  {
    updateText,
    updateTextColor,
    updateGIFFileName
  }
)(GenerateGifForm);

export default GenerateGifFormContainer;
