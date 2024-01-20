import { memo } from 'react';
import { Provider } from 'react-redux';
import store, { persistor } from 'store/Store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import LoadingScreen from 'view/LoadingScreen/LoadingScreen';
import RouteController from 'route/RouteController';

const App = memo(() => {
    return (
        <Provider store={store}>
            <PersistGate loading={<LoadingScreen />} persistor={persistor}>
                <RouteController />
            </PersistGate>
        </Provider>
    );
});

export default App;
