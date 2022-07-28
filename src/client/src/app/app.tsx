import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import { checkUserData } from './store/features/auth/auth';
import { useAppDispatch, useAppSelector } from './store/hooks';
import Main from './layouts/Main';
import SignUp from './layouts/SignUp/SignUp';
import Header from './components/Header/Header';
import SignIn from './layouts/SignIn/SignIn';
import DefLoader from '@components/def/DefLoader/DefLoader';
import ForgotPassword from './layouts/ForgotPassword/ForgotPassword';

const App = () => {
  const dispatch = useAppDispatch();
  const isLoad: boolean = useAppSelector(state => state.auth.data.isLoad);
  useEffect(() => {
    dispatch(checkUserData());
  }, []);
  if (!isLoad) {
    return <DefLoader />;
  }
  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/auth/sign-up" element={ <SignUp /> } />
          <Route path="/auth/sign-in" element={ <SignIn /> } />
          <Route path="/auth/forgot" element={ <ForgotPassword /> } />
          <Route path="/" element={ <Main /> } />
        </Routes>
      </div>
    </div>
  )
}

export default App;