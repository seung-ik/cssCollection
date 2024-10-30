const axios = require("axios");
const dotenv = require("dotenv");

// .env 파일에서 환경 변수 로드
dotenv.config();
console.log(process.env.BOT_TOKEN);
const BOT_TOKEN = process.env.BOT_TOKEN; // BotFather로부터 받은 API 토큰
const CHANNEL_ID = "-1002353173734"; // 메시지를 보낼 채널의 이름
// const CHANNEL_ID = "@dev_tonble Community"; // 메시지를 보낼 채널의 이름
// const MINIAPP_URL = "https://t.me/dev_tonble_bot"; // 미니앱 시작 URL
const MINIAPP_URL = "https://t.me/dev_tonble_bot/start"; // 미니앱 시작 URL

const sendMessage = async () => {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: CHANNEL_ID,
        text: "이 버튼을 눌러 미니앱을 시작하세요!",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Launch",
                url: MINIAPP_URL,
              },
            ],
          ],
        },
      }
    );

    console.log("Message sent:", response.data);
  } catch (error) {
    console.error(
      "Error sending message:",
      error.response ? error.response.data : error.message
    );
  }
};

const sendPhoto = async () => {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`,
      {
        chat_id: CHANNEL_ID,
        photo: "https://example.com/path/to/your/image.jpg", // 이미지 URL
        caption: "이 버튼을 눌러 미니앱을 시작하세요!",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Launch",
                url: MINIAPP_URL,
              },
            ],
          ],
        },
      }
    );

    console.log("Photo sent:", response.data);
  } catch (error) {
    console.error(
      "Error sending photo:",
      error.response ? error.response.data : error.message
    );
  }
};

const fs = require("fs");
const FormData = require("form-data");
const LOCAL_IMAGE_PATH = "./tonball.png";

const sendLocalPhoto = async () => {
  try {
    const form = new FormData();
    form.append("chat_id", CHANNEL_ID);
    form.append("photo", fs.createReadStream(LOCAL_IMAGE_PATH));
    form.append(
      "caption",
      `
Did you know that <b>August 14th</b> is Telegram's birthday? 

We also have something for you to celebrate 🦴
  `
    );
    form.append("parse_mode", "HTML");

    // Send the photo with the inline keyboard
    form.append(
      "reply_markup",
      JSON.stringify({
        inline_keyboard: [
          [
            {
              text: "Launch",
              url: MINIAPP_URL,
            },
          ],
        ],
      })
    );

    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`,
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
      }
    );

    console.log("Photo sent:", response.data);
  } catch (error) {
    console.error(
      "Error sending photo:",
      error.response ? error.response.data : error.message
    );
  }
};

sendLocalPhoto();
// sendPhoto();
// sendMessage();
