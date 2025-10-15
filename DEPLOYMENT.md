# 🚀 Render Deployment Guide for SIHPS25152_MVP

This guide provides step-by-step instructions for deploying your application to Render.

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment Steps](#post-deployment-steps)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin:
- [ ] Push all your code to GitHub repository
- [ ] Create a [Render account](https://render.com/)
- [ ] Have your MongoDB Atlas connection string ready
- [ ] Have your Cloudinary credentials ready
- [ ] Have your Mapbox token ready

---

## 🔧 Backend Deployment

### Step 1: Create Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Select **"Build and deploy from a Git repository"**
4. Connect your GitHub account if not already connected
5. Find and select your repository: `PRIYANSHU1jsnshsbhs/SIHPS25152_MVP`

### Step 2: Configure Backend Service

Fill in the following details:

| Field | Value |
|-------|-------|
| **Name** | `sihps25152-backend` |
| **Region** | Singapore (or closest to your users) |
| **Branch** | `main` |
| **Root Directory** | `server` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | Free (or paid plan) |

### Step 3: Add Backend Environment Variables

Click on **"Advanced"** → **"Add Environment Variable"** and add these:

```env
NODE_ENV=production
PORT=8080
MONGO_URI=mongodb+srv://abhaymadan22:qEDY5s4T4VYB5Zxg@cluster0.61n86.mongodb.net/sihps25152
JWT_SECRET=supersecretjwtkey12345
CLOUDINARY_CLOUD_NAME=dwwmzjnwz
CLOUDINARY_API_KEY=939816759365139
CLOUDINARY_API_SECRET=BynSR2flYOvzggVIPZSbA2BL8I4
VITE_MAPBOX_TOKEN=pk.eyJ1IjoicHJpeWFuc2h1NjU5NCIsImEiOiJjbWV6cHhjbWoxMXV0MmxxeTg1b2Y3dHM5In0.VqvTmVZAFHF-2kX8R5A61Q
FRONTEND_URL=https://your-frontend-app.onrender.com
```

> ⚠️ **Important**: You'll update `FRONTEND_URL` after deploying the frontend

### Step 4: Deploy Backend

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Note your backend URL: `https://sihps25152-backend.onrender.com`

---

## 🎨 Frontend Deployment

### Step 1: Create Another Web Service

1. Go back to Render Dashboard
2. Click **"New +"** → **"Web Service"**
3. Select the same repository: `PRIYANSHU1jsnshsbhs/SIHPS25152_MVP`

### Step 2: Configure Frontend Service

| Field | Value |
|-------|-------|
| **Name** | `sihps25152-frontend` |
| **Region** | Singapore (same as backend) |
| **Branch** | `main` |
| **Root Directory** | `client` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npx vite preview --host 0.0.0.0 --port $PORT` |
| **Instance Type** | Free (or paid plan) |

### Step 3: Add Frontend Environment Variables

```env
VITE_MAPBOX_TOKEN=pk.eyJ1IjoicHJpeWFuc2h1NjU5NCIsImEiOiJjbWV6cHhjbWoxMXV0MmxxeTg1b2Y3dHM5In0.VqvTmVZAFHF-2kX8R5A61Q
VITE_API_URL=https://sihps25152-backend.onrender.com/api
```

> Replace `sihps25152-backend` with your actual backend service name

### Step 4: Deploy Frontend

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Note your frontend URL: `https://sihps25152-frontend.onrender.com`

---

## 🔄 Post-Deployment Steps

### 1. Update Backend CORS

Go back to your backend service:

1. Go to **Environment** section
2. Add/Update: `FRONTEND_URL=https://sihps25152-frontend.onrender.com`
3. Click **"Save Changes"**
4. Service will auto-redeploy

### 2. Update MongoDB Atlas Network Access

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Navigate to **Network Access**
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
5. Confirm

> ⚠️ For better security, add specific Render IP ranges instead

### 3. Test Your Application

1. Visit your frontend URL: `https://sihps25152-frontend.onrender.com`
2. Try logging in
3. Test all major features
4. Check browser console for errors

---

## 🌐 Alternative: Deploy as Static Site + Web Service

### Option A: Frontend as Static Site (Better Performance)

Instead of deploying frontend as a web service, you can use a static site host:

#### Deploy to Render Static Site:

1. Create **"Static Site"** instead of Web Service
2. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Root Directory**: `client`

#### Or Deploy to Vercel/Netlify:

**Vercel:**
```bash
cd client
npm install -g vercel
vercel --prod
```

**Netlify:**
```bash
cd client
npm run build
# Drag and drop the 'dist' folder to Netlify
```

---

## 📝 Complete Environment Variables Reference

### Backend (.env)
```env
# Database
MONGO_URI=mongodb+srv://abhaymadan22:qEDY5s4T4VYB5Zxg@cluster0.61n86.mongodb.net/sihps25152

# Authentication
JWT_SECRET=supersecretjwtkey12345

# Cloudinary
CLOUDINARY_CLOUD_NAME=dwwmzjnwz
CLOUDINARY_API_KEY=939816759365139
CLOUDINARY_API_SECRET=BynSR2flYOvzggVIPZSbA2BL8I4

# Mapbox
VITE_MAPBOX_TOKEN=pk.eyJ1IjoicHJpeWFuc2h1NjU5NCIsImEiOiJjbWV6cHhjbWoxMXV0MmxxeTg1b2Y3dHM5In0.VqvTmVZAFHF-2kX8R5A61Q

# Server Configuration
PORT=8080
NODE_ENV=production

# Frontend URL (update after frontend deployment)
FRONTEND_URL=https://your-frontend-app.onrender.com
```

### Frontend (.env)
```env
# Mapbox
VITE_MAPBOX_TOKEN=pk.eyJ1IjoicHJpeWFuc2h1NjU5NCIsImEiOiJjbWV6cHhjbWoxMXV0MmxxeTg1b2Y3dHM5In0.VqvTmVZAFHF-2kX8R5A61Q

# Backend API URL (update with your backend URL)
VITE_API_URL=https://sihps25152-backend.onrender.com/api
```

---

## 🔧 Troubleshooting

### Issue 1: Build Fails

**Error**: `npm install` fails

**Solution**:
- Check Node.js version compatibility
- Ensure `package.json` is in the correct directory
- Check build logs for specific errors

### Issue 2: Backend Deploys but Doesn't Start

**Error**: Service crashes on startup

**Solution**:
- Check environment variables are set correctly
- Verify MongoDB connection string
- Check logs in Render dashboard
- Ensure PORT is using `process.env.PORT`

### Issue 3: CORS Errors

**Error**: Frontend can't connect to backend

**Solution**:
- Verify `FRONTEND_URL` is set in backend env vars
- Check CORS configuration in `server.js`
- Ensure both services are deployed

### Issue 4: MongoDB Connection Failed

**Error**: Can't connect to database

**Solution**:
- Verify MongoDB Atlas connection string
- Check MongoDB Network Access allows Render IPs
- Ensure database user has correct permissions

### Issue 5: Frontend Shows White Screen

**Error**: Application doesn't load

**Solution**:
- Check `VITE_API_URL` is set correctly
- Open browser console for errors
- Verify build succeeded in Render logs
- Check if API endpoint is accessible

### Issue 6: File Uploads Don't Work

**Error**: Image uploads fail

**Solution**:
- Verify Cloudinary credentials
- Check file size limits
- Ensure uploads middleware is configured
- Free Render plans have ephemeral file systems (use Cloudinary)

---

## 📊 Monitoring Your Deployment

### Check Service Health

1. Go to Render Dashboard
2. Click on your service
3. Check **Metrics** tab for:
   - CPU usage
   - Memory usage
   - Request count
   - Response times

### View Logs

1. Click on your service
2. Go to **Logs** tab
3. Monitor real-time logs
4. Filter by log level

### Set Up Alerts

1. Go to service settings
2. Add notification email
3. Set up Slack/Discord webhooks

---

## 🎯 Performance Optimization

### Backend Optimization

1. **Enable HTTP/2**: Automatic on Render
2. **Use Production Mode**: Already set with `NODE_ENV=production`
3. **Database Indexing**: Add indexes in MongoDB for frequently queried fields
4. **Caching**: Consider Redis for session storage

### Frontend Optimization

1. **Code Splitting**: Already handled by Vite
2. **Image Optimization**: Use Cloudinary transformations
3. **Lazy Loading**: Implement for routes and components
4. **CDN**: Render provides CDN automatically

---

## 🔐 Security Best Practices

1. **Change Default Secrets**: Update JWT_SECRET to a strong random string
2. **Environment Variables**: Never commit `.env` files
3. **Database Security**: 
   - Use strong MongoDB passwords
   - Restrict IP access
   - Enable MongoDB Atlas encryption
4. **CORS**: Only allow your frontend domain
5. **Rate Limiting**: Add express-rate-limit middleware
6. **Input Validation**: Validate all user inputs
7. **HTTPS Only**: Force HTTPS (automatic on Render)

---

## 💰 Cost Estimation

### Free Tier
- ✅ 750 hours/month per service
- ✅ Automatic HTTPS
- ✅ Continuous deployment
- ⚠️ Services spin down after 15 min inactivity
- ⚠️ Cold start delays

### Paid Tier ($7/month per service)
- ✅ Always on (no spin down)
- ✅ Better performance
- ✅ More resources
- ✅ Priority support

---

## 📞 Support

- **Render Documentation**: https://render.com/docs
- **Render Community**: https://community.render.com/
- **Project Issues**: https://github.com/PRIYANSHU1jsnshsbhs/SIHPS25152_MVP/issues

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Backend service created on Render
- [ ] Backend environment variables configured
- [ ] Backend deployed successfully
- [ ] Backend URL noted
- [ ] Frontend service created on Render
- [ ] Frontend environment variables configured (with backend URL)
- [ ] Frontend deployed successfully
- [ ] Backend CORS updated with frontend URL
- [ ] MongoDB Network Access configured
- [ ] Application tested end-to-end
- [ ] Custom domain configured (optional)
- [ ] Monitoring set up
- [ ] Documentation updated with live URLs

---

<div align="center">
  <p>🎉 Happy Deploying! 🎉</p>
  <p>Made with ❤️ for Smart India Hackathon 2025</p>
</div>
