import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from './NextArrow';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TittleComponent from "./TittleComponent"
import { BiCategory } from 'react-icons/bi';


const SliderCategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [moviesByCategory, setMoviesByCategory] = useState({});

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ophim1.com/v1/api/the-loai/');
        if (response.data && Array.isArray(response.data.data.items)) {
          setCategories(response.data.data.items);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách thể loại:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch movies by category
  const fetchMoviesByCategory = async (slug) => {
    try {
      const response = await axios.get(`https://ophim1.com/v1/api/the-loai/${slug}`);
      return response.data.data.items || [];
    } catch (error) {
      console.error(`Lỗi khi lấy phim cho thể loại ${slug}:`, error);
      return [];
    }
  };

 
  useEffect(() => {
    const loadMovies = async () => {
      const moviesObj = {};
      for (const category of categories) {
        const movies = await fetchMoviesByCategory(category.slug);
        if (Array.isArray(movies)) {
          moviesObj[category.slug] = movies.map(item => ({
            title: item.name,
            image: item.thumb_url || item.image,
            slug: item.slug,
          }));
        } else {
          moviesObj[category.slug] = [];
        }
      }
      setMoviesByCategory(moviesObj);
    };

    if (categories.length > 0) {
      loadMovies();
    }
  }, [categories]);

  return (
    <div className='slider-category mx-auto bg-gray-900' style={{ width: "96%" }}>
      {categories.length > 0 ? categories.map((category) => (
        <div key={category._id} className='category mb-8'>
          <TittleComponent title={category.name}/>
          
          <Slider {...{
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
          }}>
            {moviesByCategory[category.slug] && moviesByCategory[category.slug].length > 0 ? (
              moviesByCategory[category.slug].map((movie, index) => (
                <Link key={index} to={`/movie/${movie.slug}`} className="movie-item relative group">
                  <div className="movie-card overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-500 ease-in-out">
                    <img
                      src={`https://img.ophim.live/uploads/movies/${movie.image}`}
                      alt={movie.title}
                      className="movie-image w-full h-64 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                    <div className="movie-info p-3 text-base font-semibold absolute bottom-0 w-full bg-[#111827] opacity-80 text-white transition-opacity duration-300 group-hover:opacity-0 text-center">
                      {movie.title}
                    </div>
                    <div className="hover-info absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out text-white">
                      <h2 className="text-lg font-semibold px-4">{movie.title}</h2>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-white">Đang tải...</div>
            )}
          </Slider>
        </div>
      )) : (
        <p className="text-white">Đang tải thể loại...</p>
      )}
    </div>
  );
};

export default SliderCategoryComponent;
