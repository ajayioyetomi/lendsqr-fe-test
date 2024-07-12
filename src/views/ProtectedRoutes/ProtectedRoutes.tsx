import { useAuth } from "../../hooks";
import { Navigate,Outlet } from "react-router-dom";
import { Header,SideBar } from "../../custom-ui";

const ProtectedRoutes = () => {
  const {isAuthenticated} = useAuth();
  if(!isAuthenticated) return <Navigate to="/login" />
  return (
    <>
    <Header />
    <main>
        <aside>
            <SideBar />
        </aside>
        <section>
            <Outlet />
        </section>
    </main>
    </>
  )
}

export default ProtectedRoutes