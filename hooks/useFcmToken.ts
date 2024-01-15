import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import firebaseApp from "@/lib/firebase";
import { getExistingToken, setNewToken } from "@/actions/tokens";

const useFcmToken = () => {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const messaging = getMessaging(firebaseApp);

        // Retrieve the notification permission status
        const permission = await Notification.requestPermission();
        setNotificationPermissionStatus(permission);

        // Check if permission is granted before retrieving the token
        if (permission === "granted") {
          getExistingToken().then((res) => {
            if (res) {
              setToken(res);
            } else {
              getToken(messaging, {
                vapidKey:
                  "BBEOJrEW1215_XGxprQzPWYH7ksvB8hJxj139zTBfZEfn8k5hxHMKMIw0K4M8wcocwh82WxeQNQeyfn0dO1KDQ4",
              }).then((res) => {
                if (res) {
                  setNewToken(res).then((res) => {
                    if (res) {
                      setToken(res.token);
                    }
                  });
                } else {
                  console.log(
                    "No registration token available. Request permission to generate one."
                  );
                }
              });
            }
          });
        }
      } catch (error) {
        console.log("An error occurred while retrieving token:", error);
      }
    };

    retrieveToken();
  }, []);

  return { fcmToken: token, notificationPermissionStatus };
};

export default useFcmToken;
