import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { Users,Login,ProtectedRoutes } from "./views";
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/*" element={<ProtectedRoutes />}>
            <Route path="users/*" element={<Users />} />
        </Route>
      </Routes>
    </Router>
     
    </>
  )
}

export default App
