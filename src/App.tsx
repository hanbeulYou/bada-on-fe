import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { AddressProvider } from './context/AddressProvider';
import { SafeAreaProvider } from './context/SafeAreaProvider';
import Home from './pages/Home';
import Intro from './pages/Intro';
import NotFound from './pages/NotFound';
import { Layout } from './styles/Layout';

function App() {
  useEffect(() => {
    const safeAreaInsets = (window as any).safeAreaInsets;
    if (safeAreaInsets) {
      dispatch({
        type: 'SET_SAFE_AREA',
        payload: safeAreaInsets,
      });
    }
  }, []);
  return (
    <SafeAreaProvider>
      <AddressProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Intro />} />
              <Route path="/home" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </AddressProvider>
    </SafeAreaProvider>
  );
}

export default App;
