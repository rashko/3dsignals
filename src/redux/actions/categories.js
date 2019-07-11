import { GET_CATEGORIES, ADD_CATEGORY, REMOVE_CATEGORY } from "../actionTypes";

export function getCategories() {
  return { type: GET_CATEGORIES };
}

export function addCategory(payload) {
  return { type: ADD_CATEGORY, payload };
}

export function removeCategory(payload) {
  return { type: REMOVE_CATEGORY, payload };
}
