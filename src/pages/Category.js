import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
import SidebarComponent from '../component/SidebarComponent';

const Category = () => {
  const { slug } = useParams(); 
  const [movies, setMovies] = useState([]); 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://ophim1.com/v1/api/the-loai/${slug}`);
        const items = response.data.data?.items;

        if (items) {
          setMovies(items.map(item => ({
            id: item._id, 
            title: item.name,
            image: item.thumb_url,
            slugs: item.slug
          })));
        }
      } catch {
        console.error("Error fetching movies.");
      }
    };

    fetchMovies(); 
  }, [slug]); 

  return (
    <div className='bg-[#111827] text-white'>
      <Header />

      <div className="flex pt-28 flex-col lg:flex-row">
        {/* Sidebar Component */}
        <div className="lg:w-1/5 w-full lg:pl-5 lg:pt-10 px-4">
          <SidebarComponent />
        </div>

        {/* Nội dung phim */}
        <div className="lg:w-4/5 w-full p-6">
          <h1 className="text-3xl font-bold mb-6 uppercase">{slug}</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"> 
            {
              movies.map((movie) => (
                <div key={movie.id} className="relative group transform hover:scale-105 transition-all duration-500 ease-in-out">
                  <Link to={`/movie/${movie.slugs}`}>
                    <div className="overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-500 ease-in-out">
                      <img
                        className="w-full h-64 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        src={`https://img.ophim.live/uploads/movies/${movie.image}`}
                        alt={movie.title}
                      />
                      {/* Tiêu đề ban đầu hiển thị dưới hình ảnh */}
                      <div className="p-3 text-base font-semibold absolute bottom-0 w-full bg-[#111827] opacity-80 text-white group-hover:opacity-0 transition-opacity duration-300 text-center">
                        {movie.title}
                      </div>
                      {/* Tiêu đề giữa khi hover */} 
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out text-white w-3/4 mx-auto">
                        <h2 className="text-lg font-semibold">{movie.title}</h2>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Category;
