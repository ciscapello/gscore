import { AppProps } from "next/app";
import { Layout } from "../components";
import { GlobalStyle } from "../styles";
import { Provider } from "react-redux";
import { persistor } from "../store/store";
import store from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Loading } from "../components";

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

export default MyApp;
