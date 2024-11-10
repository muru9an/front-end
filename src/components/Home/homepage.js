import React from 'react';
import './homepage.css'; // Ensure to create this CSS file
import { useNavigate } from 'react-router-dom';

const HomePage = () => {


  return (
    <div className="HomePage">
     
      {/* Property Management Section */}
      <section className="property-management-section">
        <div className="property-management-content">
          <div className="property-management-text">
            <h1>Manage Your Properties</h1>
            <p>Efficiently manage multiple properties under your company to maximize tax benefits.</p>
            <div className="button-container">
              <button className="cta-button">Add New Property</button> <br/>
              <button className="cta-button">View Your Properties</button>  <br/>
              <button className="cta-button">Calculate Tax Savings</button>  <br/>
            </div>
          </div>
          <div className="property-management-image">
            <img src="/property_main.png" alt="Property Management" />
          </div>
        </div>
      </section>

      {/* Company Management Section */}
      <section className="company-management-section">
      <h2 style={{ textAlign: 'center' }}>Establish Your Company</h2>
        <p style={{ textAlign: 'center' }}>Register a company to maintain your properties and reduce your income tax.</p>
        <div style={{ textAlign: 'center' }}>
        <button class="register-btn">Register Your Company</button>

</div>

      </section>

      {/* Statistics Section */}
      <section className="statistics-section">
        <div className="statistics">
          <div>
            <h3>$15.6M</h3>
            <p>Total property value</p>
          </div>
          <div>
            <h3>25K+</h3>
            <p>Happy customers</p>
          </div>
          <div>
            <h3>500+</h3>
            <p>Properties available</p>
          </div>
          <div>
            <h3>600+</h3>
            <p>Local agents</p>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="featured-section">
        <h2 style={{ textAlign: 'center' }}>Featured Properties</h2>
        <div className="property-cards">
          <div className="property-card">
            <img src="/property1.png" alt="Property 1" />
            <h3>Luxurious Family Home</h3>
           
          </div>
          <div className="property-card">
            <img src="/property2.png" alt="Property 2" />
            <h3>Modern Apartment</h3>
                     </div>
          <div className="property-card">
            <img src="/property3.png" alt="Property 3" />
            <h3>Cozy Cottage</h3>
            
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 style={{ textAlign: 'center' }} >Simple & easy way to manage your properties</h2>
          <div style={{ textAlign: 'center' }}>
    <button class="register-btn">Get Started</button>
</div>
        </div>
      </section>

      {/* News Section */}
      <section className="news-section">
       
        <div className="news-cards">
          <div className="news-card">
            <img src="/news1.png" alt="News 1" />
           
          </div>
          <div className="news-card">
            <img src="/news2.png" alt="News 2" />
         
          </div>
          <div className="news-card">
            <img src="/news3.png" alt="News 3" />
                     </div>
        </div>
      </section>

     
    </div>
  );
};

export default HomePage;
