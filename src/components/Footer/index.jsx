import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  return (
    <DefaultFooter copyright={`${new Date().getFullYear()} 商业银行经营管理实训平台`} links={''} />
  );
};
