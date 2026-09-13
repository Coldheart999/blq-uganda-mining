import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, MinerPackage, PurchasedRig, DepositRequest, WithdrawalRequest, AdminConfig } from '../types';

// Highly attractive, lucrative miner packages designed for high-conversion Ugandan investors
export const INITIAL_MINER_PACKAGES: MinerPackage[] = [
  {
    id: 'miner-1',
    name: 'BLQ Starter Node',
    model: 'Bitmain S9 SE Ultra',
    priceUGX: 10000,
    dailyYieldUGX: 1500,
    hashRate: '16 TH/s',
    powerDraw: '1280W',
    algo: 'SHA-256 (BTC)',
    durationDays: 30,
    stock: 85,
    tier: 'Starter',
    badge: '🔥 Fast Return (UGX 1,500/day)',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'miner-2',
    name: 'BLQ Silver Rig',
    model: 'MicroBT M30S+ Pro',
    priceUGX: 40000,
    dailyYieldUGX: 6800,
    hashRate: '88 TH/s',
    powerDraw: '3344W',
    algo: 'SHA-256 (BTC)',
    durationDays: 30,
    stock: 50,
    tier: 'Starter',
    badge: '⭐ Most Popular (UGX 6,800/day)',
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'miner-3',
    name: 'BLQ Gold Hydro Farm',
    model: 'Bitmain T19 Liquid Cooling',
    priceUGX: 150000,
    dailyYieldUGX: 27000,
    hashRate: '145 TH/s',
    powerDraw: '3150W',
    algo: 'SHA-256 (BTC)',
    durationDays: 30,
    stock: 30,
    tier: 'Pro',
    badge: '🚀 High Yield (UGX 27,000/day)',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'miner-4',
    name: 'BLQ Platinum ASIC',
    model: 'Canaan Avalon 1246 Pro',
    priceUGX: 400000,
    dailyYieldUGX: 76000,
    hashRate: '220 TH/s',
    powerDraw: '3420W',
    algo: 'SHA-256 (BTC)',
    durationDays: 30,
    stock: 20,
    tier: 'Pro',
    badge: '💎 PRO Earner (UGX 76,000/day)',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'miner-5',
    name: 'BLQ Diamond VIP Rig',
    model: 'Bitmain S19 XP Hydro 257TH',
    priceUGX: 1000000,
    dailyYieldUGX: 210000,
    hashRate: '514 TH/s',
    powerDraw: '5300W',
    algo: 'SHA-256 (BTC)',
    durationDays: 30,
    stock: 12,
    tier: 'Enterprise',
    badge: '👑 VIP Profit (UGX 210,000/day)',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'miner-6',
    name: 'BLQ Crown Executive Farm',
    model: 'IceRiver KS3 HeavyHash Kaspa',
    priceUGX: 2500000,
    dailyYieldUGX: 550000,
    hashRate: '8000 GH/s',
    powerDraw: '3200W',
    algo: 'kHeavyHash (KAS)',
    durationDays: 30,
    stock: 5,
    tier: 'Industrial',
    badge: '🏆 Mega Farm (UGX 550,000/day)',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80'
  }
];

const DEFAULT_ADMIN_CONFIG: AdminConfig = {
  mobileMoneyNumber: '+256 789 123 456',
  mobileMoneyName: 'BLQ MINING UGANDA (MTN)',
  airtelMoneyNumber: '+256 750 987 654',
  airtelMoneyName: 'BLQ MINING UGANDA (AIRTEL)',
  adminPin: '8888',
  depositNotice: 'Send money to the MTN or Airtel Mobile Money account below. Always include your Phone Number in the transaction memo. After sending, enter the 10-digit TxID below.',
  withdrawalFeePercent: 2.5
};

