import React from 'react';
import { Radio } from 'antd';

const Radios = ({ period, periodCur, periodTtl, onRadioChange }) => {
  return (
    <Radio.Group value={period} onChange={onRadioChange} buttonStyle="solid">
      {new Array(periodTtl)
        .fill()
        .map((e, i) => i + 1)
        .map((e) => (
          <Radio.Button disabled={e > periodCur} key={e} value={e}>
            第{e}期
          </Radio.Button>
        ))}
    </Radio.Group>
  );
};

export default Radios;
