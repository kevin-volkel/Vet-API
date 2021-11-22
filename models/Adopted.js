const mongoose = require("mongoose");

const AdoptedSchema = new mongoose.Schema(
  {
    carer: {
      ref: "User",
      type: mongoose.Types.ObjectId,
      required: [true, "need a carer"]
    },
    owner: {
      ref: "User",
      type: mongoose.Types.ObjectId,
      required: [true, "need an owner"]
    },
    adoptee: {
      ref: "Pet",
      type: mongoose.Types.ObjectId,
      required: [true, "need a pet"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Adopted", AdoptedSchema);
