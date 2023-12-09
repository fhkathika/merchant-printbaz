import React from 'react';
import { useEffect } from 'react';

const BackToTop = () => {
    useEffect(() => {
        const backtotop = document.querySelector('.back-to-top');
        const toggleBacktotop = () => {
          if (window.scrollY > 100) {
            backtotop.classList.add('active');
          } else {
            backtotop.classList.remove('active');
          }
        };
        toggleBacktotop();
        window.addEventListener('scroll', toggleBacktotop);
        return () => {
          window.removeEventListener('scroll', toggleBacktotop);
        };
      }, []);
    return (
        <div >
             <a style={{marginBottom:"30px"}}
    href="#"
    className="back-to-top d-flex align-items-center justify-content-center"
  >
    <i className="bi bi-arrow-up-short" />
  </a>
        </div>
    );
};

export default BackToTop;