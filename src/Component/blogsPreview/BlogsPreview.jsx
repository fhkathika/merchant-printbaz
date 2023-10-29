import React from 'react';
import '../../css/blogsStyles.css';
import { Accordion, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import NavigationBar from '../Navbar/NavigationBar';
import Footer from '../footer/Footer';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
const BlogsPreview = () => {
  const target = useRef(null);
  const location = useLocation();
const viewBlog = location.state ? location?.state?.blogs : null;
const [getBlogById, setGetBlogById] = useState();
const [allBlogs,setAllBlogs]=useState([])
useEffect(()=>{
  const getBlogs = async () => {
   await fetch('https://mserver.printbaz.com/getAllBlogs') //for main site
  //  await fetch('http://localhost:5000/getAllBlogs') //for testing site
  // testing site
  .then(res=>res.json())
  .then(data => setAllBlogs(data))
  }
  getBlogs()
},[])
useEffect(()=>{
  const getblogsById=async()=>{
           // Fetch the updated order details
  await fetch(`https://mserver.printbaz.com/getBlogById/${viewBlog?._id}`)
  // await fetch(`http://localhost:5000/getBlogById/${viewBlog?._id}`)

  .then(res=>res.json())
  .then(data => {setGetBlogById(data)
  })
    
  
       }
       getblogsById()
        // Update the previousPath state when the location changes

      },[])
      console.log("getBlogById",getBlogById)

      // Sort the blogs by createdAt in descending order
const sortedBlogs = allBlogs.sort((a, b) => {
  const dateA = new Date(a.createdAt.$date);
  const dateB = new Date(b.createdAt.$date);

  return dateB - dateA;  // Return a positive number for descending order
});

// Get the two latest blogs
const latestBlogs = sortedBlogs.slice(0, 2);

      return (
        <>

        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>Merchant Printbaz</title>
        <meta content="" name="description" />
        <meta content="" name="keywords" />

  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css"
    integrity="sha512-b2QcS5SsA8tZodcDtGRELiGv5SaKSk1vDHDaQRda0htPYWZ6046lr3kJ5bAAQdpV2mmA/4v0wQF9MyU6/pDIAg=="
    crossOrigin="anonymous"
    referrerPolicy="no-referrer"
  />

  <NavigationBar/>

  <div className="main-wrapper ">
          <section className="page-title">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="block text-center">
                    <h1 className="text-capitalize mb-4 text-lg">Blog Preview</h1>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="section blog-wrap">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 mb-5">
                      <div className="single-blog-item">
                        <img style={{width: '100%'}} src={getBlogById?.imageUrl} alt="" className="img-fluid rounded" />
                        <div className="blog-item-content bg-white pt-5">
                          <div className="blog-item-meta bg-gray py-1 px-2">
                            <span className="text-black text-capitalize mr-3"><i className="ti-time mr-1" />
                             {getBlogById?.postTime}</span>
                          </div>
                          <h2 className="mt-3 mb-4">{getBlogById?.title}
                          </h2>
                          <p className="lead mb-4">
                          {getBlogById?.title}
                          </p>
                          <div className="tag-option mt-5 clearfix">
                            <ul className="float-left list-inline">
                              <li>Tags:</li>
                              <li className="list-inline-item"><a href="#" rel="tag">Round Neck</a></li>
                              <li className="list-inline-item"><a href="#" rel="tag">Drop Shoulder</a>
                              </li>
                              <li className="list-inline-item"><a href="#" rel="tag">Hoodies</a></li>
                            </ul>
                            <ul className="float-right list-inline">
                              <li className="list-inline-item"> Share: </li>
                              <li className="list-inline-item"><a href="#" target="_blank"><i className="fab fa-facebook-f" aria-hidden="true" /></a></li>
                              <li className="list-inline-item"><a href="#" target="_blank"><i className="fab fa-twitter" aria-hidden="true" /></a></li>
                              <li className="list-inline-item"><a href="#" target="_blank"><i className="fab fa-pinterest-p" aria-hidden="true" /></a></li>
                              <li className="list-inline-item"><a href="#" target="_blank"><i className="fab fa-google-plus" aria-hidden="true" /></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 mb-5">
                      <div className="posts-nav bg-white pt-5 d-lg-flex d-md-flex justify-content-between ">
                        <a className="post-prev align-items-center" href="#">
                          <div className="posts-prev-item mb-4 mb-lg-0">
                            <span className="nav-posts-desc text-color">- Previous Post</span>
                            <h6 className="nav-posts-title mt-1 pr-5">
                              বিনা পয়সায় নিজের ব্র্যান্ডেড টিশার্ট, ড্রপশোল্ডার, হুডি ব্যবসা
                            </h6>
                          </div>
                        </a>
                        <div className="border" />
                        <a className="posts-next" href="#">
                          <div className="posts-next-item pt-4 pt-lg-0 pl-5">
                            <span className="nav-posts-desc text-lg-right text-md-right text-color d-block">-
                              Next Post</span>
                            <h6 className="nav-posts-title mt-1 text-right">
                              অনলাইনে ফেইক কাস্টোমার থেকে বাঁচার উপায়
                            </h6>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="sidebar-wrap">
                    <div className="sidebar-widget search card p-4 mb-3 border-0">
                      <input type="text" className="form-control" placeholder="search" />
                      <a href="#" className="btn btn-mian btn-small d-block mt-2">search</a>
                    </div>
                    <div className="sidebar-widget latest-post card border-0 p-4 mb-3">
                      <h5>Latest Posts</h5>
                      {
                      latestBlogs?.slice(0,2).map(latest=>
                        <div className="media border-bottom py-3">
                        <Link to={`/blogsPreview/${latest?._id}`}
                           state={ {latest}}><img className="mr-4" style={{width: '110px'}} src={latest?.imageUrl} alt="" /></Link>
                        <div className="media-body">
                          <h6 className="my-2">{latest?.title}</h6>
                          <span className="text-sm text-muted">{latest?.postTime}</span>
                        </div>
                      </div>
                      )
                    }
                    </div>
                    <div className="sidebar-widget bg-white rounded tags p-4 mb-3">
                      <h5 className="mb-4">Tags</h5>
                      <a href="#">T-Shirt</a>
                      <a href="#">Round Neck</a>
                      <a href="#">Drop Shoulder</a>
                      <a href="#">Hoodies</a>
                      <a href="#">Price</a>
                      <a href="#">Size</a>
                      <a href="#">Print</a>
                      <a href="#">Branding</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
    <Footer/>
        </>
        
      );
    }
    
      
  export default BlogsPreview;
  