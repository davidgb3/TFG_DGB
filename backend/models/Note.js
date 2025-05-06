import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    dueDate: { type: Date },
    reminderDate: { 
        type: Date, 
        default: function() {
            if (this.dueDate) {
                return new Date(this.dueDate.getTime() - 24 * 60 * 60 * 1000);
            }
            return null;
        }
    }, // Default reminder is set to 1 day before the due date
    isCompleted: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
});

export default mongoose.model("Note", noteSchema);