import React, { useEffect, useState } from "react";
import axios from "axios";

interface Book {
  bookId: string;
  bookTitle: string;
  bookDesc: string;
  bookAuthor: string;
}

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [updatedBook, setUpdatedBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3030/getbooks");
        setBooks(response.data);
      } catch (err) {
        setError("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const openDeleteModal = (bookId: string) => {
    setSelectedBookId(bookId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedBookId(null);
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    if (selectedBookId) {
      try {
        await axios.delete(
          `http://localhost:3030/deletebook/${selectedBookId}`
        );
        setBooks(books.filter((book) => book.bookId !== selectedBookId));
        closeDeleteModal();
      } catch (err) {
        console.error("Error deleting book:", err);
        setError("Failed to delete book.");
      }
    }
  };

  const openUpdateModal = (bookId: string) => {
    const bookToUpdate = books.find((book) => book.bookId === bookId);
    if (bookToUpdate) {
      setUpdatedBook(bookToUpdate);
      setShowUpdateModal(true);
    }
  };

  const closeUpdateModal = () => {
    setUpdatedBook(null);
    setShowUpdateModal(false);
  };

  const handleUpdate = async () => {
    if (updatedBook) {
      try {
        await axios.put(
          `http://localhost:3030/updatebook/${updatedBook.bookId}`,
          {
            bookTitle: updatedBook.bookTitle,
            bookDesc: updatedBook.bookDesc,
            bookAuthor: updatedBook.bookAuthor,
          }
        );
        setBooks(
          books.map((book) =>
            book.bookId === updatedBook.bookId ? updatedBook : book
          )
        );
        closeUpdateModal();
      } catch (err) {
        console.error("Error updating book:", err);
        setError("Failed to update book.");
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (updatedBook) {
      setUpdatedBook({
        ...updatedBook,
        [name]: value,
      });
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-10">
        Book Collection
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <div
            key={book.bookId}
            className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {book.bookTitle}
              </h2>
              <p className="text-gray-600 text-sm mb-2">{book.bookDesc}</p>
              <p className="text-gray-500 text-sm">
                Author: <span className="font-semibold">{book.bookAuthor}</span>
              </p>
            </div>
            <div className="px-6 pb-6">
              <button className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300">
                Read More
              </button>
              <button
                onClick={() => openDeleteModal(book.bookId)}
                className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 mt-2"
              >
                Delete
              </button>
              <button
                onClick={() => openUpdateModal(book.bookId)}
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 mt-2"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal สำหรับยืนยันการลบ */}
      {showDeleteModal && selectedBookId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              คุณแน่ใจหรือไม่ว่าต้องการลบหนังสือเล่มนี้?
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                <span className="font-semibold">ชื่อหนังสือ:</span>{" "}
                {
                  books.find((book) => book.bookId === selectedBookId)
                    ?.bookTitle
                }
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">ผู้แต่ง:</span>{" "}
                {
                  books.find((book) => book.bookId === selectedBookId)
                    ?.bookAuthor
                }
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">คำอธิบาย:</span>{" "}
                {books.find((book) => book.bookId === selectedBookId)?.bookDesc}
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeDeleteModal}
                className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
              >
                ลบ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal สำหรับการอัปเดต */}
      {showUpdateModal && updatedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              อัปเดตหนังสือ
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="bookTitle"
                  className="block text-sm font-medium text-gray-700"
                >
                  ชื่อหนังสือ
                </label>
                <input
                  id="bookTitle"
                  type="text"
                  name="bookTitle"
                  value={updatedBook.bookTitle}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="bookDesc"
                  className="block text-sm font-medium text-gray-700"
                >
                  คำอธิบาย
                </label>
                <textarea
                  id="bookDesc"
                  name="bookDesc"
                  value={updatedBook.bookDesc}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="bookAuthor"
                  className="block text-sm font-medium text-gray-700"
                >
                  ผู้แต่ง
                </label>
                <input
                  id="bookAuthor"
                  type="text"
                  name="bookAuthor"
                  value={updatedBook.bookAuthor}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeUpdateModal}
                className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                อัปเดต
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
