import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, MinerPackage, PurchasedRig, DepositRequest, WithdrawalRequest, AdminConfig } from '../types';

// Clean, attractive investment plans tailored for Ugandan investors
export const INITIAL_MINER_PACKAGES: MinerPackage[] = [
  // 5-DAY EXPRESS PLANS
  {
    id: 'plan-5d-1',
    name: 'Starter Plan (5-Day)',
    model: '5-Day Express Package',
    priceUGX: 10000,
    dailyYieldUGX: 3000,
    hashRate: '16 TH/s',
    powerDraw: '1280W',
    algo: 'SHA-256',
    durationDays: 5,
    stock: 100,
    tier: 'Starter',
    badge: '⚡ 5-Day Express (UGX 3,000/day)',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'plan-5d-2',
    name: 'Turbo Plan (5-Day)',
    model: '5-Day Turbo Package',
    priceUGX: 50000,
    dailyYieldUGX: 16000,
    hashRate: '88 TH/s',
    powerDraw: '3344W',
    algo: 'SHA-256',
    durationDays: 5,
    stock: 60,
    tier: 'Starter',
    badge: '🔥 5-Day Turbo (UGX 16,000/day)',
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'plan-5d-3',
    name: 'VIP Express Plan (5-Day)',
    model: '5-Day VIP Package',
    priceUGX: 200000,
    dailyYieldUGX: 70000,
    hashRate: '145 TH/s',
    powerDraw: '3150W',
    algo: 'SHA-256',
    durationDays: 5,
    stock: 35,
    tier: 'Pro',
    badge: '🚀 5-Day VIP (UGX 70,000/day)',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
  },

  // 10-DAY ACCELERATED PLANS
  {
    id: 'plan-10d-1',
    name: 'Silver Plan (10-Day)',
    model: '10-Day Accelerated Package',
    priceUGX: 30000,
    dailyYieldUGX: 6000,
    hashRate: '68 TH/s',
    powerDraw: '3196W',
    algo: 'SHA-256',
    durationDays: 10,
    stock: 50,
    tier: 'Starter',
    badge: '⭐ 10-Day Silver (UGX 6,000/day)',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'plan-10d-2',
    name: 'Gold Hydro Plan (10-Day)',
    model: '10-Day Gold Package',
    priceUGX: 100000,
    dailyYieldUGX: 22000,
    hashRate: '145 TH/s',
    powerDraw: '3150W',
    algo: 'SHA-256',
    durationDays: 10,
    stock: 40,
    tier: 'Pro',
    badge: '💎 10-Day Gold (UGX 22,000/day)',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'plan-10d-3',
    name: 'Platinum Plan (10-Day)',
    model: '10-Day Platinum Package',
    priceUGX: 500000,
    dailyYieldUGX: 125000,
    hashRate: '8000 GH/s',
    powerDraw: '3200W',
    algo: 'kHeavyHash',
    durationDays: 10,
    stock: 20,
    tier: 'Pro',
    badge: '🏆 10-Day Platinum (UGX 125,000/day)',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80'
  },

  // 30-DAY EXECUTIVE PLANS
  {
    id: 'plan-30d-1',
    name: 'Master Plan (30-Day)',
    model: '30-Day Master Package',
    priceUGX: 150000,
    dailyYieldUGX: 27000,
    hashRate: '257 TH/s',
    powerDraw: '5300W',
    algo: 'SHA-256',
    durationDays: 30,
    stock: 30,
    tier: 'Pro',
    badge: '🌟 30-Day Master (UGX 27,000/day)',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'plan-30d-2',
    name: 'Diamond Plan (30-Day)',
    model: '30-Day Diamond Package',
    priceUGX: 1000000,
    dailyYieldUGX: 210000,
    hashRate: '514 TH/s',
    powerDraw: '5300W',
    algo: 'SHA-256',
    durationDays: 30,
    stock: 15,
    tier: 'Enterprise',
    badge: '👑 30-Day VIP (UGX 210,000/day)',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'plan-30d-3',
    name: 'Crown Executive Plan (30-Day)',
    model: '30-Day Executive Package',
    priceUGX: 2500000,
    dailyYieldUGX: 550000,
    hashRate: '12000 GH/s',
    powerDraw: '4500W',
    algo: 'kHeavyHash',
    durationDays: 30,
    stock: 5,
    tier: 'Industrial',
    badge: '👑 30-Day Crown (UGX 550,000/day)',
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

  // Sync state to LocalStorage and keep accounts registry synced
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('blq_current_user', JSON.stringify(currentUser));
      const accounts = getAllStoredAccounts();
      const targetKey = normalizePhoneKey(currentUser.phone);
      const accIndex = accounts.findIndex(a => normalizePhoneKey(a.phone) === targetKey);
      if (accIndex !== -1) {
        accounts[accIndex].user = currentUser;
        saveAllStoredAccounts(accounts);
      }
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

  // Robust Dual Storage Access to ensure accounts are NEVER lost
  const getAllStoredAccounts = (): StoredAccount[] => {
    try {
      const primary = localStorage.getItem('blq_user_accounts');
      if (primary) {
        const parsed = JSON.parse(primary);
        if (Array.isArray(parsed) && parsed.length > 0) {
          localStorage.setItem('blq_user_accounts_backup', primary);
          return parsed;
        }
      }
      // Redundant fallback to secondary backup vault
      const backup = localStorage.getItem('blq_user_accounts_backup');
      if (backup) {
        const parsedBackup = JSON.parse(backup);
        if (Array.isArray(parsedBackup) && parsedBackup.length > 0) {
          localStorage.setItem('blq_user_accounts', backup);
          return parsedBackup;
        }
      }
    } catch (e) {
      console.warn('Error reading stored accounts, attempting recovery', e);
    }
    return [];
  };

  const saveAllStoredAccounts = (accounts: StoredAccount[]) => {
    try {
      const payload = JSON.stringify(accounts);
      localStorage.setItem('blq_user_accounts', payload);
      localStorage.setItem('blq_user_accounts_backup', payload);
    } catch (e) {
      console.error('Failed to write accounts to permanent storage', e);
    }
  };

  // Helper for flexible canonical phone matching across 077..., +25677..., 25677..., 77...
  const normalizePhoneKey = (p: string): string => {
    if (!p) return '';
    const digits = p.replace(/\D/g, ''); // strip spaces, dashes, symbols
    if (digits.startsWith('256') && digits.length >= 12) return digits.slice(3);
    if (digits.startsWith('0') && digits.length === 10) return digits.slice(1);
    if (digits.length >= 9) return digits.slice(-9); // canonical 9 digits
    return digits;
  };

  // Real Account Registration with dual backup persistence
  const registerAccount = (phone: string, password: string, name?: string) => {
    const cleanPhone = phone.trim();
    const cleanPassword = password.trim();
    const accounts = getAllStoredAccounts();
    const targetKey = normalizePhoneKey(cleanPhone);

    const existing = accounts.find(a => normalizePhoneKey(a.phone) === targetKey);
    if (existing) {
      return { 
        success: false, 
        message: 'An account with this phone number already exists! Please click "Sign In" with your password.' 
      };
    }

    const pendingRef = localStorage.getItem('blq_pending_ref') || undefined;
    const userReferralCode = `BLQ-${cleanPhone.slice(-5)}`;

    const newUser: User = {
      id: 'usr_' + Date.now(),
      phone: cleanPhone,
      name: name?.trim() || `Investor ${cleanPhone.slice(-4)}`,
      balanceUGX: 0,
      uncollectedMinedUGX: 0,
      totalDepositedUGX: 0,
      totalWithdrawnUGX: 0,
      totalMinedUGX: 0,
      referralCode: userReferralCode,
      referredBy: pendingRef,
      referralCount: 0,
      referralEarningsUGX: 0,
      createdAt: new Date().toISOString()
    };

    const newAccount: StoredAccount = { phone: cleanPhone, password: cleanPassword, user: newUser };
    accounts.push(newAccount);
    saveAllStoredAccounts(accounts);
    setCurrentUser(newUser);

    return { 
      success: true, 
      message: 'Account created and permanently secured! Welcome to BLQ.', 
      user: newUser 
    };
  };

  // Strict Account Verification Login - always accepts existing accounts, rejects non-existent
  const loginAccount = (phone: string, password: string) => {
    const cleanPhone = phone.trim();
    const cleanPassword = password.trim();
    const accounts = getAllStoredAccounts();
    const targetKey = normalizePhoneKey(cleanPhone);

    const account = accounts.find(a => normalizePhoneKey(a.phone) === targetKey);

    if (!account) {
      return { 
        success: false, 
        message: 'No account found with this phone number. Please click "Register" below to create your account first.' 
      };
    }

    if (account.password.trim() !== cleanPassword) {
      return { 
        success: false, 
        message: 'Incorrect password for this phone number. Please check and try again.' 
      };
    }

    // Ensure user object has referral code if missing
    if (!account.user.referralCode) {
      account.user.referralCode = `BLQ-${cleanPhone.slice(-5)}`;
      saveAllStoredAccounts(accounts);
    }

    setCurrentUser(account.user);
    return { 
      success: true, 
      message: 'Welcome back! Login successful.', 
      user: account.user 
    };
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
      return { success: false, message: 'Invalid investment plan selected.' };
    }

    if (currentUser.balanceUGX < pkg.priceUGX) {
      return { 
        success: false, 
        message: `Insufficient balance! Plan cost is UGX ${pkg.priceUGX.toLocaleString()}. You have UGX ${currentUser.balanceUGX.toLocaleString()}. Please deposit funds via Mobile Money first.` 
      };
    }

    const userPrevRigs = purchasedRigs.filter(r => r.userId === currentUser.id);
    const isFirstPurchase = userPrevRigs.length === 0;

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

    const savedAccountsStr = localStorage.getItem('blq_user_accounts');
    if (savedAccountsStr) {
      const accounts: StoredAccount[] = JSON.parse(savedAccountsStr);
      
      // Update buyer account
      const accIndex = accounts.findIndex(a => a.phone === currentUser.phone);
      if (accIndex !== -1) {
        accounts[accIndex].user = updatedUser;
      }

      // Check if buyer was referred by someone and this is their FIRST miner purchase
      if (isFirstPurchase && currentUser.referredBy) {
        const referrerIndex = accounts.findIndex(
          a => a.user.referralCode === currentUser.referredBy || normalizePhoneKey(a.phone) === normalizePhoneKey(currentUser.referredBy!)
        );
        if (referrerIndex !== -1) {
          const referrer = accounts[referrerIndex].user;
          const sweetNotif = {
            id: 'notif_' + Date.now(),
            title: '🎉 Sweet News! UGX 15,000 Bonus Received!',
            message: `Congratulations! Your referred investor ${currentUser.name} (${currentUser.phone.slice(0, 3)}****${currentUser.phone.slice(-3)}) has successfully activated a miner! UGX 15,000 referral commission has been credited directly to your withdrawable balance. Keep sharing to earn more! 🌟💖`,
            amountUGX: 15000,
            referredName: currentUser.name,
            referredPhone: currentUser.phone,
            createdAt: new Date().toISOString(),
            read: false
          };

          const updatedReferrer: User = {
            ...referrer,
            balanceUGX: (referrer.balanceUGX || 0) + 15000,
            referralCount: (referrer.referralCount || 0) + 1,
            referralEarningsUGX: (referrer.referralEarningsUGX || 0) + 15000,
            notifications: [sweetNotif, ...(referrer.notifications || [])]
          };
          accounts[referrerIndex].user = updatedReferrer;

          if (currentUser.id === referrer.id) {
            setCurrentUser(updatedReferrer);
          }
        }
      }

      localStorage.setItem('blq_user_accounts', JSON.stringify(accounts));
    }

    return { 
      success: true, 
      message: `Success! You activated the ${pkg.name} for UGX ${pkg.priceUGX.toLocaleString()}. Daily profit: UGX ${pkg.dailyYieldUGX.toLocaleString()}` 
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
    if (amount < 10000) return { success: false, message: 'Minimum deposit amount is UGX 10,000' };
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
      message: `Thank you so much! Your deposit of UGX ${amount.toLocaleString()} has been received. Please wait gently while our accounts manager verifies your ${provider} transaction ID (${transactionId}). Your wallet balance will be updated automatically in just a moment!` 
    };
  };

  // Submit Withdrawal Request
  const submitWithdrawal = (amount: number, provider: 'MTN Mobile Money' | 'Airtel Money', destinationNumber: string) => {
    if (!currentUser) return { success: false, message: 'User not logged in' };
    if (amount < 3000) return { success: false, message: 'Minimum withdrawal amount is UGX 3,000' };
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
