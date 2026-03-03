import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home">

            {/* HERO SECTION */}
            <section className="home-hero">
                <h1>
                    Welcome to <span>MERN Shop</span>
                </h1>

                <p>
                    Your one-stop destination for quality products at the best prices.
                </p>

                <div className="home-actions">
                    <Link to="/products" className="btn btn-primary">
                        Explore Products
                    </Link>

                    <Link to="/login" className="btn btn-outline">
                        Login
                    </Link>
                </div>
            </section>

            {/* INFO SECTION */}
            <section className="home-info">
                <div className="info-card card">
                    <h3>Quality Products</h3>
                    <p>We provide hand-picked, premium quality products.</p>
                </div>

                <div className="info-card card">
                    <h3>Secure Payments</h3>
                    <p>Your payments are safe and fully secured.</p>
                </div>

                <div className="info-card card">
                    <h3>Fast Delivery</h3>
                    <p>Quick and reliable delivery to your doorstep.</p>
                </div>
            </section>

        </div>
    );
};

export default Home;