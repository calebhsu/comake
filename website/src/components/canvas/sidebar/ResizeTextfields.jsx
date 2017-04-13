/**
 * @file Component with textfields to resize canvas elements by height and width
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import AddCircle from 'material-ui/svg-icons/content/add-circle';
import IconButton from 'material-ui/IconButton';
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import TextField from 'material-ui/TextField';

import * as AC from '../../../redux/actions/ActionConstants';
import * as EA from '../../../redux/actions/ElementActions';


const ONE_UNIT = 1;
const h = 'height';
const w = 'width';
const styles = {
    field: {
        width: '25%'
    },
    smallIcon: {
        height: 36,
        width: 36
    },
    small: {
        display: 'inline-block',
        height: 60,
        paddingLeft: 2,
        paddingRight: 2,
        paddingBottom: 0,
        width: 60
    }
};

/**
* Component of reisze textfields
*/
class ResizeTextfields extends React.Component {
    /**
   * Constructor for ResizeTextfields
   * @param {Object} props The props for the ResizeTextfields.
   */

    constructor(props) {
        super(props);
        this.generateButtonHandler = this.generateButtonHandler.bind(this);
        this.handlerTextfieldHeight = this.handlerTextfieldHeight.bind(this);
        this.handlerTextfieldWidth = this.handlerTextfieldWidth.bind(this);
    }

    /**
     * Generic button handler for when the height field is changed.
     * @param {value} changeAmount numerical value for width/height change
     * @param {String} widthOrHeight specifies whether height or width should be changed
     * @returns {handler} returns promise
     */
    generateButtonHandler(changeAmount, widthOrHeight) {
      const handler = () => {

        const newSize = this.props.elements[this.props.targetedId].size;
        newSize[widthOrHeight] += parseInt(changeAmount);
        this.props.dispatch(EA.updateAndPersist(AC.UPDATE_SIZE,
          this.props.targetedId, newSize, this.props.currentCanvas));
      }
      return handler;
    }
    /**
     * Handler for when the height field is changed.
     * @param {Object} e  The event of changing the name.
     * @param {String} newHeight The new name entered.
     * @returns {void}
     */
    handlerTextfieldHeight(e, newHeight) {
      const newFieldSize = {
          height: parseInt(newHeight),
          width: this.props.elements[this.props.targetedId].size.width
      };

      this.props.dispatch(EA.updateAndPersist(AC.UPDATE_SIZE,
        this.props.targetedId, newFieldSize, this.props.currentCanvas));
    }
    /**
     * Handler for when the width field is changed.
     * @param {Object} e  The event of changing the name.
     * @param {String} newWidth The new name entered.
     * @returns {void}
     */
    handlerTextfieldWidth(e, newWidth) {
      const newFieldSize = {
          height: this.props.elements[this.props.targetedId].size.height,
          width: parseInt(newWidth)
      };

      this.props.dispatch(EA.updateAndPersist(AC.UPDATE_SIZE,
        this.props.targetedId, newFieldSize, this.props.currentCanvas));
    }
    render() {
        return (
            <div>
                <IconButton
                  iconStyle={styles.smallIcon}
                  style={styles.small}
                  onTouchTap={this.generateButtonHandler(-1 * ONE_UNIT, h)}
                >
                    <RemoveCircle/>
                </IconButton>
                <TextField
                  onChange={this.handlerTextfieldHeight}
                  floatingLabelText="Height"
                  style={styles.field}
                />
                <IconButton
                  iconStyle={styles.smallIcon}
                  style={styles.small}
                  onTouchTap={this.generateButtonHandler(ONE_UNIT, h)}
                >
                    <AddCircle/>
                </IconButton>
                <IconButton
                  iconStyle={styles.smallIcon}
                  style={styles.small}
                  onTouchTap={this.generateButtonHandler(-1 * ONE_UNIT, w)}
                >
                    <RemoveCircle/>
                </IconButton>
                <TextField
                  onChange={this.handlerTextfieldWidth}
                  floatingLabelText="Width"
                  style={styles.field}
                />
                <IconButton
                  iconStyle={styles.smallIcon}
                  style={styles.small}
                  onTouchTap={this.generateButtonHandler(ONE_UNIT, w)}
                >
                    <AddCircle/>
                </IconButton>
            </div>
        );
    }
}

ResizeTextfields.propTypes = {
    currentCanvas: PropTypes.string,
    dispatch: PropTypes.func,
    targetedId: PropTypes.string,
    elements: PropTypes.object
}

export default connect()(ResizeTextfields);
