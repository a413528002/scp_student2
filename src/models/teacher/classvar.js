import {message} from "antd";
import {queryClassVariables, updateClassVariable} from "@/services/teacher/cv";


const ClassVarModel = {
  namespace: 'teacherClassVar',
  state: {
    classHourId: '',
    teacherClassVarData: [],
  },
  effects: {
    * queryClassVariables({payload}, {call, put}) {
      const classHourId = payload.classHourId || '';
      const response = yield call(queryClassVariables, payload)
      if (response.status === undefined) {
        response.map(item => item._key = item.varKey)
        yield put({
          type: 'save',
          payload: {
            classHourId,
            teacherClassVarData: response,
          }
        })
      }
    },
    // 修改课堂变量
    * updateClassVariable({payload}, {call, put, select}) {
      const classHourId = yield select(state => state.teacherClassVar.classHourId)
      Object.assign(payload,{classHourId});
      const response = yield call(updateClassVariable, payload)
      if (response.status === undefined) {
        message.success('修改成功')
        response._key = response.varKey
        const teacherClassVarData = yield select(state => state.teacherClassVar.teacherClassVarData)
        const newTeacherClassVarData = teacherClassVarData.map(item => item.varKey === response.varKey ? response : item)
        yield put({
          type: 'save',
          payload: {
            teacherClassVarData: newTeacherClassVarData
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

export default ClassVarModel
