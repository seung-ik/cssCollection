<?php

define("GOOGLE_API_KEY", "AAAAigfgDQE:APA91bFQJ-dtmtcV9rLlGdh3FcdEauMNwEBba1x6k03U61_7TCpOWt06jigzRJJK1p6J9CHMsiCoYAgn3jxgWs2AEeEb3SWVGE5Lhh7LxRuaIDDAAvGd-SqBuZR5d7JQWTT89zIog7H7");
define("GOOGLE_GCM_URL", "https://fcm.googleapis.com/fcm/send");

function send_gcm_notify($reg_id, $title, $message ,$url , $deviceType) {

	$fields;
	if($deviceType == 'android'){
		//android
		$fields = array(
			'registration_ids'  => array( $reg_id ),
			'data'              => array( "msg" => $message ,"title" => $title , "url" => $url ),
		);
	}else{
		//ios
		$fields = array(
			 'registration_ids'  => array( $reg_id ),
			 'mutable_content'=> true,
			 'url'=> $url,
			 'notification' => array( "subtitle" => $message ,
									  "title" => "알림"  ,
									  "url" => $url  ,
									  'push_message'=> $message,

									  'sound'=>'Default',
									  "body" => $message )
		);
	}

    $headers = array(
        'Authorization: key=AAAAigfgDQE:APA91bFQJ-dtmtcV9rLlGdh3FcdEauMNwEBba1x6k03U61_7TCpOWt06jigzRJJK1p6J9CHMsiCoYAgn3jxgWs2AEeEb3SWVGE5Lhh7LxRuaIDDAAvGd-SqBuZR5d7JQWTT89zIog7H7',
        'Content-Type: application/json'
    );

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, GOOGLE_GCM_URL);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));

    $result = curl_exec($ch);
    if ($result === FALSE) {
        die('Problem occurred: ' . curl_error($ch));
    }

    curl_close($ch);
    echo $result;
 }
 $reg_id =
 "f7G2pZS4TEwomQdDinEJl9:APA91bH65fovuqGpmTobcY428Yb3sDQ7OOUFHKS6Dut0aK3MNCk2siyyMFJ0nZQB-wqsCNMGWKUlj1lH_Jjr2vyB-Y3z9_u4u2kl6els17TcbrLskzmVR9NkL2d2Oa7clf5r1Ls1o2si";
// $reg_id = "dJe3PWPtPV0:APA91bG0ItssiOXzxwEN3Rl-gL-i9xRZKrK7PDCPDt3xSnwOgx-kCl5MKjyk93a87FlqPueien9vCSdAvbHgi0mPIUK9ogMrwpGfuleA7ANFmUYQ8tSCVkjJ85U2olteG2oGt3Sf9ZRN";				//푸시 보낼 디바이스 토큰
$title = "상단타이틀제목";				//푸시 title 문구
$msg = "테스트입니다..";				//푸시 body 문구
$url = "https://www.naver.com/";	//푸시클릭시 이동할 url 주소
$deviceType = "android";			//디바이스 타입 : android or ios

//http://snap40.cafe24.com/fanc/push_sample.php

send_gcm_notify($reg_id, $title,  $msg , $url , $deviceType);
?>
