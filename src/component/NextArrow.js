import React from 'react';

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', right: '10px' }} // Đặt vị trí mũi tên phải
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', left: '10px', zIndex: 1}} // Đặt vị trí mũi tên trái
      onClick={onClick}
    />
  );
};

export { NextArrow, PrevArrow };
