import React, { useState, useEffect, useCallback } from 'react';
import Banner from './components/Banner';
import Header from './components/Header';
import PostList from './components/PostList'; // Make sure to export Post interface from PostList component
import { Post } from './interfaces/post';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState('-published_at');
  const [fetchError, setFetchError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${page}&page[size]=${pageSize}&append[]=small_image&append[]=medium_image&sort=${sortBy}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }
      );
      const data = await response.json();
      setPosts(data.data);
      setTotal(data.meta.total);
      setLastPage(data.meta.last_page);
      setFetchError(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setFetchError(true);
    }
  }, [page, pageSize, sortBy]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleNumPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedNum = parseInt(e.target.value, 10);
    setPageSize(isNaN(selectedNum) ? 10 : selectedNum);
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <>
      <div className="flex flex-col">
        <Header />
        <Banner />
      </div>
      <div className="flex flex-col p-16">
        <PostList
          posts={posts}
          total={total}
          page={page}
          lastPage={lastPage}
          pageSize={pageSize}
          sortBy={sortBy}
          fetchError={fetchError}
          handleSortChange={handleSortChange}
          handleNumPerPage={handleNumPerPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default App;
