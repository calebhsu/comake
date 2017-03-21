import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import AppBar from 'material-ui/AppBar';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import RotationSlider from './RotationSlider';
import * as ElementActions from '../../redux/actions/ElementActions';
import * as CodeActions from '../../redux/actions/CraftmlCodeActions';
import * as CC from './CanvasConstants';
import * as FBHelper from '../../helpers/FirebaseHelper';
import { generateScript } from '../../craftml/ScriptGenerator';

const styles = {
  arrowIcon: {
    color: '#FFFFFF',
    height: 33,
    width: 33
  },
  arrowOpen: {
    backgroundColor: '#FFFFFF',
    height: 33,
    marginLeft: -13,
    marginTop: -15,
    padding: 10,
    width: 33
  },
  listItems: {
    marginTop: 20
  },
  propertiesSpacing: {
    marginLeft: 10,
    marginRight: 20
  },
  sidebar: {
    height: '89vh',
    marginTop: 119,
    overflowX: 'hidden',
    position: 'absolute'
  }
};

/**
 * @classdesc Sidebar for the canvas page.
  */
class Sidebar extends React.Component {
  /**
   * constructor for the Sidebar.
   * @param {Object} props The props to be passed in.
   */
  constructor(props) {
    super(props);
    this.addElement = this.addElement.bind(this);
    this.mapOptionToDiv = this.mapOptionToDiv.bind(this);
    this.handleSidebarOpen = this.handleSidebarOpen.bind(this);
    this.handleSidebarClose = this.handleSidebarClose.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.updateCraftmlCode = this.updateCraftmlCode.bind(this);
    this.listItems = CC.SIDEBAR_BUTTONS.map(this.mapOptionToDiv);
  }

  /**
   * Function to automatically be performed once the component mounts.
   * @returns {void}
   */
  componentWillMount() {
    this.setState({isOpen: true, closed: 0})
  }

  /**
   * Function that will delete the current targeted element.
   * @returns {void}
   */
  removeElement() {
    this.props.dispatch(ElementActions.removeElementAndPersist(this.props.targetedId, this.props.currentCanvas));
  }

  /**
   * Handler for adding an element to firebase.
   * @returns {void}
   */
  addElement() {
    /* NOTE: leaving this here for ease of testing */
    /* TODO: remove before deploying */
    FBHelper.addElement(this.props.currentCanvas, '1CEKd', 'http://marcoortiztorres.me/images/craftml.png', CC.INIT_POSITION, CC.INIT_SIZE, CC.INIT_ROTATION);
  }

  /**
   * Handler for updating craftml code (triggers 3D rerender).
   * @returns {void}
   */
  updateCraftmlCode() {
    const newCode = generateScript(this.props.elements);
    this.props.dispatch(CodeActions.setCode(newCode));
  }

  /**
   * Maps list item to a div to put in the drawer.
   * @param {String} item The item name to encapsulate into a ManueItem.
   * @returns {HTML} A MenuItem tag that holds the name of the item.
   */
  mapOptionToDiv(item) {
    let buttonAction = () => {};
    switch (item) {
      case CC.DELETE_ELEMENT_BUTTON:
        buttonAction = this.removeElement;
        break;
      case CC.ADD_ELEMENT_BUTTON:
        buttonAction = this.addElement;
        break;
      case CC.RERENDER_BUTTON:
        buttonAction = this.updateCraftmlCode;
        break;
    }
    return (
      <MenuItem key={item.toString()} onClick={buttonAction}>
        {item}
      </MenuItem>
    );
  }

  /**
   * Mouse event that closes sidebar
   * @returns {void}
   */
  handleSidebarClose() {
    this.setState({isOpen: false, closed: 1});
  }

  /**
  * Mouse event that opens sidebar
  * @returns {void}
  */
  handleSidebarOpen() {
    this.setState({isOpen: true, closed: 0});
  }

  /**
   * Renders the HTML for the sidebar.
   * @returns {HTML} The html for the Sidebar.
   */
  render() {
    return (
      <div>
        <IconButton iconStyle={styles.arrowOpen} onClick={this.handleSidebarOpen}>
          <ArrowForward/>
        </IconButton>
        <Drawer containerStyle={styles.sidebar} open={this.state.isOpen} docked={true} openSecondary={false} zDepth={0}>
          <AppBar title="Edit" iconElementRight={< IconButton > <ArrowBack/> < /IconButton>} showMenuIconButton={false} onRightIconButtonTouchTap={this.handleSidebarClose}/>
            <ul style={styles.propertiesSpacing}>
              <li>
                {this.listItems}
              </li>
              <li>
                <h3>Rotate</h3>
                <RotationSlider currentCanvas={this.props.currentCanvas}/>
              </li>
              <li>
                <h3>Resize</h3>
                <TextField hintText="64px" floatingLabelText="Height" fullWidth={true}/>
                <TextField hintText="64px" floatingLabelText="Width" fullWidth={true}/>
              </li>
            </ul>
        </Drawer>
      </div>
    );
  }
}

Sidebar.propTypes = {
  currentCanvas: PropTypes.string,
  dispatch: PropTypes.func,
  targetedId: PropTypes.string,
  elements: PropTypes.object,
}

export default connect()(Sidebar);
