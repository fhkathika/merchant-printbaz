import axios from 'axios';

const SendOrderConfirmationEmail = (order) => {
  axios.post('http://localhost:5000/webhook', order )
    .then((response) => {
      console.log("send mail",response);
    })
    .catch((error) => {
      console.error(error);
    });
};
export default SendOrderConfirmationEmail


