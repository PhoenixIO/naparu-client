import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from './pages/Main/Main';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Layout } from './components/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Layout> <Main /> </Layout>} />
        <Route path="/login" element={<Layout> <Login /> </Layout>} />
        <Route path="/register" element={<Layout> <Register /> </Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
