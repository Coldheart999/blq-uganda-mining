export interface ReferralNotification {
  id: string;
  title: string;
  message: string;
  amountUGX: number;
  referredName: string;
  referredPhone: string;
  createdAt: string;
  read: boolean;
}

export interface User {
  id: string;
  phone: string;
  name: string;
  balanceUGX: number;
  uncollectedMinedUGX: number;
  totalDepositedUGX: number;
  totalWithdrawnUGX: number;
  totalMinedUGX: number;
  referralCode?: string;
  referredBy?: string;
  referralCount?: number;
  referralEarningsUGX?: number;
  notifications?: ReferralNotification[];
  createdAt: string;
  isAdmin?: boolean;
}

export interface MinerPackage {
  id: string;
  name: string;
  model: string;
  priceUGX: number;
  dailyYieldUGX: number;
  hashRate: string; // e.g. "95 TH/s"
  powerDraw: string; // e.g. "3250W"
  algo: string; // e.g. "SHA-256 (Bitcoin)"
  durationDays: number;
  stock: number;
  tier: 'Starter' | 'Pro' | 'Enterprise' | 'Industrial';
  image: string;
  badge?: string;
}

export interface PurchasedRig {
  id: string;
  userId: string;
  packageId: string;
  packageName: string;
  model: string;
  priceUGX: number;
  dailyYieldUGX: number;
  hashRate: string;
  purchaseDate: string;
  expiryDate: string;
  lastClaimDate: string;
  status: 'active' | 'expired';
}

export interface DepositRequest {
  id: string;
  userId: string;
  userPhone: string;
  userName: string;
  amountUGX: number;
  provider: 'MTN Mobile Money' | 'Airtel Money';
  transactionId: string;
  status: 'pending' | 'approved' | 'rejected' | 'auto_approved';
  createdAt: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userPhone: string;
  userName: string;
  amountUGX: number;
  feeUGX: number;
  netAmountUGX: number;
  provider: 'MTN Mobile Money' | 'Airtel Money';
  destinationNumber: string;
  userTotalDeposited: number;
  userTotalWithdrawn: number;
  userTotalMined: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  adminNote?: string;
}

export interface AdminConfig {
  mobileMoneyNumber: string;
  mobileMoneyName: string;
  airtelMoneyNumber: string;
  airtelMoneyName: string;
  adminPin: string;
  depositNotice: string;
  withdrawalFeePercent: number;
}
