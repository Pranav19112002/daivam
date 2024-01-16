const mongoose = require("mongoose");

const departmentschema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    doctor:{
        type: String,
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

const departmentModel = mongoose.model("departments", departmentschema);

module.exports = departmentModel;
