import { AppProps } from "next/app";
import { Layout } from "../components";
import { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import { persistor, store } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "../components/loading/loading";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <GlobalStyle />
        <Layout>
          <Loading />
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    background-color: #000;
    color: white;
    font-family: "thicccboi", sans-serif;
  }

  @font-face {
    font-family: 'thicccboi';
    src: url('/fonts/thicccboi/THICCCBOI-Medium.woff2'),
      url('/fonts/thicccboi/THICCCBOI-Bold.woff2');
  }
`;

export default MyApp;
