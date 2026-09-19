import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { User, MinerPackage, PurchasedRig, DepositRequest, WithdrawalRequest, AdminConfig } from '../types';
import { fetchCloudData, saveCloudData } from '../services/cloudSync';

// Clean, attractive investment plans tailored for Ugandan investors
export const INITIAL_MINER_PACKAGES: MinerPackage[] = [
  // 5-DAY EXPRESS PLANS
  {
    id: 'plan-5d-1',
    name: 'Starter Plan (5-Day)',
    model: 'Antminer S19 Pro (5-Day Express)',
    priceUGX: 10000,
    dailyYieldUGX: 3500,
    hashRate: '110 TH/s',
    powerDraw: '3250W',
    algo: 'SHA-256',
    durationDays: 5,
    stock: 100,
    tier: 'Starter',
    badge: '⚡ 5-Day Express (UGX 3,500/day)',
    image: '/images/miners/miner-compact-unit.png'
  },
  {
    id: 'plan-5d-2',
    name: 'Turbo Plan (5-Day)',
    model: 'Antminer S19j Pro (5-Day Turbo)',
    priceUGX: 50000,
    dailyYieldUGX: 18500,
    hashRate: '100 TH/s',
    powerDraw: '3050W',
    algo: 'SHA-256',
    durationDays: 5,
    stock: 60,
    tier: 'Starter',
    badge: '🔥 5-Day Turbo (UGX 18,500/day)',
    image: '/images/miners/miner-psu-unit.png'
  },
  {
    id: 'plan-5d-3',
    name: 'VIP Express Plan (5-Day)',
    model: 'Whatsminer M50 (5-Day VIP)',
    priceUGX: 200000,
    dailyYieldUGX: 85000,
    hashRate: '118 TH/s',
    powerDraw: '3400W',
    algo: 'SHA-256',
    durationDays: 5,
    stock: 35,
    tier: 'Pro',
    badge: '🚀 5-Day VIP (UGX 85,000/day)',
    image: '/images/miners/miner-enterprise-farm.png'
  },

  // 10-DAY ACCELERATED PLANS
  {
    id: 'plan-10d-1',
    name: 'Silver Plan (10-Day)',
    model: 'Antminer S19a (10-Day Silver)',
    priceUGX: 30000,
    dailyYieldUGX: 7500,
    hashRate: '58 TH/s',
    powerDraw: '2380W',
    algo: 'SHA-256',
    durationDays: 10,
    stock: 50,
    tier: 'Starter',
    badge: '⭐ 10-Day Silver (UGX 7,500/day)',
    image: '/images/miners/miner-hash-board.png'
  },
  {
    id: 'plan-10d-2',
    name: 'Gold Hydro Plan (10-Day)',
    model: 'HydroMiner Blade (10-Day Gold)',
    priceUGX: 100000,
    dailyYieldUGX: 26000,
    hashRate: '120 TH/s',
    powerDraw: '3200W',
    algo: 'SHA-256',
    durationDays: 10,
    stock: 40,
    tier: 'Pro',
    badge: '💎 10-Day Gold (UGX 26,000/day)',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'plan-10d-3',
    name: 'Platinum Plan (10-Day)',
    model: 'IceRiver KS1 (10-Day Platinum)',
    priceUGX: 500000,
    dailyYieldUGX: 150000,
    hashRate: '8.0 GH/s',
    powerDraw: '3200W',
    algo: 'kHeavyHash',
    durationDays: 10,
    stock: 20,
    tier: 'Pro',
    badge: '🏆 10-Day Platinum (UGX 150,000/day)',
    image: '/images/miners/miner-technical-closeup.png'
  },

  // 30-DAY EXECUTIVE PLANS
  {
    id: 'plan-30d-1',
    name: 'Master Plan (30-Day)',
    model: 'Antminer S19 XP (30-Day Master)',
    priceUGX: 150000,
    dailyYieldUGX: 38000,
    hashRate: '140 TH/s',
    powerDraw: '3000W',
    algo: 'SHA-256',
    durationDays: 30,
    stock: 30,
    tier: 'Pro',
    badge: '🌟 30-Day Master (UGX 38,000/day)',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'plan-30d-2',
    name: 'Diamond Plan (30-Day)',
    model: 'Whatsminer M52 (30-Day Diamond)',
    priceUGX: 1000000,
    dailyYieldUGX: 260000,
    hashRate: '126 TH/s',
    powerDraw: '3200W',
    algo: 'SHA-256',
    durationDays: 30,
    stock: 15,
    tier: 'Enterprise',
    badge: '👑 30-Day Diamond (UGX 260,000/day)',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'plan-30d-3',
    name: 'Crown Executive Plan (30-Day)',
    model: 'Antminer S21 (30-Day Crown)',
    priceUGX: 2500000,
    dailyYieldUGX: 750000,
    hashRate: '200 TH/s',
    powerDraw: '3500W',
    algo: 'SHA-256',
    durationDays: 30,
    stock: 5,
    tier: 'Industrial',
    badge: '👑 30-Day Crown (UGX 750,000/day)',
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=600&q=80'
  },

  // 60-DAY PREMIUM INDUSTRIAL PLANS
  {
    id: 'plan-60d-1',
    name: 'Apex Industrial Plan (60-Day)',
    model: '60-Day Industrial Validator Cluster',
    priceUGX: 5000000,
    dailyYieldUGX: 250000,
    hashRate: '1.2 PH/s',
    powerDraw: '7800W',
    algo: 'SHA-256',
    durationDays: 60,
    stock: 10,
    tier: 'Industrial',
    badge: '💎 60-Day Apex (UGX 250,000/day)',
    image: '/images/miners/miner-datacenter.png'
  },
  {
    id: 'plan-60d-2',
    name: 'Titanium Max Plan (60-Day)',
    model: '60-Day Enterprise Super Rig',
    priceUGX: 10000000,
    dailyYieldUGX: 650000,
    hashRate: '2.4 PH/s',
    powerDraw: '15600W',
    algo: 'SHA-256',
    durationDays: 60,
    stock: 5,
    tier: 'Enterprise',
    badge: '🔥 60-Day Titanium (UGX 650,000/day)',
    image: '/images/miners/miner-farm-wide.png'
  },
  {
    id: 'plan-60d-3',
    name: 'Bluelightning Sovereign Plan (60-Day)',
    model: '60-Day Quantum Fleet Master',
    priceUGX: 25000000,
    dailyYieldUGX: 2000000,
    hashRate: '5.0 PH/s',
    powerDraw: '32000W',
    algo: 'SHA-256',
    durationDays: 60,
    stock: 3,
    tier: 'Industrial',
    badge: '🚀 60-Day Sovereign (UGX 2,000,000/day)',
    image: '/images/miners/miner-industrial-rig.png'
  },

  // 90-DAY ULTIMATE EXECUTIVE PLANS
  {
    id: 'plan-90d-1',
    name: 'Executive Prime Plan (90-Day)',
    model: '90-Day Prime Enterprise Rig',
    priceUGX: 15000000,
    dailyYieldUGX: 1200000,
    hashRate: '3.2 PH/s',
    powerDraw: '21000W',
    algo: 'SHA-256',
    durationDays: 90,
    stock: 5,
    tier: 'Enterprise',
    badge: '👑 90-Day Prime (UGX 1,200,000/day)',
    image: '/images/miners/miner-server-farm.png'
  },
  {
    id: 'plan-90d-2',
    name: 'Kingpin Legacy Plan (90-Day)',
    model: '90-Day Legacy Mega Farm',
    priceUGX: 50000000,
    dailyYieldUGX: 5000000,
    hashRate: '8.0 PH/s',
    powerDraw: '52000W',
    algo: 'SHA-256',
    durationDays: 90,
    stock: 2,
    tier: 'Industrial',
    badge: '🏆 90-Day Kingpin (UGX 5,000,000/day)',
    image: '/images/miners/miner-modern-datacenter.png'
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

export interface ReferredUserInfo {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
  isActivated: boolean;
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
  
  // Auth methods (Async with cross-device cloud sync)
  registerAccount: (phone: string, password: string, name?: string) => Promise<{ success: boolean; message: string; user?: User }>;
  loginAccount: (phone: string, password: string) => Promise<{ success: boolean; message: string; user?: User }>;
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

  // Referral helpers
  referredUsers: ReferredUserInfo[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper for flexible canonical phone matching across 077..., +25677..., 25677..., 77...
export const normalizePhoneKey = (p: string): string => {
  if (!p) return '';
  const digits = p.replace(/\D/g, '');
  if (digits.startsWith('256') && digits.length >= 12) return digits.slice(3);
  if (digits.startsWith('0') && digits.length === 10) return digits.slice(1);
  if (digits.length >= 9) return digits.slice(-9);
  return digits;
};

// Merge accounts cleanly without duplicates
const mergeAccounts = (local: StoredAccount[], cloud: StoredAccount[]): StoredAccount[] => {
  const map = new Map<string, StoredAccount>();
  for (const acc of local) {
    map.set(normalizePhoneKey(acc.phone), acc);
  }
  for (const acc of cloud) {
    const key = normalizePhoneKey(acc.phone);
    if (!map.has(key)) {
      map.set(key, acc);
    } else {
      // Merge user state, keeping most up-to-date balance/data
      const localAcc = map.get(key)!;
      const mergedUser: User = {
        ...localAcc.user,
        ...acc.user,
        balanceUGX: Math.max(localAcc.user.balanceUGX || 0, acc.user.balanceUGX || 0),
        totalDepositedUGX: Math.max(localAcc.user.totalDepositedUGX || 0, acc.user.totalDepositedUGX || 0),
        totalWithdrawnUGX: Math.max(localAcc.user.totalWithdrawnUGX || 0, acc.user.totalWithdrawnUGX || 0),
        totalMinedUGX: Math.max(localAcc.user.totalMinedUGX || 0, acc.user.totalMinedUGX || 0)
      };
      map.set(key, { ...localAcc, password: acc.password || localAcc.password, user: mergedUser });
    }
  }
  return Array.from(map.values());
};

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
  const [referredUsers, setReferredUsers] = useState<ReferredUserInfo[]>([]);

  // Local Storage Helpers
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
      const backup = localStorage.getItem('blq_user_accounts_backup');
      if (backup) {
        const parsedBackup = JSON.parse(backup);
        if (Array.isArray(parsedBackup) && parsedBackup.length > 0) {
          localStorage.setItem('blq_user_accounts', backup);
          return parsedBackup;
        }
      }
    } catch (e) {
      console.warn('Error reading stored accounts', e);
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

  // INITIAL CLOUD SYNC: Run on app mount to sync data from cloud across all devices
  useEffect(() => {
    let isMounted = true;
    const syncFromCloud = async () => {
      try {
        const [cloudAccounts, cloudRigs, cloudDeps, cloudWiths, cloudConfig] = await Promise.all([
          fetchCloudData<StoredAccount[]>('accounts', []),
          fetchCloudData<PurchasedRig[]>('rigs', []),
          fetchCloudData<DepositRequest[]>('deposits', []),
          fetchCloudData<WithdrawalRequest[]>('withdrawals', []),
          fetchCloudData<AdminConfig | null>('admin_config', null)
        ]);

        if (!isMounted) return;

        // Merge Accounts
        const localAccounts = getAllStoredAccounts();
        const mergedAccounts = mergeAccounts(localAccounts, cloudAccounts);
        saveAllStoredAccounts(mergedAccounts);

        // Update Rigs
        if (cloudRigs && cloudRigs.length > 0) {
          setPurchasedRigs(prev => {
            const combined = [...prev];
            for (const r of cloudRigs) {
              if (!combined.some(existing => existing.id === r.id)) combined.push(r);
            }
            localStorage.setItem('blq_purchased_rigs', JSON.stringify(combined));
            return combined;
          });
        }

        // Update Deposits
        if (cloudDeps && cloudDeps.length > 0) {
          setDeposits(prev => {
            const combined = [...prev];
            for (const d of cloudDeps) {
              if (!combined.some(existing => existing.id === d.id)) combined.push(d);
            }
            localStorage.setItem('blq_deposits', JSON.stringify(combined));
            return combined;
          });
        }

        // Update Withdrawals
        if (cloudWiths && cloudWiths.length > 0) {
          setWithdrawals(prev => {
            const combined = [...prev];
            for (const w of cloudWiths) {
              if (!combined.some(existing => existing.id === w.id)) combined.push(w);
            }
            localStorage.setItem('blq_withdrawals', JSON.stringify(combined));
            return combined;
          });
        }

        // Update Admin Config
        if (cloudConfig && cloudConfig.adminPin) {
          setAdminConfig(cloudConfig);
          localStorage.setItem('blq_admin_config', JSON.stringify(cloudConfig));
        }

        // If currentUser is logged in, refresh state from merged accounts
        if (currentUser) {
          const targetKey = normalizePhoneKey(currentUser.phone);
          const freshAcc = mergedAccounts.find(a => normalizePhoneKey(a.phone) === targetKey);
          if (freshAcc) {
            setCurrentUser(freshAcc.user);
          }
        }
      } catch (err) {
        console.warn('[CloudSync] Background sync error:', err);
      }
    };

    syncFromCloud();
    return () => { isMounted = false; };
  }, []);

  // Sync state to LocalStorage and keep accounts registry synced
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('blq_current_user', JSON.stringify(currentUser));
      const accounts = getAllStoredAccounts();
      const targetKey = normalizePhoneKey(currentUser.phone);
      const accIndex = accounts.findIndex(a => normalizePhoneKey(a.phone) === targetKey);
      if (accIndex !== -1) {
        // Preserve the password from the existing account when updating user object
        const existingPassword = accounts[accIndex].password || '';
        accounts[accIndex].user = currentUser;
        accounts[accIndex].password = existingPassword;
        saveAllStoredAccounts(accounts);
        saveCloudData('accounts', accounts);
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

  // Auto-claim daily mined yield into wallet balance every 24 hours
  // Runs on app load (catches missed claims while offline) and on an interval.
  useEffect(() => {
    if (!currentUser) return;

    const accounts = getAllStoredAccounts();
    const targetKey = normalizePhoneKey(currentUser.phone);
    const accIndex = accounts.findIndex(a => normalizePhoneKey(a.phone) === targetKey);
    if (accIndex === -1) return;

    const user = accounts[accIndex].user;
    const userActiveRigs = purchasedRigs.filter(r => r.userId === user.id && r.status === 'active');
    if (userActiveRigs.length === 0) return;

    let changed = false;
    const now = new Date();

    userActiveRigs.forEach(rig => {
      const lastClaim = rig.lastClaimDate;
      if (!lastClaim) return;

      const elapsedMs = now.getTime() - new Date(lastClaim).getTime();
      if (elapsedMs >= 24 * 60 * 60 * 1000) {
        // Daily yield is auto-credited directly to wallet balance
        user.balanceUGX = (user.balanceUGX || 0) + rig.dailyYieldUGX;
        user.totalMinedUGX = (user.totalMinedUGX || 0) + rig.dailyYieldUGX;
        rig.lastClaimDate = now.toISOString();
        changed = true;
      }
    });

    // Also expire rigs whose contract has ended
    userActiveRigs.forEach(rig => {
      if (new Date(rig.expiryDate) <= now && rig.status === 'active') {
        rig.status = 'expired';
        changed = true;
      }
    });

    if (changed) {
      saveAllStoredAccounts(accounts);
      saveCloudData('accounts', accounts);
      saveCloudData('rigs', purchasedRigs);
      setCurrentUser({ ...user });
    }
  }, [currentUser, purchasedRigs]);

  // Recompute referred users whenever currentUser or accounts change
  useEffect(() => {
    if (!currentUser) {
      setReferredUsers([]);
      return;
    }

    const accounts = getAllStoredAccounts();
    const myCode = currentUser.referralCode || `BLQ-${currentUser.phone.slice(-5)}`;
    const savedRigs = localStorage.getItem('blq_purchased_rigs');
    const allRigs: Array<{ userId: string }> = savedRigs ? JSON.parse(savedRigs) : [];

    const referred = accounts
      .filter(a => a.user.referredBy === myCode || normalizePhoneKey(a.user.referredBy || '') === normalizePhoneKey(currentUser.phone))
      .map(a => {
        const userRigs = allRigs.filter(r => r.userId === a.user.id);
        return {
          id: a.user.id,
          name: a.user.name,
          phone: a.user.phone,
          createdAt: a.user.createdAt,
          isActivated: userRigs.length > 0
        };
      });

    setReferredUsers(referred);
  }, [currentUser, purchasedRigs, deposits]);

  // Real Account Registration with Cross-Device Cloud Sync
  const registerAccount = async (phone: string, password: string, name?: string): Promise<{ success: boolean; message: string; user?: User }> => {
    const cleanPhone = phone.trim();
    const cleanPassword = password.trim();
    const targetKey = normalizePhoneKey(cleanPhone);

    // Pull latest cloud accounts to verify uniqueness across devices
    let localAccounts = getAllStoredAccounts();
    const cloudAccounts = await fetchCloudData<StoredAccount[]>('accounts', []);
    const merged = mergeAccounts(localAccounts, cloudAccounts);

    const existing = merged.find(a => normalizePhoneKey(a.phone) === targetKey);
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
    merged.push(newAccount);

    // Save locally and push to cloud
    saveAllStoredAccounts(merged);
    await saveCloudData('accounts', merged);

    setCurrentUser(newUser);

    return { 
      success: true, 
      message: 'Account created and permanently secured across all devices! Welcome to BLQ.', 
      user: newUser 
    };
  };

  // Strict Account Verification Login with Instant Cross-Device Cloud Lookup
  const loginAccount = async (phone: string, password: string): Promise<{ success: boolean; message: string; user?: User }> => {
    const cleanPhone = phone.trim();
    const cleanPassword = password.trim();
    const targetKey = normalizePhoneKey(cleanPhone);

    let accounts = getAllStoredAccounts();
    let account = accounts.find(a => normalizePhoneKey(a.phone) === targetKey);

    // If not found in local storage, query cloud database immediately
    if (!account) {
      const cloudAccounts = await fetchCloudData<StoredAccount[]>('accounts', []);
      accounts = mergeAccounts(accounts, cloudAccounts);
      saveAllStoredAccounts(accounts);
      account = accounts.find(a => normalizePhoneKey(a.phone) === targetKey);
    }

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
      saveCloudData('accounts', accounts);
    }

    // Sync down cloud rigs, deposits, withdrawals in the background
    try {
      const [cloudRigs, cloudDeps, cloudWiths] = await Promise.all([
        fetchCloudData<PurchasedRig[]>('rigs', []),
        fetchCloudData<DepositRequest[]>('deposits', []),
        fetchCloudData<WithdrawalRequest[]>('withdrawals', [])
      ]);
      if (cloudRigs && cloudRigs.length > 0) {
        setPurchasedRigs(cloudRigs);
        localStorage.setItem('blq_purchased_rigs', JSON.stringify(cloudRigs));
      }
      if (cloudDeps && cloudDeps.length > 0) {
        setDeposits(cloudDeps);
        localStorage.setItem('blq_deposits', JSON.stringify(cloudDeps));
      }
      if (cloudWiths && cloudWiths.length > 0) {
        setWithdrawals(cloudWiths);
        localStorage.setItem('blq_withdrawals', JSON.stringify(cloudWiths));
      }
    } catch (e) {
      console.warn('Post-login sync note:', e);
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

    const updatedRigs = [newRig, ...purchasedRigs];
    setPurchasedRigs(updatedRigs);
    saveCloudData('rigs', updatedRigs);

    const updatedUser = {
      ...currentUser,
      balanceUGX: currentUser.balanceUGX - pkg.priceUGX
    };
    setCurrentUser(updatedUser);

    const accounts = getAllStoredAccounts();
    const accIndex = accounts.findIndex(a => a.phone === currentUser.phone);
    if (accIndex !== -1) {
      accounts[accIndex].user = updatedUser;
    }

    // Check referral bonus on first miner purchase
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

    saveAllStoredAccounts(accounts);
    saveCloudData('accounts', accounts);

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

    const accounts = getAllStoredAccounts();
    const accIndex = accounts.findIndex(a => a.phone === currentUser.phone);
    if (accIndex !== -1) {
      accounts[accIndex].user = updatedUser;
      saveAllStoredAccounts(accounts);
      saveCloudData('accounts', accounts);
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

    const updatedDeposits = [newDeposit, ...deposits];
    setDeposits(updatedDeposits);
    saveCloudData('deposits', updatedDeposits);

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

    const updatedWithdrawals = [newWithdrawal, ...withdrawals];
    setWithdrawals(updatedWithdrawals);
    saveCloudData('withdrawals', updatedWithdrawals);

    const accounts = getAllStoredAccounts();
    const accIndex = accounts.findIndex(a => a.phone === currentUser.phone);
    if (accIndex !== -1) {
      accounts[accIndex].user = updatedUser;
      saveAllStoredAccounts(accounts);
      saveCloudData('accounts', accounts);
    }

    return { 
      success: true, 
      message: `Withdrawal request of UGX ${amount.toLocaleString()} submitted! You will receive UGX ${netAmount.toLocaleString()} on ${destinationNumber} once approved.` 
    };
  };

  // Admin Actions
  const approveDeposit = (depositId: string) => {
    const updated = deposits.map(dep => {
      if (dep.id === depositId && dep.status === 'pending') {
        const accounts = getAllStoredAccounts();
        const accIndex = accounts.findIndex(a => a.user.id === dep.userId || normalizePhoneKey(a.phone) === normalizePhoneKey(dep.userPhone));
        if (accIndex !== -1) {
          accounts[accIndex].user.balanceUGX = (accounts[accIndex].user.balanceUGX || 0) + dep.amountUGX;
          accounts[accIndex].user.totalDepositedUGX = (accounts[accIndex].user.totalDepositedUGX || 0) + dep.amountUGX;
          saveAllStoredAccounts(accounts);
          saveCloudData('accounts', accounts);
          if (currentUser && currentUser.id === dep.userId) {
            setCurrentUser({ ...accounts[accIndex].user });
          }
        }
        return { ...dep, status: 'approved' as const };
      }
      return dep;
    });
    setDeposits(updated);
    saveCloudData('deposits', updated);
  };

  const rejectDeposit = (depositId: string) => {
    const updated = deposits.map(dep => dep.id === depositId ? { ...dep, status: 'rejected' as const } : dep);
    setDeposits(updated);
    saveCloudData('deposits', updated);
  };

  const approveWithdrawal = (withdrawalId: string) => {
    const updated = withdrawals.map(wth => {
      if (wth.id === withdrawalId && wth.status === 'pending') {
        const accounts = getAllStoredAccounts();
        const accIndex = accounts.findIndex(a => a.user.id === wth.userId || normalizePhoneKey(a.phone) === normalizePhoneKey(wth.userPhone));
        if (accIndex !== -1) {
          accounts[accIndex].user.totalWithdrawnUGX = (accounts[accIndex].user.totalWithdrawnUGX || 0) + wth.amountUGX;
          saveAllStoredAccounts(accounts);
          saveCloudData('accounts', accounts);
          if (currentUser && currentUser.id === wth.userId) {
            setCurrentUser({ ...accounts[accIndex].user });
          }
        }
        return { ...wth, status: 'approved' as const };
      }
      return wth;
    });
    setWithdrawals(updated);
    saveCloudData('withdrawals', updated);
  };

  const rejectWithdrawal = (withdrawalId: string) => {
    const updated = withdrawals.map(wth => {
      if (wth.id === withdrawalId && wth.status === 'pending') {
        const accounts = getAllStoredAccounts();
        const accIndex = accounts.findIndex(a => a.user.id === wth.userId || normalizePhoneKey(a.phone) === normalizePhoneKey(wth.userPhone));
        if (accIndex !== -1) {
          accounts[accIndex].user.balanceUGX = (accounts[accIndex].user.balanceUGX || 0) + wth.amountUGX;
          saveAllStoredAccounts(accounts);
          saveCloudData('accounts', accounts);
          if (currentUser && currentUser.id === wth.userId) {
            setCurrentUser({ ...accounts[accIndex].user });
          }
        }
        return { ...wth, status: 'rejected' as const };
      }
      return wth;
    });
    setWithdrawals(updated);
    saveCloudData('withdrawals', updated);
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
      liveUnclaimedYield,
      referredUsers
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
