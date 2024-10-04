import React from 'react';
import "../style/ButtonComponent.css"; // Đảm bảo đường dẫn đúng

const ButtonComponent = ({ text, style, onClick }) => {
  return (
    <button
      style={style}  // Sửa ở đây
      onClick={onClick}
      className="button"
    >
      {text}
    </button>
  );
};

export default ButtonComponent;
