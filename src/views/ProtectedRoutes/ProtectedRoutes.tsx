import { useAuth } from "../../hooks";
import { Navigate,Outlet } from "react-router-dom";
import { Header,SideBar } from "../../custom-ui";
import styles from './style.module.scss';

const ProtectedRoutes = () => {
  const {isAuthenticated} = useAuth();
  if(!isAuthenticated) return <Navigate to="/login" />
  return (
    <>
    <Header />
    <main className={styles.container}>
        <SideBar />
        <section className={styles.views}>
            <Outlet />
        </section>
    </main>
    </>
  )
}

export default ProtectedRoutes