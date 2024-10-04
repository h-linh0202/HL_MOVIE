import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from './NextArrow';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../style/SliderMovieComponent.css"
import TittleComponent from "./TittleComponent"

const SliderMovieComponent = () => {
  const [movies, setMovies] = useState([]); // Khởi tạo state để lưu danh sách phim

  useEffect(() => {
    // Hàm để lấy dữ liệu phim từ API
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=1');
        setMovies(response.data.items.map(item => ({
          title: item.name,
          image: item.thumb_url,
          slug: item.slug // Lưu slug nếu có
        })));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies(); // Gọi hàm lấy dữ liệu
  }, []);

  // Cấu hình cho Slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className='mx-auto bg-gray-900' style={{ width: "96%" }}>
      <TittleComponent title="Phim mới nhất"/>
    

      <Slider {...settings}>
        {movies.map((movie, index) => (
          <Link to={`/movie/${movie.slug}`} key={index} className="relative group">
            <div className="overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-500 ease-in-out">
              <img
                src={`https://img.ophim.live/uploads/movies/${movie.image}`}
                alt={movie.title}
                className="w-full h-64 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              {/* Tiêu đề ban đầu hiển thị dưới hình ảnh */}
              <div className="p-3 text-base font-semibold absolute bottom-0 w-full bg-[#111827] opacity-80 text-white transition-opacity duration-300 group-hover:opacity-0 text-center">
                {movie.title}
              </div>
              {/* Tiêu đề giữa khi hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out text-white">
                <h2 className="text-lg font-semibold px-4">{movie.title}</h2>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default SliderMovieComponent;
