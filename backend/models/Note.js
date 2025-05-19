import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    dueDate: { type: Date },
    reminderDate: { 
        type: Date,
        default: null
    },
    isCompleted: { type: Boolean, default: false },
    important: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
});

export default mongoose.model("Note", noteSchema);