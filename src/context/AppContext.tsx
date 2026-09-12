import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, MinerPackage, PurchasedRig, DepositRequest, WithdrawalRequest, AdminConfig } from '../types';

// Pre-configured realistic ASIC crypto miner packages for Ugandans
export const INITIAL_MINER_PACKAGES: MinerPackage[] = [
  {
    id: 'miner-1',
    name: 'BLQ S9-Ug',
    model: 'Bitmain S9 SE (16 TH/s)',
    priceUGX: 20000,
    dailyYieldUGX: 1200,
    hashRate: '16 TH/s',
    powerDraw: '1280W',
    algo: 'SHA-256 (BTC)',
    durationDays: 30,
    stock: 42,
    tier: 'Starter',
    badge: 'Popular for Beginners',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'miner-2',
    name: 'BLQ M30S',
    model: 'MicroBT M30S+ (88 TH/s)',
    priceUGX: 70000,
    dailyYieldUGX: 4500,
    hashRate: '88 TH/s',
    powerDraw: '3344W',
    algo: 'SHA-256 (BTC)',
    durationDays: 30,
    stock: 25,
    tier: 'Starter',
    badge: 'Best Value',
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'miner-3',
    name: 'BLQ T19 Hydro',
    model: 'Bitmain T19 Liquid Cooling',
    priceUGX: 200000,
    dailyYieldUGX: 14000,
    hashRate: '145 TH/s',
    powerDraw: '3150W',
    algo: 'SHA-256 (BTC)',
    durationDays: 30,
    stock: 18,
    tier: 'Pro',
    badge: 'High Performance',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'miner-4',
    name: 'BLQ Avalon 1246',
    model: 'Canaan Avalon 90 TH/s',
    priceUGX: 500000,
    dailyYieldUGX: 38000,
    hashRate: '220 TH/s',
    powerDraw: '3420W',
    algo: 'SHA-256 (BTC)',
    durationDays: 30,
    stock: 10,
    tier: 'Pro',
    badge: 'PRO Choice',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'miner-5',
    name: 'BLQ S19 Pro XP',
    model: 'Bitmain S19 XP Hydro 257 TH',
    priceUGX: 1200000,
    dailyYieldUGX: 95000,
    hashRate: '514 TH/s',
    powerDraw: '5300W',
    algo: 'SHA-256 (BTC)',
    durationDays: 30,
    stock: 6,
    tier: 'Enterprise',
    badge: 'Enterprise Rig',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'miner-6',
    name: 'BLQ KS3 Kaspa',
    model: 'IceRiver KS3 Heavy Hash (8 TH)',
    priceUGX: 2500000,
    dailyYieldUGX: 210000,
    hashRate: '8000 GH/s',
    powerDraw: '3200W',
    algo: 'kHeavyHash (KAS)',
    durationDays: 30,
    stock: 3,
    tier: 'Industrial',
    badge: 'VIP Mega Farm',
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
  loginWithPhone: (phone: string, name?: string) => User;
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
  // Load state from LocalStorage or use Defaults
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ug_miner_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [purchasedRigs, setPurchasedRigs] = useState<PurchasedRig[]>(() => {
    const saved = localStorage.getItem('ug_miner_rigs');
    return saved ? JSON.parse(saved) : [];
  });

  const [deposits, setDeposits] = useState<DepositRequest[]>(() => {
    const saved = localStorage.getItem('ug_miner_deposits');
    return saved ? JSON.parse(saved) : [];
  });

  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(() => {
    const saved = localStorage.getItem('ug_miner_withdrawals');
    return saved ? JSON.parse(saved) : [];
  });

  const [adminConfig, setAdminConfig] = useState<AdminConfig>(() => {
    const saved = localStorage.getItem('ug_miner_admin_config');
    return saved ? JSON.parse(saved) : DEFAULT_ADMIN_CONFIG;
  });

  const [liveUnclaimedYield, setLiveUnclaimedYield] = useState<number>(0);

  // Sync state to LocalStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ug_miner_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ug_miner_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ug_miner_rigs', JSON.stringify(purchasedRigs));
  }, [purchasedRigs]);

  useEffect(() => {
    localStorage.setItem('ug_miner_deposits', JSON.stringify(deposits));
  }, [deposits]);

  useEffect(() => {
    localStorage.setItem('ug_miner_withdrawals', JSON.stringify(withdrawals));
  }, [withdrawals]);

  useEffect(() => {
    localStorage.setItem('ug_miner_admin_config', JSON.stringify(adminConfig));
  }, [adminConfig]);

  // Live real-time yield calculation ticker (adds simulated earnings every second for active user rigs)
  useEffect(() => {
    if (!currentUser) return;

    const userActiveRigs = purchasedRigs.filter(r => r.userId === currentUser.id && r.status === 'active');
    if (userActiveRigs.length === 0) {
      setLiveUnclaimedYield(0);
      return;
    }

    // Daily total yield across all active rigs
    const dailyTotal = userActiveRigs.reduce((acc, rig) => acc + rig.dailyYieldUGX, 0);
    // Yield per second (1 day = 86400s)
    const yieldPerSecond = dailyTotal / 86400;

    const interval = setInterval(() => {
      setLiveUnclaimedYield(prev => prev + yieldPerSecond);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentUser, purchasedRigs]);

  // Login or Register User by Phone
  const loginWithPhone = (phone: string, name?: string): User => {
    const isAdminUser = phone.includes('0780000000') || phone.includes('admin');
    
    // Check if user previously saved
    const savedUsersStr = localStorage.getItem('ug_miner_users');
    const allUsers: User[] = savedUsersStr ? JSON.parse(savedUsersStr) : [];
    
    let existing = allUsers.find(u => u.phone === phone);
    if (!existing) {
      existing = {
        id: 'usr_' + Date.now(),
        phone,
        name: name || `Investor ${phone.slice(-4)}`,
        balanceUGX: 0,
        uncollectedMinedUGX: 0,
        totalDepositedUGX: 0,
        totalWithdrawnUGX: 0,
        totalMinedUGX: 0,
        createdAt: new Date().toISOString(),
        isAdmin: isAdminUser
      };
      allUsers.push(existing);
      localStorage.setItem('ug_miner_users', JSON.stringify(allUsers));
    }
    
    setCurrentUser(existing);
    return existing;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Buy Mining Machine
  const buyMiner = (packageId: string): { success: boolean; message: string } => {
    if (!currentUser) {
      return { success: false, message: 'Please login or register first.' };
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

    // Deduct balance and create rig
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

    return { 
      success: true, 
      message: `Success! You have purchased the ${pkg.name} ASIC miner for UGX ${pkg.priceUGX.toLocaleString()}. Daily mining yield: UGX ${pkg.dailyYieldUGX.toLocaleString()}` 
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

    // Deduct balance immediately into pending escrow
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
        // Credit target user balance
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
        // Refund back to user balance if rejected
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
      loginWithPhone,
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
