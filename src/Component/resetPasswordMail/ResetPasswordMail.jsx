import axios from 'axios';

const ResetPasswordMail = (email) => {
  axios.post('http://localhost:5000/forgot-password', { email })
    .then((response) => {
      console.log("send mail",response);
    })
    .catch((error) => {
      console.error(error);
    });
};
export default ResetPasswordMail
