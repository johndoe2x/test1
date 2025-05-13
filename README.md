# Movie Watchlist App

This is a simple, standalone movie watchlist application with Firebase integration.

## Features

- Dark-themed minimal design
- User authentication with email/password or Google sign-in
- Add movies to your personal watchlist
- Real-time data synchronization with Firebase
- Responsive design works on mobile and desktop
- No framework dependencies - just pure HTML, CSS, and JavaScript

## How to Use

1. Upload all files to your web hosting service.
2. Open `minimal-login.html` in your web browser to start using the app.
3. Sign in with your existing account or create a new one.
4. After login, you'll be redirected to the watchlist dashboard.
5. Add movies using the input field and "Add Movie" button.
6. All changes are saved automatically to your Firebase account.

## Files

- `minimal-login.html` - The login/registration page
- `minimal-dashboard.html` - The watchlist dashboard page

## Firebase Configuration

This application uses the following Firebase configuration:

```
projectId: "test2-23b07"
apiKey: "AIzaSyAbW7lA0hMqGwswoMryJTSIt7HKJbKkg00"
appId: "1:1084520000030:web:60e8203169fbc603bc9c0f"
databaseURL: "https://test2-23b07-default-rtdb.firebaseio.com"
```

## Customization

If you want to connect this app to a different Firebase project:

1. Create a new Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Authentication (Email/Password and Google) in your Firebase project
3. Create a Realtime Database in your Firebase project
4. Update the Firebase configuration in both HTML files
5. Make sure to add your website domain to the authorized domains list in Firebase Authentication settings

## Dependencies

This app has no external dependencies and uses the Firebase JavaScript SDK loaded from CDN.