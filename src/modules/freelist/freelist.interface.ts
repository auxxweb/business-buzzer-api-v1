interface CreateFreeList {
    name: string;
    brandName: string;
    logo?: string;
    address?: {
      buildingName?: string;
      streetName?: string;
      landMark?: string;
      district?: string;
      state?: string;
      pinCode?: number;
    };
    contactDetails?: { 
      primaryNumber?: number;
      secondaryNumber?: number;
      whatsAppNumber?: number;
      primaryCountryCode?: number;
      secondaryCountryCode?: number;
      whatsappCountryCode?: number;
      email?: string;
      website?: string;
    };
    description?: string;
    enconnectUrl?: string;
    images?: string[];  
  }
  
  export default CreateFreeList;
  