import { memo, useEffect, useRef } from "react";
import { Provider } from "react-redux";
import store, { persistor } from "store/Store";
import { PersistGate } from "redux-persist/lib/integration/react";
import LoadingScreen from "view/LoadingScreen/LoadingScreen";
import socketIOClient from "socket.io-client";
import RouteController from "route/RouteController";
import { DEFAULT_URL } from "utils/constants";

const App = memo(() => {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(DEFAULT_URL);
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <RouteController />
      </PersistGate>
    </Provider>
  );
});

export default App;
