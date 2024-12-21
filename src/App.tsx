import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { AddressProvider } from './context/AddressProvider';
import { SafeAreaProvider } from './context/SafeAreaProvider';
import Home from './pages/Home';
import IntroTermsPage from './pages/IntroTerms';
import NotFound from './pages/NotFound';
import Terms from './pages/Terms';
import { Layout } from './styles/Layout';

function App() {
  return (
    <SafeAreaProvider>
      <AddressProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<IntroTermsPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </AddressProvider>
    </SafeAreaProvider>
  );
}

export default App;
