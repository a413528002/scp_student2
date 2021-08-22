import {
  getTeacherCreateClassHour,
  getTeacherEndClassHour,
  getTeacherKickClassHourUser,
  getTeacherQueryClassHourUsers,
  getTeacherQueryMyClassHours,
  getTeacherStartClassHour,
} from '@/services/teacher/classroom';
import { message } from 'antd';

const ClassroomModel = {
  namespace: 'teacherClassroom',
  state: {
    teacherClassroomTeacherInClassData: {},
    teacherClassroomQueryMyClassHoursData: {},
    teacherClassroomQueryClassHourUsersData: [],
  },
  effects: {
    // 选择课堂
    * switchClassroom({payload}, {call, put}) {
      if (!payload) {
        return
      }
      const {classHourId} = payload
      if (!classHourId) {
        return
      }
      localStorage.setItem('TEACHER_IN_CLASS', JSON.stringify(payload))
      yield put({
        type: 'save',
        payload: {
          teacherClassroomTeacherInClassData: payload,
        }
      })
      yield put({
        type: 'queryClassHourUsers',
        payload: {classHourId}
      })
    },
    // 创建课堂
    * createClassHour({payload, callback}, {call, put}) {
      const response = yield call(getTeacherCreateClassHour, payload)
      if (!response.errCode) {
        message.success('新建成功')
        callback()
        // 同时存储一份在redux中
        yield put({
          type: 'save',
          payload: {
            teacherClassroomTeacherInClassData: response
          }
        })
        yield put({
          type: 'switchClassroom',
          payload: response
        })
      }
    },
    // 查询我管理的课堂
    * queryMyClassHours({payload}, {call, put}) {
      const response = yield call(getTeacherQueryMyClassHours, payload)
      if (!response.errCode) {
        response.content.map(item => item._key = item.classHourId)
        yield put({
          type: 'save',
          payload: {
            teacherClassroomQueryMyClassHoursData: response,
          }
        })
      }
    },
    // 开始课堂
    * startClassHour({payload, callback}, {call, put}) {
      const response = yield call(getTeacherStartClassHour, payload)
      if (!response.errCode) {
        message.success('切换课堂成功')
        // 同时存储一份在redux中
        yield put({
          type: 'save',
          payload: {
            teacherClassroomTeacherInClassData: response
          }
        })
        // 切换课程成功的回调 用于关闭modal
        callback(response)
      }
    },

    // 结束课堂
    * endClassHour({payload, callback}, {call, put}) {
      const response = yield call(getTeacherEndClassHour, payload)
      if (!response.errCode) {
        message.success('已结束当前课堂')
        // redux也赋值为空undefined
        yield put({
          type: 'save',
          payload: {
            teacherClassroomTeacherInClassData: {}
          }
        })
      }
    },
    // 查询课堂成员
    * queryClassHourUsers({payload}, {call, put}) {
      const response = yield call(getTeacherQueryClassHourUsers, payload)
      if (!response.errCode) {
        response.map(item => item._key = item.classHourUserId)
        yield put({
          type: 'save',
          payload: {
            teacherClassroomQueryClassHourUsersData: response
          }
        })
      }
    },
    // 踢出课堂成员
    * kickClassHourUser({payload}, {call, put}) {
      const response = yield call(getTeacherKickClassHourUser, payload)
      if (!response.errCode) {
        // 刷新表格
        // 获取课堂id
        const {classHourId} = payload
        yield put({
          type: 'queryClassHourUsers',
          payload: {classHourId}
        })
        message.success('已踢出')
      }
    },
  },
  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    },
    reset() {
      return {
        teacherClassroomTeacherInClassData: {},
        teacherClassroomQueryMyClassHoursData: {},
        teacherClassroomQueryClassHourUsersData: [],
      }
    }
  },
}

export default ClassroomModel
