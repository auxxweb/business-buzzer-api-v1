import mongoose, { Schema, model } from "mongoose";
import { ObjectId } from "../../constants/type.js";
import { PlanStatus } from "./business.enum.js";
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
          type: Number,
        },
        secondaryNumber: {
          type: Number,
        },
        whatsAppNumber: {
          type: Number,
        },
        primaryCountryCode: {
          type: Number,
        },
        secondaryCountryCode: {
          type: Number,
        },
        whatsappCountryCode: {
          type: Number,
        },
        email: String,
        website: String,
      },
    },
    socialMediaLinks: {
      type: [
        new mongoose.Schema({
          tag: String,
          link: String,
        }),
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
        new mongoose.Schema({
          image: String,
          title: String,
          description: String,
          link: String,
        }),
      ],
    },
    productSection: {
      title: String,
      description: String,
      data: [
        new mongoose.Schema({
          image: String,
          title: String,
          description: String,
          price: Number,
          link: String,
        }),
      ],
    },
    service: {
      title: String,
      description: String,
      data: [
        new mongoose.Schema({
          image: String,
          title: String,
          description: String,
          link: String,
        }),
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
    rating: {
      type: Number,
      default: 0,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    // this plan means current plan like free, paid,special or cancelled based on payments
    plan: {
      type: String,
      enum: PlanStatus,
      default: PlanStatus.FREE_TRAIL,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    validity: {
      type: Date,
      default: () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 14);
        return futureDate;
      },
    },
    isInFreeTrail: {
      type: Boolean,
      default: false,
    },
    isFreeTrailUsed: {
      type: Boolean,
      default: false,
    },
    resetId: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
BusinessSchema.index({ email: 1, isDeleted: 1 });
const Business = model("business", BusinessSchema);
export default Business;
