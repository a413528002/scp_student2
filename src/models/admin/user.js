import {
  changePassword,
  queryRoles,
  queryUsers,
  resetPassword,
  template,
  update,
  userImport,
} from '@/services/admin/user';
import { message } from 'antd';

const UserModel = {
  namespace: 'adminUser',
  state: {
    queryUsersData: {},
    queryRolesData: [],
  },
  effects: {
    // 分页查询
    *queryUsers({ payload }, { call, put }) {
      const response = yield call(queryUsers, payload);
      if (!response.errCode) {
        const {content} = response;
        const queryUsersData = {
          ...response,
          content: content?.map((item, index) => {
            return {
              ...item,
              _key: index,
            };
          }),
        };
        yield put({
          type: 'save',
          payload: {
            queryUsersData,
          },
        });
      }
    },

    // 分页查询角色
    *queryRoles({ payload }, { call, put }) {
      const response = yield call(queryRoles, payload);
      if (!response.errCode) {
        const queryRolesData = response.map((item, index) => {
          return {
            ...item,
            _key: index,
          };
        })

        yield put({
          type: 'save',
          payload: {
            queryRolesData,
          },
        });
      }
    },

    // 修改用户
    *update({ payload, callback }, { call }) {
      const response = yield call(update, payload);
      if (!response.errCode) {
        message.success('修改成功')
      }
      callback()
    },
    // 修改用户密码
    *changePassword({ payload }, { call }) {
      const response = yield call(changePassword, payload);
      if (!response.errCode) {
        message.success('修改成功')
      }
    },
    // 重置用户密码
    *resetPassword({ payload }, { call }) {
      const response = yield call(resetPassword, payload);
      if (!response.errCode) {
        message.success('重置成功')
      }
    },
    // 下载模板
    *template({ payload, callback }, { call }) {
      try {
        const response = yield call(template, payload);
        if (!response.errCode && response.data instanceof Blob) {
          // 获取文件名
          const [_, _fileName] = new Headers(response.response.headers)
            .get('content-disposition')
            .split('=');
          const fileName = decodeURIComponent(_fileName)
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(response.data, fileName);
          } else {
            const link = document.createElement('a');
            const evt = document.createEvent('MouseEvents');
            link.style.display = 'none';
            link.href = window.URL.createObjectURL(response.data);
            link.download = fileName;
            document.body.appendChild(link); // 此写法可兼容火狐浏览器
            evt.initEvent('click', false, false);
            link.dispatchEvent(evt);
            document.body.removeChild(link);
          }
          message.success('正在下载');
        }
      } catch (error) {
        console.log(error);
        message.error('下载失败');
      }
    },
    // 导入用户
    *userImport({ payload, callback }, { call, put }) {
      const response = yield call(userImport, payload);
      if (!response.errCode) {
        callback();
        message.success('导入用户成功');
        yield put({
          type: 'queryUsers',
        });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default UserModel;
