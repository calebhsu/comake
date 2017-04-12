/**
 * @file The 3D previewer component for the canvas.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import IconButton from 'material-ui/IconButton';
import ThreeDRotation from 'material-ui/svg-icons/action/three-d-rotation';

import { ReactCraftMLRenderer } from 'craftml';
import { generateOverheadScript, generateSideScript } from '../../craftml/ScriptGenerator';
import * as CodeActions from '../../redux/actions/CraftmlCodeActions';

const styles = {
  img: {
    padding: '5px 5px 1px',
    width: 95,
  },
  paper: {
    display: 'inline-block',
    height: 90,
    textAlign: 'center',
    width: 100,
  },
  preview3d: {
    bottom: 28,
    opacity: 0.9,
    position: 'fixed',
    right: 20,
    zIndex: 100,
  },
};

/**
 * @classdesc The component that gives a 3D prreview of the model.
 */
class Preview3D extends React.Component {

  /**
   * constructor for the Sidebar.
   * @param {Object} props The props to be passed in.
   */
  constructor(props) {
    super(props);
  }

  /**
   * If the elements have changed and auto-render is on then update code.
   * @param {Object} nextProps  The next props to be recieved by the component.
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.autoRender) {
      if (! _.isEqual(this.props.elements, nextProps.elements)) {
        const newCode = generateSideScript(nextProps.elements);
        this.props.dispatch(CodeActions.setCode(newCode));
      }
    }
  }

  /**
    * Gives HTML for 3D preview component.
    * @returns {HTML}   The HTML of the 3D preview.
   */
  render() {
    if (this.props.craftmlCode !== '') {
      return (
        <div style={styles.preview3d}>
          <ReactCraftMLRenderer code={this.props.craftmlCode} />
        </div>
      );
    } else {
      return (
        <div style={styles.preview3d}>
          <IconButton
            iconStyle={styles.iconSize}
            style={styles.size}
            tooltip="3D Preview"
            tooltipPosition="top-center"
            touch={true}
          >
            <ThreeDRotation />
          </IconButton>
        </div>
      )
    }
  }
}

Preview3D.propTypes = {
  dispatch: PropTypes.func,
  craftmlCode: PropTypes.string,
  elements: PropTypes.object,
  autoRender: PropTypes.bool,
};

export default connect()(Preview3D);
