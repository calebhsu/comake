/**
 * @file Reducers for craftml code generation.
 */

import * as AC from './../actions/ActionConstants';

import * as RC from './ReducerConstants';
import { insertIntoState } from './ReducerUtil';

/**
 * Update the position in firebase.
 * @param {Object} state The state of the store.
 * @param {Object} action action to be performed.
 * @returns {Object} The new state object.
 */
export const craftmlCodeReducer = (state = RC.BLANK_STATE, action) => {
  switch (action.type) {
    case AC.SET_CODE:
      if (typeof(action.payload) !== 'string') {
        throw Error('Expected code set to be of type string.');
      }
      return insertIntoState(state, action.payload, [RC.CODE]);
    case AC.TOGGLE_AUTO_CODE_UPDATE:
      return insertIntoState(state, !state[RC.AUTO_GENERATE_CODE],
        [RC.AUTO_GENERATE_CODE]);
    default:
      // Reducer should not do anything otherwise so return.
      return state
  }
};
