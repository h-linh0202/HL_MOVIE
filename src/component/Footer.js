import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className= "bg-[#0f1523] text-white py-10 border border-t-2 border-[#194161]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h2 className="text-lg font-bold mb-4 border-b-2 border-red-600 pb-2">Giới thiệu</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline hover:text-red-400 transition duration-300">Về chúng tôi</a></li>
              <li><a href="#" className="hover:underline hover:text-red-400 transition duration-300">Tin tức</a></li>
              <li><a href="#" className="hover:underline hover:text-red-400 transition duration-300">Liên hệ</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4 border-b-2 border-red-600 pb-2">Phim</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline hover:text-red-400 transition duration-300">Phim mới</a></li>
              <li><a href="#" className="hover:underline hover:text-red-400 transition duration-300">Phim hot</a></li>
              <li><a href="#" className="hover:underline hover:text-red-400 transition duration-300">Thể loại</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4 border-b-2 border-red-600 pb-2">Hỗ trợ</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline hover:text-red-400 transition duration-300">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="hover:underline hover:text-red-400 transition duration-300">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:underline hover:text-red-400 transition duration-300">Điều khoản sử dụng</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4 border-b-2 border-red-600 pb-2">Theo dõi chúng tôi</h2>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-red-400 transition duration-300"><FaFacebook size={28} /></a>
              <a href="#" className="hover:text-red-400 transition duration-300"><FaTwitter size={28} /></a>
              <a href="#" className="hover:text-red-400 transition duration-300"><FaInstagram size={28} /></a>
              <a href="#" className="hover:text-red-400 transition duration-300"><FaYoutube size={28} /></a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-700 pt-6 text-center">
          <p className="text-base opacity-75">© {new Date().getFullYear()} HOAILINH. Bảo lưu mọi quyền.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
