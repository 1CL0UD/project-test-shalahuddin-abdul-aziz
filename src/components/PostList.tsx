import React from 'react';
import { Post } from '../interfaces/post';
import Pagination from './Pagination';

interface PostListProps {
  posts: Post[];
  total: number;
  page: number;
  lastPage: number;
  pageSize: number;
  sortBy: string;
  fetchError: boolean;
  handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleNumPerPage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handlePageChange: (pageNumber: number) => void;
}

const PostList = ({
  posts,
  total,
  page,
  lastPage,
  pageSize,
  sortBy,
  fetchError,
  handleSortChange,
  handleNumPerPage,
  handlePageChange,
}: PostListProps) => {
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

  return (
    <>
      <div className="flex flex-row flex-wrap items-center justify-between mb-8">
        <p className="text-sm font-medium text-gray-900">
          Showing {page}-{pageSize} of {total}
        </p>
        <div className="flex items-center">
          <div className="flex flex-wrap items-center">
            <label
              htmlFor="show_number"
              className="block mb-2 text-sm font-medium text-gray-900 mr-2"
            >
              Show per Page
            </label>
            <select
              id="show_number"
              value={pageSize}
              onChange={handleNumPerPage}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 mr-4"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="flex flex-wrap items-center">
            <label
              htmlFor="sort_by"
              className="block mb-2 text-sm font-medium text-gray-900 mr-2"
            >
              Sort By
            </label>
            <select
              id="sort_by"
              value={sortBy}
              onChange={handleSortChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
            >
              <option value="-published_at">Newest</option>
              <option value="published_at">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      {fetchError ? (
        <h1>Too Many Request to the API. Please try again later.</h1>
      ) : (
        <div className="grid grid-cols-4 gap-4 mb-8">
          {posts.map((post) => (
            <div key={post.id} className="rounded-xl shadow">
              <img
                src={post.medium_image[0].url}
                alt={post.title}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <small className="text-gray-500 block mt-2">
                  {formatDate(post.published_at)}
                </small>
                <h3 className="text-xl font-semibold mt-2">{post.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {fetchError ? (
        ''
      ) : (
        <Pagination
          currentPage={page}
          lastPage={lastPage}
          handlePageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default PostList;
