import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TittleComponent from "./TittleComponent";

const SidebarComponent = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await axios.get('https://ophim1.com/v1/api/danh-sach/phim-sap-chieu');
        if (response.data && response.data.data && response.data.data.items) {
          setUpcomingMovies(response.data.data.items);
        }
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };

    fetchUpcomingMovies();
  }, []);

  return (
    <div className="sidebar border-r-2 border-[#194161] bg-gray-900 p-6 pt-0 text-white shadow-lg h-full">
      <TittleComponent title="Phim sắp chiếu" style={{ width: "100%", marginLeft: "0px" }} />
      <ul className="grid grid-cols-2 gap-4"> {/* Use grid for two columns with gap */}
        {upcomingMovies.length > 0 ? (
          upcomingMovies.map((movie) => (
            <li key={movie._id} className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition duration-300"> 
              <img 
                src={`https://img.ophim.live/uploads/movies/${movie.thumb_url}`} 
                alt={movie.name} 
                className="rounded-full w-24 h-24 object-cover shadow-md transition-transform duration-300 hover:scale-105" 
              />
              <span className="text-sm font-semibold text-[#1879bf] mt-2">{movie.name}</span> 
              {movie.origin_name && (
                <span className="block text-xs text-gray-400 mt-1">{movie.origin_name}</span> 
              )}
            </li>
          ))
        ) : (
          <li className="text-center text-gray-400">Không có phim sắp chiếu</li>
        )}
      </ul>
    </div>
  );
};

export default SidebarComponent;
