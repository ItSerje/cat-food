import ProductCard from '../productCard/ProductCard';
import cards from '../../cards-data.json';
import './product-card-list.css';
import { useState } from 'react';

const ProductCardList = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleClick = (id: string) => {
    setSelected((curr) => {
      if (curr.includes(id)) {
        return curr.filter((item) => item !== id);
      } else {
        return [...curr, id];
      }
    });
  };

  if (!cards) return null;

  return (
    <section className='section'>
      <h2 className='product-card-list__title'>Ты сегодня покормил кота?</h2>
      <div className='product-card-list'>
        {cards.map((card) => (
          <ProductCard
            card={card}
            key={card.id}
            selected={selected.includes(card.id)}
            onClick={() => {
              !card.disabled && handleClick(card.id);
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductCardList;
