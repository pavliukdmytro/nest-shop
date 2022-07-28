import { FormEvent, useState }  from 'react';
import axios  from 'axios';

import { IMessages } from './interfaces/IMessages';
import DefErrors from '@components/def/DefErrors/DefErrors';

const SignUp = () => {
  let [errors, setErrors] = useState({});
  let [messages, setMessages] = useState<IMessages>({});

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
        setMessages(data.messages);
      }

    } catch(err) {
      setErrors(err?.response?.data?.errors ?? {  });
    }
  };

  return(
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h1 className="mb-5">Sign up</h1>
          { messages.verify && <p className="text-success">{ messages.verify }</p>}

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
              <DefErrors name="name" errors={ errors } />
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
              <DefErrors name="email" errors={ errors } />
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
              <DefErrors name="password" errors={ errors } />
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