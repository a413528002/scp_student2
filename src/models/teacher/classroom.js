import {
  getTeacherCreateClassHour,
  getTeacherEndClassHour,
  getTeacherKickClassHourUser,
  getTeacherQueryClassHourUsers,
  getTeacherQueryMyClassHours,
  getTeacherStartClassHour
} from "@/services/teacher/classroom";
import {message} from "antd";

const ClassroomModel = {
  namespace: 'teacherClassroom',
  state: {
    teacherClassroomTeacherInClassData: undefined,
    teacherClassroomQueryMyClassHoursData: {},
    teacherClassroomQueryClassHourUsersData: [],
  },
  effects: {
    // 创建课堂
    * createClassHour({payload, callback}, {call, put}) {
      const response = yield call(getTeacherCreateClassHour, payload)
      if (response.status === undefined) {
        message.success('新建成功')
        callback(response)
        // 将当前正在进行中的课堂信息保存起来 数据持久化
        localStorage.setItem('TEACHER_IN_CLASS', JSON.stringify(response))
        // 同时存储一份在redux中
        yield put({
          type: 'save',
          payload: {
            teacherClassroomTeacherInClassData: response
          }
        })

      }
    },
    // 查询我管理的课堂
    * queryMyClassHours({payload}, {call, put}) {
      const response = yield call(getTeacherQueryMyClassHours, payload)
      if (response.status === undefined) {
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
      if (response.status === undefined) {
        message.success('切换课堂成功')
        // 将当前正在进行中的课堂信息保存起来 数据持久化
        localStorage.setItem('TEACHER_IN_CLASS', JSON.stringify(response))
        // 同时存储一份在redux中
        yield put({
          type: 'save',
          payload: {
            teacherClassroomTeacherInClassData: response
          }
        })
        // 切换课程成功的回调 用于关闭modal
        callback()
      }
    },
    // 选中当前行直接展示开始课堂 用于更新视图
    * switchStartClassHour({payload}, {put}) {
      message.success('切换课堂成功')
      // 将当前正在进行中的课堂信息保存起来 数据持久化
      localStorage.setItem('TEACHER_IN_CLASS', JSON.stringify(payload))
      // 同时存储一份在redux中
      yield put({
        type: 'save',
        payload: {
          teacherClassroomTeacherInClassData: payload
        }
      })
    },
    // 结束课堂
    * endClassHour({payload, callback}, {call, put}) {
      const response = yield call(getTeacherEndClassHour, payload)
      if (response.status === undefined) {
        message.success('已结束当前课堂')
        // 移除当前存储的课堂信息
        localStorage.removeItem('TEACHER_IN_CLASS')
        // redux也赋值为空undefined
        yield put({
          type: 'save',
          payload: {
            teacherClassroomTeacherInClassData: undefined
          }
        })
      }
    },
    // 查询课堂成员
    * queryClassHourUsers({payload}, {call, put}) {
      const response = yield call(getTeacherQueryClassHourUsers, payload)
      if (response.status === undefined) {
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
      if (response.status === undefined) {
        // 刷新表格
        // 获取课堂id
        const {classHourId} = JSON.parse(localStorage.getItem('TEACHER_IN_CLASS')) || {}
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
    }
  },

}

export default ClassroomModel
