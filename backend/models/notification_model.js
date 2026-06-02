import { Schema, model } from "mongoose";

const notificationSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  sender: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  type: {
    type: String,
    enum: [
      "like",
      "reply",
      "request",
      "follow_request",
      "follow_accept"
    ],
    required: true
  },

  post: {
    type: Schema.Types.ObjectId,
    ref: "post",
    required: false
  },

  message: {
    type: String
  },

  isread: {
    type: Boolean,
    default: false
  }

}, {

  timestamps: true,

  versionKey: false
})

export const notificationmodel = model(

  "notification",

  notificationSchema
)