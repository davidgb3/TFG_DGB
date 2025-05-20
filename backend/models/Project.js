import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String,
        default: ""
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
    isActive: {
        type: Boolean,
        default: true
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    notes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Note" 
    }]
});

// Middleware para actualizar updatedAt antes de cada modificación
projectSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.model("Project", projectSchema);