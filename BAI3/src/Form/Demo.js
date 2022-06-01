import { Form, Input, Button, Modal } from 'antd';
import {useState} from 'react';
// const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const Demo = () => {
  const onFinish = (values) => {
    showModal();
  };

  // const prefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select style={{ width: 70 }}>
  //       <Option value="84">+84</Option>
  //     </Select>
  //   </Form.Item>
  // );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };
  const [form] = Form.useForm();
  return (

    <>
    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Success</p>
    </Modal>
    <Form form={form} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true},({ getFieldValue }) => ({ 
          validator(_, value) {
            if ((value.length >= 6 && value.length <= 20) || value === "John") {
              if (value === "John") {
                form.setFieldsValue({ email: 'John@example.com', phone: '08923123131', address:'NguyenThienThuat', password: '123123!AA'});
              }
              return Promise.resolve();
            }
            return Promise.reject(new Error('Name length must be between 6 and 20 characters'));
          },}), 
        ]}
      >
        <Input placeholder="Your name..."/>
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        dependencies={['name']}
        rules={[
          {
            type: 'email',
            required: true
          }
        ]}
      >
        <Input placeholder="Your email..."/>
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"

        rules={[{ required: true, message: 'Please input your phone number!' },{
          
          validator(_, value) {
            if ((value.length >= 10 && value.length <= 12)||(value.startsWith('+84') && value.length >=12 && value.length <= 14)) {
              
              return Promise.resolve();
            }
            return Promise.reject(new Error('Phone number length must be between 10 and 12 characters'));
          }}, ]}
      >
        <Input placeholder="Your phone number..." style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: true, message: 'Please input your address!' },{  
          validator(_, value) {
            if (!(/^[a-zA-Z,/]+$/.test(value)) && value) {
              return Promise.reject(new Error('Address must contain letters only'));
            }
            return Promise.resolve();
          },}, ]}
      >
        <Input placeholder="Your address..." style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
          },{  
            validator(_, value) {
              if (value && (value.length < 6 || value.length > 20) ) {
                return Promise.reject(new Error('Password length must be between 10 and 20 characters'));
              }
              if (value && (!format.test(value) || !/[A-Z]/.test(value))) {
                return Promise.reject(new Error('Address must contain at least 1 capital letter and 1 special character'));
              }
              return Promise.resolve();
            },},
        ]}
      >
        <Input.Password placeholder="Your password..."/>
      </Form.Item>
      
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
  );
};

export default Demo;