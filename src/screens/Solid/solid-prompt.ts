// 앙금 생성 반응 및 불꽃 반응 실험용 JSON 프롬프트 생성 함수 모음

// --- 1. 앙금 생성 반응 프롬프트 생성 함수 ---

/**
 * 앙금 생성 반응 실험용 LLM 프롬프트를 생성합니다. JSON 응답을 명확히 요구합니다.
 * @param {object} experimentState - 현재 실험 상태 정보 객체 (예: { solution1: 'NaCl(aq)', solution2: 'AgNO3(aq)' })
 * @param {string} userQuery - 사용자의 질문 문자열
 * @returns {string} - LLM API에 전달될 최종 프롬프트 문자열
 */
export function createPrecipitationJsonPrompt(
  experimentState: object,
  userQuery: string
) {
  // 실험 상태 정보를 문자열로 변환
  const stateString = null;
  // Object.entries(experimentState)
  //     .map(([key, value]) => `- ${key}: ${JSON.stringify(value)}`)
  //     .join('\n');

  // LLM에게 전달할 프롬프트 템플릿
  const prompt = `
# 역할 부여
당신은 사용자의 **앙금 생성 반응** 실험 질문에 대해 시뮬레이션 결과를 **JSON 형식**으로 응답하는 AI 조교입니다.

# 현재 실험 상태
현재 실험 상태:
${stateString || "- 정의된 상태 없음"}

# 사용자 질문
사용자 질문: ${userQuery}

# 지침
1. 주어진 '현재 실험 상태'와 '사용자 질문'을 바탕으로 예상되는 **앙금 생성 반응** 결과를 시뮬레이션하세요.
2. **반드시** 아래에 명시된 'JSON 출력 형식 (앙금 생성 반응)'에 맞춰 응답을 생성하세요. 다른 텍스트는 포함하지 마세요.
3. 모든 필드는 필수적으로 채워야 하며, 해당 사항이 없으면 빈 문자열("") 또는 null/빈 배열([]) 값을 사용하세요.

# JSON 출력 형식 (앙금 생성 반응) - 이 형식만 사용하세요!
\`\`\`json
{
  "query": "${userQuery}",
  "reaction_occurred": true | false,
  "reaction_type": "앙금 생성 반응",
  "precipitate_formed": true | false, // 앙금 생성 여부
  "precipitate_info": { // 생성된 앙금 정보 (생성 안되면 null)
    "name": "앙금 이름 (예: 염화은)",
    "formula": "화학식 (예: AgCl)",
    "color": "색깔 (예: 흰색)",
    "solubility": "용해도 정보 (예: 물에 거의 녹지 않음)"
  },
  "ionic_equation": "알짜 이온 반응식 (예: Ag+(aq) + Cl-(aq) -> AgCl(s))", // 없으면 ""
  "other_products": [ // 앙금 외 다른 생성물 (이온 상태 등)
    "예: Na+(aq)",
    "예: NO3-(aq)"
  ],
  "explanation": "반응 원리, 앙금 생성 조건 등 상세 설명",
  "final_state_description": "반응 후 최종 용액 상태 설명 (예: 흰색 앙금이 가라앉고, 질산나트륨 용액이 남아있음)",
  "safety_notes": "안전 관련 주의사항 (없으면 \"\")"
}
\`\`\`
`; // 프롬프트 끝

  return prompt.trim();
}
