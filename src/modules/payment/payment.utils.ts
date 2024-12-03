export const findExpiryDate = async ({
  validity,
}: {
  validity: number;
}): Promise<Date> => {
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + validity);

  return expiryDate;
};

export class DateCalculationUtil {

  private static BASE_DATE = new Date(); // Month is 0-indexed

  /**
   * Calculate future date based on user selection
   * @param years Number of years to add
   * @returns Calculated date details
   */
  static calculateFutureDate(years: number): {
    inputYears: number;
    futureDate: Date;
    formattedDate: string;
    dayBefore: string;
  } {
    // Create a new date based on the base date
    const futureDate = new Date(this.BASE_DATE);
    futureDate.setFullYear(futureDate.getFullYear() + years);

    // Subtract one day to get the day before
    const dayBeforeDate = new Date(futureDate);
    dayBeforeDate.setDate(dayBeforeDate.getDate() - 1);

    return {
      inputYears: years,
      futureDate: futureDate,
      formattedDate: this.formatDate(dayBeforeDate),
      dayBefore: this.formatDate(dayBeforeDate)
    };
  }

  /**
   * Generate multiple future dates
   * @param maxYears Maximum number of years to generate
   * @returns Array of future dates
   */
  static generateMultipleFutureDates(maxYears: number) {
    return Array.from({ length: maxYears }, (_, index) =>
      this.calculateFutureDate(index + 1)
    );
  }

  /**
   * Format date to DD/MM/YYYY
   * @param date Date to format
   * @returns Formatted date string
   */
  private static formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  /**
   * Parse a date string in DD/MM/YYYY format
   * @param dateString Date string to parse
   * @returns Date object
   */
  static parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  /**
   * Calculate duration between two dates
   * @param startDate Start date
   * @param endDate End date
   * @returns Object with duration details
   */
  static calculateDuration(startDate: Date, endDate: Date) {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const years = Math.floor(diffDays / 365);
    const remainingDays = diffDays % 365;

    return {
      years,
      days: remainingDays,
      totalDays: diffDays
    };
  }
}

