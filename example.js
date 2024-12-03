/* 
    callTonBallStart 함수는 tonBallStart라는 GraphQL mutation을 호출하여 새로운 게임 정보를 생성합니다.
    새로운 게임이 생성되면, 그 결과값을 window.parent.postMessage를 사용해 iframe의 상위 창에 전달합니다.
    상위 창은 이 메시지를 수신하여 새로운 게임 정보가 업데이트되었음을 감지하고, 이후 백엔드에 요청을 보내 최신 게임 정보의 세부사항을 가져올 수 있습니다.
*/

/*
    아래 코드는 예시일뿐 환경에 맞게 수정이필요합니다.
    주요 부분은 tonBallStart 호출이후에 콜백으로 window.parent.postMessage를 통해 iframe 상위창에 업데이트된사실을 인지시켜주는 부분입니다.
*/

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  gql,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: `https://dev-tonball-api.tmore.io/graphql`,
});

const apiClient = new ApolloClient({
  link: from([httpLink]),
  cache: new InMemoryCache(),
  credentials: "include",
});

const TONBALL_START = gql`
  mutation {
    tonBallStart {
      status
      message
      data {
        field1
        field2
        field3
      }
    }
  }
`;

const callTonBallStart = async () => {
  try {
    const { access_token } = getTokenInfo(); // 로그인 이후 얻은 토큰

    const { data } = await apiClient.mutate({
      mutation: TONBALL_START,
      context: {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    });

    // 기존 성공시 처리 코드...

    // window.parent.postMessage로 ifame 상위 창으로 메시지 전달
    window.parent.postMessage(
      {
        type: "TONBALL_START_RESULT",
        payload: data,
      },
      "*" // TODO: 이후에 도메인 설정시 수정필요(ex. https://www.tonball-telegram-miniapp.io), 일단 전체허용
    );
  } catch (error) {
    // 기존 에러시 처리 코드...

    // window.parent.postMessage로 ifame 상위 창으로 메시지 전달
    window.parent.postMessage(
      {
        type: "TONBALL_START_ERROR",
        payload: error.message,
      },
      "*" // TODO: 이후에 도메인 설정시 수정필요(ex. https://www.tonball-telegram-miniapp.io), 일단 전체허용
    );
  }
};

// 새로운 게임 생성시 함수 호출
callTonBallStart();

function test() {
  window.parent.postMessage(
    {
      type: "TONBALL_START_RESULT",
      payload: "test 입니다.",
    },
    "*" // TODO: 이후에 도메인 설정시 수정필요(ex. https://www.tonball-telegram-miniapp.io), 일단 전체허용
  );
}
test();
