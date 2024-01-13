import Router from "./router/Router"
import {useState } from "react"
const App = () => {

  const [loading, setLoading] = useState(false)

  return (
    <>
    {
      loading ? 
        <div className="loading">
          <h1>SHOWCASE</h1>
        </div>
        :
        <Router/>
    }
    </>
  )
}

export default App