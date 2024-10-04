import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaRegUserCircle, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LOGO from '../img/LOGO.png';

const Header = () => {
  const [Category, SetCategory] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get('https://ophim1.com/v1/api/the-loai/');
        if (response.data && response.data.data && response.data.data.items) {
          SetCategory(
            response.data.data.items.map((item) => ({
              title: item.name,
              slug: item.slug,
            }))
          );
        } else {
          console.error("No 'items' found in the response");
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategory();

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-[#111827] fixed w-full z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-white p-2 shadow-md">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/">
            <img
              className="h-12 md:h-16 lg:h-20 object-cover"
              src={LOGO}
              alt="Logo"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center space-x-6 mt-4 md:mt-0">
          <Link
            to="/"
            className="text-sm md:text-base lg:text-lg font-bold hover:text-red-600 transition duration-300"
          >
            Trang chủ
          </Link>
          <Link
            to="/phim-moi-nhat"
            className="text-sm md:text-base lg:text-lg font-bold hover:text-red-600 transition duration-300"
          >
            Phim mới nhất
          </Link>
          <Link
            to="/phim-bo"
            className="text-sm md:text-base lg:text-lg font-bold hover:text-red-600 transition duration-300"
          >
            Phim bộ
          </Link>
          <Link
            to="/phim-le"
            className="text-sm md:text-base lg:text-lg font-bold hover:text-red-600 transition duration-300"
          >
            Phim lẻ
          </Link>
          

          {/* Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="text-sm md:text-base lg:text-lg font-bold hover:text-red-600 transition duration-300 focus:outline-none"
            >
              Thể loại
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-[rgba(0,0,0,0.85)] text-white p-2 rounded-lg shadow-lg w-full md:w-96">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {Category.length > 0 ? (
                    Category.map((category, index) => (
                      <Link
                        key={index}
                        to={`/the-loai/${category.slug}`}
                        className="block px-2 py-1 hover:bg-white hover:text-black transition duration-300"
                      >
                        {category.title}
                      </Link>
                    ))
                  ) : (
                    <p className="col-span-3 text-center">Không có thể loại nào</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* User and Search Section */}
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {/* Search Input */}
          <div className="flex items-center">
            <input
              style={{ background: 'none' }}
              type="text"
              placeholder="Tìm kiếm phim..."
              className="ml-2 p-2 bg-transparent border-b-2 border-gray-400 focus:outline-none text-white"
            />
            <FaSearch className="text-xl cursor-pointer" />

          </div>
          <Link
            to="/"
            className="text-xs md:text-sm lg:text-base font-semibold hover:text-red-600"
          >
            Đăng ký tháng
          </Link>
          <FaRegUserCircle style={{ fontSize: '30px' }} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Header;
