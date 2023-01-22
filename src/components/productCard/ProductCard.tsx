import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Card } from '../../models/Card';
import './product-card.css';
import ReactMarkdown from 'react-markdown';
import img1x from '../../assets/img/cat@1x.png';
import img2x from '../../assets/img/cat@2x.png';

interface ProductCardProps {
  card: Card;
  selected: boolean;
  onClick: () => void;
}

const ProductCard: FC<ProductCardProps> = ({ card, selected, onClick }) => {
  const [isSelectedHovered, setIsSelectedHovered] = useState<boolean>(false);

  const productCartContainerRef = useRef<HTMLDivElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const a = ctaContainerRef.current?.querySelectorAll('a[href="#"]'); // applied only to json data with href='#'
    if (a?.length) {
      a.forEach((item) => {
        if (item?.textContent) {
          const span = document.createElement('span');
          span.textContent = item.textContent;
          span.addEventListener('click', onClick);
          //   item.replaceWith(span);
          item.parentElement?.replaceChild(span, item);
        }
      });
    }
  }, [selected]);

  useEffect(() => {
    const mouseOutListener = () => {
      setIsSelectedHovered(false);
    };

    const mouseOverListener = () => {
      setIsSelectedHovered(true);
    };

    const clickListener = () => {
      if (!selected) setIsSelectedHovered(false);
    };

    productCartContainerRef.current?.addEventListener('mouseleave', () => {
      mouseOutListener();
      console.log('mouse out');
    });
    productCartContainerRef.current?.addEventListener('mouseenter', () => {
      mouseOverListener();
      console.log('mouse over');
    });
    productCartContainerRef.current?.addEventListener('click', clickListener);
  }, []);

  return (
    <article
      className={`product-card${selected ? ' selected' : ''}${
        card.disabled ? ' disabled' : ''
      }`}
    >
      <div
        className='product-card__container'
        ref={productCartContainerRef}
        onClick={onClick}
      >
        <div className='product-card__text-block'>
          <div className='product-card__product-type'>
            {selected && isSelectedHovered
              ? card.productTypeSelectedHover
              : card.productType}
          </div>
          <h2 className='product-card__product-title'>{card.productTitle}</h2>
          <h3 className='product-card__product-subtitle'>
            {card.productSubtitle}
          </h3>
          {card.productSpecs?.map((spec, index) => (
            <ReactMarkdown
              className={'product-card__product-specs'}
              components={{ p: 'div' }}
              key={index}
            >
              {spec}
            </ReactMarkdown>
          ))}
        </div>
        <div className='product-card__circle'>
          {card.productWeight}
          <span>{card.productWeightUnit}</span>
        </div>
        <div className='product-card__image-wrapper'>
          <img
            srcSet={`${img1x} 1x, ${img2x} 2x`}
            src={img2x}
            alt='Котэ'
            className='product-card__image'
          />
        </div>
      </div>
      <div className='product-card__cta' ref={ctaContainerRef}>
        {selected && card.cardCtaTextSelected && (
          <ReactMarkdown>{card.cardCtaTextSelected}</ReactMarkdown>
        )}
        {card.disabled && card.cardCtaTextDisabled && (
          <ReactMarkdown>{card.cardCtaTextDisabled}</ReactMarkdown>
        )}
        {!selected && !card.disabled && card.cardCtaText && (
          <ReactMarkdown>{card.cardCtaText}</ReactMarkdown>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
