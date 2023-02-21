import React, { useState } from 'react';
import { forgetPasswordReq } from './fetchApi';
import './ForgotPassword.css'; // import the custom CSS

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: '',
    error: '',
    success: ''
  });

  const { email, error, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setValues({ ...values, error: false });
    try {
      const data = await forgetPasswordReq(email);
      setValues({
        ...values,
        email: '',
        success: data.message
      });
    } catch (error) {
      setValues({
        ...values,
        error: error.response.data.error,
        success: ''
      });
    }
  };

  const showError = () => {
    if (error) {
      return <div className='alert alert-danger'>{error}</div>;
    }
  };

  const showSuccess = () => {
    if (success) {
      return <div className='alert alert-success'>{success}</div>;
    }
  };


  return (

    <div className='container mx-auto mt-5'>
  <div className='card p-5' style={{ maxWidth: '500px', margin: '0 auto' }}>
    <h2 className='card-title text-center mb-5 font-bold text-lg'>Forgot Password</h2>
    {showError()}
    {showSuccess()}
    <form className='forgot-password-form'>
      <div className=''>
        
        <input
          onChange={handleChange('email')}
          type='email'
          className='form-control'
          value={email}
          placeholder='Enter Email'
        />
      </div>

      <button onClick={handleSubmit} className='btn btn-primary btn-block'>
        Submit
      </button>
    </form>
  </div>
</div>
  );
};

export default ForgotPassword;
