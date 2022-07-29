import { FormEvent, useState }  from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import { useAppDispatch } from '@store/hooks';
import { setStore } from '@store/features/auth/auth';
import DefErrors from '@components/def/DefErrors/DefErrors';

const SignIn = () => {
  let [errors, setErrors] = useState({});

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlerSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const formData = new FormData(target);

      const { data } = await axios.post('/auth/sign-in', formData);

      if (!data.isOk && data.errors) {
        setErrors(data.errors);
      } else {
        setErrors({});
        dispatch(setStore(data));
        navigate('/', { replace: true });
      }
    } catch(err) {
      setErrors(err?.response?.data?.errors ?? {  });
    }
  }

  return(
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h1 className="mb-5">Sign in</h1>
          <DefErrors errors={errors} name="auth" />
          <form
            onSubmit={ handlerSubmit }
          >
            <div className="mb-3">
              <label htmlFor="exampleInputEmail" className="form-label">
                Email address
              </label>
              <input type="email" name="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" />
              <DefErrors errors={errors} name="email" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" name="password" className="form-control" id="exampleInputPassword1" />
              <DefErrors errors={errors} name="password" />
            </div>
            <Link to="/auth/forgot" className="d-block mb-3">forgot password?</Link>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn;