import React,{useContext} from 'react';
import { Link  } from "react-router-dom";


export default function Footer(){
 
    return(
        <div>
         <footer>
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-4 footer-column">
        <ul data-aos="fade-right" className="nav flex-column ml-5">
          <li className="nav-item">
            <span className="footer-title">Description</span>
          </li>
          <li className="nav-item">
            <a className="nav-link " href="#">We provide a wide range of Services and Solutions to help organizations facilitate change, achieve their Vision and Optimize Performance & Productivity which leads to their business growth.</a>
          </li>
        </ul>
      </div>
      <div className="col-md-4 footer-column">
        <ul data-aos="zoom-in" className="nav flex-column">
          <li className="nav-item">
            <span className="footer-title">Company</span>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://coffeetobusiness.com/about/">About us</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://coffeetobusiness.com/about/">Services</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://coffeetobusiness.com/blogs">News and articles</a>
          </li>
        </ul>
      </div>
      <div className="col-md-4 footer-column">
        <ul data-aos="fade-left" className="nav flex-column">
          <li className="nav-item">
            <span className="footer-title">Contact & Support</span>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="tel:09340151612"><i className="fas fa-phone"></i>+91 9340151312</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="mailto:uditmehra80@gmail.com"><i className="fas fa-comments"></i>Live chat</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://coffeetobusiness.com/contact"><i className="fas fa-envelope"></i>Contact us</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://coffeetobusiness.com"><i className="fas fa-star"></i>Give feedback</a>
          </li>
        </ul>
      </div>
    </div>

    <div className="text-center"><i className="fas fa-ellipsis-h"></i></div>
    
    <div className="row text-center">
      <div  className="col-md-4 box">
        <span  className="copyright quick-links">Copyright &copy; 2021 Coffee to Business <script>document.write(new Date().getFullYear())</script>
        </span>
      </div>
      <div className="col-md-4 box">
        <ul className="list-inline social-buttons">
          <li className="list-inline-item">
            <a href="https://twitter.com/Uditmehra80?s=09">
            <i className="fab fa-twitter"></i>
          </a>
          </li>
          <li className="list-inline-item">
            <a href="https://instagram.com/uditmehra69?utm_medium=copy_link">
            <i className="fab fa-facebook-f"></i>
          </a>
          </li>
          <li className="list-inline-item">
            <a href="https://www.linkedin.com/in/udit-mehra-51ab00108">
            <i className="fab fa-linkedin-in"></i>
          </a>
          </li>
        </ul>
      </div>
      <div className="col-md-4 box">
        <ul className="list-inline quick-links">
          <li className="list-inline-item">
            <a href="#">Privacy Policy</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Terms of Use</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>
        </div>
    )
}