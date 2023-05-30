import React, { useEffect, useRef, useState } from 'react';
import { useRequest } from '@/.umi/plugin-request/request';
import { getQiXinToken } from '@/services/qixin/qixin';
import { useHistory } from 'umi';

const QiXinIframe = (props) => {
  const iframeRef = useRef(null);
  const { data, error, loading } = useRequest(getQiXinToken);
  const { returnUrl } = props;
  // useEffect(() => {
  //   const iframe = iframeRef.current;
  //   if (iframe === null) return;
  //   console.log(iframe.contentWindow.document.body.scrollHeight)
  //   const handleIframeLoad = () => {
  //     iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
  //   };
  //   iframe.addEventListener('load', handleIframeLoad);
  //   return () => {
  //     iframe.removeEventListener('load', handleIframeLoad);
  //   };
  // }, [iframeRef.current]);

  const [height, setHeight] = useState('100%');
  const h = window.document.body.clientHeight;
  return loading ? (
    <div>正在加载...</div>
  ) : (
    // <div style={{ width: '100%', height: h, overflow: 'hidden' }}>
    <iframe
      ref={iframeRef}
      onLoad={(a) => {
        console.log(a);
        // console.log(a.target.contentWindow.document)
        // setHeight(a.target.ownerDocument.scrollingElement.scrollHeight + 'px')
        // setHeight(a.target.scrollHeight + 'px')
        // console.log(height)
        // a.target.height = a.target.ownerDocument.scrollingElement.scrollHeight
      }}
      // scrolling={'no'}
      style={{ width: '100%', height: h, border: 'none', overflow: 'auto' }}
      src={`https://per-plugin.qixin.com/third-login?tenant=dbcjdx1&token=${data}&returnUrl=${returnUrl}`}
    ></iframe>
    // </div>
  );
};

export default QiXinIframe;
