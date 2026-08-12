export interface Category {
  id: string;
  name: string;
  description?: string | null;
  icon?: string | null;
}

export interface Provider {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  status: 'ACTIVE' | 'INACTIVE';
  providerId: string;
  categoryId: string;
  category?: Category;
  provider?: Provider;
  createdAt: string;
}

export type BookingStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Booking {
  id: string;
  scheduledDate: string;
  note?: string | null;
  status: BookingStatus;
  customerId: string;
  serviceId: string;
  service?: Service;
  customer?: { id: string; name: string; email: string; phone?: string | null };
  createdAt: string;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string | null;
  bookingId: string;
  customerId: string;
  serviceId: string;
  customer?: { id: string; name: string };
  createdAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: 'CUSTOMER' | 'PROVIDER' | 'ADMIN';
  isDeleted: boolean;
  createdAt: string;
}
