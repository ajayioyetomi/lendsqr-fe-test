import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { Dashboard,Users,Login,ProtectedRoutes } from "./views";
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
              <Route index element={<Dashboard />} />
              <Route path="dashboard/*" element={<Dashboard />} />
              <Route path="users/*" element={<Users />} />
            </Route>
          </Routes>
        </Router>
      </ProtectedProvider>
    </>
  )
}

export default App
