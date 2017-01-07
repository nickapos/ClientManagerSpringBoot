export const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS';
export const ADD_STUDENT = 'ADD_STUDENT';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';
export const IMPORT_STUDENTS = 'IMPORT_STUDENTS';
export const EXPORT_STUDENTS = 'EXPORT_STUDENTS';
export const STUDENT_CLASS_DASHBOARD = 'STUDENT_CLASS_DASHBOARD';
export const DATA_FETCHED = 'DATA_FETCHED';

export function getAllStudents() {
  //debugger;
  return {
    type: GET_ALL_STUDENTS
  };
}
export function addStudent() {
  //debugger;
  return {
    type: ADD_STUDENT,
  };
}
export function deleteStudent() {
  //debugger;
  return {
    type: DELETE_STUDENT
  };
}
export function updateStudent() {
  //debugger;
  return {
    type: UPDATE_STUDENT
  };
}
export function importStudents() {
  //debugger;
  return {
    type: IMPORT_STUDENTS
  };
}
export function exportStudents() {
  //debugger;
  return {
    type: EXPORT_STUDENTS
  };
}
export function studentClassDashboard() {
  //debugger;
  return {
    type: STUDENT_CLASS_DASHBOARD,
  };
}