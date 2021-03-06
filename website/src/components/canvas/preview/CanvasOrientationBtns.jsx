/**
 * @file Buttons for switching orientation of canvas.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import Layers from 'material-ui/svg-icons/maps/layers';
import ViewStream from 'material-ui/svg-icons/action/view-stream';

import { CANVAS_ORIENTATION } from '../../../redux/reducers/ReducerConstants';
import { setCanvasOrientationAndPersist } from '../../../redux/actions/CanvasActions';
import * as CC from '../CanvasConstants';

import { grey400, grey800 } from 'material-ui/styles/colors';

const styles = {
  activeIcon: {
    backgroundColor: grey400,
    borderRadius: '50%',
    color: grey800,
    height: 32,
    padding: 3,
    width: 32,
  },
  activeSize: {
    display: 'block',
    height: 64,
    padding: 13,
    width: 64,
  },
  inactiveIcon: {
    color: grey800,
    height: 32,
    width: 32,
  },
  inactiveSize: {
    display: 'block',
    height: 64,
    padding: 16,
    width: 64,
  },
};

class CanvasOrientationBtns extends Component {
  /**
   * Constructor for CanvasOrientationBtns
   * @param {Object} props The props for the CanvasOrientationBtns.
   */
  constructor(props) {
    super(props);
    this.handleOrientOverhead = this.handleOrientOverhead.bind(this);
    this.handleOrientSide = this.handleOrientSide.bind(this);
    this.setOrientation = this.setOrientation.bind(this);
  }

  /**
   * Handler for onTouchTap that sets orientation to overhead
   * by calling dispatch function setOrientation
   * @returns {void}
   */
  handleOrientOverhead() {
    this.setOrientation(CC.OVERHEAD_VIEW);
  }

  /**
   * Handler for onTouchTap that sets orientation to side.
   * by calling dispatch function setOrientation
   * @returns {void}
   */
  handleOrientSide() {
    this.setOrientation(CC.SIDE_VIEW);
  }

   /**
    * Sets canvas orientation by dispatching set canvas orientation event.
    * Updates CraftML code for previewer by generating new code based on
    * orientation.
    * @param {String} orientation  The canvas orientation.
    * @returns {void}
    */
   setOrientation(orientation) {
     this.props.dispatch(setCanvasOrientationAndPersist(this.props.currentCanvas,
       orientation));
   }

  /**
   * Gives HTML for canvas orientation buttons.
   * @returns {HTML}   The HTML of the canvas orientation buttons.
   */
  render() {
    const canvasOrientation = this.props.canvas ? this.props.canvas[CANVAS_ORIENTATION] : CC.OVERHEAD_VIEW;

    return (
      <div>
        <IconButton
          iconStyle={canvasOrientation === CC.OVERHEAD_VIEW ? styles.activeIcon : styles.inactiveIcon}
          onTouchTap={this.handleOrientOverhead}
          style={canvasOrientation === CC.OVERHEAD_VIEW  ? styles.activeSize : styles.inactiveSize}
          tooltip="Overhead View"
          tooltipPosition="bottom-left"
          touch={true}
        >
          <Layers />
        </IconButton>
        <IconButton
          iconStyle={canvasOrientation === CC.SIDE_VIEW ? styles.activeIcon : styles.inactiveIcon}
          onTouchTap={this.handleOrientSide}
          style={canvasOrientation === CC.SIDE_VIEW ? styles.activeSize : styles.inactiveSize}
          tooltip="Side View"
          tooltipPosition="bottom-left"
          touch={true}
        >
          <ViewStream />
        </IconButton>
      </div>
    );
  }
}

CanvasOrientationBtns.propTypes = {
  canvas: PropTypes.object,
  currentCanvas: PropTypes.string,
  dispatch: PropTypes.func,
};

export default connect()(CanvasOrientationBtns);
