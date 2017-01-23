export const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS';
export const ADD_STUDENT = 'ADD_STUDENT';
export const SAGAS_SAVE_NEW_STUDENT = 'SAGAS_SAVE_NEW_STUDENT';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const SAGAS_DELETE_STUDENT = 'SAGAS_DELETE_STUDENT';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';
export const IMPORT_STUDENTS = 'IMPORT_STUDENTS';
export const EXPORT_STUDENTS = 'EXPORT_STUDENTS';
export const STUDENT_CLASS_DASHBOARD = 'STUDENT_CLASS_DASHBOARD';
export const STUDENT_CLASS_DATA_FETCHED = 'STUDENT_CLASS_DATA_FETCHED';
export const DATA_INITIALIZATION = 'DATA_INITIALIZATION';
export const SAVE_NEW_CLASS = 'SAVE_NEW_CLASS';
export const SAGAS_SAVE_NEW_CLASS = 'SAGAS_SAVE_NEW_CLASS';
export const DELETE_CLASS = 'DELETE_CLASS';
export const SAGAS_DELETE_CLASS = 'SAGAS_DELETE_CLASS';
export const UPDATE_CLASS = 'UPDATE_CLASS';
export const SAGAS_UPDATE_CLASS = 'SAGAS_UPDATE_CLASS';
export const PAYMENTS_REGISTERS = 'PAYMENTS_REGISTERS';
//export const CHANGE_SELECTED_TAB = 'CHANGE_SELECTED_TAB';
//export const STUDENT_CLASS_BY_ID = 'STUDENT_CLASS_BY_ID';
//export const STUDENT_CLASS_DATA_BY_ID_FETCHED = 'STUDENT_CLASS_DATA_BY_ID_FETCHED';

export function getAllStudents() {
  debugger;
  return {
    type: GET_ALL_STUDENTS
  };
}
export function addStudent(row) {
  //debugger;
  return {
    type: ADD_STUDENT,
    row
  };
}
export function deleteStudent(studentId) {
  //debugger;
  return {
    type: DELETE_STUDENT,
    studentId
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
export function saveNewClass(row) {
  //debugger;
  return {
    type: SAVE_NEW_CLASS,
    row
  };
}
export function deleteClass(classId) {
  //debugger;
  return {
    type: DELETE_CLASS,
    classId
  };
}
export function updateClass(rowUpdate, desc, descBefore) {
  //debugger;
  return {
    type: UPDATE_CLASS,
    rowUpdate,
    desc,
    descBefore
  };
}

export function changeSelectedTab(selectedTab, tabNamespace) {
  //debugger;
  let act = "";

  if (selectedTab == 'tab1'){
    act = "GET_ALL_STUDENTS";
  }
  else if (selectedTab == 'tab2'){
    act = "STUDENT_CLASS_DASHBOARD";
  }
  else if (selectedTab == 'tab3'){
    act = "PAYMENTS_REGISTERS";
  }
    return {
        type: act,
        selectedTab,
        namespace: tabNamespace
    };
}


/*export function studentClassById() {
  //debugger;
  return {
    type: STUDENT_CLASS_BY_ID,
  };
}*/
