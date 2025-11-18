"use client";
import { ConfigProvider, theme } from "antd";
import React, { createContext, useContext, useEffect, useState } from "react";

const AntdContext = createContext({ isMounted: false });

function AntdProvider({ children }: React.PropsWithChildren) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.compactAlgorithm,
        token: { colorPrimary: "#004eea" },
        components: {
          Table: {
            headerBg: "#D9D9D9B8",
          },
        },
      }}
    >
      <AntdContext.Provider value={{ isMounted }}>
        {children}
      </AntdContext.Provider>
    </ConfigProvider>
  );
}

export const useAntdProviderContext = () => useContext(AntdContext);

AntdProvider.propTypes = {};

export default AntdProvider;
