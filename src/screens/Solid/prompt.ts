export async function main(
  text: string = "온도를 100도로 만들어줘.",
  settings: string
) {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4.1-nano',
        messages: [
          { role: 'system', content: `기존 설정: ${settings}` },
          { role: 'system', content: `사용자에 요청에 따라 기존 설정을 변경해줘.` },
          { role: 'user', content: text },
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'settings',
            strict: true,
            schema: {
              type: 'object',
              properties: {
                temperature: {
                  type: 'number',
                  description: 'Temperature in Celsius',
                },
              },
              required: ['temperature'],
              additionalProperties: false,
            },
          },
        },
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error: any) {
    console.error(error);
  }

  return null;
}

// main();
