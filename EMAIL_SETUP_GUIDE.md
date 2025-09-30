# 📧 Email Setup Guide for PERF Simulator

## Setup EmailJS (Recommended)

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Connect Email Service
1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. **Copy your Service ID** (you'll need this)

### 3. Create Email Template
1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template content:

```html
Subject: Vos résultats de simulation PERF

Bonjour,

Voici vos résultats de simulation PERF :

📊 **RÉSULTATS FINANCIERS**
💰 Gains potentiels : {{gains_amount}}€

📈 **DONNÉES DE SIMULATION**
• Volume Step 1 : {{step1_volume}}K€
• Chiffre d'affaires Step 1 : {{step1_revenue}}K€
• Valeur Step 3 : {{step3_value}}K€  
• Valeur Step 4 : {{step4_value}}K€

🏭 **MANUFACTURIERS SÉLECTIONNÉS**
{{manufacturers}}

📅 Date de simulation : {{date}}

---
Merci d'avoir utilisé le simulateur PERF !

Cordialement,
L'équipe PERF
```

4. **Copy your Template ID** (you'll need this)

### 4. Get Public Key
1. Go to **"Account"** → **"General"**
2. **Copy your Public Key** (you'll need this)

### 5. Update Your Code
In `src/App.tsx`, replace these values in the `sendSimulationResults` function:

```javascript
const serviceId = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
const templateId = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID  
const publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key
```

### 6. Test the Integration
1. Run your development server: `npm run dev`
2. Complete a simulation
3. Click "Recevoir un mail"
4. Enter your email and test!

## Alternative Options

### Option 2: Backend Integration
If you prefer a backend solution, you can:
1. Create a simple Express.js server
2. Use Nodemailer with your SMTP settings
3. Create an API endpoint for email sending
4. Update the frontend to call your API

### Option 3: Form Services
Use services like:
- **Formspree**: Simple form handling with email notifications
- **Netlify Forms**: If hosting on Netlify
- **Vercel Forms**: If hosting on Vercel

## Email Template Variables Available

Your email template can use these variables:
- `{{to_email}}` - Recipient email
- `{{user_email}}` - User's email  
- `{{gains_amount}}` - Calculated gains amount
- `{{step1_volume}}` - Step 1 volume value
- `{{step1_revenue}}` - Step 1 revenue value
- `{{step3_value}}` - Step 3 cursor value
- `{{step4_value}}` - Step 4 cursor value
- `{{manufacturers}}` - Selected manufacturers with percentages
- `{{date}}` - Current date

## Troubleshooting

### Common Issues:
1. **"EmailJS service not found"** - Check your Service ID
2. **"Template not found"** - Check your Template ID  
3. **"Invalid public key"** - Check your Public Key
4. **Email not received** - Check spam folder, verify email template

### Testing:
- Use your own email first to test
- Check EmailJS dashboard for sending logs
- Monitor browser console for errors

## Security Notes
- EmailJS public key is safe to use in frontend
- Consider rate limiting for production
- Monitor usage to stay within free tier limits

---

Need help? Check the [EmailJS documentation](https://www.emailjs.com/docs/) or contact support.
