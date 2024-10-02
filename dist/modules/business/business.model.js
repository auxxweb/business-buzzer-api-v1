import { Schema, model } from "mongoose";
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
      set: (value) => value.toLowerCase(),
    },
    password: {
      type: String,
      minlength: 4,
      required: true,
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
        primaryNumber: Number,
        secondaryNumber: Number,
        whatsAppNumber: Number,
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
      type: String,
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
        {
          title: String,
          description: String,
          image: String,
          price: Number,
        },
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
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
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
