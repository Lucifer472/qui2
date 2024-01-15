// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDFKsE0yv8zUxSiLD1gjhn1mZidnZ-O23U",

  authDomain: "blog-website-7ff75.firebaseapp.com",

  projectId: "blog-website-7ff75",

  storageBucket: "blog-website-7ff75.appspot.com",

  messagingSenderId: "492922210801",

  appId: "1:492922210801:web:d30f1b7bb0c4969af89c50",

  measurementId: "G-35XHDKQDFD",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  const notificationTitle = payload.notification.title; //or payload.notification or whatever your payload is
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

  self.addEventListener("notificationclick", function (event) {
    event.notification.close(); // Close the notification

    // Open the URL specified in the FCM options
    event.waitUntil(
      clients.openWindow(event.notification.data.fcmOptions.link)
    );
  });
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close(); // Close the notification

  // Open the URL specified in the FCM options
  event.waitUntil(clients.openWindow(event.notification.data.fcmOptions.link));
});
