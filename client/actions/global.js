import {SET_LOCALE} from "../constants/actionTypes";

export function setLocale(locale) {
  return {
    type: SET_LOCALE,
    locale,
  }
}