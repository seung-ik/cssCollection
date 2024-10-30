// 필요한 모듈 로드
const fs = require("fs");
const { parseScript } = require("esprima");
const { generate } = require("escodegen");

// AST 파일 경로
const astFilePath = "./data.json";

// AST 파일 읽기
fs.readFile(astFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading AST file:", err);
    return;
  }

  try {
    // AST 파싱
    console.log(data);
    const ast = parseScript(data);

    // AST 노드를 수정하는 예시 (간단한 변환 규칙)
    traverseAST(ast);

    // 변환된 AST를 JavaScript 코드로 출력
    const generatedCode = generate(ast);

    console.log("Generated JavaScript code:");
    console.log(generatedCode);

    // 변환된 코드를 파일에 저장할 경우
    // const outputPath = './output.js';
    // fs.writeFileSync(outputPath, generatedCode);
    // console.log(`Generated JavaScript code saved to ${outputPath}`);
  } catch (parseError) {
    console.error("Error parsing AST:", parseError);
  }
});

// AST 노드를 수정하는 함수 (원하는 변환 규칙 적용)
function traverseAST(node) {
  if (node.type === "FunctionDeclaration") {
    // 함수 이름 변경 예시: square -> calculateSquare
    if (node.id.name === "square") {
      node.id.name = "calculateSquare";
    }
  }
  // 필요한 다른 변환 규칙 추가 가능
}
