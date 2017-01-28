import { takeEvery } from 'redux-saga/effects';
import { call, put, select } from 'redux-saga/effects';
//import configureStore from './store/configureStore';
import * as api from './api';
import * as actions from './actions';

function* getDataFromServer () {

	console.log('getDataFromServer');
	let state = yield select();
	const initDataStudentClasses = yield call(api.getStudentClasses, state);
	//state = yield select();
	const initDataStudents = yield call(api.getStudents, state);
	//state = yield select();
	const initDataPayeds = yield call(api.getPayeds, state);
	//state = yield select();
	const initDataRegisters = yield call(api.getRegisters, state);
	//const initStore = configureStore(initialState);
	//debugger;
	yield put({
		type: actions.DATA_INITIALIZATION,
		initDataStudentClasses,
		initDataStudents,
		initDataPayeds,
		initDataRegisters

	})
}

function* getStudentClasses () {

	console.log('getStudentClasses');
	const state = yield select();
	const dataFetchedStudentClasses = yield call(api.getStudentClasses, state);

	//debugger;
	yield put({
		type: actions.STUDENT_CLASS_DATA_FETCHED,
		dataFetchedStudentClasses
	})
}

function* saveNewStudentClass () {

	console.log('saveNewStudentClass');
	const state = yield select();
	const saveNewClass = yield call(api.saveNewClass, state.row);

	//debugger;
	yield put({
		type: actions.SAGAS_SAVE_NEW_CLASS,
		saveNewClass
	})
}

function* deleteStudentClass () {

	console.log('deleteStudentClass');
	const state = yield select();
	const deleteStudentClass = yield call(api.deleteStudentClass, state.classId);

	//debugger;
	yield put({
		type: actions.SAGAS_DELETE_CLASS,
		deleteStudentClass
	})
}

function* updateStudentClass () {
	//debugger;
	console.log('updateStudentClass');
	const state = yield select();
	const desc = yield call(api.updateStudentClass, state.desc, state.descBefore, state.rowUpdate);
	//debugger;
	
	yield put({
		type: actions.SAGAS_UPDATE_CLASS,
		desc
	})
}

function* saveNewStudent () {

	console.log('saveNewStudent');
	const state = yield select();
	const saveNewStudent = yield call(api.saveNewStudent, state.row);

	//debugger;
	yield put({
		type: actions.SAGAS_SAVE_NEW_STUDENT,
		saveNewStudent
	})
}

function* deleteStudent () {

	console.log('deleteStudent');
	const state = yield select();
	const studentId = yield call(api.deleteStudent, state.studentId);

	//debugger;
	yield put({
		type: actions.SAGAS_DELETE_STUDENT,
		studentId
	})
}

function* updateStudent () {

	console.log('updateStudent');
	const state = yield select();
	const row = yield call(api.updateStudent, /*state.desc, state.descBefore,*/ state.rowUpdate);
	//debugger;
	
	yield put({
		type: actions.SAGAS_UPDATE_STUDENT,
		row
	})
}

function* addPaymentRegisters () {

	console.log('addPaymentRegisters');
	const state = yield select();
	const row = yield call(api.addPaymentRegisters, /*state.desc, state.descBefore,*/ state.row);
	//debugger;
	
	yield put({
		type: actions.SAGAS_CREATE_PAYMENTS_REGISTERS,
		row
	})
}

function* updatePaymentRegisters () {

	console.log('updatePaymentRegisters');
	const state = yield select();
	const rowUpdate = yield call(api.updatePaymentRegisters, /*state.desc, state.descBefore,*/ state.rowUpdate);
	//debugger;
	
	yield put({
		type: actions.SAGAS_UPDATE_PAYMENTS_REGISTERS,
		rowUpdate
	})
}

function* deletePaymentRegisters () {

	console.log('deletePaymentRegisters');
	const state = yield select();
	const paymentId = yield call(api.deletePaymentRegisters, /*state.desc, state.descBefore,*/ state.paymentId);
	//debugger;
	
	yield put({
		type: actions.SAGAS_DELETE_PAYMENTS_REGISTERS,
		paymentId
	})
}

function* rootSaga () {
	console.log('saga');

	yield getDataFromServer();
	//debugger;
	yield takeEvery(actions.STUDENT_CLASS_DASHBOARD, getStudentClasses);
	yield takeEvery(actions.SAVE_NEW_CLASS, saveNewStudentClass);
	yield takeEvery(actions.DELETE_CLASS, deleteStudentClass);
	yield takeEvery(actions.UPDATE_CLASS, updateStudentClass);
	yield takeEvery(actions.ADD_STUDENT, saveNewStudent);
	yield takeEvery(actions.DELETE_STUDENT, deleteStudent);
	yield takeEvery(actions.UPDATE_STUDENT, updateStudent);
	yield takeEvery(actions.CREATE_PAYMENTS_REGISTERS, addPaymentRegisters);
	yield takeEvery(actions.UPDATE_PAYMENTS_REGISTERS, updatePaymentRegisters);
	yield takeEvery(actions.DELETE_PAYMENTS_REGISTERS, deletePaymentRegisters);
}

export default rootSaga;