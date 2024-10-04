import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';

const AllCategory = () => {
  const [categories, setCategories] = useState([]); // State để lưu danh sách thể loại
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading
  const [error, setError] = useState(null); // State để quản lý lỗi

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ophim1.com/v1/api/the-loai/');
        console.log("Dữ liệu nhận được:", response.data); // In ra dữ liệu để kiểm tra
        if (response.data.status === 'success') {
          console.log("Danh sách thể loại:", response.data.data.items); // In ra danh sách thể loại
          setCategories(response.data.data.items);
        } else {
          setError("Không tìm thấy thể loại.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thể loại:", error);
        setError("Có lỗi xảy ra. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchCategories();
  }, []);

  // Hiển thị thông báo khi đang tải
  if (loading) {
    return <div className="text-white">Đang tải thể loại...</div>;
  }

  // Hiển thị thông báo lỗi nếu có
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-[#111827] text-white ">
      <Header />
      <h2 className="text-3xl font-bold mb-6 uppercase">Tất cả thể loại</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-28">
        {categories.map(category => (
          <Link key={category._id} to={`/category/${category.slug}`} className="border relative group transform hover:scale-105 transition-all duration-500 ease-in-out">
            <div className="bg-[#111827]  overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-500 ease-in-out h-64 bg-cover bg-center">
              {/* Tiêu đề thể loại */}
              <div className="p-3 text-lg font-semibold absolute bottom-0 w-full bg-black opacity-80 to-transparent text-white group-hover:opacity-0 transition-opacity duration-300">
                {category.name}
              </div>
              {/* Tiêu đề giữa khi hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out text-white w-3/4 mx-auto">
                <h2 className="text-3xl font-semibold">{category.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default AllCategory;
