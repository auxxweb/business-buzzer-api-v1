import mongoose, { Schema, model } from "mongoose";

import { ObjectId } from "../../constants/type.js";

const BusinessSchema = new Schema(
  {
    businessName: {
      type: String,
    },
    logo: {
      type: String,
    },
    ownerName: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      set: (value: string) => value.toLowerCase(),
    },
    password: {
      type: String,
      minlength: 4,
      required: true,
    },
    businessId: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
    },
    address: {
      type: {
        buildingName: String,
        streetName: String,
        landMark: String,
        city: String,
        state: String,
        pinCode: Number,
      },
    },
    contactDetails: {
      type: {
        primaryNumber: {
          number: Number,
          countryCode: String,
        },
        secondaryNumber: {
          number: Number,
          countryCode: String,
        },
        whatsAppNumber: {
          number: Number,
          countryCode: String,
        },
        email: String,
        webSite: String,
      },
    },
    socialMediaLinks: {
      type: [
        {
          tag: String,
          link: String,
        },
      ],
    },
    category: {
      type: ObjectId,
      ref: "categories",
    },
    services: {
      type: [String],
    },
    businessTiming: {
      type: {
        workingDays: [String],
        time: {
          open: String,
          close: String,
        },
      },
    },
    description: {
      type: String,
    },
    theme: {
      type: String,
    },
    secondaryTheme: {
      type: String,
    },
    landingPageHero: {
      type: {
        title: String,
        description: String,
        coverImage: String,
      },
    },
    welcomePart: {
      type: {
        title: String,
        description: String,
        coverImage: String,
      },
    },
    specialServices: {
      title: String,
      description: String,
      data: [
        {
          image: String,
          title: String,
          description: String,
        },
      ],
    },
    productSection: {
      type: [
        new mongoose.Schema(
          {
            title: String,
            description: String,
            image: String,
            price: Number,
          },
          // { _id: false } // Prevents Mongoose from adding an _id field to each product
        ),
      ],
    },
    service: {
      type: [
        {
          title: String,
          description: String,
          image: String,
        },
      ],
    },
    testimonial: {
      type: {
        description: String,
        reviews: [
          {
            name: String,
            image: String,
            review: String,
            rating: Number,
          },
        ],
      },
    },
    gallery: {
      type: [String],
    },
    seoData: {
      type: {
        title: String,
        description: String,
        metaTags: [String],
      },
    },
    selectedPlan: {
      type: ObjectId,
      ref: "plans",
    },
    paymentStatus: {
      type: Boolean,
      default: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Business = model("business", BusinessSchema);

export default Business;
