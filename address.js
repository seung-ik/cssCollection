const { Web3 } = require("web3");
const dotenv = require("dotenv");

// .env 파일에서 환경 변수 로드
dotenv.config();

// Web3 객체 생성 (Ethereum 노드의 RPC 엔드포인트 지정)
const web3 = new Web3(
  `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
);
console.log(process.env.ALCHEMY_API_KEY);

const privateKeyHex = process.env.PBK;

// 개인 키로부터 Ethereum 주소 생성
const account = web3.eth.accounts.privateKeyToAccount(privateKeyHex);

// Ethereum 주소 출력
console.log("Ethereum Address:", account.address);
