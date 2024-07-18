import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
// import { Dashboard } from "./components/Dashboard"
const Landing  = lazy(()=> import( "./components/Landing"));
const Dashboard = lazy(()=> import("./components/Dashboard"));

function App() {


  return (
    <div>
      
      <BrowserRouter>
      <AppBar />
        <Routes>
          <Route path="/dashboard" element={<Suspense  fallback={"loading..."}><Dashboard/></Suspense>} />
          <Route path="/" element={<Suspense fallback={"loading..."}><Landing/></Suspense>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function AppBar(){
  const navigate = useNavigate();

  return <div>
    <div>
        <button onClick={()=>{
          navigate("/")
        }}>LandingPage</button>

        <button onClick={()=>{
          navigate("/dashboard")
        }}>Dashboard</button>
      </div>
  </div>
}

export default App
