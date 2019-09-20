import {TOGGLE_ADMIN_PANEL, TOGGLE_SIDEBAR, TOGGLE_ADMIN_MODE} from '../constants/actionTypes.js';

export function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR,
  };
}

export function toggleAdminPanel() {
  return {
    type: TOGGLE_ADMIN_PANEL,
  };
}

export function toggleAdminMod() {
  return {
    type: TOGGLE_ADMIN_MODE,
  };
}