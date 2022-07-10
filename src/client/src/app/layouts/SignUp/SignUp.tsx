import { FormEvent, useState }  from 'react';
import axios  from 'axios';

const SignUp = () => {
  let [errors, setErrors] = useState({});

  const handlerSubmit = async (e: FormEvent<HTMLFormElement>) :Promise<void>  => {
    try {
      e.preventDefault();

      const form = e.currentTarget;
      const formData = new FormData(form);

      const { data, status } = await axios.post('/auth/signUp', formData);

      setErrors({});
    } catch(err) {
      setErrors(err.response.data);
    }
  };

  const printErrors = (inputName: string) => {
    // console.log(inputName, errors);
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