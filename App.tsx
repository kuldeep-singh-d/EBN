import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { LucideProvider } from 'lucide-react-native';
import { PersistGate } from 'redux-persist/integration/react';

import Navigation from 'src/navigations';
import store from '@store/configureStore';

const persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LucideProvider strokeWidth={2}>
          <Navigation />
        </LucideProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
