import React from "react";
import { createRoot } from "react-dom/client";
import { createSystem, defaultConfig, defaultSystem, ChakraProvider } from "@chakra-ui/react";
import { Provider } from "./components/ui/provider";
import App from "./app";
import { ColorModeProvider } from "./components/ui/color-mode";

const rootElement = document.getElementById("root");

const colors = {
  brand: {
    50: "#ecefff",
    100: "#cbceeb",
    200: "#a9aed6",
    300: "#888ec5",
    400: "#666db3",
    500: "#4d5499",
    600: "#3c4178",
    700: "#2a2f57",
    800: "#181c37",
    900: "#080819",
  },
};
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
//const theme = extendTheme({ colors, config });

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: colors
    }
  }
})

createRoot(rootElement).render(
  <ChakraProvider value={system} enableSystem={false} defaultTheme="dark">
    <ColorModeProvider />
    <App />
  </ChakraProvider>
);
