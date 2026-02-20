import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
const HomePage = lazy(() => import("./pages/HomePage.jsx"))

const LoginPage = lazy(() => import("./pages/LoginPage.jsx"))
const SignUpPage = lazy(() => import("./pages/SignUpPage.jsx"));
import Layout from "./Components/Layout.jsx";
import useAuthuser from "./hooks/useAuth.js";
import Loader from "./Components/Loader.jsx"
import CartPage from "./Pages/CartPage.jsx";
import { Toaster } from "react-hot-toast";
import VendorDashboard from "./Pages/VendorDashboard.jsx";
import RegisterKitchen from "./Pages/RegisterKitchen.jsx";


function App() {

  const { isLoading, authUser } = useAuthuser()
  const isAuthenticated = !!authUser


  console.log("authUser in App.jsx:", authUser)
  if (isLoading) return <Loader />
  console.log("authUser?.user?.role", authUser?.user?.role)
  console.log("authuser?.requestStatue",authUser?.user?.requestStatus)


  function RedirectAuthenticatedUser({ children }) {

    if (isAuthenticated && authUser?.user?.role === "Customer") {

      return <Navigate to="/" replace />
    }

    if (isAuthenticated && authUser?.user?.role === "vendor" && authUser?.user?.requestStatus === "pending") {
      return <Navigate to="/vendor/register-kitchen" replace />
    }
    if (isAuthenticated && authUser?.user?.role === "vendor" && authUser?.user?.requestStatus === "active") {
      
      return <Navigate to="/vendor/vendor-dashboard" replace />
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
          <Route path="/" element={
<RedirectAuthenticatedUser>

            <Layout>
            <HomePage />
          </Layout>
</RedirectAuthenticatedUser>
        } />
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

          <Route path="/vendor/vendor-dashboard" element={
            <ProtectRoute>
              <VendorDashboard />
            </ProtectRoute>
          }
          />

          <Route path="vendor/register-kitchen" element={
            <RedirectAuthenticatedUser>
              <RegisterKitchen />
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
