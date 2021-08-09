import React, {useEffect} from 'react';
import {Descriptions, Radio, Button, Card} from 'antd';
import {connect} from 'umi'
import styles from '@/pages/student/plan/tactic/index.less'

const TacticList = (props) => {
  const {dispatch, classData} = props;
  const {classHourId} = classData
  console.log(classData)
  useEffect(() => {
    dispatch({
      type: 'studentPlan/queryBankPlan',
      payload: {
        classHourId
      }
    })
  }, [])
  return (
    <Card
      bordered={false}
    >
      <div className={styles.list}>
        <Radio.Group
        >
          <Radio value="default">第1期</Radio>
          <Radio value="middle">第2期</Radio>
          <Radio value="small">第3期</Radio>
        </Radio.Group>
        <Button type="primary">保存</Button>
      </div>

      <Descriptions
        bordered
        column={1}
        // title="Custom Size"
        // size={this.state.size}

      >
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
        <Descriptions.Item label="time">18:00:00</Descriptions.Item>
        <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
        <Descriptions.Item label="Official">$60.00</Descriptions.Item>

      </Descriptions>
    </Card>
  );
};

export default connect(({studentClassroom,}) => ({
  classData: studentClassroom.classData,
}))(TacticList);
