import { MantineProvider } from "@mantine/core";
import rtlPlugin from "stylis-plugin-rtl";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "light",
      }}
      emotionOptions={{ key: "mantine", stylisPlugins: [rtlPlugin] }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
