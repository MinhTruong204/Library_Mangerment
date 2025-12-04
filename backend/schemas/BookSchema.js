const {Schema} = require("mongoose");

const BookSchema = new Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    isbn: { type: String, unique: true, required: true, trim: true },
    description: { type: String, required: true },
    availableCopies: { type: Number, required: true },
    totalCopies: { type: Number, required: true },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    coverImage: { type: String, default: '' },
    cloudinaryId: { type: String, default: 'default_book_image' }, // ← BỎ REQUIRED
    price: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true // ← Tự động tạo createdAt và updatedAt
});

module. exports = {BookSchema};