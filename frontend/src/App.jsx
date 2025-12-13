import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import Layout from "./Components/Layout.jsx";
import useAuthuser from "./hooks/useAuth.js";
import Loader from "./Components/Loader.jsx"
import CartPage from "./Pages/CartPage.jsx";
import { Toaster } from "react-hot-toast";

function App() {

  const { isLoading, authUser } = useAuthuser()
  const isAuthenticated = !!authUser



  if (isLoading) return <Loader />


  function RedirectAuthenticatedUser({ children }) {

    if (isAuthenticated) {

      return <Navigate to="/" replace />
    }

    return children

  }

  function ProtectRoute({ children }) {
    if (!isAuthenticated) {

      return <Navigate to="/" replace />
    }

    return children
  }


  return (

    <div className="min-h-screen bg-pupkin_spice  text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute left-1/2 top-0  w-full h-full -translate-x-1/2
             bg-[radial-gradient(ellipse_at_top,rgba(255,180,120,0.35)_0%,rgba(239,200,26,0.15)_45%,rgba(0,0,0,0)_100%)]"
          ></div>
        </div>

      </div>



      <div className="relative z-50 " >
        <Routes>
          <Route path="/" element={<Layout>
            <HomePage />
          </Layout>} />
          <Route path="/login" element={
            <RedirectAuthenticatedUser>

              <LoginPage />
            </RedirectAuthenticatedUser>
          } />
          <Route path="/signup" element={
            <RedirectAuthenticatedUser>

              <SignUpPage />
            </RedirectAuthenticatedUser>

          } />

          <Route path="/cart" element={
            <ProtectRoute>
              <CartPage />
            </ProtectRoute>
          } />
        </Routes>
        <Toaster />
      </div>

    </div>
  );
}

export default App;
