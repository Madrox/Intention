import { Button, Form, Input, Modal } from "antd";
import React from "react";

type Props = {
  show: boolean;
  onClose: () => void;
};

export const CreateJournal: React.FC<Props> = (props) => {
  const { show, onClose } = props;
  const [form] = Form.useForm();

  return (
    <Modal
      visible={show}
      onCancel={onClose}
      title="Create Journal"
      footer={null}
    >
      <Form
        form={form}
        onFinish={(values) => {
          window.journals.create(values["name"], values["color"]);

          onClose();
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ message: "Name cannot be blank", required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Color" name="color">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
