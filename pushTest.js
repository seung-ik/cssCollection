const admin = require("firebase-admin");

// Firebase Admin SDK 초기화
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("test", serviceAccount);
// 푸시 알림을 보내는 함수
async function sendPushNotification(deviceToken, title, body, url) {
  try {
    const message = {
      notification: {
        title: title,
        body: body,
      },
      token: deviceToken,
      data: {
        url: url,
      },
    };

    // 푸시 알림 전송
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

// 예시: 알림을 보낼 푸시 토큰, 제목, 내용, URL
const deviceToken =
  "f7G2pZS4TEwomQdDinEJL9:APA91bH65fovuqGpmTobcY428Yb3sDQ7OOUFHKS6Dut0aK3MNCk2siyyMFJOnZQB-wqsCNMGWKULj1lH_Jir2vyB-Y3z9_u4u2kl6els17TcbrLskzmVR9NkL2d2Oa7clf5r1Ls1o2si";
const title = "알림 제목";
const body = "알림 내용";
const url = "https://www.naver.com";

// 알림 보내기
sendPushNotification(deviceToken, title, body, url);
