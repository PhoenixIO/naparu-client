import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import { Main } from './pages/Main/Main';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Cabinet } from './components/Cabinet/Cabinet';
import { Layout } from './components/Layout/Layout';

import 'react-notifications/lib/notifications.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Layout> <Main /> </Layout>} />
        <Route path="/login" element={<Layout> <Login /> </Layout>} />
        <Route path="/register" element={<Layout> <Register /> </Layout>} />
        <Route path="/cabinet" element={<Layout> <Cabinet /> </Layout>} />
      </Routes>

      <NotificationContainer />
    </BrowserRouter>
  );
}

export default App;
