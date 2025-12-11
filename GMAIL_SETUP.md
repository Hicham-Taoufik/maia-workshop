# 📧 Gmail SMTP Setup Guide

Complete guide to set up Gmail SMTP for your workshop website.

---

## ✅ What You'll Get

- Send emails from: `hichame.taoufik1@gmail.com`
- Daily limit: **500 emails/day** (plenty for your workshop!)
- Cost: **FREE**
- All emails sent from your personal Gmail account

---

## 🚀 Quick Setup (10 minutes)

### Step 1: Enable 2-Factor Authentication

1. Go to: [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Click **"2-Step Verification"** under "Signing in to Google"
3. Click **"Get Started"**
4. Follow the prompts to set up with your phone number
5. Complete verification

**Why needed?** Google requires 2FA to generate app passwords for security.

---

### Step 2: Generate App Password

1. Go back to: [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Click **"App passwords"** under "Signing in to Google"
   - **Don't see it?** Make sure 2FA is enabled first
3. You may need to sign in again
4. **Select app:** Choose **"Mail"**
5. **Select device:** Choose **"Other (Custom name)"**
6. Type: `MAIA Workshop`
7. Click **"Generate"**
8. **COPY THE PASSWORD!** It looks like: `abcd efgh ijkl mnop`
   - ⚠️ Save it now - you won't see it again!
   - ⚠️ Remove spaces when pasting in .env.local

**Screenshot locations:**
- Settings → Security → 2-Step Verification
- Settings → Security → App passwords

---

### Step 3: Create .env.local File

In your project root folder, create a file named `.env.local`:

```env
# Gmail SMTP Configuration
EMAIL_USER=hichame.taoufik1@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
ADMIN_EMAIL=hichame.taoufik1@gmail.com
```

**Important Notes:**
- Replace `abcdefghijklmnop` with YOUR 16-character password
- Remove ALL spaces from the password
- Don't include quotes around the values

---

### Step 4: Test Locally

```bash
npm run dev
```

1. Go to [http://localhost:3000/register](http://localhost:3000/register)
2. Fill out the registration form
3. Submit
4. Check your Gmail inbox for confirmation email! 📬

---

## 🎯 Gmail Limits

### Free Gmail Account
- **500 emails per day**
- Resets at midnight Pacific Time
- More than enough for your workshop!

### Example Usage
- 200 workshop registrations = 200 emails
- 20 contact form inquiries = 20 emails
- **Total: 220 emails** (well under 500 limit!)

---

## 🐛 Troubleshooting

### Issue: "Invalid login: 535-5.7.8 Username and Password not accepted"

**Solutions:**
1. Make sure 2FA is enabled
2. Use App Password, NOT your regular Gmail password
3. Remove all spaces from app password
4. Generate a new app password and try again

### Issue: "Less secure app access"

**Solution:** Don't use "Less secure app" option. Use App Passwords instead (more secure).

### Issue: Emails going to spam

**Solutions:**
1. Test with small batches first (5-10 emails)
2. Don't send too many at once
3. Start slow and increase gradually
4. Ask recipients to mark as "Not Spam"

### Issue: Rate limited / blocked

**Solution:** 
- Wait 24 hours (limit resets)
- Send fewer emails per day
- Add small delays between emails

### Issue: App Passwords option not showing

**Solutions:**
1. Make sure 2FA is enabled
2. Wait a few minutes after enabling 2FA
3. Sign out and sign back in
4. Try a different browser

---

## 🔒 Security Best Practices

1. ✅ **Never commit .env.local to Git** (already in .gitignore)
2. ✅ **Use App Password, never your real password**
3. ✅ **Keep your app password secret**
4. ✅ **Revoke old app passwords** you don't use
5. ✅ **Use different app passwords** for different apps

### To Revoke App Password
1. Go to: [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Click "App passwords"
3. Find "MAIA Workshop"
4. Click "Remove"

---

## 🌐 Deploying to Vercel

When deploying, add environment variables in Vercel:

1. Go to your project on Vercel
2. **Settings** → **Environment Variables**
3. Add these three:
   - `EMAIL_USER` = `hichame.taoufik1@gmail.com`
   - `EMAIL_PASSWORD` = `your-16-character-app-password`
   - `ADMIN_EMAIL` = `hichame.taoufik1@gmail.com`
4. Redeploy

**Important:** Gmail may be more strict with emails from server IPs. Test thoroughly after deployment.

---

## 📊 What Emails Will Be Sent?

### Registration Confirmation
- **To:** Attendee's email
- **From:** hichame.taoufik1@gmail.com
- **Subject:** Workshop Registration Confirmed - MAIA 2025
- **Content:** Confirmation number, workshop details

### Contact Form
- **To:** hichame.taoufik1@gmail.com (your email)
- **From:** hichame.taoufik1@gmail.com
- **Reply-To:** Sender's email
- **Subject:** [MAIA Workshop Contact] {subject}
- **Content:** Sender's message

---

## ✅ Verification Steps

After setup, test these:

1. **Registration Email:**
   - [ ] Register on form
   - [ ] Receive confirmation email
   - [ ] Email has correct details
   - [ ] Email not in spam

2. **Contact Form:**
   - [ ] Submit contact form
   - [ ] Receive email at your Gmail
   - [ ] Reply-to works correctly

3. **Admin Dashboard:**
   - [ ] View registrations
   - [ ] Export CSV works

---

## 💡 Tips

### For Better Deliverability
1. Send test emails to yourself first
2. Start with small batches (10-20 emails)
3. Don't send all registrations at once
4. Add 1-2 second delays between emails (if needed)

### Monitoring
- Check Gmail "Sent" folder to verify emails are sending
- Check bounce messages in your inbox
- Monitor daily sending limit

### Alternative: Google Workspace
If you need more than 500 emails/day:
- Google Workspace: 2,000 emails/day
- Cost: $6/month
- Same setup process
- More professional

---

## 🆘 Need Help?

### Resources
- Google Help: [https://support.google.com/mail/answer/185833](https://support.google.com/mail/answer/185833)
- 2FA Help: [https://support.google.com/accounts/answer/185839](https://support.google.com/accounts/answer/185839)

### Can't Figure It Out?
Contact:
- 📧 hichame.taoufik1@gmail.com
- 📱 +212 697 068 234

---

## ✨ You're All Set!

Your Gmail account is now configured to send workshop emails!

**Next Steps:**
1. Create `.env.local` with your credentials
2. Test locally with `npm run dev`
3. Deploy to Vercel
4. Start accepting registrations! 🎉

**Daily Limit:** 500 emails (more than enough!)

