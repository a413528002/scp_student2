import {
  endGrabDeposit, endGrabLoan,
  endPeriod,
  nextPeriod,
  queryClassInfo,
  startGrabDeposit, startGrabLoan,
  startPeriod
} from "@/services/teacher/oc";
import {message} from "antd";


const OperationModel = {
  namespace: 'teacherOperation',
  state: {
    teacherOperationClassInfoData: {},
  },
  effects: {
    * queryClassInfo({payload}, {call, put}) {
      const response = yield call(queryClassInfo, payload)
      if (!response.errCode) {
        yield put({
          type: 'save',
          payload: {
            teacherOperationClassInfoData: response,
          }
        })
      }
    },
    // 开始经营
    * startPeriod({payload}, {call, put, select}) {
      const classHourId = yield select(state => state.teacherOperation.teacherOperationClassInfoData.classHourId)
      const response = yield call(startPeriod, {classHourId})
      if (!response.errCode) {
        message.success('开始经营成功')
        yield put({
          type: 'save',
          payload: {
            teacherOperationClassInfoData: response
          }
        })
      }
    },
    // 结束经营
    * endPeriod({payload}, {call, put, select}) {
      const classHourId = yield select(state => state.teacherOperation.teacherOperationClassInfoData.classHourId)
      const response = yield call(endPeriod, {classHourId})
      if (!response.errCode) {
        message.success('结束经营成功')
        yield put({
          type: 'save',
          payload: {
            teacherOperationClassInfoData: response
          }
        })
      }
    },
    // 转入下期
    * nextPeriod({payload}, {call, put, select}) {
      const classHourId = yield select(state => state.teacherOperation.teacherOperationClassInfoData.classHourId)
      const response = yield call(nextPeriod, {classHourId})
      if (!response.errCode) {
        message.success('转入下期成功')
        yield put({
          type: 'save',
          payload: {
            teacherOperationClassInfoData: response
          }
        })
      }
    },
    // 开始存款抢单
    * startGrabDeposit({payload}, {call, put, select}) {
      const classHourId = yield select(state => state.teacherOperation.teacherOperationClassInfoData.classHourId)
      const response = yield call(startGrabDeposit, {classHourId})
      if (!response.errCode) {
        message.success('开始存款抢单成功')
        yield put({
          type: 'save',
          payload: {
            teacherOperationClassInfoData: response
          }
        })
      }
    },
    // 结束存款抢单
    * endGrabDeposit({payload}, {call, put, select}) {
      const classHourId = yield select(state => state.teacherOperation.teacherOperationClassInfoData.classHourId)
      const response = yield call(endGrabDeposit, {classHourId})
      if (!response.errCode) {
        message.success('结束存款抢单成功')
        yield put({
          type: 'save',
          payload: {
            teacherOperationClassInfoData: response
          }
        })
      }
    },
    // 开始贷款抢单
    * startGrabLoan({payload}, {call, put, select}) {
      const classHourId = yield select(state => state.teacherOperation.teacherOperationClassInfoData.classHourId)
      const response = yield call(startGrabLoan, {classHourId})
      if (!response.errCode) {
        message.success('开始贷款抢单成功')
        yield put({
          type: 'save',
          payload: {
            teacherOperationClassInfoData: response
          }
        })
      }
    },
    // 结束贷款抢单
    * endGrabLoan({payload}, {call, put, select}) {
      const classHourId = yield select(state => state.teacherOperation.teacherOperationClassInfoData.classHourId)
      const response = yield call(endGrabLoan, {classHourId})
      if (!response.errCode) {
        message.success('结束贷款抢单成功')
        yield put({
          type: 'save',
          payload: {
            teacherOperationClassInfoData: response
          }
        })
      }
    },
  },

  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    }
  },

}

export default OperationModel
