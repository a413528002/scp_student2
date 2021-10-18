import React from 'react';

const Logo = () => {
  return (
     /* <div
      style={{ width: 32, height: 32 }}
      dangerouslySetInnerHTML={{
        __html: initialState?.currentUser?.tenantLogo
      }}
    /> */
    <img src={`${NODE_API}/queryTenantLogo`} alt="logo"/>
  );
};

export default Logo;
