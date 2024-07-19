import { useAuth } from "../../hooks";
import { Navigate,Outlet } from "react-router-dom";
import { Header,SideBar } from "../../custom-ui";
import styles from './style.module.scss';
import { useState } from "react";

const ProtectedRoutes = () => {
  const [show_menu,set_show_menu] = useState(true);
  const {isAuthenticated} = useAuth();
  if(!isAuthenticated) return <Navigate to="/login" />;
  return (
    <>
    <Header {...{set_show_menu,show_menu}} />
    <main className={styles.container}>
        <SideBar {...{show_menu}} />
        <section className={styles.views}>
            <Outlet />
        </section>
    </main>
    </>
  )
}

export default ProtectedRoutes