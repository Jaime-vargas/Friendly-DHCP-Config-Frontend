import { Modal, Form, Input, Select } from "antd";
const { Option } = Select;
import { useEffect } from "react";

function DeviceFormModal({ open, onClose, onSubmit, networks, initialValues }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.resetFields();
      if (initialValues) {
        form.setFieldsValue({
          ...initialValues,
          network_id: String(initialValues.network_id),
        });
      }
    }
  }, [open, initialValues, form]);

  return (
    <Modal
      open={open}
      title={initialValues ? "Editar dispositivo" : "Nuevo dispositivo"}
      okText="Guardar"
      onCancel={onClose}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item name="name" label="Nombre" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="category"
          label="Categoría"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="mac_address" label="MAC" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="ip_address" label="IP" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="network_id" label="Red" rules={[{ required: true }]}>
          <Select placeholder="Selecciona una red">
            {networks.map((n) => (
              <Option key={n.id} value={n.id}>
                {n.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default DeviceFormModal;
