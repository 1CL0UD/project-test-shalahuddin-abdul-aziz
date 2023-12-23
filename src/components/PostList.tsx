import React, { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  published_at: string;
  medium_image: { url: string }[];
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState('-published_at');

  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
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
        setFetchError(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setFetchError(true);
      }
    };

    fetchData();
  }, [page, pageSize, sortBy]);

  // Function to handle sorting
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

  function formatDate(dateString: string | number | Date) {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      'id-ID',
      options
    );
    return formattedDate;
  }

  // Render the posts
  return (
    <div>
      <div className="flex flex-row flex-wrap items-center justify-end">
        <label
          htmlFor="show_number"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Show per Page
        </label>
        <select
          id="show_number"
          value={pageSize}
          onChange={handleNumPerPage}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 me-8 ms-4"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <label
          htmlFor="sort_by"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Sort By
        </label>
        <select
          id="sort_by"
          value={sortBy}
          onChange={handleSortChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 me-8 ms-4"
        >
          <option value="-published_at">Newest</option>
          <option value="published_at">Oldest</option>
        </select>
      </div>

      {fetchError ? (
        <h1>Error fetching data. Please try again later.</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="border rounded-4 p-4">
              <img
                src={post.medium_image[0].url}
                alt={post.title}
                className="w-full h-auto"
                loading="lazy"
              />
              <small className="text-gray-500 block mt-2">
                {formatDate(post.published_at)}
              </small>
              <h3 className="text-xl font-semibold mt-2">{post.title}</h3>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-row justify-between">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <span>{page}</span>
        <button onClick={() => handlePageChange(page + 1)}>Next Page</button>
      </div>
    </div>
  );
};

export default PostList;
