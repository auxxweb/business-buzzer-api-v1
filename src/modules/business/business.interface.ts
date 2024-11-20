import { FilterQuery, QueryOptions } from "mongoose";
import User from "./business.model.js";

export interface CreateBusinessData {
  businessName: string;
  logo: string;
  ownerName: string;
  email: string;
  password: string;
  location: {
    lat: number;
    lon: number;
  };
  address: {
    buildingName: string;
    streetName: string;
    landMark: string;
    city: string;
    state: string;
    pinCode: number;
  };
  contactDetails: {
    primaryNumber: number;
    secondaryNumber: number;
    whatsAppNumber: number;
    email: string;
    webSite: string;
  };
  socialMediaLinks: [
    {
      tag: string;
      link: string;
    },
  ];
  category: string;
  services: [string];
  businessTiming: {
    workingDays: [string];
    time: {
      open: string;
      close: string;
    };
  };
  description: string;
  theme: string;
  secondaryTheme: string;
  landingPageHero: {
    title: string;
    description: string;
    coverImage: string;
  };
  welcomePart: {
    title: string;
    description: string;
    coverImage: string;
  };
  specialServices: {
    title: string;
    description: string;
    data: [
      {
        image: string;
        title: string;
        description: string;
      },
    ];
  };
  productSection: [
    {
      title: string;
      description: string;
      image: string;
      price: number;
    },
  ];
  service: [
    {
      title: string;
      description: string;
      image: string;
    },
  ];
  testimonial: {
    description: string;
    reviews: [
      {
        name: string;
        image: string;
        review: string;
        rating: number;
      },
    ];
  };
  gallery: [string];
  seoData: {
    title: string;
    description: string;
    metaTags: [string];
  };
  selectedPlan: string;
  paymentStatus: boolean;
  isFree?: boolean;
}

export interface BusinessLoginData {
  email: string;
  password: string;
  role?: string;
}

export interface AdminData {
  email: string;
  name: string;
  password: string;
  role: string;
}

export interface GetAllAdminsData {
  query: FilterQuery<typeof User>;
  options?: QueryOptions;
}

export interface UpdatePasswordData {
  password: string;
  resetId?: string;
}
