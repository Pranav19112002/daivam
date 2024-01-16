const mongoose = require("mongoose");

const hospitalschema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    departments:{
        type: String,
        required: true,
    },

    noofdoctors: {
      type: Number,
      required: true,
    },

    departments: {
      type: String,
      required: true,
    },

    location: {
        type:String,
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

const hospitalModel = mongoose.model("hospitals", hospitalschema);

module.exports = hospitalModel;
