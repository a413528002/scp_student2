import {
  getStudentAcceptBankMember,
  getStudentCreateBank,
  getStudentExitBank,
  getStudentExitClassHour,
  getStudentJoinBank,
  getStudentJoinClassHour,
  getStudentKickBankMember,
  getStudentQueryBankByCode,
  getStudentQueryClassHourByCode,
  getStudentQueryClassHourUserDetails,
  getStudentQueryJoinedClassHours,
} from '@/services/student/classroom';
import {message} from 'antd';

const ClassroomModel = {
  namespace: 'studentClassroom',
  state: {
    studentClassroomQueryJoinedClassHoursData: [], // 查询当前学生已加入的课堂
    classOpt: false, // 课堂相关操作
    bankOpt: false, // 银行相关操作
    classData: {}, // 课堂信息
    classUserData: {}, // 学生在课堂的信息
    bankData: {}, // 银行信息
    bankMembersData: [] // 成员信息
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
      localStorage.setItem('STUDENT_IN_CLASS', JSON.stringify(payload))
      yield put({
        type: 'save',
        payload: {
          classData: payload,
          classOpt: true,
          bankOpt: true
        }
      })
      yield put({
        type: 'queryClassHourUserDetails',
        payload: {classHourId}
      })
    },

    // 根据课堂编码查询课堂
    * queryClassHourByCode({payload}, {call, put}) {
      const response = yield call(getStudentQueryClassHourByCode, payload)
      if (!response.errCode) {
        if (response) {
          // localStorage.setItem('STUDENT_IN_CLASS', JSON.stringify(response))
          // localStorage.setItem('STUDENT_IN_CLASS_STATE', '未加入')
          yield put({
            type: 'save',
            payload: {
              classOpt: false,
              bankOpt: false,
              classData: response,
              bankData: {},
              bankMembersData: [],
            }
          })
        } else {
          message.error('未找到该课堂')
        }
      }
    },

    // 加入课堂
    * joinClassHour({payload}, {call, put, select}) {
      const classData = yield select(state => state.studentClassroom.classData)
      const {classHourId, classHourCode} = classData
      const response = yield call(getStudentJoinClassHour, {classHourId})
      if (!response.errCode) {
        // localStorage.setItem('STUDENT_IN_CLASS_STATE', '已加入')
        yield put({
          type: 'save',
          payload: {
            // studentClassroomStudentInClassStateData: '已加入'
          }
        })
        message.success('已加入')
        const classHourVo = yield call(getStudentQueryClassHourByCode, {code: classHourCode})
        yield put({
          type: 'switchClassroom',
          payload: classHourVo
        })
      }
    },

    // 退出课堂
    * exitClassHour({payload}, {call, put, select}) {
      const classOpt = yield select(state => state.studentClassroom.classOpt)
      if (!classOpt) {
        return;
      }
      const classHourId = yield select(state => state.studentClassroom.classData.classHourId)
      const response = yield call(getStudentExitClassHour, {classHourId})
      if (!response.errCode) {
        localStorage.removeItem("STUDENT_IN_CLASS")
        yield put({
          type: 'save',
          payload: {
            classData: {},
            bankData: {},
            bankMembersData: [],
          }
        })
      }
    },

    // 查询已加入课堂
    * queryJoinedClassHours({payload}, {call, put}) {
      const response = yield call(getStudentQueryJoinedClassHours, payload)
      if (!response.errCode) {
        response.map(item => item._key = item.classHourId)
        yield put({
          type: 'save',
          payload: {
            studentClassroomQueryJoinedClassHoursData: response,
          }
        })
      }
    },
    // 创建银行
    * createBank({payload, callback}, {call, put, select}) {
      const classHourId = yield select(state => state.studentClassroom.classData.classHourId)
      const response = yield call(getStudentCreateBank, {...payload, classHourId})
      if (!response.errCode) {
        message.success('新建成功')
        callback()
        // 将当前正在进行中的课堂信息保存起来 数据持久化
        // localStorage.setItem('BANK_IN_INFO', JSON.stringify(response))
        // 同时存储一份在redux中
        yield put({
          type: 'queryClassHourUserDetails',
          payload: {classHourId}
        })
      }
    },
    // 退出银行
    * exitBank({payload}, {call, put, select}) {
      const bankOpt = yield select(state => state.studentClassroom.bankOpt)
      if (!bankOpt) {
        return;
      }
      const classHourId = yield select(state => state.studentClassroom.classData.classHourId)
      const response = yield call(getStudentExitBank, {classHourId})
      if (!response.errCode) {
        message.success('退出成功')
        // 退出银行后，将保存的银行清除
        // localStorage.removeItem('BANK_IN_INFO')
        // 退出银行后redux中的银行信息赋值为 undefined
        yield put({
          type: 'save',
          payload: {
            bankData: {},
            bankMembersData: [],
          }
        })

      }
    },

    // 根据银行编码查询银行
    * queryBankByCode({payload}, {call, put, select}) {
      const classOpt = yield select(state => state.studentClassroom.classOpt)
      if (!classOpt) {
        return;
      }
      const classHourId = yield select(state => state.studentClassroom.classData.classHourId)
      const response = yield call(getStudentQueryBankByCode, {...payload, classHourId})
      if (!response.errCode) {
        if (response) {
          // 如果有返回值 将银行信息存储 localStorage ，覆盖之前的银行信息
          // localStorage.setItem('BANK_IN_INFO', JSON.stringify(response))
          // 如果有返回值 将银行信息存储 redux中 ，覆盖之前的银行信息
          yield put({
            type: 'save',
            payload: {
              bankData: {
                bankId: response.bankId,
                bankCode: response.bankCode,
                bankName: response.bankName,
                presNickname: response.presNickname,
              },
              bankOpt: false,
              bankMembersData: [],
            }
          })
        } else {
          message.error('没有该银行')
        }
      }
    },
    // 加入银行
    * joinBank({payload}, {call, put, select}) {
      const classHourId = yield select(state => state.studentClassroom.classData.classHourId)
      const bankId = yield select(state => state.studentClassroom.bankData.bankId)
      const response = yield call(getStudentJoinBank, {bankId, classHourId})
      if (!response.errCode) {
        // 如果有返回值 将银行信息存储 localStorage ，覆盖之前的银行信息
        // localStorage.setItem('BANK_IN_INFO', JSON.stringify(response))
        // 如果有返回值 将银行信息存储 redux中 ，覆盖之前的银行信息
        // yield put({
        //   type: 'save',
        //   payload: {
        //     studentClassroomBankInInfoData: response,
        //   }
        // })
        message.success('加入成功，等待行长接受')
      }
    },
    // 查询用户在课堂的详细信息
    * queryClassHourUserDetails({payload}, {call, put}) {
      const response = yield call(getStudentQueryClassHourUserDetails, payload)
      if (!response.errCode) {
        let bankMembersData = []
        // 如果有银行成员，则处理一下数据
        if (response.bankMembers) {
          // 获取当前用户ID
          const {id: currentUserId} = JSON.parse(sessionStorage.getItem('AUTHORITIES_INFO'));
          bankMembersData = response.bankMembers
            .map(item => {
              return {
                ...item,
                _key: item.stuUserId,
                _kickOpt: response.isPresident && currentUserId !== item.stuUserId, // 可踢出操作判断逻辑  是行长并且非自己
                _acceptOpt: item.bankStatus === 'PENDING'           // 同意操作判断逻辑 银行状态为等待接受
              };
            })
        }
        yield put({
          type: 'save',
          payload: {
            bankData: {
              bankId: response.bankId,
              bankCode: response.bankCode,
              presNickname: response.bankPresNickname,
              bankName: response.bankName,
            },
            bankMembersData
          }
        })
      }
    },
    // 踢出银行成员
    * kickBankMember({payload}, {call, put, select}) {
      const classHourId = yield select(state => state.studentClassroom.classData.classHourId)
      const response = yield call(getStudentKickBankMember, {...payload, classHourId})
      if (!response.errCode) {
        message.success('踢出成功')
        // 刷新表格 查询用户在课堂的详细信息
        yield put({
          type: 'queryClassHourUserDetails',
          payload: {classHourId}
        })
      }
    },
    // 同意加入银行
    * acceptBankMember({payload}, {call, put, select}) {
      const classHourId = yield select(state => state.studentClassroom.classData.classHourId)
      const response = yield call(getStudentAcceptBankMember, {...payload, classHourId})
      if (!response.errCode) {
        message.success('已同意')
        // 刷新表格 查询用户在课堂的详细信息
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
