const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/admin");
const { uploadSingle, handleUploadError } = require("../middleware/upload");
const { 
  addSweet, 
  getSweets, 
  searchSweets, 
  updateSweet, 
  deleteSweet, 
  purchaseSweet,
  restockSweet  
} = require("../controllers/sweetController");


// Protected
router.post("/", auth, admin, uploadSingle, handleUploadError, addSweet);
router.get("/search", auth, searchSweets);
router.put("/:id", auth, admin, uploadSingle, handleUploadError, updateSweet);
router.post("/:id/purchase", auth, purchaseSweet);
router.delete("/:id", auth, admin, deleteSweet);
router.post("/:id/restock", auth, admin, restockSweet);


// Public
router.get("/", getSweets);

module.exports = router;
