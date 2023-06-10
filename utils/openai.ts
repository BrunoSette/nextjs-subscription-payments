import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);


export async function runChatCompletion(
  messages: Array<ChatCompletionRequestMessage>
) {
  const completion = await openai
    .createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.2,
      max_tokens: 1500,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0
    })
    .then((response) => {
      if (!response.data.choices[0].message)
        throw new Error('Empty completion response');

      return response.data.choices[0].message.content;
    })
    .catch((e) => {
      console.log('COMPLETION ERROR:', e.response.data, e.response);
    });

  return completion;
}

export async function getModels() {
  let models;

  await openai.listModels().then((res) => {
    console.log(res.data.data.map((obj, index) => obj.id));
    models = res.data;
  });

  return models;
}
