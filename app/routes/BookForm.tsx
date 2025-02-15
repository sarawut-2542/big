// src/BookForm.tsx
import React, { useState } from "react";
import axios from "axios";

const BookForm: React.FC = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [bookDesc, setBookDesc] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // สถานะของ Popup

  // ฟังก์ชันในการส่งข้อมูลไปยัง server
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // เริ่มทำการส่งข้อมูล
    setResponseMessage("");

    try {
      // ส่งข้อมูลไปที่ API ของ server
      const response = await axios.post("http://localhost:3030/addbook", {
        bookTitle,
        bookDesc,
        bookAuthor,
      });

      // หลังจากส่งข้อมูลสำเร็จ
      setResponseMessage(
        `Book added successfully. ID: ${response.data.bookId}`
      );
      // เคลียร์ข้อมูลในฟอร์ม
      setBookTitle("");
      setBookDesc("");
      setBookAuthor("");
    } catch (error) {
      setResponseMessage("Failed to add book. Please try again.");
    } finally {
      setIsSubmitting(false); // เลิกสถานะการส่งข้อมูล
      setShowPopup(true); // เปิด Popup หลังจากส่งข้อมูลเสร็จ
    }
  };

  // ฟังก์ชันในการปิด Popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-6">
        Add New Book
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-8 shadow-xl rounded-lg"
      >
        <div className="mb-5">
          <label
            htmlFor="bookTitle"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Book Title
          </label>
          <input
            id="bookTitle"
            type="text"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="bookDesc"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Book Description
          </label>
          <textarea
            id="bookDesc"
            value={bookDesc}
            onChange={(e) => setBookDesc(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="bookAuthor"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Book Author
          </label>
          <input
            id="bookAuthor"
            type="text"
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {isSubmitting ? "Adding..." : "Add Book"}
        </button>
      </form>

      {/* Popup when book added successfully */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold text-center text-green-500">
              Success
            </h2>
            <p className="mt-4 text-lg text-center">{responseMessage}</p>
            <div className="mt-6 flex justify-center">
              <button
                onClick={closePopup}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookForm;
