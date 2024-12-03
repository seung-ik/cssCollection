const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.BOT_TOKEN);

// 봇 토큰
const botToken = process.env.BOT_TOKEN;

// 쿼리 문자열을 객체로 변환하는 함수
function parseQueryString(queryString) {
  const params = new URLSearchParams(queryString);
  const parsedData = {};

  // 각 쿼리 파라미터를 파싱하여 객체로 저장
  params.forEach((value, key) => {
    parsedData[key] = value;
  });
  console.log(parsedData);
  return parsedData;
}

// 검증 함수
function validateTelegramData(initData) {
  const { hash, ...data } = initData;
  const sortedKeys = Object.keys(data).sort();
  let dataCheckString = "";

  // key=value 형식으로 dataCheckString 생성, 각 항목은 개행 문자('\n')로 구분
  sortedKeys.forEach((key) => {
    dataCheckString += `${key}=${data[key]}\n`;
  });
  dataCheckString = dataCheckString.trim(); // 끝의 개행 문자 제거

  // 봇 토큰과 "WebAppData"를 사용하여 secret_key 생성
  const secretKey = crypto
    .createHmac("sha256", "WebAppData")
    .update(botToken)
    .digest();

  console.log(secretKey);

  // dataCheckString에 대해 secretKey로 HMAC-SHA-256 해시 생성
  const calculatedHash = crypto
    .createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  // 계산된 해시 값과 Telegram에서 받은 hash 값 비교
  if (calculatedHash === hash) {
    console.log("검증 성공: 데이터는 Telegram에서 온 것입니다.");
    return true; // 검증 성공
  } else {
    console.log("검증 실패: 데이터가 유효하지 않습니다.");
    return false; // 검증 실패
  }
}
const liveQueryStr =
  "user=%7B%22id%22%3A7102968383%2C%22first_name%22%3A%22ek%22%2C%22last_name%22%3A%22ik%22%2C%22username%22%3A%22ikek123%22%2C%22language_code%22%3A%22ko%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FuxiWb6GsAfUbCaZ7vmdnZnI5cXv4FoILUYzBKAZJkljffJlU3K3GgNjFs96QVtR1.svg%22%7D&chat_instance=701896287354114153&chat_type=private&start_param=7102968383&auth_date=1732853666&signature=-THYZC3FFcbpQm9G8XoLxamqdkdsS0bejmzl6fAfSglhgdDB12B3I6NB5x8rdCE0uT4PcMLynyJ0-abtQ1cvBA&hash=860e69a358e993d6566f19e0d765d4806f23c9cdbc77acd1d797b8fbc50a77b7";
// 예시 initData (실제 데이터는 Telegram에서 받음)
const queryString =
  "query_id=AAE_sl4nAwAAAD-yXicXae9Y&user=%7B%22id%22%3A7102968383%2C%22first_name%22%3A%22ek%22%2C%22last_name%22%3A%22ik%22%2C%22username%22%3A%22ikek123%22%2C%22language_code%22%3A%22ko%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FuxiWb6GsAfUbCaZ7vmdnZnI5cXv4FoILUYzBKAZJkljffJlU3K3GgNjFs96QVtR1.svg%22%7D&auth_date=1732850028&signature=iTtpJWL5-ayqL25KKGMKD8iZpbkVsa9hkIdqKkXoly484c7u1YzEjGZ1JVEMT0XzxMXmfZcfJXhU_nTxVjfSDQ&hash=bae927f246814f9bd843cac30006bed58ab89ccef19445f177976327c6b62dac";

// 쿼리 문자열을 객체로 변환
const initData = parseQueryString(queryString);

// 검증 실행
const isValid = validateTelegramData(initData);
console.log(`검증 결과: ${isValid ? "성공" : "실패"}`);
