import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/MovieList.css'

const MovieList = () => {
  // State để lưu danh sách phim, trạng thái tải và lỗi
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Hàm lấy danh sách phim từ API
    const fetchMovies = async () => {
      try {
        // Gửi yêu cầu GET tới API để lấy danh sách phim
        const { data } = await axios.get('https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=1');
        // Cập nhật danh sách phim vào state, nếu không có 'items', sử dụng mảng rỗng
        setMovies(data.items || []);
      } catch (err) {
        // Cập nhật thông báo lỗi nếu có lỗi xảy ra trong quá trình lấy dữ liệu
        setError('Lỗi: ' + err.message);
      } finally {
        // Đặt trạng thái tải là false khi quá trình lấy dữ liệu hoàn tất (thành công hoặc lỗi)
        setLoading(false);
      }
    };

    // Gọi hàm fetchMovies khi component được render lần đầu tiên
    fetchMovies();
  }, []); // Mảng phụ thuộc rỗng để chỉ chạy effect khi component được mount

  // Hiển thị thông báo đang tải khi dữ liệu vẫn đang được lấy
  if (loading) return <p>Đang tải...</p>;
  // Hiển thị thông báo lỗi nếu có lỗi xảy ra
  if (error) return <p>{error}</p>;

  return (
    <div className="movie-list">
      <h1>Danh sách phim mới</h1>
      <ul>
        {movies.length ? (
          // Hiển thị danh sách phim nếu có phim
          movies.map(movie => (
            <li key={movie._id}>
              <Link to={`/moviedetail/${movie._id}`}>
                <img src={`https://img.ophim.live/uploads/movies/${movie.poster_url}`} alt={movie.name} />
                <h2>{movie.name}</h2>
                <p>{movie.year}</p>
              </Link>
            </li>
          ))
        ) : (
          // Hiển thị thông báo khi không có phim nào
          <p>Không có phim nào để hiển thị.</p>
        )}
      </ul>
    </div>
  );
};

export default MovieList;
