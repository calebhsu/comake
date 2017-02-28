/**
 * @file Automated tests for the Redux Login Actions.
 */

import * as LoginActions from '../../../../src/redux/actions/LoginActions';
import * as AC from '../../../../src/redux/actions/ActionConstants';


describe('LoginActionsUnitTests', () => {
  test('UpdateUserInfo', () => {
    const testName = 'First Last';
    const testPhotoURL = "photoURL"
    const expected = {
      type: AC.UPDATE_USER_INFO,
      payload: {
      	name: testName,
      	photo: testPhotoURL,
      },
    }
    expect(LoginActions.UpdateUserInfo(testName, testPhotoURL)).toEqual(expected);
  });
});
