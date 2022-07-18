import { FormEvent, useState }  from 'react';
import axios from 'axios';

import { useAppSelector, useAppDispatch } from '@store/hooks';
import { setStore } from '@store/features/auth/auth';

const SignIn = () => {
  let [errors, setErrors] = useState({});

  const auth = useAppSelector(state => state.auth.data);
  const dispatch = useAppDispatch();

  // console.log(jwtData);

  const printErrors = (inputName: string) => {
    if (inputName in errors) {
      return (
        <div className="mb-3">
          {
            // @ts-ignore
            Object.values(errors[ inputName ]).map((err: string) => {
              return (
                <p className="text-danger mb-1" key={ err }>{err}</p>
              )
            }) }
        </div>
      )
    }
  };

  const handlerSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const formData = new FormData(target);

      const { data } = await axios.post('/auth/sign-in', formData);

      if (!data.status && data.errors) {
        setErrors(data.errors);
      } else {
        setErrors({});
        dispatch(setStore(data.responseData));
      }
    } catch(err) {
      setErrors(err?.response?.data?.errors ?? {  });
    }
  }

  return(
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          { auth?.access_token }
          <h1 className="mb-5">Sign in</h1>
          { printErrors('auth') }
          <form
            onSubmit={ handlerSubmit }
          >
            <div className="mb-3">
              <label htmlFor="exampleInputEmail" className="form-label">
                Email address
              </label>
              <input type="email" name="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" />
              { printErrors('email') }
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" name="password" className="form-control" id="exampleInputPassword1" />
              { printErrors('password') }
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn;