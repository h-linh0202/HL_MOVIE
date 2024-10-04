import React from 'react';

const TittleComponent = ({ title, style }) => {
  return (
    <div>
      <h2 className='text-1xl uppercase font-bold py-2 text-white ml-3 bg-gradient-to-r from-[#194161] to-[#111827] px-5 py-2 rounded-md text-left w-1/4 mb-2'
          style={style}
      >
        {title}
      </h2>
    </div>
  );
}

export default TittleComponent;
