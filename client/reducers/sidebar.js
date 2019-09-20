import {TOGGLE_SIDEBAR, TOGGLE_ADMIN_PANEL, TOGGLE_ADMIN_MODE} from '../constants/actionTypes.js';

export default function (state = {}, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {...state, visibilitySidebar: !state.visibilitySidebar};
    case TOGGLE_ADMIN_PANEL:
      return {...state, visibilityAdminPanel: !state.visibilityAdminPanel};
    case TOGGLE_ADMIN_MODE:
      return {...state, adminMode: !state.adminMode};
    default:
      return state;
  }
}