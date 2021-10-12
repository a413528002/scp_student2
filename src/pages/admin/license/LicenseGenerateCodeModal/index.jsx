import React, {useEffect} from 'react';
import {connect} from 'umi';
import {Form, Input, Modal, Button, Typography, message, Spin} from 'antd';

const {TextArea} = Input;
const {Paragraph} = Typography;
const LicenseGenerateCodeModal = (props) => {
  const {generateModalVisible, handleCancelModal, generateRequestCodeData: {requestCode}} = props;
  const {loading, dispatch} = props;
  const [form] = Form.useForm();
  // 生成申请码
  useEffect(() => {
    dispatch({
      type: 'adminLicense/generateRequestCode'
    })
  }, [])

  useEffect(() => {
    form.setFieldsValue({
      requestCode
    })
  }, [requestCode])

  // 复制激活码成功的回调
  const onCopy = () => {
    handleCancelModal()
    message.success('复制成功')
  };
  return (
    <Modal
      title='申请码'
      visible={generateModalVisible}
      onCancel={handleCancelModal}
      footer={[
        <Button key="back" onClick={handleCancelModal}>
          取消
        </Button>,
        <Paragraph
          key="submit"
          style={{display: 'inline-block', marginLeft: 12, marginBottom: 0}}
          copyable={{
            text: requestCode,
            icon: [<Button key="copy" type="primary">
              复制
            </Button>, <Button key="copy" type="primary">
              复制成功
            </Button>],
            tooltips: false,
            onCopy
          }}
        />
      ]}
    >
      <div className="example">
        <Spin spinning={loading}>
          <Form form={form} name="LicenseActivateCodeModal">
            <Form.Item
              name="requestCode"
            >
              <TextArea autoSize disabled={true}/>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </Modal>
  );
};

export default connect(({adminLicense, loading}) => ({
  generateRequestCodeData: adminLicense.generateRequestCodeData,
  loading: loading.effects['adminLicense/generateRequestCode'],
}))(LicenseGenerateCodeModal);
