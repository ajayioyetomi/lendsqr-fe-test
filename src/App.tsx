import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { Dashboard,Users,EachUser,Login,ProtectedRoutes } from "./views";
import ProtectedProvider from "./context/ProtectedProvider";
function App() {

  return (
    <>
      <ProtectedProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />}/>
            <Route element={<ProtectedRoutes />}>
              <Route path="/*" element={<Dashboard />} />
              <Route path="dashboard/*" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="user/:id" element={<EachUser />} />
            </Route>
          </Routes>
        </Router>
      </ProtectedProvider>
    </>
  )
}

export default App
