import React from 'react';
import { useModel } from 'umi';

const Logo = () => {
  const {
    initialState
  } = useModel('@@initialState') || {};
  return (
    <div
      style={{ width: 32, height: 32 }}
      dangerouslySetInnerHTML={{
        __html: initialState?.currentUser?.tenantLogo
          .replace(/width=".*?"/, 'width="32"')
          .replace(/height=".*?"/, 'height="32"'),
      }}
    />
  );
};

export default Logo;
