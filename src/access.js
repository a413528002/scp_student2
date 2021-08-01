/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState) {
  const { currentUser } = initialState || {};
  const [access] = currentUser&&currentUser.authorities||[]
  return {
    // canAdmin: currentUser && currentUser.access === 'admin', //原始列子
    canAdmin: access === 'STUDENT',
  };
}
