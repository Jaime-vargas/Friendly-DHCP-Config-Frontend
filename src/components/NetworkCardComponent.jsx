import {
  Button,
  Popconfirm,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

import { useEffect } from "react";

export default function NetworkCardComponent({ network, onSave, onDelete }) {
  const [form] = Form.useForm();
  const [formDisabled, setFormDisabled] = useState(!network.isNew);

  const toggleFormDisabled = () => {
    setFormDisabled(!formDisabled);
  };

  const onCancel = () => {
    if (network.isNew) {
      onDelete(network.id);
    } else {
      form.resetFields();
      setFormDisabled(true);
    }
  };

  const onSaveClick = async () => {
    try {
      const values = await form.validateFields();
      onSave(network.id, { ...values, isNew: network.isNew });
      setFormDisabled(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (network) {
      form.setFieldsValue(network);
    }
  }, []);

  return (
    <>
      <Flex
        vertical
        style={{
          width: "300px",
          padding: "20px",
          background: "#141414",
          borderRadius: "15px",
          border: "1px solid #0f0f0f",
        }}>
        {formDisabled ? (
          <Title level={2} style={{ color: "#fff" }}>
            {network.name}
          </Title>
        ) : (
          <Popconfirm
            title="Eliminar red"
            description="¿Estás seguro de que quieres eliminar esta red?"
            onConfirm={() => {
              onDelete(network.id);
            }}
            okText="Sí"
            cancelText="No">
            <Button
              style={{ width: "auto", alignSelf: "flex-end" }}
              type="primary"
              danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        )}

        <Form
          form={form}
          disabled={formDisabled}
          initialValues={network}
          layout="vertical"
          size="small">
          {!formDisabled && (
            <Row gutter={15}>
              <Col span={12}>
                <Form.Item label="Nombre" name="name">
                  <Input placeholder="input placeholder"></Input>
                </Form.Item>
              </Col>
            </Row>
          )}
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item label="Subnet" name="subnet">
                <Input placeholder="input placeholder"></Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Netmask" name="netmask">
                <Input placeholder="input placeholder"></Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Start range" name="start_range">
                <Input placeholder="input placeholder"></Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="End range" name="end_range">
                <Input placeholder="input placeholder"></Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Default lease time" name="default_lease_time">
                <Input placeholder="input placeholder"></Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Max lease time" name="max_lease_time">
                <Input placeholder="input placeholder"></Input>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item label="Router" name="router">
                <Input placeholder="input placeholder"></Input>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item label="Primary DNS" name="primary_dns">
                <Input placeholder="input placeholder"></Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Secondary DNS" name="secondary_dns">
                <Input placeholder="input placeholder"></Input>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {formDisabled && (
          <Title level={5} style={{ color: "#fff" }}>
            Dispositivos asociados: {network.devices_count}
          </Title>
        )}
        <Flex gap="10px" justify="end">
          {formDisabled ? (
            <Button type="primary" onClick={toggleFormDisabled}>
              Editar
            </Button>
          ) : (
            <>
              <Button type="primary" onClick={onSaveClick}>
                Guardar
              </Button>
              <Button type="primary" onClick={onCancel} danger>
                Cancelar
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
}
