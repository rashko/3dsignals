import { GET_BOOKS, ADD_BOOK, REMOVE_BOOK, EDIT_BOOK } from "../actionTypes";

export function getBooks() {
  return { type: GET_BOOKS };
}

export function addBook(payload) {
  return { type: ADD_BOOK, payload };
}

export function removeBook(payload) {
  return { type: REMOVE_BOOK, payload };
}

export function editBook(payload) {
  return { type: EDIT_BOOK, payload };
}
