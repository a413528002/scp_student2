import {getStudentQueryBankPlan} from "@/services/student/plan";

const PlanModel = {
  namespace: 'studentPlan',
  state: {},
  effects: {
    * queryBankPlan({payload}, {call, put, select}) {
      const classData = yield select(state => state.studentClassroom.classData)
      console.log(classData)
      const {classHourId, classHourCode} = classData
      console.log(classHourId)
      const response = yield call(getStudentQueryBankPlan, payload)
      console.log(response)
      if (response.status === undefined) {
        /*response.map(item => item._key = item.classHourId)
        yield put({
          type: 'save',
          payload: {
            studentClassroomQueryJoinedClassHoursData: response,
          }
        })*/
      }
    },
  },
  reduce: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    }
  }
}
export default PlanModel
