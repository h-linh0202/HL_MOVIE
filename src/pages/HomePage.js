import React from 'react';
import Header from '../component/Header';

import { FaGripfire, FaPlay } from 'react-icons/fa';
import ButtonComponent from '../component/ButtonComponent';
import "../style/HomePage.css";
import SliderMovieComponent from '../component/SliderMovieComponent';
import SliderCategoryComponent from '../component/SliderCategoryComponent';
import Footer from '../component/Footer';
import { Link } from 'react-router-dom';
import SidebarComponent from '../component/SidebarComponent'; 

const HomePage = () => {
  return (
    <div className='bg-gray-900'>

      <div className="containes h-screen bg-gray-900">
        <Header />

        <div className="relative h-5/6 w-full bg-gray-900">
          <video 
            style={{ 
              pointerEvents: "none",
              clipPath: "inset(0% 0 9% 0)", 
              objectFit: "cover"
            }}
            title="External Video"
            src="https://trailer.vieon.vn/Teaser_TheLadyandHerLovers.mp4"
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 opacity-40 bg-[#111827] h-full" style={{ clipPath: "inset(0% 0 5% 0)" }}></div>
          <div className='relative bottom-2/3 left-5 md:left-20 text-white w-full md:w-2/5 p-5'>
            <h1 className='text-4xl md:text-6xl lg:text-8xl uppercase font-serif'>Thiên sứ tội lỗi</h1>
            <h3 className='text-lg md:text-2xl font-thin mt-5 mb-3'>#1 Tại HLinh hôm nay</h3>
            <p className='text-xs md:text-base'>Bị buộc tội giết người trong một vụ án bí ẩn mà không tìm thấy xác chết. 10 năm sau, Jeong U quyết tâm vén màn sự thật về ngày định mệnh đó.</p>
            <div className='flex flex-col sm:flex-row mt-9'>
              <Link to="/" className="w-full sm:w-auto">
                <ButtonComponent 
                  text={<><FaPlay /><span className='pl-5 text-xs sm:text-2xl'>Xem ngay</span></>} 
                  style={{ background: "#2222226f", padding: "10px 15px", fontSize: "12px" }} // Kích thước nhỏ hơn trên mobile
                />
              </Link>

              <Link to="/the-loai" className="w-full sm:w-auto mt-2 sm:mt-0 sm:ml-4">
                <ButtonComponent 
                  text={<><FaGripfire /> <span className='pl-5 text-xs sm:text-2xl'>Xem tất cả thể loại</span></>} 
                  style={{ background: "#2222226f", padding: "10px 15px", fontSize: "12px" }} // Kích thước nhỏ hơn trên mobile
                />
              </Link>
            </div>


          </div>
        </div>

        <div className='px-4'>
          <SliderMovieComponent />
        </div>

        <div className='flex flex-col lg:flex-row bg-gray-900 px-4 lg:px-0'>
          {/* Sidebar cho thiết bị nhỏ sẽ được đẩy xuống dưới cùng nếu không đủ chiều rộng */}
          <div className="w-full lg:w-1/5 lg:pl-5 pt-10">
            <SidebarComponent />
          </div>

          <div className="w-full lg:w-4/5 pt-10">
            <SliderCategoryComponent />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
