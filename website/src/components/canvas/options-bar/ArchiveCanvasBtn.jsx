/**
 * @file Button component for archiving canvas.
 */

import * as firebase from 'firebase';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import * as CanvasActions from '../../../redux/actions/CanvasActions';
import * as RC from '../../../redux/reducers/ReducerConstants';

import { white, grey800 } from 'material-ui/styles/colors';

const styles = {
  actionBtn: {
    color: white,
  },
  iconSize: {
    color: grey800,
    height: 32,
    width: 32,
  },
  size: {
    height: 64,
    padding: 16,
    width: 64,
  },
  greyBtn: {
    color: grey800,
  },
};

/**
 * Gives HTML for archive canvas button & modal.
 * @returns {HTML}   The HTML of the export button & modal.
 */
class ArchiveCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.archiveCanvas = this.archiveCanvas.bind(this);
    this.state = {
      open: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  /**
  * Handler for onTouchTap that sets modal's open state to false.
  * @returns {void}
  */
  handleOpen = () => {
    this.setState({open: true});
  };

  /**
   * Handler for onTouchTap that sets modal's open state to true.
   * @returns {void}
   */
  handleClose = () => {
    this.setState({open: false});
  };

  /**
   * Creates a request to remove a canvas from a user's list of canvases
   * @returns {null} Returns nothing
   */
  archiveCanvas() {
    const userId = this.props.userInfo.userId;
    const canvasId = this.props.canvasId;

    if((!userId)||(!canvasId)) {
      return;
    }

    firebase.database().ref(`/users/${userId}/canvases/${canvasId}`).set(false);
    this.props.dispatch(CanvasActions.removeCanvas(canvasId));

    document.location = '/#/';
  };

  /**
   * Renders the archive canvas button for display.
   * @returns {HTML} The rendered HTML of the archive canvas button.
   */
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        labelStyle={styles.greyBtn}
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        backgroundColor="#e74c49"
        hoverColor="#c7270b"
        label="Archive"
        labelStyle={styles.actionBtn}
        onTouchTap={this.handleClose}
        onClick={this.archiveCanvas}
      />,
    ];

    return (
      <div>
        <IconButton
          iconStyle={styles.iconSize}
          onTouchTap={this.handleOpen}
          style={styles.size}
          tooltip="Archive Canvas"
          tooltipPosition="bottom-center"
          touch={true}
        >
          <DeleteForever />
        </IconButton>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Are you sure you want to archive this canvas? This cannot be undone.
        </Dialog>
      </div>
    );
  }
}

ArchiveCanvas.propTypes = {
  dispatch: PropTypes.func,
  canvasId: PropTypes.string,
};

const mapStateToProps = state => ({
  userInfo: state.userInfoReducer.userInfo,
});

export default connect(mapStateToProps)(ArchiveCanvas);
