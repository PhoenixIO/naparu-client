import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, Flip } from 'react-toastify';
import { Main } from './pages/Main/Main';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Cabinet } from './pages/Cabinet/Cabinet';
import { Layout } from './components/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        hideProgressBar={false}
        transition={Flip}
        theme='dark'
        closeOnClick
        draggable
      />
      <Routes>
        <Route path="*" element={<Layout> <Main /> </Layout>} />
        <Route path="/login" element={<Layout> <Login /> </Layout>} />
        <Route path="/register" element={<Layout> <Register /> </Layout>} />
        <Route path="/cabinet" element={<Layout authGuard> <Cabinet /> </Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
