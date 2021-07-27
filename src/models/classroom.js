import {
  getStudentExitClassHour,
  getStudentJoinClassHour,
  getStudentQueryClassHourByCode,
  getStudentQueryJoinedClassHours
} from "@/services/classroom";
import {message} from "antd";

const ClassroomModel = {
  namespace: 'classroom',
  state: {
    classroomStudentInClassData: undefined,
    classroomStudentInClassStateData: undefined,
    classroomQueryJoinedClassHoursData: []
  },
  effects: {
    // 根据课堂编码查询课堂
    * queryClassHourByCode({payload}, {call, put}) {
      const response = yield call(getStudentQueryClassHourByCode, payload)
      if (response.status === undefined) {
        localStorage.setItem('STUDENT_IN_CLASS', JSON.stringify(response))
        localStorage.setItem('STUDENT_IN_CLASS_STATE', '未加入')
        yield put({
          type: 'save',
          payload: {
            classroomStudentInClassData: response,
            classroomStudentInClassStateData: '未加入'
          }
        })
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
            classroomStudentInClassStateData: '已加入'
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
            classroomStudentInClassStateData: '已退出'
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
            classroomQueryJoinedClassHoursData: response,
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

export default ClassroomModel
