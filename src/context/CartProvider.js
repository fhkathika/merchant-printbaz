import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "./AuthProvider/AuthProvider";
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const navigate=useNavigate()
    const [formData, setFormData] = useState(
      {
       
        quantity:0,
        printbazcost:0,
        uniqueId:Date.now(),
        orderDetailArr: [
          {
            productType:"Custom Round Neck tshirt",
            color: 'Black',
            teshirtSize: {},
            categoryImg:"https://i.ibb.co/1np6ZMQ/Round-Neck-Black-Custom.jpg",
            quantityM: '',
            quantityL: '',
            quantityXL: '',
            quantityXXL: '',
            quantityXXXL:'',
           totalQuantity:0,
            printSide: '',
            printSize: '',
            printSizeBack: '',
            file: null,
            image: null,
brandLogo:null
          },
          {
            productType:"Custom Round Neck tshirt",
            color: 'White',
            teshirtSize: {},
            categoryImg:"https://i.ibb.co/7VtxHWr/Round-Neck-White-Custom.jpg",
            quantityM: '',
            quantityL: '',
            quantityXL: '',
            quantityXXL: '',
            quantityXXXL:'',
            totalQuantity:0,
            printSide: '',
            printSize: '',
            printSizeBack: '',
            file: null,
            image: null,
brandLogo:null
          },
          {

            productType:"Custom Round Neck tshirt",
             color: 'Bottle Green',
            teshirtSize: {},
            categoryImg:"https://i.ibb.co/bQRDfhL/Round-Neck-Bottle-Green-Custom.jpg",
            quantityM: '',
            quantityL: '',
            quantityXL: '',
            quantityXXL: '',
            quantityXXXL:'',
            totalQuantity:0,
            printSide: '',
            printSize: '',
            printSizeBack: '',
            file: null,
            image: null,
brandLogo:null
          },  {
            productType:"Custom Round Neck tshirt",
            color: 'Maroon',
            teshirtSize: {},
            categoryImg:"https://i.ibb.co/NtznFwg/Round-Neck-Maroon-Custom.jpg",
            quantityM: '',
            quantityL: '',
            quantityXL: '',
            quantityXXL: '',
            quantityXXXL:'',
            totalQuantity:0,
            printSide: '',
            printSize: '',
            printSizeBack: '',
            file: null,
            image: null,
brandLogo:null
          },
        ],
        orderDetailArrCustomDropSholder: [
          
              {
                productType:'custom Drop Sholder',
                color: 'Black',
                teshirtSize: {},
                categoryImg:"https://i.ibb.co/VjrwxkT/Drop-Shoulder-Black-Custom.jpg",
                quantityM: '',
                quantityL: '',
                quantityXL: '',
                quantityXXL: '',
                quantityXXXL:'',
               printSide: '',
                printSize: '',
                printSizeBack: '',
                file: null,
                image: null,
brandLogo:null
              },
              {
                productType:'custom Drop Sholder',
                color: 'White',
                teshirtSize: {},
                categoryImg:"https://i.ibb.co/QHPTMkX/Drop-Shoulder-White-Custom.jpg",
                quantityM: '',
                quantityL: '',
                quantityXL: '',
                quantityXXL: '',
                quantityXXXL:'',
                printSide: '',
                printSize: '',
                printSizeBack: '',
                file: null,
                image: null,
brandLogo:null
              },
              {
                productType:'custom Drop Sholder',
                color: 'Bottle Green',
                teshirtSize: {},
                categoryImg:"https://i.ibb.co/8dQdFCD/Drop-Shoulder-Bottle-Green-Custom.jpg",
                quantityM: '',
                quantityL: '',
                quantityXL: '',
                quantityXXL: '',
                quantityXXXL:'',
                printSide: '',
                printSize: '',
                printSizeBack: '',
                file: null,
                image: null,
brandLogo:null
              }, 
               {
                productType:'custom Drop Sholder',
                color: 'Maroon',
                teshirtSize: {},
                categoryImg:"https://i.ibb.co/7pXqkZr/Drop-Shoulder-Maroon-Custom.jpg",
                quantityM: '',
                quantityL: '',
                quantityXL: '',
                quantityXXL: '',
                quantityXXXL:'',
                printSide: '',
                printSize: '',
                printSizeBack: '',
                file: null,
                image: null,
brandLogo:null
              },
            ],

            orderDetailArrCustomHoodie:
             [
              {
                productType:'Custom hoodie',
                color: 'Black',
                teshirtSize: {},
                categoryImg:"https://i.ibb.co/VDp04Mx/Hoodies-Black-Custom.jpg",
                quantityM: '',
                quantityL: '',
                quantityXL: '',
                quantityXXL: '',
                quantityXXXL:'',
               printSide: '',
                printSize: '',
                printSizeBack: '',
                file: null,
                image: null,
brandLogo:null
              },
              {
                productType:'Custom hoodie',
                color: 'Green',
                teshirtSize: {},
                categoryImg:"https://i.ibb.co/v36RXc6/Hoodies-Neon-Green-Custom.jpg",
                quantityM: '',
                quantityL: '',
                quantityXL: '',
                quantityXXL: '',
                quantityXXXL:'',
                printSide: '',
                printSize: '',
                printSizeBack: '',
                file: null,
                image: null,
brandLogo:null
              },
              {
                productType:'Custom hoodie',
                color: 'Nevy Blue',
                teshirtSize: {},
                categoryImg:"https://i.ibb.co/JjFmL11/Hoodies-Nevy-Blue-Custom.jpg",
                quantityM: '',
                quantityL: '',
                quantityXL: '',
                quantityXXL: '',
                quantityXXXL:'',
                printSide: '',
                printSize: '',
                printSizeBack: '',
                file: null,
                image: null,
brandLogo:null
              }, 
//                {
//                 productType:'Custom hoodie',
//                 color: 'Gray',
//                 teshirtSize: {},
//                 categoryImg:"https://i.ibb.co/NKhyMyp/Hoodies-Gray-Custom.jpg",
//                 quantityM: '',
//                 quantityL: '',
//                 quantityXL: '',
//                 quantityXXL: '',
//                 quantityXXXL:'',
//                 printSide: '',
//                 printSize: '',
//                 printSizeBack: '',
//                 file: null,
//                 image: null,
// brandLogo:null
//               }, 
              {
                productType:'Custom hoodie',
                color: 'Red',
                teshirtSize: {},
                categoryImg:"https://i.ibb.co/MRf1tBD/Hoodies-Red-Custom.jpg",
                quantityM: '',
                quantityL: '',
                quantityXL: '',
                quantityXXL: '',
                quantityXXXL:'',
                printSide: '',
                printSize: '',
                printSizeBack: '',
                file: null,
                image: null,
brandLogo:null
              },
            ],
            orderDetailArrBlankRoundNeck: [
              {
                productType:'Blank Round Neck',
                color: 'Black',
                teshirtSize: {},
                categoryImg:"https://i.ibb.co/sQfVyNz/Round-Neck-Black.jpg",
                quantityM: '',
                quantityL: '',
                quantityXL: '',
                quantityXXL: '',
                quantityXXXL:'',
               printSide: '',
                printSize: '',
                printSizeBack: '',
                file: null,
                image: null,
brandLogo:null
              },
              {
                productType:'Blank Round Neck',
                color: 'White',
                teshirtSize: {},
                categoryImg:"https://i.ibb.co/zffxNhp/Round-Neck-White.jpg",
                quantityM: '',
                quantityL: '',
                quantityXL: '',
                quantityXXL: '',
                quantityXXXL:'',
                printSide: '',
                printSize: '',
                printSizeBack: '',
                file: null,
                image: null,
brandLogo:null
              },
              {
                productType:'Blank Round Neck',
                color: 'Bottle Green',
                teshirtSize: {},
                categoryImg:"https://i.ibb.co/1sFzNJ0/Round-Neck-Bottle-Green.jpg",
                quantityM: '',
                quantityL: '',
                quantityXL: '',
                quantityXXL: '',
                quantityXXXL:'',
                printSide: '',
                printSize: '',
                printSizeBack: '',
                file: null,
                image: null,
brandLogo:null
              }, 
               {
                productType:'Blank Round Neck',
                color: 'Maroon',
                teshirtSize: {},
                categoryImg:"https://i.ibb.co/85b9H6S/Round-Neck-Maroon.jpg",
                quantityM: '',
                quantityL: '',
                quantityXL: '',
                quantityXXL: '',
                quantityXXXL:'',
                printSide: '',
                printSize: '',
                printSizeBack: '',
                file: null,
                image: null,
brandLogo:null
              },
            ],
            orderDetailArrBlankDropSholder: [
              {
                productType:'Blank Drop Sholder',
                color: 'Black',
                teshirtSize: {},
                categoryImg:"https://i.ibb.co/kxwpVfX/Drop-Shoulder-Black.jpg",
                quantityM: '',
                quantityL: '',
                quantityXL: '',
                quantityXXL: '',
                quantityXXXL:'',
               printSide: '',
                printSize: '',
                printSizeBack: '',
                file: null,
                image: null,
brandLogo:null
              },
              {
                productType:'Blank Drop Sholder',
                color: 'White',
                teshirtSize: {},
                categoryImg:"https://i.ibb.co/zZq85J2/Drop-Shoulder-White.jpg",
                quantityM: '',
                quantityL: '',
                quantityXL: '',
                quantityXXL: '',
                quantityXXXL:'',
                printSide: '',
                printSize: '',
                printSizeBack: '',
                file: null,
                image: null,
brandLogo:null
              },
              {
                productType:'Blank Drop Sholder',
                color: 'Bottle Green',
                teshirtSize: {},
                categoryImg:"https://i.ibb.co/WzhzNv1/Drop-Shoulder-Bottle-Green.jpg",
                quantityM: '',
                quantityL: '',
                quantityXL: '',
                quantityXXL: '',
                quantityXXXL:'',
                printSide: '',
                printSize: '',
                printSizeBack: '',
                file: null,
                image: null,
brandLogo:null
              },
                {
                productType:'Blank Drop Sholder',
                color: 'Maroon',
                teshirtSize: {},
                categoryImg:"https://i.ibb.co/ydx7zVC/Drop-Shoulder-Maroon.jpg",
                quantityM: '',
                quantityL: '',
                quantityXL: '',
                quantityXXL: '',
                quantityXXXL:'',
                printSide: '',
                printSize: '',
                printSizeBack: '',
                file: null,
                image: null,
brandLogo:null
                 
              },
            ],
            orderDetailArrBlankHoodie: [
              {
                productType:'Blank Hoodie',
                color: 'Black',
                teshirtSize: {},
                categoryImg:"https://i.ibb.co/tM08Ww7/Hoodies-Black.jpg",
                quantityM: '',
                quantityL: '',
                quantityXL: '',
                quantityXXL: '',
                quantityXXXL:'',
               printSide: '',
                printSize: '',
                printSizeBack: '',
                file: null,
                image: null,
brandLogo:null
                 
              },
              {
                productType:'Blank Hoodie',
                color: 'Green',
                teshirtSize: {},
                categoryImg:"https://i.ibb.co/h1svWPZ/Hoodies-Neon-Green.jpg",
                quantityM: '',
                quantityL: '',
                quantityXL: '',
                quantityXXL: '',
                quantityXXXL:'',
                printSide: '',
                printSize: '',
                printSizeBack: '',
                file: null,
                image: null,
brandLogo:null
                 
              },
              {
                productType:'Blank Hoodie',
                color: 'Nevy Blue',
                teshirtSize: {},
                categoryImg:"https://i.ibb.co/fCnCjhK/Hoodies-Nevy-Blue.jpg",
                quantityM: '',
                quantityL: '',
                quantityXL: '',
                quantityXXL: '',
                quantityXXXL:'',
                printSide: '',
                printSize: '',
                printSizeBack: '',
                file: null,
                image: null,
brandLogo:null
                 
              }, 
//                {
//                 productType:'Blank Hoodie',
//                 color: 'Gray',
//                 teshirtSize: {},
//                 categoryImg:"https://i.ibb.co/SxMzfND/Hoodies-Gray.jpg",
//                 quantityM: '',
//                 quantityL: '',
//                 quantityXL: '',
//                 quantityXXL: '',
//                 quantityXXXL:'',
//                 printSide: '',
//                 printSize: '',
//                 printSizeBack: '',
//                 file: null,
//                 image: null,
// brandLogo:null
                 
//               },
              {
                productType:'Blank Hoodie',
                color: 'Red',
                teshirtSize: {},
                categoryImg:"https://i.ibb.co/QbSnvWT/Hoodies-Red.jpg",
                quantityM: '',
                quantityL: '',
                quantityXL: '',
                quantityXXL: '',
                quantityXXXL:'',
                printSide: '',
                printSize: '',
                printSizeBack: '',
                file: null,
                image: null,
brandLogo:null
                 
              }
            ],

      });
  const {user}=useContext(AuthContext)
  
     const [cartItems, setCartItems] = useState([]);
    const isItemFilled = (item) => {
      // Example check - modify according to your needs
      return item.color && (item.quantityM || item.quantityL || item.quantityXL || item.quantityXXL || item.quantityXXXL);
    };
 
    // Function to add an item to cartItems
    const addToCart = (item) => {
      if (isItemFilled(item)) {
        setCartItems((prevItems) => [...prevItems, item]);
      }
    };
   
    const id=user?._id
    // const id="6527f49f8e263473dbad235b"
    // const id="6527f49f8e263473dbad235b"
    const fetchOrders = async () => {
      try {
          // const response = await fetch(`http://localhost:5000/getCartItemsbyregid/${id}`);
          const response = await fetch(`https://mserver.printbaz.com/getCartItemsbyregid/${id}`);
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setCartItems(data);
        
      } catch (error) {
          console.error('Error fetching orders:', error);
      }
    };
    useEffect(()=>{fetchOrders()},[cartItems])
 

