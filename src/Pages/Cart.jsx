import React, { useEffect, useState } from "react";
import Empty from "../assets/empty_cart.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Sections/Footer";

const Cart = ({ cart, removeItem, changeQuantity }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const savedPrice = localStorage.getItem('selectedPrice');
    setPrice(savedPrice);
  }, []);

  const total = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += +(price * item.quantity);
    });
    return totalPrice;
  };

  return (
    <>
      <section>
        <div className="row">
          <div className="poster_selected-top">
            <h2 className="cart_title">Cart</h2>
          </div>
          <div className="cart_header">
            <span className="cart_poster">Poster</span>
            <span className="cart_quantity">Quantity</span>
            <span className="cart_total">Price</span>
          </div>
          <div>
            {cart.length === 0 ? (
              <>
                <div className="container">
                  <div className="cart_img-wrapper">
                    <img src={Empty} className="cart_img" alt="" />
                  </div>
                  <div>
                    <h1 className="empty_cart-header">
                      Uh Oh. Looks like your cart is empty.
                    </h1>
                    <p className="empty_cart-para">
                      Explore our amazing selection of movie & TV show posters
                      here.
                    </p>
                    <div className="sub-title_container">
                      <Link to="/Posters" className="cart_sub-title">
                        CONTINUE SHOPPING
                        <FontAwesomeIcon
                          icon={faForward}
                          className="foward_icon"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="cart_body">
                {cart.map((movie, index) => (
                  <>
                    <div className="cart_item">
                      <div key={index} className="cart_poster">
                        <img
                          className="cart_poster-img"
                          src={movie.Poster}
                          alt={movie.Title}
                        />
                        <div className="cart_poster-description">
                          <h2 className="cart_poster-title">{movie.Title}</h2>
                          <p className="cart_poster-price">
                            Price: ${price}.00
                          </p>
                          <button
                            className="remove_btn"
                            onClick={() => removeItem(movie.Poster)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="cart_quantity">
                        <input
                          type="number"
                          min={0}
                          max={99}
                          className="cart_input"
                          value={movie.quantity}
                          onChange={(event) =>
                            changeQuantity(movie, event.target.value)
                          }
                        />
                      </div>
                      <div className="cart_total">
                        ${price}.00
                      </div>
                    </div>
                  </>
                ))}
              </div>
            )}
          </div>
          {cart.length > 0 && (
            <div className="total">
              <div className="total__item total__sub-total">
                <span>Subtotal</span>
                <span>${(total() * 0.9).toFixed(2)}</span>
              </div>
              <div className="total__item total__tax">
                <span>Tax</span>
                <span>${(total() * 0.1).toFixed(2)}</span>
              </div>
              <div className="total__item total__price">
                <span>Total</span>
                <span>${total().toFixed(2)}</span>
              </div>
              <button
                className="btn btn__checkout no-cursor"
                onClick={() => alert("Not Implemented Yet :(")}
              >
                Proceed to checkout
              </button>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;
