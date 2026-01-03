import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Styles
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  header: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '20px',
    marginBottom: '20px',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  navButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  productName: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  productPrice: {
    fontSize: '24px',
    color: '#27ae60',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  productDescription: {
    color: '#666',
    marginBottom: '15px',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  buttonSecondary: {
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    marginLeft: '10px',
  },
  form: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: '0 auto',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  cart: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
  },
  message: {
    padding: '10px 20px',
    borderRadius: '4px',
    marginBottom: '20px',
  },
  error: {
    backgroundColor: '#e74c3c',
    color: 'white',
  },
  success: {
    backgroundColor: '#27ae60',
    color: 'white',
  },
  searchInput: {
    padding: '10px 15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    width: '300px',
  },
};

function App() {
  const [page, setPage] = useState('products');
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const searchProducts = async (query) => {
    if (!query.trim()) {
      fetchProducts();
      return;
    }
    try {
      const response = await fetch(`${API_URL}/products/search/${encodeURIComponent(query)}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to search products:', error);
    }
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    showMessage('Product added to cart!', 'success');
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        setPage('products');
        showMessage('Login successful!', 'success');
      } else {
        showMessage(data.error || 'Login failed', 'error');
      }
    } catch (error) {
      showMessage('Login failed', 'error');
    }
  };

  const handleRegister = async (username, email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        setPage('products');
        showMessage('Registration successful!', 'success');
      } else {
        showMessage(data.error || 'Registration failed', 'error');
      }
    } catch (error) {
      showMessage('Registration failed', 'error');
    }
  };

  const handleCheckout = async (shippingAddress) => {
    if (!user) {
      showMessage('Please login to checkout', 'error');
      setPage('login');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          items: cart.map(item => ({ productId: item.id, quantity: item.quantity })),
          shippingAddress,
        }),
      });
      if (response.ok) {
        setCart([]);
        setPage('products');
        showMessage('Order placed successfully!', 'success');
      } else {
        showMessage('Checkout failed', 'error');
      }
    } catch (error) {
      showMessage('Checkout failed', 'error');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    showMessage('Logged out successfully', 'success');
  };

  return (
    <div>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={{ cursor: 'pointer' }} onClick={() => setPage('products')}>
            Security Demo Shop
          </h1>
          <nav style={styles.nav}>
            <button style={styles.navButton} onClick={() => setPage('products')}>
              Products
            </button>
            <button style={styles.navButton} onClick={() => setPage('cart')}>
              Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </button>
            {user ? (
              <>
                <span style={{ color: '#ecf0f1' }}>Welcome, {user.username}</span>
                <button style={styles.navButton} onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button style={styles.navButton} onClick={() => setPage('login')}>
                  Login
                </button>
                <button style={styles.navButton} onClick={() => setPage('register')}>
                  Register
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      <div style={styles.container}>
        {message && (
          <div style={{ ...styles.message, ...(message.type === 'error' ? styles.error : styles.success) }}>
            {message.text}
          </div>
        )}

        {page === 'products' && (
          <ProductList
            products={products}
            onAddToCart={addToCart}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={searchProducts}
          />
        )}

        {page === 'cart' && (
          <Cart
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            total={getCartTotal()}
            onCheckout={() => setPage('checkout')}
          />
        )}

        {page === 'checkout' && (
          <Checkout
            cart={cart}
            total={getCartTotal()}
            onSubmit={handleCheckout}
            onBack={() => setPage('cart')}
          />
        )}

        {page === 'login' && (
          <LoginForm onSubmit={handleLogin} onSwitch={() => setPage('register')} />
        )}

        {page === 'register' && (
          <RegisterForm onSubmit={handleRegister} onSwitch={() => setPage('login')} />
        )}
      </div>
    </div>
  );
}

function ProductList({ products, onAddToCart, searchQuery, setSearchQuery, onSearch }) {
  return (
    <div>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Search products..."
          style={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch(searchQuery)}
        />
        <button style={styles.button} onClick={() => onSearch(searchQuery)}>
          Search
        </button>
      </div>
      <div style={styles.productGrid}>
        {products.map(product => (
          <div key={product.id} style={styles.productCard}>
            <div style={styles.productName}>{product.name}</div>
            <div style={styles.productPrice}>${product.price}</div>
            <div style={styles.productDescription}>{product.description}</div>
            <div style={{ color: product.stock > 0 ? '#27ae60' : '#e74c3c', marginBottom: '10px' }}>
              {product.stock > 0 ? `In stock: ${product.stock}` : 'Out of stock'}
            </div>
            <button
              style={styles.button}
              onClick={() => onAddToCart(product)}
              disabled={product.stock <= 0}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Cart({ cart, onUpdateQuantity, onRemove, total, onCheckout }) {
  if (cart.length === 0) {
    return (
      <div style={styles.cart}>
        <h2>Your Cart</h2>
        <p style={{ marginTop: '20px' }}>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div style={styles.cart}>
      <h2>Your Cart</h2>
      {cart.map(item => (
        <div key={item.id} style={styles.cartItem}>
          <div>
            <strong>{item.name}</strong>
            <div>${item.price} each</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              style={{ ...styles.button, padding: '5px 10px' }}
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              style={{ ...styles.button, padding: '5px 10px' }}
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
            <button
              style={{ ...styles.buttonSecondary, padding: '5px 10px' }}
              onClick={() => onRemove(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div style={{ marginTop: '20px', fontSize: '20px', fontWeight: 'bold' }}>
        Total: ${total}
      </div>
      <button style={{ ...styles.button, marginTop: '20px' }} onClick={onCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
}

function Checkout({ cart, total, onSubmit, onBack }) {
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(address);
  };

  return (
    <div style={styles.form}>
      <h2 style={{ marginBottom: '20px' }}>Checkout</h2>
      <div style={{ marginBottom: '20px' }}>
        <strong>Order Summary:</strong>
        {cart.map(item => (
          <div key={item.id} style={{ marginTop: '10px' }}>
            {item.name} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
          </div>
        ))}
        <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
          Total: ${total}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <label style={styles.label}>Shipping Address</label>
        <textarea
          style={{ ...styles.input, minHeight: '100px' }}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit" style={styles.button}>Place Order</button>
        <button type="button" style={styles.buttonSecondary} onClick={onBack}>
          Back to Cart
        </button>
      </form>
    </div>
  );
}

function LoginForm({ onSubmit, onSwitch }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <div style={styles.form}>
      <h2 style={{ marginBottom: '20px' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <label style={styles.label}>Username</label>
        <input
          type="text"
          style={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label style={styles.label}>Password</label>
        <input
          type="password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p style={{ marginTop: '20px' }}>
        Don't have an account?{' '}
        <button style={{ ...styles.navButton, color: '#3498db' }} onClick={onSwitch}>
          Register
        </button>
      </p>
    </div>
  );
}

function RegisterForm({ onSubmit, onSwitch }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username, email, password);
  };

  return (
    <div style={styles.form}>
      <h2 style={{ marginBottom: '20px' }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <label style={styles.label}>Username</label>
        <input
          type="text"
          style={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label style={styles.label}>Email</label>
        <input
          type="email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label style={styles.label}>Password</label>
        <input
          type="password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={styles.button}>Register</button>
      </form>
      <p style={{ marginTop: '20px' }}>
        Already have an account?{' '}
        <button style={{ ...styles.navButton, color: '#3498db' }} onClick={onSwitch}>
          Login
        </button>
      </p>
    </div>
  );
}

export default App;