const deleteCartItem = async (itemIdentifier) => {
  try {
    // Assuming itemIdentifier is a unique attribute to identify the item to be deleted
    const updatedCartItems = cartItems?.filter(item => item._id !== itemIdentifier);
    // Update the cart items in the local state
    setCartItems(updatedCartItems);
  
    // Update the cart items in the database
    // await fetch(`http://localhost:5000/deleteCartItem/${itemIdentifier}`, {
   await fetch(`https://mserver.printbaz.com/deleteCartItem/${itemIdentifier}`, {
      method: 'DELETE',
    });
   
     
    // const data = await response.json();
          // setCartItems(response);

  } catch (error) {
    console.error('Error deleting cart item:', error);

  }
};

 
const editCartItem = async (itemIdentifier, newData) => {
  const updatedData = {
    ...newData,
    orderDetailArr: newData?.orderDetailArr?.filter(isItemFilled),
    orderDetailArrCustomDropSholder: newData?.orderDetailArrCustomDropSholder?.filter(isItemFilled),
    orderDetailArrCustomHoodie: newData?.orderDetailArrCustomHoodie?.filter(isItemFilled),
    orderDetailArrBlankRoundNeck: newData?.orderDetailArrBlankRoundNeck?.filter(isItemFilled),
    orderDetailArrBlankDropSholder: newData?.orderDetailArrBlankDropSholder?.filter(isItemFilled),
    orderDetailArrBlankHoodie: newData?.orderDetailArrBlankHoodie?.filter(isItemFilled)
   
  };
  try {
    // Making a PUT request to the server to update the item
    // const response = await fetch(`http://localhost:5000/editCartItem/${itemIdentifier}`, {
    const response = await fetch(`https://mserver.printbaz.com/editCartItem/${itemIdentifier}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      console.log('Cart item updated successfully in the database');
      setCartItems(updatedData)
     
    } else {
      console.error('Error updating cart item on server');
    
    }
  } catch (error) {
    console.error('Network error while updating cart item:', error);
   
  }
};



  //   useEffect(() => {
  //     const savedCartItems = localStorage.getItem('cartItems');
  //     if (savedCartItems) {
  //         setCartItems(JSON.parse(savedCartItems));
  //     }
  // }, []);
  
    return (
      <CartContext.Provider value={{ formData,setFormData ,cartItems, setCartItems,deleteCartItem,editCartItem,addToCart}}>
        {children}
      </CartContext.Provider>
    );
  };
  