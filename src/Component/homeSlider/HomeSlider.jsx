import React, { useState, useEffect } from 'react';
import '../../css/styles.css';

const HomeSlider = () => {
    const [activeIndex, setActiveIndex] = useState(1); 
    const banners = [
        "https://i.ibb.co/SVkW72j/Whats-App-Image-2023-09-27-at-5-38-14-PM.jpg",
        "https://i.ibb.co/4MdnTHv/Whats-App-Image-2023-09-27-at-5-38-15-PM.jpg",
        "https://i.ibb.co/1dk2fsN/banner-Slider1.jpg"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            if (activeIndex >= extendedBanners.length - 2) {
                setActiveIndex(1); // loop back to the first image after the last buffer
            } else {
                setActiveIndex(prevIndex => prevIndex + 1);
            }
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [activeIndex]);

  // Adjust the offset calculation:
  const isMobile = window.innerWidth <= 768;
  const ITEM_WIDTH = isMobile ? 350 : 400;
  const offset = -(activeIndex - 1) * (ITEM_WIDTH * 0.8);
  
    const extendedBanners = [banners[banners.length - 1], ...banners, banners[0]];

    return (
        <div className='row'>
            <div className="carousel-container">
                <div className="carousel-wrapper" style={{ transform: `translateX(${offset}px)` }}>
                    {extendedBanners.map((banner, index) => (
                        <div 
                            key={index}
                            className={`caro-item ${index === activeIndex ? 'active' : ''}`}
                            style={{
                                backgroundImage: `url(${banner})`,
                            }}
                        >
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeSlider;
