import { Routes, Route } from "react-router-dom";

import Main from './layouts/Main';
import SignUp from './layouts/SignUp/SignUp';
import Header from './components/Header/Header';

const App = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/sign-up" element={ <SignUp /> } />
          <Route path="/" element={ <Main /> } />
        </Routes>
      </div>
    </div>
  )
}

export default App;