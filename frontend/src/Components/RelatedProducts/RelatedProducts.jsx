import React, { useEffect, useState } from 'react';
import './RelatedProducts.css';
import Item from '../Item/Item';
import { backend_url } from '../../App';

const RelatedProducts = ({ category, id }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    fetch(`${backend_url}/relatedproducts`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category }),
    })
      .then((res) => res.json())
      .then((data) => setRelated(data))
      .catch((err) => console.error('Error fetching related products:', err));
  }, [category]); // Added 'category' as a dependency

  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {related.map((item, index) => (
          id !== item.id ? (
            <Item
              key={item.id} // Use item.id for a more unique key
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ) : null // Return null if id matches item.id
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
