import { useState, FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import DefErrors from '@components/def/DefErrors/DefErrors';
import DefMessage from '@components/def/DefMessage/DefMessage';
import { IErrors } from './IErrors';
import { IChangePasswordMessages } from './IChangePasswordMessages';

const ChangePassword = () => {
  let [errors, setErrors] = useState<IErrors>({ });
  let [messages, setMessages] = useState<IChangePasswordMessages>({ });
  const { token } = useParams();

  const handlerSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const formData = new FormData(target);
      formData.set('token', token);

      const { data } = await axios.post('/auth/change-password', formData);

      setErrors({});
      setMessages(data.messages);

    } catch(err) {
      setErrors(err?.response?.data?.errors ?? {  });
    }
  }

  return(
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h1 className="mb-5">Change password</h1>
          <DefErrors errors={errors} name="token" />
          {errors?.token?.expired && <Link to="/auth/forgot" >resend email again</Link>}

          <DefMessage messages={messages} name="ok" />
          <form
            onSubmit={ handlerSubmit }
          >
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" name="password" className="form-control" id="password" />
              <DefErrors errors={errors} name="password" />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
              <input type="password" name="confirmPassword" className="form-control" id="confirmPassword" />
              <DefErrors errors={errors} name="confirmPassword" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword;