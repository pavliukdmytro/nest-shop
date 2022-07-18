import { FormEvent, useState }  from 'react';
import axios  from 'axios';

import { useAppSelector, useAppDispatch } from '@store/hooks';
import { setStore } from '@store/features/auth/auth';

const SignUp = () => {
  let [errors, setErrors] = useState({});

  const auth = useAppSelector(state => state.auth.data);
  const dispatch = useAppDispatch();

  const handlerSubmit = async (e: FormEvent<HTMLFormElement>) :Promise<void>  => {
    try {
      e.preventDefault();

      const form = e.currentTarget;
      const formData = new FormData(form);

      const { data } = await axios.post('/auth/sign-up', formData);

      if (!data.isOk) {
        setErrors(data.errors);
      } else {
        setErrors({});
        dispatch(setStore(data.responseData));
      }

    } catch(err) {
      setErrors(err?.response?.data?.errors ?? {  });
    }
  };

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
  }

  return(
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          { auth?.access_token }
          <h1 className="mb-5">Sign up</h1>
          <form
            onSubmit={ handlerSubmit }
          >
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label">Name</label>
              <input
                name="name"
                type="text"
                className="form-control"
                id="inputName"
              />
              { printErrors('name') }
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input
                name="email"
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              { printErrors('email') }
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
              { printErrors('password') }
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <div className="form-check">
                  <label className="form-check-label">
                    <input className="form-check-input" type="radio" name="gender" value="male" defaultChecked/>
                    male
                  </label>
                </div>
              </div>
              <div className="col-6">
                <div className="form-check">
                  <label className="form-check-label">
                    <input className="form-check-input" value="female" type="radio" name="gender" />
                    female
                  </label>
                </div>
              </div>
            </div>
            {/*<div className="mb-3 form-check">*/}
            {/*  <input type="checkbox" className="form-check-input" id="exampleCheck1" />*/}
            {/*  <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>*/}
            {/*</div>*/}
            <button type="submit" className="btn btn-primary">
              Registration
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp;