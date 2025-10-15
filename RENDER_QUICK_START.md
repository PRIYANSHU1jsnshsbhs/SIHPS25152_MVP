# 🚀 Quick Render Deployment Reference

## 📦 What I've Done

1. ✅ Updated `server.js` with production-ready CORS configuration
2. ✅ Updated `server.js` to use dynamic PORT from environment
3. ✅ Updated `client/src/api/api.js` to use environment variable for API URL
4. ✅ Created `render.yaml` for automated deployment configuration
5. ✅ Created comprehensive `DEPLOYMENT.md` guide
6. ✅ Pushed all changes to GitHub

---

## ⚡ Quick Start - Deploy to Render

### Backend Service Configuration

```
Name: sihps25152-backend
Root Directory: server
Build Command: npm install
Start Command: npm start
```

**Environment Variables:**
```env
NODE_ENV=production
PORT=8080
MONGO_URI=mongodb+srv://abhaymadan22:qEDY5s4T4VYB5Zxg@cluster0.61n86.mongodb.net/sihps25152
JWT_SECRET=supersecretjwtkey12345
CLOUDINARY_CLOUD_NAME=dwwmzjnwz
CLOUDINARY_API_KEY=939816759365139
CLOUDINARY_API_SECRET=BynSR2flYOvzggVIPZSbA2BL8I4
VITE_MAPBOX_TOKEN=pk.eyJ1IjoicHJpeWFuc2h1NjU5NCIsImEiOiJjbWV6cHhjbWoxMXV0MmxxeTg1b2Y3dHM5In0.VqvTmVZAFHF-2kX8R5A61Q
FRONTEND_URL=https://[your-frontend-name].onrender.com
```

---

### Frontend Service Configuration

```
Name: sihps25152-frontend
Root Directory: client
Build Command: npm install && npm run build
Start Command: npx vite preview --host 0.0.0.0 --port $PORT
```

**Environment Variables:**
```env
VITE_MAPBOX_TOKEN=pk.eyJ1IjoicHJpeWFuc2h1NjU5NCIsImEiOiJjbWV6cHhjbWoxMXV0MmxxeTg1b2Y3dHM5In0.VqvTmVZAFHF-2kX8R5A61Q
VITE_API_URL=https://[your-backend-name].onrender.com/api
```

---

## 📝 Deployment Steps

1. **Deploy Backend First**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - New → Web Service
   - Connect GitHub repo
   - Configure as shown above
   - Note the backend URL

2. **Deploy Frontend**
   - New → Web Service
   - Same repo, different root directory
   - Configure as shown above
   - Update `VITE_API_URL` with your backend URL

3. **Update Backend CORS**
   - Go back to backend service
   - Update `FRONTEND_URL` with your frontend URL
   - Save (auto-redeploys)

4. **Configure MongoDB**
   - MongoDB Atlas → Network Access
   - Allow 0.0.0.0/0 (or Render IPs)

5. **Test Everything** 🎉

---

## 🔗 Important URLs After Deployment

- **Frontend**: `https://[your-frontend-name].onrender.com`
- **Backend**: `https://[your-backend-name].onrender.com`
- **API Base**: `https://[your-backend-name].onrender.com/api`

---

## 📚 Full Documentation

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete guide including:
- Detailed step-by-step instructions
- Troubleshooting tips
- Security best practices
- Performance optimization
- Cost estimation
- Alternative deployment options

---

## ⚠️ Important Notes

1. **Free Tier**: Services spin down after 15 min of inactivity (cold start delay on first request)
2. **MongoDB**: Make sure Network Access allows Render
3. **Environment Variables**: Double-check all are set correctly
4. **HTTPS**: Automatic on Render (no configuration needed)
5. **Custom Domain**: Can be added in service settings

---

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| CORS Error | Update `FRONTEND_URL` in backend env vars |
| Build Fails | Check root directory is correct |
| Can't connect to DB | Verify MongoDB Network Access |
| White screen | Check `VITE_API_URL` and browser console |

---

## 📞 Need Help?

- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for troubleshooting
- Render Docs: https://render.com/docs
- Create an issue: https://github.com/PRIYANSHU1jsnshsbhs/SIHPS25152_MVP/issues

---

<div align="center">
  <p>🎯 Ready to Deploy!</p>
  <p>Good luck with your Smart India Hackathon project! 🚀</p>
</div>
