# Firebase Setup Guide

## Current Status
✅ Firebase configuration is integrated into your application
✅ Firebase Admin SDK is installed and configured
✅ Database service is converted from in-memory to Firestore

## Firebase Project Details
- **Project ID**: webdev-cd3a2
- **Auth Domain**: webdev-cd3a2.firebaseapp.com
- **Storage Bucket**: webdev-cd3a2.firebasestorage.app

## Collections Created
Your Firebase database will automatically create these collections when data is added:
- `campaigns` - Campaign information
- `donations` - Donation records
- `volunteers` - Volunteer registrations
- `equipment` - Equipment requests
- `users` - User accounts

## For Production Setup

### 1. Generate Service Account Key
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `webdev-cd3a2`
3. Go to Project Settings > Service Accounts
4. Click "Generate new private key"
5. Download the JSON file

### 2. Configure Authentication
Add the service account key to your environment:

```javascript
// In database.js, replace the initialization with:
admin.initializeApp({
  credential: admin.credential.cert(require('./path-to-service-account-key.json')),
  projectId: "webdev-cd3a2"
});
```

Or use environment variables:
```bash
export GOOGLE_APPLICATION_CREDENTIALS="path/to/service-account-key.json"
```

### 3. Firestore Security Rules
Set up security rules in Firebase Console > Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Development Mode
Currently running in development mode with basic configuration. The application will work but may have limited functionality without proper authentication.

## Testing the Connection
The server will show connection status on startup:
- ✅ Connected to Firebase Firestore successfully
- ❌ Failed to connect (with error details)

## API Endpoints
All existing API endpoints continue to work with the new Firebase backend:
- POST /api/campaigns
- GET /api/campaigns
- GET /api/campaigns/:id
- PUT /api/campaigns/:id
- POST /api/donations
- GET /api/donations
- And all other existing endpoints...

## Migration Notes
- Data structure remains the same
- All existing API calls continue to work
- Documents now use Firebase-generated IDs instead of custom IDs
- Automatic timestamps for createdAt/updatedAt fields
