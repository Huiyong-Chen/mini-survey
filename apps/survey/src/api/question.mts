import { get } from './axios.mts';

export async function getQuestionService(id: string) {
  const url = `/api/question/${id}`;
  const data = await get<{ id: string; title: string }>(url);

  return data;
}
