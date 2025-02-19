export class ServiceUsage {
    usageID !: number;
    bookingID !: number;
    guestId !: string;
    serviceID !: number;
    quantity !: number;
    totalCost !: number;
    usageDate !: Date;
  
    booking ?: Booking;
    service ?: Service;
    guest ?: Guest;
  }
  