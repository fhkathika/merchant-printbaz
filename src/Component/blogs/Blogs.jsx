import React, { useEffect, useState } from 'react';
import '../../css/blogsStyles.css';
import { Accordion, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavigationBar from '../Navbar/NavigationBar';
import Footer from '../footer/Footer';
import BackToTop from '../backToTop/BackToTop';
const Blogs = () => {
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

// Sort the blogs by createdAt in descending order
const sortedBlogs = allBlogs.sort((a, b) => {
  const dateA = new Date(a.createdAt);
  const dateB = new Date(b.createdAt);

  return dateB - dateA;  // Return a positive number for descending order
});

// Get the two latest blogs
const latestBlogs = sortedBlogs.slice(0, 2);
const blogsPerPage = 4;
const [currentPage, setCurrentPage] = useState(1);
const totalPages = Math.ceil(allBlogs.length / blogsPerPage);

useEffect(() => {
  window.scrollTo(0, 0); // To scroll to the top whenever the page changes
}, [currentPage]);

// Get current blogs
const indexOfLastBlog = currentPage * blogsPerPage;
const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
const currentBlogs = allBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

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
                    <h1 className="text-capitalize mb-4 text-lg">Blog articles</h1>
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
                 {
                  currentBlogs?.map(blogs=>{
                    const lines = blogs?.description?.split('\n').slice(0, 2); // Gets the first 2 lines
                    return(
                      <div className="col-lg-6 col-md-6 mb-5">
                      <div className="blog-item">
                        <img src={blogs?.imageUrl} alt="" className="img-fluid rounded" />
                        <div className="blog-item-content bg-white p-4">
                          <div className="blog-item-meta py-1 px-2">
                            <span className="text-muted text-capitalize mr-3">{blogs?.productType}</span>
                          </div>
  
                           {/* <p>   {viewTick.content}</p> */}
                           <div  />
                       
                          <h4 className="mt-3 mb-3"> <Link 
                             to={`/blogsPreview/${blogs?._id}`}
                             state={ {blogs}}>{blogs?.title}</Link></h4>
                          <p className="mb-4"dangerouslySetInnerHTML={{ __html: blogs.description.slice(0, 300) }}/>
                     
  
                            <Link 
                             to={`/blogsPreview/${blogs?._id}`}
                             state={ {blogs}} className="btn btn-small btn-main btn-round-full">Read
                            More</Link> 
                        </div>
                      </div>
                    </div>
                    )
                  }
                  
                    )
                 }
                   
                  
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="sidebar-wrap">
                  
                  {/* <div className="sidebar-widget search card p-4 mb-3 border-0">
                      <input type="text" className="form-control" placeholder="search" />
                      <a href="#" className="btn btn-mian btn-small d-block mt-2">search</a>
                    </div> */}
                    <div className="sidebar-widget latest-post card border-0 p-4 mb-3">
                      <h5>Latest Posts</h5>
                      {
                      latestBlogs?.map(blogs=>
                        <div className="media border-bottom py-3">
                        <Link  to={`/blogsPreview/${blogs?._id}`}
                           state={ {blogs}}><img className="mr-4" style={{width: '110px'}} src={blogs?.imageUrl} alt="" /></Link>
                        <div className="media-body">
                          <h6 className="my-2"> <Link  to={`/blogsPreview/${blogs?._id}`}
                           state={ {blogs}}>{blogs?.title}</Link></h6>
                          <span className="text-sm text-muted">{blogs?.postTime}</span>
                        </div>
                      </div>
                      )
                    }
                      
                    </div>
                    {/* <div className="sidebar-widget bg-white rounded tags p-4 mb-3">
                      <h5 className="mb-4">Tags</h5>
                      <a href="#">T-Shirt</a>
                      <a href="#">Round Neck</a>
                      <a href="#">Drop Shoulder</a>
                      <a href="#">Hoodies</a>
                      <a href="#">Price</a>
                      <a href="#">Size</a>
                      <a href="#">Print</a>
                      <a href="#">Branding</a>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* <div className="row">
                <div className="col-lg-8">
                  <nav className="navigation pagination py-2 d-inline-block">
                    <div className="nav-links">
                      <a className="prev page-numbers" href="#">Prev</a>
                      <a className="next page-numbers" href="#">Next</a>
                      <span aria-current="page" className="page-numbers current">1</span>
                      <a className="page-numbers" href="#">2</a>
                      <a className="page-numbers" href="#">3</a>
                      <a className="page-numbers" href="#">4</a>
                      <a className="page-numbers" href="#">5</a>
                    </div>
                  </nav>
                </div>
              </div> */}

                {/* Pagination */}
      <div className="row">
        <div className="col-lg-8">
          <nav className="navigation pagination py-2 d-inline-block">
            <div className="nav-links">
              <button className='prev page-numbers' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                Prev
              </button>
              <button className="next page-numbers" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button 
                style={{background:"none",border:"none"}}
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={currentPage === index + 1 ? 'current page-numbers' : ''}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
            </div>
          </section>
          {/* Main jQuery */}
        </div>
  




    <Footer/>
    <BackToTop/>
        </>
        
      );
    }
    
      
  export default Blogs;
  