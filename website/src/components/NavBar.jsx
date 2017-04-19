import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import Home from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
import ListItem from 'material-ui/List/ListItem';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

import { getUserInfo, signOut } from '../helpers/LoginHelper';

const styles = {
  appbar: {
    height: 55,
    position: 'fixed',
  },
  dropdownIcon: {
    verticalAlign: 'middle',
  },
  title: {
    color: '#e74c49',
    fontWeight: 600,
  },
  navBtn: {
    height: 55,
  },
  navBtnLabel: {
    fontWeight: 600,
    letterSpacing: 1,
  },
  navUser: {
    backgroundColor: '#ffffff',
    color: '#e74c49',
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  userElement: {
    margin: 0,
  },
};

/**
 * @classdesc The nav bar for the page.
 */
class NavBar extends React.Component {
  /**
   * Constructor for the class.
   * @param {Object} props The props to be passed in.
   */
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  /**
   * Function to be triggered on NavBar mounting, fetches user's information.
   * @returns {void}
   */
  componentDidMount() {
    getUserInfo(this.props.dispatch);
  }


  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };


  /**
   * Renders the NavBar.
   * @returns {HTML} The html to be dispalyed.
   */
  render() {
    let photoURL = "";
    let username = "";
    if (this.props.userInfo) {
      photoURL = this.props.userInfo.photo;
      username = this.props.userInfo.name;
    }
    return (
      <AppBar
        title="comake"
        titleStyle={styles.title}
        iconStyleRight={styles.userElement}
        iconElementLeft={
          <Link to="/home">
            <IconButton><Home color="#e74c49" /></IconButton>
          </Link>
        }
        style={styles.appbar}
      >
        <FlatButton
          style={styles.navBtn}
        >
          <ListItem
            disabled={true}
            leftAvatar={
              <Avatar src={photoURL} />
            }
            style={styles.navUser}
          >
            {username}
          </ListItem>
        </FlatButton>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Help &amp; feedback" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Sign out" />
          </Menu>
        </Popover>
        <FlatButton
          label="User Guide"
          labelStyle={styles.navBtnLabel}
          style={styles.navBtn}
        />
        <FlatButton
          label="Log Out"
          labelStyle={styles.navBtnLabel}
          style={styles.navBtn}
          onClick={signOut}
        />
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfoReducer.userInfo,
});

NavBar.propTypes = {
  dispatch: PropTypes.func,
  userInfo: PropTypes.object
}

export default connect(mapStateToProps)(NavBar);
