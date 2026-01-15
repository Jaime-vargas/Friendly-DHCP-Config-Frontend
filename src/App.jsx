import { ConfigProvider, Flex, theme } from "antd";

import { useState } from "react";

import { NetworkViews } from "./views/NetworkViews.jsx";
import MenuComponent from "./components/MenuComponent.jsx";

function App() {
  //MENU STATE
  const [selectedKey, setSelectedKey] = useState("1");

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#1677FF",
          colorBgContainer: "#141414",
          colorText: "#E6E6E6",
          colorBorder: "#303030",
        },
      }}>
      <Flex
        direction="row"
        style={{
          height: "100%",
          width: "100%",
          gap: "20px",
        }}>
        <MenuComponent selectedKey={selectedKey} onSelect={setSelectedKey} />
        {selectedKey === "1" && <NetworkViews />}
        {selectedKey === "2" && <></>}
      </Flex>
    </ConfigProvider>
  );
}

export default App;
