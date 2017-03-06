/**
 * @file File to contain commonly used firebase functions/utilities
 */

import * as firebase from 'firebase';

/**
 * Initializes the firebase app
 * @returns {FirebaseApp} A firebase app object initialized with the CoMake project
 */
export const initFirebase = () => {
  // start code from console.firebase.google.com
  const config = {
    apiKey: 'AIzaSyBouGOzw_GYXTl9_hkHhL2WZYvh1NHoQM0',
    authDomain: 'comake-95cb7.firebaseapp.com',
    databaseURL: 'https://comake-95cb7.firebaseio.com',
    storageBucket: 'comake-95cb7.appspot.com',
    messagingSenderId: '578562241026',
  };
  return firebase.initializeApp(config);
  // end sourced code
};

/**
 *  Sets the items location on Firebase.
 * @param {String} canvasId The ID of the canvas.
 * @param {String} elementId The ID of the element.
 * @param {Object} newLocation The new location to be updated.
 * @returns {Promise} The promise associated with the set action on firebase.
 */
export const setElementLocation = (canvasId, elementId, newLocation) => {
  const canvasPath = '/canvases/' + canvasId + '/elements';
  return firebase.database().ref(`${canvasPath}/${elementId}/position`)
    .set(newLocation);
};

/**
 *  Sets the items location on Firebase.
 * @param {String} canvasId The ID of the canvas.
 * @param {String} elementId The ID of the element.
 * @param {Object} newSize The new size to be updated.
 * @returns {Promise} The promise associated with the set action on firebase.
 */
export const setElementSize = (canvasId, elementId, newSize) => {
  const canvasPath = '/canvases/' + canvasId + '/elements';
  return firebase.database().ref(`${canvasPath}/${elementId}/size`)
    .set(newSize);
};

/**
 *  Sets the items location on Firebase.
 * @param {String} canvasId The ID of the canvas.
 * @param {String} elementId The ID of the element.
 * @param {Number} newRotation The new rotation to be updated.
 * @returns {Promise} The promise associated with the set action on firebase.
 */
export const setElementRotation = (canvasId, elementId, newRotation) => {
  const canvasPath = '/canvases/' + canvasId + '/elements';
  return firebase.database().ref(`${canvasPath}/${elementId}/rotation`)
    .set(newRotation);
};

/**
 * Deletes an element from the canvas.
 * @param {String} canvasId The ID of the canvas.
 * @param  {String} elementId Id of the element.
 * @return {Promise}           The promise associated with the firebase action.
 */
export const deleteElement = (canvasId, elementId) => {
  const canvasPath = '/canvases/' + canvasId + '/elements';
  return firebase.database().ref(`${canvasPath}/${elementId}`).remove();
}

/**
 * Adds an element to the canvas.
 * @param {String} canvasId The ID of the canvas.
 * @param {String} module       String of the module associated with the element.
 * @param {Object} initPosition Initial position e.g. { x: 0, y: 0}
 * @param {Object} initSize     Initial size e.g. {width:0, height:0}
 * @param {Number} initRotation Initial rotation
 * @returns {Promise}           Promise associated with the firebase action.
 */
export const addElement = (canvasId, module, initPosition, initSize, initRotation) => {
  const canvasPath = '/canvases/' + canvasId + '/elements';
  return firebase.database().ref(`${canvasPath}`).push({
    module: module,
    position: initPosition,
    size: initSize,
    rotation: initRotation,
  });
}
