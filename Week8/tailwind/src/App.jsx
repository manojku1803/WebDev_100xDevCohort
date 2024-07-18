import { RevenueCard } from "./components/RevenueCard"

function App() {

  return (
    <div  className="grid grid-cols-3">
      <RevenueCard title={"Amount pending"} amount={"45,345,24"} orderCount={13}/>
    </div>
  )
}

export default App
