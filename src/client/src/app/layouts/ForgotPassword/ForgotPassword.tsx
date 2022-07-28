import { FormEvent, useState } from 'react';
import axios from 'axios';

import DefErrors from '@components/def/DefErrors/DefErrors';
import DefMessage from '@components/def/DefMessage/DefMessage';

const ForgotPassword = () => {
  const [errors, setErrors] = useState({  });
  const [messages, setMessages] = useState({  });

  const handlerSubmit = async (e: FormEvent): Promise<void> => {
    try {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const formData = new FormData(target);

      const { status, data } = await axios.post('/auth/forgot', formData);

      setErrors({ });
      setMessages(data.messages);
    } catch(err) {
      setMessages({});
      setErrors(err.response.data.errors);
    }
  }

  return(
    <form
      className="container"
      onSubmit={ handlerSubmit }
    >
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
            <DefErrors errors={ errors } name='email'  />
            <DefMessage messages={ messages } name='email' />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>
  )
}

export default ForgotPassword;