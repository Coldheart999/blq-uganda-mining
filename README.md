# BLQ - High Yield Crypto Mining Platform (Uganda)

A sleek, realistic, production-ready React web application designed for Ugandan investors, featuring:
- **Phone & OTP Verification**: Instant sign-up with Ugandan mobile money phone numbers (+256 format for MTN & Airtel).
- **Realistic ASIC Hardware Rigs**: Antminer S19 Pro XP, MicroBT Whatsminer, Canaan Avalon, and Kaspa IceRiver rigs with realistic daily UGX returns.
- **Mobile Money Deposit System**: Simple instructions displaying your designated MTN/Airtel receiver phone number and account name, plus TxID confirmation input.
- **Real-Time Mining Engine**: Live yield generation ticking up every second in UGX with 1-click collection into virtual withdrawable balance.
- **Withdrawal & Owner Admin Panel**: A dedicated admin panel (default PIN: `8888`) where you can review pending withdrawal payouts, see exact profit metrics, send funds to user numbers, approve deposits, and update your mobile money receiver phone numbers anytime.

---

## Local Development & Testing

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run local dev server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

3. **Admin Access**:
   - Click **Admin Portal** at the top right of the navigation header.
   - Enter PIN: `8888` (or update PIN inside the admin settings).

---

## Free Hosting Guide

You can easily host this website for **100% FREE** using **Vercel** or **Render**.

### Option A: Hosting on Vercel (Recommended - Instant & Free)

Vercel provides free, high-speed global hosting with instant HTTPS for React Vite apps.

1. **Push your code to GitHub**:
   - Create a free GitHub repository (e.g. `blq-uganda-mining`).
   - Run in project directory:
     ```bash
     git init
     git add .
     git commit -m "Initial BLQ release"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/blq-uganda-mining.git
     git push -u origin main
     ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign up/login with GitHub.
   - Click **Add New Project** -> Select your `blq-uganda-mining` repository.
   - Framework Preset: **Vite**
   - Click **Deploy**.
   - Your site will be live within 1 minute with a free URL like `https://blq-uganda-mining.vercel.app`!

---

### Option B: Hosting on Render (Free)

1. Sign up at [render.com](https://render.com).
2. Click **New +** -> **Static Site**.
3. Connect your GitHub repository.
4. Set Build Command: `npm run build`
5. Set Publish Directory: `dist`
6. Click **Create Static Site**.

---

### Custom Domain Name Setup (Optional)
If you purchase a custom domain like `www.blqminer.com` or `www.blq.ug`:
1. In Vercel or Render, go to **Domains** settings.
2. Add your custom domain.
3. Update your domain registrar's DNS records (CNAME / A record) as instructed by Vercel/Render.
