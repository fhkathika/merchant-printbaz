import React,{ createRef, useEffect } from 'react';
import { useScreenshot } from 'use-react-screenshot';

const ScreenShot = () => {
    const ref = createRef(null);
    const [image, takeScreenshot] = useScreenshot();
  
    useEffect(() => {
        console.log("image", image);
    }, [image]);

    const getImage = () => {
        console.log("clicked getImage");
        if (ref.current) {
            takeScreenshot(ref.current);
        }
    }
      
    return (
        <>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20%"}} >
                <div>
                    <button style={{ marginBottom: '10px' }} onClick={getImage}>
                        Take screenshot
                    </button>
                </div>
                <div ref={ref}>
                    <h1>use-react-screenshot</h1>
                    <p>
                        <strong>hook by @vre2h which allows to create screenshots</strong>
                    </p>
                    <form style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20%"}} >
                        <div style={{ }}>
                            <i className="fa fa-paperclip" aria-hidden="true" /> 
                            <input
                                className="btn"
                                type="file"
                                name="file"
                                style={{height:"100%",weight:"100%"}}
                                multiple
                            />
                        </div>
                        <button className="btn btn-primary" style={{}} type="submit">Create Ticket</button>
                        <label htmlFor="fname">First Name</label>
                        <input type="text" id="fname" name="firstname" placeholder="Your name.."/>
                        <label htmlFor="lname">Last Name</label>
                        <input type="text" id="lname" name="lastname" placeholder="Your last name.."/>
                        <label htmlFor="country">Country</label>
                        <select id="country" name="country">
                            <option value="australia">Australia</option>
                            <option value="canada">Canada</option>
                            <option value="usa">USA</option>
                        </select>
                        <input type="submit" value="Submit"/>
                    </form>

                <a href="https://merchant-printbaz-admin.netlify.app/ticket"></a>    
                </div>
                {image && <img src={image} alt={'Screenshot'} />}
            </div>
        </>
    );
};

export default ScreenShot;
