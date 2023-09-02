const express = require("express");
const router = express.Router();
const books = [];

const validateBook = (req, res, next) => {
  const bookId = req.params.id;
  const requestBody = req.body;
  const bookIndex = books.findIndex((book) => book.id == bookId);

  if (bookIndex < 0) {
    return res.status(404).json({
      message: "Book not found",
      status: "Error",
    });
  }

  if (Object.keys(requestBody).length == 0) {
    return res.status(400).json({
      message: "Request body is required for updating",
      status: "Error",
    });
  }
  next();
};

const deleteBookMiddleware = (req, res, next) => {
  const bookId = req.params.id;
  const bookIndex = books.findIndex((book) => book.id == bookId);

  if (bookIndex < 0) {
    return res.status(404).json({
      message: "Book not found",
      status: "Error",
    });
  }
  next();
};

router.get("", (req, res) => {
  return res.status(200).json({
    message: "Successfully fetched books",
    status: "Success",
    data: books,
  });
});

router.post("", (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Request body is required",
      status: "Error",
    });
  }

  books.push(req.body);
  return res.status(200).json({
    message: "Successfully added book",
    status: "Success",
    data: books,
  });
});

router.put("/:id", validateBook, (req, res) => {
  const bookId = req.params.id;
  const body = req.body;
  const bookIndex = books.findIndex((book) => book.id == bookId);
  books[bookIndex] = {
    ...books[bookIndex],
    ...body,
  };

  return res
    .json({
      message: "Book updated successfully",
      status: "success",
      data: books,
    })
    .status(200);
});

router.delete("/:id", deleteBookMiddleware, (req, res) => {
  const bookId = req.params.id;
  const bookIndex = books.findIndex((book) => book.id == bookId);
  books.splice(bookIndex, 1);

  return res
    .json({
      message: "Book deleted successfully",
      status: "success",
      data: books,
    })
    .status(200);
});


module.exports = router;
