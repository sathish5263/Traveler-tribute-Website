const mongoos = require('mongoose')

const Schema = mongoos.Schema;

const placeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  creator: { type: mongoos.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoos.model("Place", placeSchema);