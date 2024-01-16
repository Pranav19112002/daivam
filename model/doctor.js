const mongoose = require("mongoose");

const doctorschema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    specialist:{
        type: String,
        required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    qualifications: {
      type: String,
      required: true,
    },

    hospitals: {
      type: Number,
      required: true,
    },
    department:{
      type: String,
      required: true,
    },
    
    experiance: {
        type:Number,
        required: true,
    },

    imageurls: [],

    description: {
      type: String,
      required: true,
    },

    display: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const doctorModel = mongoose.model("doctors", doctorschema);

module.exports = doctorModel;
