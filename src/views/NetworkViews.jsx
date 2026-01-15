import { useState, useEffect } from "react";
import NetworkCardComponent from "../components/NetworkCardComponent.jsx";

import { fetchGlobalConfig } from "../api/fetchInfo.jsx";
import { updateGlobalConfig } from "../api/fetchInfo.jsx";
import { deleteGlobalConfig } from "../api/fetchInfo.jsx";
import { createGlobalConfig } from "../api/fetchInfo.jsx";

import { Button, Flex } from "antd";

export function NetworkViews() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchGlobalConfig();
      setData(result);
    };
    getData();
  }, []);

  const updateNetwork = async (id, payload) => {
    try {
      let savedNetwork;

      if (payload.isNew) {
        savedNetwork = await createGlobalConfig(payload);
      } else {
        savedNetwork = await updateGlobalConfig(id, payload);
      }

      setData((prev) =>
        prev.map((network) => (network.id === id ? savedNetwork : network))
      );
    } catch (error) {
      console.error("Error saving network:", error);
    }
  };

  const deleteNetwork = async (id) => {
    if (String(id).startsWith("temp-")) {
      setData((prev) => prev.filter((n) => n.id !== id));
      return;
    }

    try {
      await deleteGlobalConfig(id);
      setData((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Error al borrar red", error);
    }
  };

  return (
    <Flex vertical style={{ padding: "20px" }}>
      <Button
        style={{ width: "120px", margin: "0 0 20px 20px" }}
        type="primary"
        onClick={() => {
          setData((prev) => [
            {
              id: `temp-${Date.now()}`, // clave temporal
              name: "Nueva red",
              subnet: "",
              netmask: "",
              start_range: "",
              end_range: "",
              default_lease_time: "",
              max_lease_time: "",
              router: "",
              primary_dns: "",
              secondary_dns: "",
              devices_count: 0,
              isNew: true,
            },
            ...prev,
          ]);
        }}>
        Nueva red
      </Button>

      <Flex
        direction="row"
        wrap
        gap={20}
        align="flex-start"
        justify="flex-start"
        style={{ padding: "20px", overflowY: "auto", height: "100dvh" }}>
        {data.map((network) => (
          <NetworkCardComponent
            key={network.id}
            network={network}
            onSave={updateNetwork}
            onDelete={deleteNetwork}
          />
        ))}
      </Flex>
    </Flex>
  );
}
