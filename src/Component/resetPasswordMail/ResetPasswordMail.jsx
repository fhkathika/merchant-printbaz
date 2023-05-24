import axios from 'axios';

const ResetPasswordMail = (email) => {
  axios.post('https://mserver.printbaz.com/forgot-password', { email })
    .then((response) => {
      console.log("send mail",response);
    })
    .catch((error) => {
      console.error(error);
    });
};
export default ResetPasswordMail
