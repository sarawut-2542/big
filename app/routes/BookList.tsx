// src/BookList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Book {
  bookId: string;
  bookTitle: string;
  bookDesc: string;
  bookAuthor: string;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]); // สถานะในการเก็บข้อมูลหนังสือ
  const [loading, setLoading] = useState(true); // สถานะในการโหลดข้อมูล
  const [error, setError] = useState(""); // สถานะในการจัดการข้อผิดพลาด

  // ดึงข้อมูลหนังสือจาก Firebase
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // ส่ง request ไปที่ API เพื่อดึงข้อมูล
        const response = await axios.get("http://localhost:3030/getbooks");
        setBooks(response.data); // เก็บข้อมูลที่ดึงมา
      } catch (err) {
        setError("Failed to fetch books.");
      } finally {
        setLoading(false); // หมดสถานะการโหลด
      }
    };
    fetchBooks();
  }, []);

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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
