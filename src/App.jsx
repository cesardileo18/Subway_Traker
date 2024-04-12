
import Home from './Components/Home'
import ScrollButton from './Components/ScrollButton'
import Footer from './Components/Footer'
import Error from './Components/Error'
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <main>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} exact />
            <Route path="*" element={<Error />} />
          </Routes>
        </HashRouter>
        <ScrollButton />
      </main>
      <Footer />
    </>
  )
}

export default App
