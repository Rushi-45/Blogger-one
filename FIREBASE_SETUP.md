# Firebase Setup Guide

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Enter project name: `blogger-one` (or any name you prefer)
4. Enable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Firestore Database

1. In your Firebase project, click "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to you
5. Click "Done"

## 3. Enable Storage

1. In your Firebase project, click "Storage"
2. Click "Get started"
3. Choose "Start in test mode" (for development)
4. Select the same location as Firestore
5. Click "Done"

## 4. Get Firebase Config

1. In your Firebase project, click the gear icon ⚙️
2. Click "Project settings"
3. Scroll down to "Your apps"
4. Click the web icon `</>`
5. Enter app nickname: `blogger-one-web`
6. Click "Register app"
7. Copy the config object

## 5. Update Firebase Config

Replace the placeholder values in `src/firebase/config.ts` with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-actual-app-id",
};
```

## 6. Set Firestore Rules (Optional)

In Firebase Console > Firestore Database > Rules, you can update the rules for production:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /blogs/{document} {
      allow read, write: if true; // For development
    }
  }
}
```

## 7. Test Your Setup

1. Run your app: `npm run dev`
2. Try creating a new blog post
3. Check Firebase Console > Firestore Database to see your data
4. Check Firebase Console > Storage to see uploaded images

## What This Gives You

✅ **Real Database**: Blog posts save to the cloud  
✅ **Image Storage**: Images upload to Firebase Storage  
✅ **Real-time**: Changes appear instantly  
✅ **Scalable**: Handles thousands of blog posts  
✅ **Free**: Firebase has generous free tier

## Next Steps

- Add user authentication
- Deploy to Firebase Hosting
- Add more features like comments, likes, etc.
