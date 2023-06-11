import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  return <DefaultFooter copyright={`${new Date().getFullYear()} 企业大数据平台`} links={''} />;
};
