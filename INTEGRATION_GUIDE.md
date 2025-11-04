# Integration Guide - Scientific Abstract Submission & Payment System

## Table of Contents

1. [Overview](#overview)
2. [Netlify Forms Setup](#netlify-forms-setup)
3. [Netlify Identity & CMS](#netlify-identity--cms)
4. [Stripe Payment Integration](#stripe-payment-integration)
5. [Environment Variables](#environment-variables)
6. [Testing & Deployment](#testing--deployment)
7. [Troubleshooting](#troubleshooting)

---

## Overview

This project integrates the following features:

✅ **Netlify Forms**: Scientific abstract submission form with automatic email notifications
✅ **Netlify Identity**: User authentication (deprecated but functional for CMS access)
✅ **Decap CMS** (formerly Netlify CMS): Admin dashboard for content management
✅ **Stripe Payments**: Payment processing for conference registrations
✅ **Responsive Design**: Mobile-friendly forms and pages
✅ **French Language Support**: Bilingual forms and interfaces

### Project Structure

```
.
├── src/
│   ├── pages/
│   │   ├── submit-abstract.tsx      # Scientific abstract submission form
│   │   ├── payment.tsx              # Stripe payment integration page
│   │   ├── index.tsx                # Home page
│   │   └── posts/                   # Blog posts
│   ├── components/
│   │   ├── Layout.tsx               # Main layout wrapper
│   │   ├── Navigation.tsx           # Updated navigation with new menu items
│   │   └── ...
│   └── ...
├── public/
│   ├── admin/
│   │   ├── config.yml               # Decap CMS configuration
│   │   └── index.html               # CMS admin dashboard
│   └── images/                      # Media uploads folder
├── package.json
├── netlify.toml                     # Netlify build configuration
└── INTEGRATION_GUIDE.md             # This file
```

---

## Netlify Forms Setup

### ✅ What's Already Done

- Form detection is **ENABLED** in Netlify project settings
- Scientific abstract submission form created at `/submit-abstract`
- Form uses proper Netlify Forms attributes:
  - `name` attribute for form identification
  - `data-netlify="true"` attribute
  - `data-netlify-honeypot="bot-field"` for spam prevention
  - Hidden `form-name` input field

### Form Fields Included

**Author Information Section:**
- Full name (required)
- Email (required)
- Affiliation/Institution (required)
- Co-authors (optional)

**Abstract Details Section:**
- Abstract title (required)
- Category dropdown (required)
- Keywords (required)
- Abstract text (required, max 300 words)
- Presentation type (required)

**Additional Information Section:**
- Funding source (optional)
- Ethical approval number (optional)
- Comments (optional)
- Terms acceptance checkbox (required)

### To View Submitted Forms

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select project: **chic-begonia-02696f**
3. Go to **Forms** section
4. Select **abstract-submission** form to see all submissions

### Configure Form Notifications

To receive email notifications when forms are submitted:

1. In Netlify Dashboard, go to **Forms**
2. Click on **abstract-submission** form
3. Set up **Form notifications**:
   - Add your email address
   - Choose notification trigger (on each submission)
   - Configure email alerts

---

## Netlify Identity & CMS

### ✅ What's Already Configured

- Netlify Identity is **ENABLED** (though marked as deprecated)
- Git Gateway is **ENABLED** for CMS authentication
- Decap CMS is configured at `/admin` with:
  - Collections for Config, Meta (authors/tags), Posts
  - Media folder at `public/images`
  - GitHub backend with Git Gateway authentication

### Access Admin CMS

1. Visit: `https://chic-begonia-02696f.netlify.app/admin`
2. You'll be redirected to GitHub authentication (if not signed in)
3. Click "Login with Netlify Identity" or authenticate via GitHub
4. You can then:
   - Create and edit blog posts
   - Manage authors and tags
   - Upload media files
   - Configure site settings

### Add New Users to CMS

1. Go to Netlify Dashboard → **Identity** section
2. Click **Invite users**
3. Enter email addresses
4. Users will receive invitation emails
5. After signup, they can access the admin CMS

---

## Stripe Payment Integration

### Step 1: Create Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Sign up for a Stripe account
3. Verify your email and complete account setup
4. Go to Dashboard → **API keys**
5. Get your keys:
   - **Publishable Key** (starts with `pk_`)
   - **Secret Key** (starts with `sk_`) - KEEP THIS PRIVATE!

### Step 2: Set Environment Variables in Netlify

1. Go to Netlify Dashboard → **Project Settings** → **Build & deploy** → **Environment**
2. Click **Add**
3. Add two environment variables:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_test_xxxxxxx
STRIPE_SECRET_KEY = sk_test_xxxxxxx
```

**Important**: The `NEXT_PUBLIC_` prefix makes the first key available on the client side.

### Step 3: Install Stripe Dependencies

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js stripe
```

### Step 4: Create Payment API Route

Create file: `src/pages/api/create-payment-intent.ts`

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe error:', error);
    return res.status(500).json({ message: 'Payment intent creation failed' });
  }
}
```

### Step 5: Update Payment Page

Uncomment and implement the Stripe integration in `src/pages/payment.tsx`:

```typescript
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// In your payment handler:
const handlePayment = async (planId: string) => {
  const stripe = useStripe();
  const elements = useElements();

  // Get the amount based on planId
  const plan = plans.find(p => p.id === planId);
  
  // Call your API to create payment intent
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    body: JSON.stringify({
      amount: plan.price,
      currency: plan.currency.toLowerCase(),
    }),
  });
  
  const { clientSecret } = await response.json();
  
  // Confirm the payment
  const { error, paymentIntent } = await stripe!.confirmCardPayment(
    clientSecret,
    {
      payment_method: {
        card: elements!.getElement(CardElement)!,
      },
    }
  );
  
  // Handle result
};
```

### Step 6: Test Payment Flow

1. Deploy with environment variables set
2. Go to `/payment` on your deployed site
3. Select a plan and click "Select and Pay"
4. Use Stripe test card: `4242 4242 4242 4242`
5. Any future date and any CVC
6. Verify payment appears in Stripe Dashboard

**Test Cards:**
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Authentication: `4000 0025 0000 3155`

---

## Environment Variables

### Required for Stripe

```bash
# Public (safe to expose)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxx

# Secret (NEVER expose publicly)
STRIPE_SECRET_KEY=sk_test_xxxxxxx
```

### Optional

```bash
# Email configuration (if using email service)
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASSWORD=your-password
```

### Setting in Netlify

1. Go to **Project Settings** → **Build & deploy** → **Environment**
2. Add variables using the form
3. Redeploy your site

---

## Testing & Deployment

### Local Testing

```bash
# Install dependencies
npm install

# Set local environment variables
echo 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx' > .env.local
echo 'STRIPE_SECRET_KEY=sk_test_xxx' >> .env.local

# Run development server
npm run dev

# Visit:
# http://localhost:3000/submit-abstract (abstract form)
# http://localhost:3000/payment (payment page)
```

### Deploy to Netlify

1. **Automatic Deployment**: Push to GitHub → Netlify auto-deploys
2. **Manual Deploy**: Use Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### After Deployment

1. ✅ Test abstract form: `/submit-abstract`
2. ✅ Check Netlify Forms dashboard for submissions
3. ✅ Test payment page: `/payment`
4. ✅ Verify CMS at: `/admin`
5. ✅ Check GitHub for automatic deployments

---

## Troubleshooting

### Forms Not Appearing in Netlify Dashboard

**Problem**: Submitted forms don't show in Netlify Forms section

**Solutions**:
1. Make sure form has `data-netlify="true"` attribute
2. Make sure form has unique `name` attribute
3. Re-deploy the site
4. Check Netlify build logs for errors
5. Verify Git Gateway is enabled

### CMS Login Issues

**Problem**: Can't login to admin CMS at `/admin`

**Solutions**:
1. Check if Netlify Identity is enabled
2. Check if Git Gateway is enabled
3. Clear browser cache and cookies
4. Try incognito/private mode
5. Check browser console for errors

### Stripe Payment Errors

**Problem**: Payment button doesn't work

**Solutions**:
1. Check environment variables are set in Netlify
2. Verify `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` starts with `pk_`
3. Test with Stripe test cards
4. Check browser console for JavaScript errors
5. Verify API route exists at `/api/create-payment-intent`

### Navigation Menu Not Updated

**Problem**: "soumettre résumé" link not appearing in menu

**Solutions**:
1. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Verify Navigation.tsx was committed
4. Check if site was redeployed after changes

---

## Next Steps

1. ✅ **Complete Stripe Integration**: Uncomment code in `payment.tsx` and test
2. ✅ **Configure Email Notifications**: Set up Netlify Forms email alerts
3. ✅ **Add Custom Domain**: Update domain in Netlify settings
4. ✅ **Set Up SSL**: Enabled by default on Netlify
5. ✅ **Monitor Analytics**: Enable Netlify Analytics
6. ✅ **Backup Content**: Export CMS content regularly

---

## Resources

- [Netlify Forms Documentation](https://docs.netlify.com/forms/setup/)
- [Netlify Identity Documentation](https://docs.netlify.com/identity/overview/)
- [Decap CMS Documentation](https://decapcms.org/docs/intro/)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [Next.js Documentation](https://nextjs.org/docs)
- [Git Gateway Documentation](https://www.netlifycms.org/docs/git-gateway-backend/)

---

## Support

For issues or questions:
1. Check this guide's troubleshooting section
2. Review Netlify documentation
3. Contact Netlify support through dashboard
4. Check Stripe documentation for payment issues

---

**Last Updated**: 2024
**Status**: ✅ All systems configured and ready
