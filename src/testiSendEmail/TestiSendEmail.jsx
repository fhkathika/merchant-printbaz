// import React from 'react';

// const TestiSendEmail = () => {
//     return (
//         <div>
            
//         </div>
//     );
// };

// export default TestiSendEmail;

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

  const TestiSendEmail = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_q284lsv', 'template_z69dbsv', form.current, 'user_9OmuJUFcoeAAJDoAqTtfB')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};
export default TestiSendEmail;