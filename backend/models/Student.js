const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: ''
    },
    password: {
      type: String,
      trim: true,
      default: ''
    },
    age: {
      type: Number,
      required: true,
      min: 1
    },
    class: {
      type: String,
      required: true,
      trim: true
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    birthDate: {
      type: Date,
      required: true
    },
    presentDays: {
      type: Number,
      default: 0,
      min: 0
    },
    absentDays: {
      type: Number,
      default: 0,
      min: 0
    },
    dailyEntries: {
      type: [
        {
          date: {
            type: String,
            required: true
          },
          attendance: {
            type: String,
            required: true,
            enum: ['present', 'absent']
          },
          workDone: {
            type: String,
            default: ''
          }
        }
      ],
      default: []
    },
    examResults: {
      type: [
        {
          grade: {
            type: String,
            required: true
          },
          subject: {
            type: String,
            required: true
          },
          score: {
            type: Number,
            required: true,
            min: 0
          },
          total: {
            type: Number,
            required: true,
            min: 1
          }
        }
      ],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Student', studentSchema);
