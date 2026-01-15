import { createDevice, updateDevice, deleteDevice } from "../api/fetchInfo";
import { Modal } from "antd";
import DeviceFormModal from "./DeviceFormModal";

import { useEffect, useMemo, useState } from "react";
import { Table, Input, Select, Space, Spin, Button } from "antd";

import { fetchDevices } from "../api/fetchInfo";
import { fetchGlobalConfig } from "../api/fetchInfo";

const { Search } = Input;
const { Option } = Select;

function DevicesView() {
  const [networks, setNetworks] = useState([]);

  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  const [nameFilter, setNameFilter] = useState("");
  const [networkFilter, setNetworkFilter] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);

  const confirmDelete = (id) => {
    Modal.confirm({
      title: "¿Eliminar dispositivo?",
      content: "Esta acción no se puede deshacer",
      okType: "danger",
      onOk: async () => {
        await deleteDevice(id);
        loadDevices();
      },
    });
  };

  const openCreateModal = () => {
    setEditingDevice(null);
    setModalOpen(true);
  };

  const openEditModal = (device) => {
    setEditingDevice(device);
    setModalOpen(true);
  };

  const handleSubmit = async (values) => {
    if (editingDevice) {
      await updateDevice(editingDevice.id, values);
    } else {
      await createDevice(values);
    }
    setModalOpen(false);
    loadDevices();
  };

  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = async () => {
    setLoading(true);
    try {
      const data = await fetchDevices();
      setDevices(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const result = await fetchGlobalConfig();
      setNetworks(result);
    };
    getData();
  }, []);

  // datos filtrados
  const filteredDevices = useMemo(() => {
    return devices.filter((d) => {
      const matchesName =
        !nameFilter || d.name?.toLowerCase().includes(nameFilter.toLowerCase());

      const matchesNetwork =
        !networkFilter || Number(d.network_id) === Number(networkFilter);

      return matchesName && matchesNetwork;
    });
  }, [devices, nameFilter, networkFilter]);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "MAC",
      dataIndex: "mac_address",
      key: "mac_address",
      sorter: (a, b) => a.mac_address.localeCompare(b.mac_address),
    },
    {
      title: "IP",
      dataIndex: "ip_address",
      key: "ip_address",
      sorter: (a, b) => a.ip_address.localeCompare(b.ip_address),
    },
    {
      title: "Red",
      dataIndex: "network_name",
      key: "network_name",
      sorter: (a, b) => a.network_name.localeCompare(b.network_name),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => openEditModal(record)}>
            Editar
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => confirmDelete(record.id)}
          >
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Space vertical style={{ width: "100%", padding: "20px" }} size="middle">
      {/* Filtros */}
      <Space>
        <Button type="primary" onClick={openCreateModal}>
          Nuevo dispositivo
        </Button>
        <Search
          placeholder="Filtrar por nombre"
          allowClear
          onChange={(e) => setNameFilter(e.target.value)}
          style={{ width: 200 }}
        />

        <Select
          allowClear
          placeholder="Filtrar por red"
          style={{ width: 200 }}
          onChange={(value) => setNetworkFilter(value || null)}
        >
          {networks.map((n) => (
            <Option key={n.id} value={n.id}>
              {n.name}
            </Option>
          ))}
        </Select>
      </Space>

      {/* Tabla */}
      <Spin spinning={loading}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredDevices}
          pagination={{ pageSize: 30 }}
        />
        <DeviceFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          networks={networks}
          initialValues={editingDevice}
        />
      </Spin>
    </Space>
  );
}

export default DevicesView;
