import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
// import { useSelector } from 'react-redux';

import { checkUserData } from './store/features/auth/auth';
import { useAppSelector, useAppDispatch } from './store/hooks';
import Main from './layouts/Main';
import SignUp from './layouts/SignUp/SignUp';
import Header from './components/Header/Header';
import SignIn from './layouts/SignIn/SignIn';

const App = () => {
  const state = useAppSelector(state => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserData());
  }, []);
  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/auth/sign-up" element={ <SignUp /> } />
          <Route path="/auth/sign-in" element={ <SignIn /> } />
          <Route path="/" element={ <Main /> } />
        </Routes>
      </div>
    </div>
  )
}

export default App;