export interface StoredAccount {
  phone: string;
  password: string;
  user: User;
}

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  minerPackages: MinerPackage[];
  purchasedRigs: PurchasedRig[];
  deposits: DepositRequest[];
  withdrawals: WithdrawalRequest[];
  adminConfig: AdminConfig;
  setAdminConfig: React.Dispatch<React.SetStateAction<AdminConfig>>;
  
  // Auth methods
  registerAccount: (phone: string, password: string, name?: string) => { success: boolean; message: string; user?: User };
  loginAccount: (phone: string, password: string) => { success: boolean; message: string; user?: User };
  logout: () => void;
  
  // User Actions
  buyMiner: (packageId: string) => { success: boolean; message: string };
  claimEarnings: () => void;
  submitDeposit: (amount: number, provider: 'MTN Mobile Money' | 'Airtel Money', transactionId: string) => { success: boolean; message: string };
  submitWithdrawal: (amount: number, provider: 'MTN Mobile Money' | 'Airtel Money', destinationNumber: string) => { success: boolean; message: string };
  
  // Admin Actions
  approveDeposit: (depositId: string) => void;
  rejectDeposit: (depositId: string) => void;
  approveWithdrawal: (withdrawalId: string) => void;
  rejectWithdrawal: (withdrawalId: string) => void;
  
  // Live yield stats
  liveUnclaimedYield: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('blq_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [purchasedRigs, setPurchasedRigs] = useState<PurchasedRig[]>(() => {
    const saved = localStorage.getItem('blq_purchased_rigs');
    return saved ? JSON.parse(saved) : [];
  });

  const [deposits, setDeposits] = useState<DepositRequest[]>(() => {
    const saved = localStorage.getItem('blq_deposits');
    return saved ? JSON.parse(saved) : [];
  });

  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(() => {
    const saved = localStorage.getItem('blq_withdrawals');
    return saved ? JSON.parse(saved) : [];
  });

  const [adminConfig, setAdminConfig] = useState<AdminConfig>(() => {
    const saved = localStorage.getItem('blq_admin_config');
    return saved ? JSON.parse(saved) : DEFAULT_ADMIN_CONFIG;
  });

  const [liveUnclaimedYield, setLiveUnclaimedYield] = useState<number>(0);

  // Sync state to LocalStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('blq_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('blq_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('blq_purchased_rigs', JSON.stringify(purchasedRigs));
  }, [purchasedRigs]);

  useEffect(() => {
    localStorage.setItem('blq_deposits', JSON.stringify(deposits));
  }, [deposits]);

  useEffect(() => {
    localStorage.setItem('blq_withdrawals', JSON.stringify(withdrawals));
  }, [withdrawals]);

  useEffect(() => {
    localStorage.setItem('blq_admin_config', JSON.stringify(adminConfig));
  }, [adminConfig]);

  // Live real-time yield calculation ticker
  useEffect(() => {
    if (!currentUser) return;

    const userActiveRigs = purchasedRigs.filter(r => r.userId === currentUser.id && r.status === 'active');
    if (userActiveRigs.length === 0) {
      setLiveUnclaimedYield(0);
      return;
    }

    const dailyTotal = userActiveRigs.reduce((acc, rig) => acc + rig.dailyYieldUGX, 0);
    const yieldPerSecond = dailyTotal / 86400;

    const interval = setInterval(() => {
      setLiveUnclaimedYield(prev => prev + yieldPerSecond);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentUser, purchasedRigs]);

  // Real Account Registration
  const registerAccount = (phone: string, password: string, name?: string) => {
    const savedAccountsStr = localStorage.getItem('blq_user_accounts');
    const accounts: StoredAccount[] = savedAccountsStr ? JSON.parse(savedAccountsStr) : [];

    const existing = accounts.find(a => a.phone === phone);
    if (existing) {
      return { success: false, message: 'An account with this phone number already exists. Please log in.' };
    }

    const newUser: User = {
      id: 'usr_' + Date.now(),
      phone,
      name: name || `Investor ${phone.slice(-4)}`,
      balanceUGX: 0,
      uncollectedMinedUGX: 0,
      totalDepositedUGX: 0,
      totalWithdrawnUGX: 0,
      totalMinedUGX: 0,
      createdAt: new Date().toISOString()
    };

    accounts.push({ phone, password, user: newUser });
    localStorage.setItem('blq_user_accounts', JSON.stringify(accounts));
    setCurrentUser(newUser);

    return { success: true, message: 'Account created successfully!', user: newUser };
  };

  // Real Account Verification Login (Strict phone + password check)
  const loginAccount = (phone: string, password: string) => {
    const savedAccountsStr = localStorage.getItem('blq_user_accounts');
    const accounts: StoredAccount[] = savedAccountsStr ? JSON.parse(savedAccountsStr) : [];

    const account = accounts.find(a => a.phone === phone);

    if (!account) {
      return { success: false, message: 'No account found with this phone number. Please click Sign Up to register.' };
    }

    if (account.password !== password) {
      return { success: false, message: 'Incorrect password. Please verify your password and try again.' };
    }

    setCurrentUser(account.user);
    return { success: true, message: 'Login successful!', user: account.user };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Buy Mining Machine
  const buyMiner = (packageId: string): { success: boolean; message: string } => {
    if (!currentUser) {
      return { success: false, message: 'Please log in or create an account first.' };
    }

    const pkg = INITIAL_MINER_PACKAGES.find(p => p.id === packageId);
    if (!pkg) {
      return { success: false, message: 'Invalid miner package selected.' };
    }

    if (currentUser.balanceUGX < pkg.priceUGX) {
      return { 
        success: false, 
        message: `Insufficient balance! Package cost is UGX ${pkg.priceUGX.toLocaleString()}. You have UGX ${currentUser.balanceUGX.toLocaleString()}. Please deposit funds via Mobile Money first.` 
      };
    }

    const now = new Date();
    const expiry = new Date(now.getTime() + pkg.durationDays * 24 * 60 * 60 * 1000);

    const newRig: PurchasedRig = {
      id: 'rig_' + Date.now(),
      userId: currentUser.id,
      packageId: pkg.id,
      packageName: pkg.name,
      model: pkg.model,
      priceUGX: pkg.priceUGX,
      dailyYieldUGX: pkg.dailyYieldUGX,
      hashRate: pkg.hashRate,
      purchaseDate: now.toISOString(),
      expiryDate: expiry.toISOString(),
      lastClaimDate: now.toISOString(),
      status: 'active'
    };

    setPurchasedRigs(prev => [newRig, ...prev]);

    const updatedUser = {
      ...currentUser,
      balanceUGX: currentUser.balanceUGX - pkg.priceUGX
    };
    setCurrentUser(updatedUser);

    // Sync updated user balance into accounts array
    const savedAccountsStr = localStorage.getItem('blq_user_accounts');
    if (savedAccountsStr) {
      const accounts: StoredAccount[] = JSON.parse(savedAccountsStr);
      const accIndex = accounts.findIndex(a => a.phone === currentUser.phone);
      if (accIndex !== -1) {
        accounts[accIndex].user = updatedUser;
        localStorage.setItem('blq_user_accounts', JSON.stringify(accounts));
      }
    }

    return { 
      success: true, 
      message: `Success! You have purchased the ${pkg.name} for UGX ${pkg.priceUGX.toLocaleString()}. Daily profit: UGX ${pkg.dailyYieldUGX.toLocaleString()}` 
    };
  };

  // Claim accrued mining yield into user's withdrawable virtual balance
  const claimEarnings = () => {
    if (!currentUser || liveUnclaimedYield <= 0) return;

    const claimedAmount = Math.floor(liveUnclaimedYield);
    if (claimedAmount <= 0) return;

    const updatedUser: User = {
      ...currentUser,
      balanceUGX: currentUser.balanceUGX + claimedAmount,
      totalMinedUGX: currentUser.totalMinedUGX + claimedAmount
    };

    setCurrentUser(updatedUser);
    setLiveUnclaimedYield(0);

    // Sync updated balance
    const savedAccountsStr = localStorage.getItem('blq_user_accounts');
    if (savedAccountsStr) {
      const accounts: StoredAccount[] = JSON.parse(savedAccountsStr);
      const accIndex = accounts.findIndex(a => a.phone === currentUser.phone);
      if (accIndex !== -1) {
        accounts[accIndex].user = updatedUser;
        localStorage.setItem('blq_user_accounts', JSON.stringify(accounts));
      }
    }
  };

  // Submit Mobile Money Deposit
  const submitDeposit = (amount: number, provider: 'MTN Mobile Money' | 'Airtel Money', transactionId: string) => {
    if (!currentUser) return { success: false, message: 'User not logged in' };
    if (amount < 5000) return { success: false, message: 'Minimum deposit amount is UGX 5,000' };
    if (!transactionId.trim()) return { success: false, message: 'Transaction ID is required' };

    const newDeposit: DepositRequest = {
      id: 'dep_' + Date.now(),
      userId: currentUser.id,
      userPhone: currentUser.phone,
      userName: currentUser.name,
      amountUGX: amount,
      provider,
      transactionId,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setDeposits(prev => [newDeposit, ...prev]);
    return { 
      success: true, 
      message: `Deposit request of UGX ${amount.toLocaleString()} submitted successfully! Admin will verify your ${provider} transaction ID: ${transactionId} shortly.` 
    };
  };

  // Submit Withdrawal Request
  const submitWithdrawal = (amount: number, provider: 'MTN Mobile Money' | 'Airtel Money', destinationNumber: string) => {
    if (!currentUser) return { success: false, message: 'User not logged in' };
    if (amount < 10000) return { success: false, message: 'Minimum withdrawal amount is UGX 10,000' };
    if (currentUser.balanceUGX < amount) {
      return { success: false, message: `Insufficient balance for withdrawal. Your balance is UGX ${currentUser.balanceUGX.toLocaleString()}` };
    }
    if (!destinationNumber.trim()) return { success: false, message: 'Destination phone number is required' };

    const fee = Math.round(amount * (adminConfig.withdrawalFeePercent / 100));
    const netAmount = amount - fee;

    const newWithdrawal: WithdrawalRequest = {
      id: 'wth_' + Date.now(),
      userId: currentUser.id,
      userPhone: currentUser.phone,
      userName: currentUser.name,
      amountUGX: amount,
      feeUGX: fee,
      netAmountUGX: netAmount,
      provider,
      destinationNumber,
      userTotalDeposited: currentUser.totalDepositedUGX,
      userTotalWithdrawn: currentUser.totalWithdrawnUGX,
      userTotalMined: currentUser.totalMinedUGX,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const updatedUser = {
      ...currentUser,
      balanceUGX: currentUser.balanceUGX - amount
    };
    setCurrentUser(updatedUser);

    setWithdrawals(prev => [newWithdrawal, ...prev]);
    return {
      success: true,
      message: `Withdrawal request of UGX ${amount.toLocaleString()} submitted! You will receive UGX ${netAmount.toLocaleString()} on ${destinationNumber} once approved.`
    };
  };

  // Admin Actions
  const approveDeposit = (depositId: string) => {
    setDeposits(prev => prev.map(dep => {
      if (dep.id === depositId && dep.status === 'pending') {
        if (currentUser && currentUser.id === dep.userId) {
          setCurrentUser({
            ...currentUser,
            balanceUGX: currentUser.balanceUGX + dep.amountUGX,
            totalDepositedUGX: currentUser.totalDepositedUGX + dep.amountUGX
          });
        }
        return { ...dep, status: 'approved' };
      }
      return dep;
    }));
  };

  const rejectDeposit = (depositId: string) => {
    setDeposits(prev => prev.map(dep => dep.id === depositId ? { ...dep, status: 'rejected' } : dep));
  };

  const approveWithdrawal = (withdrawalId: string) => {
    setWithdrawals(prev => prev.map(wth => {
      if (wth.id === withdrawalId && wth.status === 'pending') {
        if (currentUser && currentUser.id === wth.userId) {
          setCurrentUser({
            ...currentUser,
            totalWithdrawnUGX: currentUser.totalWithdrawnUGX + wth.amountUGX
          });
        }
        return { ...wth, status: 'approved' };
      }
      return wth;
    }));
  };

  const rejectWithdrawal = (withdrawalId: string) => {
    setWithdrawals(prev => prev.map(wth => {
      if (wth.id === withdrawalId && wth.status === 'pending') {
        if (currentUser && currentUser.id === wth.userId) {
          setCurrentUser({
            ...currentUser,
            balanceUGX: currentUser.balanceUGX + wth.amountUGX
          });
        }
        return { ...wth, status: 'rejected' };
      }
      return wth;
    }));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      minerPackages: INITIAL_MINER_PACKAGES,
      purchasedRigs,
      deposits,
      withdrawals,
      adminConfig,
      setAdminConfig,
      registerAccount,
      loginAccount,
      logout,
      buyMiner,
      claimEarnings,
      submitDeposit,
      submitWithdrawal,
      approveDeposit,
      rejectDeposit,
      approveWithdrawal,
      rejectWithdrawal,
      liveUnclaimedYield
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
