import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Cart, Products, Navbar, Checkout } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Support from './components/Support/Support';
import LogIn from './components/LogIn/LogIn';
import Register from './components/Register/Register';
import { fetchUser } from './redux/payment-api-slice';

const App = () => {

// ## Initializing States

    // for products API call
    const [products, setProducts] = useState ([]);

    // for order data
    const [order, setOrder] = useState({});

    // for error message
    const [errorMessage, setErrorMessage] = useState('');

    // for cart items
    const [cart, setCart] = useState({});

// Generating Functions

    // fetches product list from commerce js
    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    };

    // fetches customer's cart information from commerce js
    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    };

    // adds an item of the selected product to cart
    const handleAddToCart = async (productId, quantity) => {
        await commerce.cart.add(productId, quantity);
        fetchCart();
    };

    // changes product quantity inside cart
    const handleUpdateCartQty = async (productId, quantity) => {
        await commerce.cart.update(productId, {quantity});
        fetchCart();
    }

    // removes all of the selected item from cart
    const handleRemoveFromCart = async (productId) => {
        await commerce.cart.remove(productId);
        fetchCart();
    }

    // empties the current cart
    const handleEmptyCart = async () => {
        await commerce.cart.empty();
        fetchCart();
    }
    
    // creates a new cart object
    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    }

    // captures commerce js checkout
    const handleCaptureCheckout = async (checkoutToken, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutToken.id, newOrder);
            setOrder(incomingOrder);
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    }
    
    // fetches products and cart on app mount
    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

  return (
    <Router>
        <div>
                <Navbar cart={cart} />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/products' element={<Products products={products} onAddToCart={handleAddToCart}/>} />
                <Route path='/cart' element={<Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} handleEmptyCart={handleEmptyCart} />} />
                <Route path='/checkout' element={<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} refreshCart={refreshCart} />}/>
                <Route path='/support' element={<Support />} />
                <Route path='/login' element={<LogIn />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </div>
    </Router>
  )
}

export default App