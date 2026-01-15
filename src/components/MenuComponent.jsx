import { Menu, Flex, Typography } from "antd";

const { Text } = Typography;

const MenuComponent = ({ selectedKey, onSelect }) => {
  //MENU ITEMS
  const items = [
    {
      label: "Redes",
      key: "1",
    },
    {
      label: "Dispositivos",
      key: "2",
    },
  ];

  return (
    <Flex
      vertical
      style={{
        width: 200,
        height: "100dvh",
        background: "#141414",
        borderRight: "1px solid #0f0f0f",
      }}>
      <Text
        strong
        style={{
          color: "#fff",
          padding: "16px",
          fontSize: 16,
        }}>
        Friendly DHCP
      </Text>
      <Menu
        onClick={(e) => onSelect(e.key)}
        style={{ width: 200, borderRight: "none" }}
        selectedKeys={[selectedKey]}
        mode="vertical"
        items={items}
      />
    </Flex>
  );
};

export default MenuComponent;
