import {
  getStudentAcceptBankMember,
  getStudentCreateBank, getStudentExitBank,
  getStudentExitClassHour, getStudentJoinBank,
  getStudentJoinClassHour, getStudentKickBankMember, getStudentQueryBankByCode,
  getStudentQueryClassHourByCode, getStudentQueryClassHourUserDetails,
  getStudentQueryJoinedClassHours
} from "@/services/student/classroom";
import {message} from "antd";

const ClassroomModel = {
  namespace: 'studentClassroom',
  state: {
    studentClassroomStudentInClassData: undefined,
    studentClassroomStudentInClassStateData: undefined,
    studentClassroomQueryJoinedClassHoursData: [],
    studentClassroomBankInInfoData: undefined,
    studentClassroomQueryClassHourUserDetailsData: {}
  },
  effects: {
    // 根据课堂编码查询课堂
    * queryClassHourByCode({payload}, {call, put}) {
      const response = yield call(getStudentQueryClassHourByCode, payload)
      if (response.status === undefined) {
        if (response) {
          localStorage.setItem('STUDENT_IN_CLASS', JSON.stringify(response))
          localStorage.setItem('STUDENT_IN_CLASS_STATE', '未加入')
          yield put({
            type: 'save',
            payload: {
              studentClassroomStudentInClassData: response,
              studentClassroomStudentInClassStateData: '未加入'
            }
          })
        } else {
          message.error('没有该课堂')
        }
      }
    },

    // 加入课堂
    * joinClassHour({payload}, {call, put}) {
      const response = yield call(getStudentJoinClassHour, payload)
      if (response.status === undefined) {
        localStorage.setItem('STUDENT_IN_CLASS_STATE', '已加入')
        yield put({
          type: 'save',
          payload: {
            studentClassroomStudentInClassStateData: '已加入'
          }
        })
        message.success('已加入')
      }
    },

    // 退出课堂
    * exitClassHour({payload}, {call, put}) {
      const response = yield call(getStudentExitClassHour, payload)
      if (response.status === undefined) {
        localStorage.setItem('STUDENT_IN_CLASS_STATE', '已退出')
        yield put({
          type: 'save',
          payload: {
            studentClassroomStudentInClassStateData: '已退出'
          }
        })
      }
    },

    // 查询已加入课堂
    * queryJoinedClassHours({payload}, {call, put}) {
      const response = yield call(getStudentQueryJoinedClassHours, payload)
      if (response.status === undefined) {
        yield put({
          type: 'save',
          payload: {
            studentClassroomQueryJoinedClassHoursData: response,
          }
        })
      }
    },
    // 创建银行
    * createBank({payload, callback}, {call, put}) {
      const response = yield call(getStudentCreateBank, payload)
      if (response.status === undefined) {
        message.success('新建成功')
        callback()
        // 将当前正在进行中的课堂信息保存起来 数据持久化
        localStorage.setItem('BANK_IN_INFO', JSON.stringify(response))
        // 同时存储一份在redux中
        yield put({
          type: 'save',
          payload: {
            studentClassroomBankInInfoData: response
          }
        })

      }
    },
    // 退出银行
    * exitBank({payload, callback}, {call, put}) {
      const response = yield call(getStudentExitBank, payload)
      if (response.status === undefined) {
        message.success('退出成功')
        // 退出银行后，将保存的银行清除
        localStorage.removeItem('BANK_IN_INFO')
        // 退出银行后redux中的银行信息赋值为 undefined
        yield put({
          type: 'save',
          payload: {
            studentClassroomBankInInfoData: undefined
          }
        })

      }
    },

    // 根据银行编码查询银行
    * queryBankByCode({payload}, {call, put}) {
      const response = yield call(getStudentQueryBankByCode, payload)
      if (response.status === undefined) {
        if (response) {
          // 如果有返回值 将银行信息存储 localStorage ，覆盖之前的银行信息
          localStorage.setItem('BANK_IN_INFO', JSON.stringify(response))
          // 如果有返回值 将银行信息存储 redux中 ，覆盖之前的银行信息
          yield put({
            type: 'save',
            payload: {
              studentClassroomBankInInfoData: response,
            }
          })
        } else {
          message.error('没有该银行')
        }
      }
    },
    // 加入银行
    * joinBank({payload}, {call, put}) {
      const response = yield call(getStudentJoinBank, payload)
      if (response.status === undefined) {
        // 如果有返回值 将银行信息存储 localStorage ，覆盖之前的银行信息
        localStorage.setItem('BANK_IN_INFO', JSON.stringify(response))
        // 如果有返回值 将银行信息存储 redux中 ，覆盖之前的银行信息
        yield put({
          type: 'save',
          payload: {
            studentClassroomBankInInfoData: response,
          }
        })
        message.success('已加入')
      }
    },
    // 查询用户在课堂的详细信息
    * queryClassHourUserDetails({payload}, {call, put}) {
      const response = yield call(getStudentQueryClassHourUserDetails, payload)
      console.log(response)
      if (response.status === undefined) {
        yield put({
          type: 'save',
          payload: {
            studentClassroomQueryClassHourUserDetailsData: response,
          }
        })
      }
    },
    // 踢出银行成员
    * kickBankMember({payload}, {call, put}) {
      const response = yield call(getStudentKickBankMember, payload)
      if (response.status === undefined) {
        message.success('踢出成功')
        // 刷新表格 查询用户在课堂的详细信息
        // 获取课堂id
        const {classHourId} = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS_STATE')) || {}
        yield put({
          type: 'queryClassHourUserDetails',
          payload: {classHourId}
        })
      }
    },
    // 同意加入银行
    * acceptBankMember({payload}, {call, put}) {
      const response = yield call(getStudentAcceptBankMember, payload)
      if (response.status === undefined) {
        message.success('已同意')
        // 刷新表格 查询用户在课堂的详细信息
        // 获取课堂id
        const {classHourId} = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS_STATE')) || {}
        yield put({
          type: 'queryClassHourUserDetails',
          payload: {classHourId}
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

export default ClassroomModel
