<?php

$botToken = "7504545727:AAHuW-6eYKSIG-vweZclBSsJFJE-BcQSn6w"; // 봇 토큰 정의

// 쿼리 문자열을 객체로 변환하는 함수
function parseQueryString($queryString) {
    parse_str($queryString, $parsedData);
    return $parsedData;
}

// 검증 함수
function validateTelegramData($initData) {
    global $botToken;  // 전역 변수 사용
    $signature = $initData['signature']; // Telegram에서 받은 signature
    $hash = $initData['hash']; // Telegram에서 받은 hash
    unset($initData['hash'], $initData['signature']);
    
    ksort($initData); // 파라미터를 알파벳 순으로 정렬
    $dataCheckString = '';
    
    // 쿼리 파라미터를 하나씩 연결하여 데이터 체크 문자열 생성
    foreach ($initData as $key => $value) {
        $dataCheckString .= $key . '=' . urldecode($value) . "\n";  // \n을 포함시켜야 함
    }
    
    // WebAppData와 봇 토큰을 사용하여 secret_key 생성 (HMAC SHA256 사용)
    $secretKey = hash_hmac('sha256', 'WebAppData', $botToken, true);  // WebAppData는 그대로 유지
    
    // HMAC-SHA-256 해시 계산
    $calculatedHash = hash_hmac('sha256', $dataCheckString, $secretKey, true);
    
    // 계산된 해시를 16진수로 변환하여 비교
    $calculatedHashHex = bin2hex($calculatedHash);
    
    echo "계산된 해시 (16진수 형식): " . $calculatedHashHex . "\n";
    echo "Telegram에서 받은 해시: " . $hash . "\n";
    
    // Telegram에서 받은 hash와 계산된 hash 비교
    if ($calculatedHashHex === $hash) {
        echo "검증 성공: 데이터는 Telegram에서 온 것입니다.\n";
        return true;  // 검증 성공
    } else {
        echo "검증 실패: 데이터가 유효하지 않습니다.\n";
        return false;  // 검증 실패
    }
}

$queryString = "query_id=AAE_sl4nAwAAAD-yXicXae9Y&user=%7B%22id%22%3A7102968383%2C%22first_name%22%3A%22ek%22%2C%22last_name%22%3A%22ik%22%2C%22username%22%3A%22ikek123%22%2C%22language_code%22%3A%22ko%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FuxiWb6GsAfUbCaZ7vmdnZnI5cXv4FoILUYzBKAZJkljffJlU3K3GgNjFs96QVtR1.svg%22%7D&auth_date=1732850028&signature=iTtpJWL5-ayqL25KKGMKD8iZpbkVsa9hkIdqKkXoly484c7u1YzEjGZ1JVEMT0XzxMXmfZcfJXhU_nTxVjfSDQ&hash=bae927f246814f9bd843cac30006bed58ab89ccef19445f177976327c6b62dac";

// 쿼리 문자열을 객체로 변환
$initData = parseQueryString($queryString);

// 검증 실행
$isValid = validateTelegramData($initData);
echo "검증 결과: " . ($isValid ? "성공" : "실패") . "\n";

?>
