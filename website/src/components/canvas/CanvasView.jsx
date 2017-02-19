/**
 * @file Component on which elements can be positioned.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import CanvasElement from './CanvasElement';
import {
  initElements, updatePosition, updateSize, updateRotation
} from '../../redux/actions/ElementActions';

const backgroundImageString = ('linear-gradient(to right, #dddddd 1px, '
  + 'transparent 1px), linear-gradient(to bottom, #dddddd 1px,'
  + 'transparent 1px)');
const styles = {
  canvas: {
    backgroundSize: '25px 25px',
    backgroundImage: backgroundImageString,
    border: '2px dashed #7e7e7e',
    height: '77.2vh',
    margin: '1vw 0 1vw 13.5vw',
    position: 'absolute',
    width: '85vw',
  }
};

/**
 * Component for the CanvasView for users to arrange elements on.
 */
class CanvasView extends React.Component {

  /**
   *  Constructor for CanvasElement
   * @param {Object} props The props for the CanvasElement.
   */
  constructor(props) {
    super(props);
  }

  /**
   * Function to automatically be performed once the component mounts.
   * @returns {void}
   */
  componentDidMount() {
    firebase.database().ref('/test').once('value').then((elemListSnap) => {
      this.props.dispatch(initElements(elemListSnap.val()));
    });

    firebase.database().ref('/test').on('child_changed', (elemSnap) => {
      this.props.dispatch(
        updatePosition(elemSnap.key, elemSnap.child('position').val())
      );
      this.props.dispatch(
        updateSize(elemSnap.key, elemSnap.child('size').val())
      );
      this.props.dispatch(
        updateRotation(elemSnap.key, {
          rotation: elemSnap.child('rotation').val()
        })
      );
    });
  }

  /**
   * Renders the element for display.
   * @returns {HTML} The rendered HTML.
   */
  render() {
    const elemDivs = [];
    Object.keys(this.props.elements).forEach((id) => {
      const elemDetails = this.props.elements[id];
      elemDivs.push(
        <CanvasElement key={id} elementId={id}
          initLoc={elemDetails.position}
          initSize={elemDetails.size}
          rotation={elemDetails.rotation}
        />
      );
    });
    return (
      <div style={styles.canvas}>
        { elemDivs }
      </div>
    );
  }
}

CanvasView.propTypes = {
  dispatch: PropTypes.func,
  elements: PropTypes.object,
}

const mapStateToProps = state => ({
  elements: state.updateElementReducer.elements,
});

export default connect(mapStateToProps)(CanvasView);
