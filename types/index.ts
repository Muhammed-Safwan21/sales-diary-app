export type ThemeType = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  accent: string;
  accentLight: string;
  accentDark: string;
  success: string;
  successLight: string;
  successDark: string;
  warning: string;
  warningLight: string;
  warningDark: string;
  error: string;
  errorLight: string;
  errorDark: string;
  background: string;
  card: string;
  text: string;
  textLight: string;
  border: string;
  notification: string;
  shadow: string;
  cardGlass: string;
  textGlow: string;
  borderGlow: string;
  shadowIntense: string;
}

export interface Typography {
  fontFamily: {
    regular: string;
    medium: string;
    bold: string;
  };
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
}

export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface BorderRadius {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  round: number;
}

export interface ThemeConfig {
  colors: ThemeColors;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  gstNumber?: string;
  outstandingAmount: number;
  lastTransaction?: Date;
}

export interface Supplier {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  gstNumber?: string;
  outstandingAmount: number;
  lastTransaction?: Date;
}

export interface Product {
  id: string;
  name: string;
  hsnCode?: string;
  category: string;
  purchasePrice: number;
  sellingPrice: number;
  stock: number;
  lowStockAlert: number;
  unit: string;
  gstRate: number;
  description?: string;
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';

export interface InvoiceItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  discount: number;
  tax: number;
  totalAmount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  items: InvoiceItem[];
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  dueDate: Date;
  createdDate: Date;
  status: InvoiceStatus;
  notes?: string;
  termsAndConditions?: string;
}

export type ExpenseCategory = 
  | 'rent'
  | 'salaries'
  | 'utilities'
  | 'inventory'
  | 'marketing'
  | 'transportation'
  | 'maintenance'
  | 'office'
  | 'taxes'
  | 'insurance'
  | 'other';

export interface Expense {
  id: string;
  category: ExpenseCategory;
  amount: number;
  date: Date;
  paymentMethod: string;
  description?: string;
  receipt?: string; // URL to receipt image
}

export interface Business {
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  gstNumber?: string;
  panNumber?: string;
  logo?: string; // URL to logo image
  bankDetails?: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    branchName: string;
  };
  signature?: string; // URL to signature image
}

export type PaymentMethod = 'cash' | 'bank' | 'upi' | 'card' | 'cheque' | 'other';

export interface Payment {
  id: string;
  amount: number;
  date: Date;
  referenceNumber?: string;
  method: PaymentMethod;
  notes?: string;
  invoiceId?: string;
  customerId?: string;
  supplierId?: string;
}