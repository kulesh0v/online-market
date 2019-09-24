import {SET_LOCALE} from "../actionTypes";

export function setLocale(locale) {
  return {
    type: SET_LOCALE,
    locale,
  }
}