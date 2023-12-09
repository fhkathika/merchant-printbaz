import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../css/dashboardStyles.css'
const Footer = () => {
  return (
    <div >
     {/* ======= Footer ======= */}
  <footer id="footer" className="footer">
    <div className="footer-top">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-5 col-md-12 footer-info">
            <a href="index.html" className="logo d-flex align-items-center">
              <img
                src="https://media.discordapp.net/attachments/1128921638977683526/1163815250013978686/Logo-01.png?ex=6540f26a&is=652e7d6a&hm=1628865bf04319b5155b3e0c730e5c3225436817412a8ed31018437d696bd53e&=&width=1440&height=392"
                alt=""
              />
            </a>
            <p style={{ fontWeight: "bold" }}>
              বিনা পুজিতে টিশার্ট ব্যবসা করুন। <br />
              আপনার শুধু ডিজাইনের কাজ, বাকি দ্বায়িত্বে প্রিন্টবাজ
            </p>
            <div className="social-links mt-3">
              <a
                href="https://api.whatsapp.com/send/?phone=%2B8801927854949&text&type=phone_number&app_absent=0"
                className="twitter"
              >
                <i className="bi bi-whatsapp" />
              </a>
              <a href="https://www.facebook.com/Printbaz/" className="facebook">
                <i className="bi bi-facebook" />
              </a>
              <a
                href="https://www.instagram.com/printbaz.com.bd/"
                className="instagram"
              >
                <i className="bi bi-instagram" />
              </a>
              <a
                href="https://www.linkedin.com/company/printbaz/"
                className="linkedin"
              >
                <i className="bi bi-linkedin" />
              </a>
              <a href="https://www.behance.net/printbaz" className="instagram">
                <i className="bi bi-behance" />
              </a>
              <a href="https://www.youtube.com/@printbaz" className="linkedin">
                <i className="bi bi-youtube" />
              </a>
            </div>
          </div>
          <div className="col-lg-2 col-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li>
                <i className="bi bi-chevron-right" /> <a href="/blogs">Blogs</a>
              </li>
              <li>
                <i className="bi bi-chevron-right" /> <a href="/myorders">Orders</a>
              </li>
              <li>
                <i className="bi bi-chevron-right" /> <a href="/newOrdersWithOption">New Order</a>
              </li>
              <li>
                <i className="bi bi-chevron-right" /> <a href="/calculator">Calculator</a>
              </li>
              <li>
                <i className="bi bi-chevron-right" />{" "}
                <a href="/printSizeDemo">Print Size Demo</a>
              </li>
              <li>
                <i className="bi bi-chevron-right" />{" "}
                <a href="/termsConditions">Terms &amp; Conditions</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-6 footer-links">
            <h4>Our Product</h4>
            <ul>
              <li>
                <i className="bi bi-chevron-right" />{" "}
                <a href="/blankRoundNeck">Blank Round Neck</a>
              </li>
              <li>
                <i className="bi bi-chevron-right" />{" "}
                <a href="/newOrder">Custom Round Neck</a>
              </li>
              <li>
                <i className="bi bi-chevron-right" />{" "}
                <a href="/blankDropSholder">Blank Drop Shoulder</a>
              </li>
              <li>
                <i className="bi bi-chevron-right" />{" "}
                <a href="/customDropSholder">Custom Drop Shoulder</a>
              </li>
              <li>
                <i className="bi bi-chevron-right" />{" "}
                <a href="/blankHoodie">Blank Hoodies</a>
              </li>
              <li>
                <i className="bi bi-chevron-right" />{" "}
                <a href="/custonHoodie">Custom Hoodies</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
            <h4>Contact Us</h4>
            <p>
              Block- F, House # 76, Road # 2, Charimanbari, Banani, Dhaka,
              Bangladesh <br />
              <br />
              <strong>Phone:</strong> +8801927-854949
              <br />
              <strong>Email:</strong> merchants@printbaz.com
              <br />
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="copyright">
        © Copyright{" "}
        <strong>
          <span>Printbaz</span>
        </strong>
        . All Rights Reserved
      </div>
    </div>
  </footer>
  {/* End Footer */}
    </div>
  );
};

export default Footer;