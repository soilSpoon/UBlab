// --- 2. 불꽃 반응 프롬프트 생성 함수 ---

/**
 * 불꽃 반응 실험용 LLM 프롬프트를 생성합니다. JSON 응답을 명확히 요구합니다.
 * @param {object} experimentState - 현재 실험 상태 정보 객체 (예: { sample: 'NaCl 용액', method: '니크롬선 사용' })
 * @param {string} userQuery - 사용자의 질문 문자열
 * @returns {string} - LLM API에 전달될 최종 프롬프트 문자열
 */
function createFlameTestJsonPrompt(
  experimentState: object,
  userQuery: string
): string {
  // 실험 상태 정보를 문자열로 변환
  const stateString = Object.entries(experimentState)
    .map(([key, value]) => `- ${key}: ${JSON.stringify(value)}`)
    .join("\n");

  // LLM에게 전달할 프롬프트 템플릿
  const prompt = `
# 역할 부여
당신은 사용자의 **불꽃 반응** 실험 질문에 대해 시뮬레이션 결과를 **JSON 형식**으로 응답하는 AI 조교입니다.

# 현재 실험 상태
현재 실험 상태:
${stateString || "- 정의된 상태 없음"}

# 사용자 질문
사용자 질문: ${userQuery}

# 지침
1. 주어진 '현재 실험 상태'와 '사용자 질문'을 바탕으로 예상되는 **불꽃 반응** 결과를 시뮬레이션하세요.
2. **반드시** 아래에 명시된 'JSON 출력 형식 (불꽃 반응)'에 맞춰 응답을 생성하세요. 다른 텍스트는 포함하지 마세요.
3. 모든 필드는 필수적으로 채워야 하며, 해당 사항이 없으면 빈 문자열("") 또는 null 값을 사용하세요.

# JSON 출력 형식 (불꽃 반응) - 이 형식만 사용하세요!
\`\`\`json
{
  "query": "${userQuery}",
  "element_tested": "검출 대상 원소 (예: 나트륨(Na), 칼륨(K))", // 없으면 ""
  "sample_preparation": "시료 준비 방법 (예: 염산으로 세척한 니크롬선에 시료 묻힘)", // 없으면 ""
  "flame_color_observed": "관찰된 불꽃색 (예: 노란색, 보라색)", // 없으면 ""
  "reason_for_color": "불꽃색이 나타나는 원리 (전자의 들뜸과 바닥상태 전이)",
  "interferences": [ // 불꽃색 관찰 시 방해 요인 (문자열 배열)
    "예: 나트륨 불순물 (노란색)",
    "예: 코발트 유리를 통한 관찰 필요 (칼륨)"
  ],
  "explanation": "불꽃 반응 원리, 특정 원소의 불꽃색 등 상세 설명",
  "safety_notes": "실험 시 주의사항 (예: 보안경 착용, 화상 주의)" // 없으면 ""
}
\`\`\`
`; // 프롬프트 끝

  return prompt.trim();
}

export { createFlameTestJsonPrompt };
