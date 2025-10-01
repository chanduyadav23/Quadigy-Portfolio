// src/components/PortfolioGrid.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './PortfolioGrid.css';
import { useProducts } from '../store/useProducts';

const PortfolioGrid = () => {
  const { items } = useProducts();

  // Only admin-added items
  const portfolioItems = items.map(it => ({
    id: it.id,
    category: it.category || 'general',
    title: it.title,
    image: it.image || it.url || ''
  }));

  return (
    <div className="portfolio-container">
      {portfolioItems.length === 0 ? (
        <p style={{ textAlign: 'center', opacity: 0.7 }}>
          No portfolio items yet. Please add from Admin.
        </p>
      ) : (
        portfolioItems.map((item, index) => (
          <Link to={`/portfolio/${item.id}`} key={index} className="portfolio-card">
            <div className="image-container">
              {item.image ? (
                <img src={item.image} alt={item.title} />
              ) : (
                <div
                  style={{
                    height: 250,
                    background: '#f2f2f2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span style={{ color: '#999' }}>No Image</span>
                </div>
              )}
            </div>
            <p className="category">/{item.category}</p>
            <h3 className="title">{item.title}</h3>
          </Link>
        ))
      )}
    </div>
  );
};

export default PortfolioGrid;
