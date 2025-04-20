import {
  BedrockRuntimeClient,
  ConverseCommand,
  ConversationRole,
  Message,
} from "@aws-sdk/client-bedrock-runtime";
// import { createPrecipitationJsonPrompt } from "./solid";
import code from "./code.txt?raw";

export async function main(
  text: string = "온도를 100도로 만들어줘.",
  settings: string
) {
  console.log("code", code);
  const credentials = {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  };

  console.log(credentials);

  // Bedrock 클라이언트 생성 (기본 자격 증명 체인 사용)
  const client = new BedrockRuntimeClient({
    region: "us-west-2",
    credentials,
  });

  // 사용자 메시지 정의
  const messages: Message[] = [
    {
      role: ConversationRole.USER,
      content: [
        {
          text: text,
        },
      ],
    },
  ];

  // 시도할 모델·프로필 조합 목록
  const inferenceProfileArn =
    "arn:aws:bedrock:us-west-2:663880399471:inference-profile/us.anthropic.claude-3-7-sonnet-20250219-v1:0";

  // 각 조합 순차 시도
  console.log(`Trying profile ARN: ${inferenceProfileArn}`);
  try {
    const response = await client.send(
      new ConverseCommand({
        system: [
          { text: "입력 받은 쿼리에 대해서 원본 설정(JSON)을 수정해주세요." },
          { text: "출력 형태는 오직 JSON 형식으로 제공됩니다." },
          {
            text: "출력 시 코드 블럭이나 JSON 외에는 있으면 안 돼. 출력값 자체가 JSON.parse 가능한 대상이어야 해.",
          },
          { text: '입력 형태 예시: { "temperature": 25 }' },
          { text: '출력 형태 예시: { "temperature": 100 }' },
          { text: `원본 설정: ${settings}` },
          { text: "현재 온도는 25도입니다." },
        ],
        modelId: inferenceProfileArn,
        messages,
        inferenceConfig: { temperature: 0.5 },
      })
    );
    const result = response.output?.message?.content?.[0].text;
    console.log(result);
    return result;
  } catch (error: any) {
    console.error(
      `Failed for profile ARN ${inferenceProfileArn}: ${error.message}`
    );
  }

  return null;
}

// main();
