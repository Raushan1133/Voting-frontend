import { BrowserRouter,Routes, Route } from "react-router-dom"
import DashBoard from "./components/pages/DashBoard"
import LoginRegPage from "./components/pages/LoginRegPage";
import AdminDashboard from "./components/pages/AdminDashboard";
import Profile from "./components/pages/Profile";
import VoteCount from "./components/pages/VoteCount";
import { getToken } from "./services/LocalStorageServices";
import { useGetProfileQuery } from "./services/UserAuthApi";
import { useEffect } from "react";


function App() {
  const token = getToken();
  if(token){
    const {data , isSuccess} = useGetProfileQuery(token);
  }

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginRegPage />}/>
      <Route path="/dashboard" element={token? <DashBoard /> : <LoginRegPage/>}/>
      <Route path="/admindashboard" element={token ?<AdminDashboard /> : <DashBoard />}/>
      <Route path="/profile" element={token ? <Profile /> : <LoginRegPage />}/>
      <Route path="/votecount" element={token?<VoteCount/> : <LoginRegPage />}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
