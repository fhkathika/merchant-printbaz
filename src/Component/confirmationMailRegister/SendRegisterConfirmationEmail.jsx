

import axios from 'axios';

const SendRegisterConfirmationEmail = (register) => {
  axios.post('https://merchantprintbazserver-dxev.onrender.com/registerEmail', register )
    .then((response) => {
      console.log("send mail for register",response);
    })
    .catch((error) => {
      console.error(error);
    });
};
export default SendRegisterConfirmationEmail