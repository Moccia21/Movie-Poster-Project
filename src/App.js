import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Posters from "./Pages/Posters";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import MovieInfo from "./Sections/MovieInfo";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/init";
import Header from "./Sections/Header";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Current User:', currentUser)
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (movie) => {
    setCart((prevCart) => [...prevCart, movie]);
  };

  // Load cart from LocalStorage when the app starts
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    console.log("Loaded cart from localStorage:", savedCart);
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);
  
  // Save cart to LocalStorage whenever it changes
  useEffect(() => {
    console.log("Saving cart to localStorage:", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function changeQuantity(movie, quantity) {
    setCart(
      cart.map((item) =>
        item.id === movie.id
        ? {
          ...item,
          quantity: +quantity,
        }
        : item
    )
  );
  }

  function updateCart(item, newQuantity) {
    setCart((oldCart) =>
      oldCart.map((oldItem) => {
        if (oldItem.id === item.id) {
          return {
            ...oldItem,
            quantity: newQuantity,
          };
        } else {
          return oldItem;
        }
      })
    );
  }

  function removeItem(item) {
    setCart((oldCart) => oldCart.filter((cartItem) => cartItem.id !== item.id));
  }

  function numOfItems() {
    let counter = 0;
    cart.forEach((item) => {
      counter += +item.quantity;
    });
    return counter;
  }


  return (
    <div className="App">
      <>
        <Router>
          <Header user={user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Posters" element={<Posters />} />
            <Route path="/movie/:id" element={<MovieInfo addToCart={addToCart} />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Cart" element={<Cart cart={cart} updateCart={updateCart} changeQuantity={changeQuantity} removeItem={removeItem} />} />
          </Routes>
        </Router>
      </>
    </div>
  );
}

export default App;
