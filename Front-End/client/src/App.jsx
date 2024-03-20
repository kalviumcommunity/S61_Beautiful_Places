import './App.css'
import Entity from './Components/Entity'
import LandingPage from './Components/LandingPage'
import data from './data.json'

function App() {

  return (
    <>
      {/* <LandingPage /> */}
      <Entity {...data} />
    </>
  )
}

export default App
