import api from '../api.js'

export async function fetchRecommend({ title, titleId, topK = 5}) {
    if (!title && !titleId) throw new Error('title ou titleId é obrigatório');

    const query = { top_k: topK };
    if (title) query.title = title;
    if (titleId) query.title_id = titleId;

    const { data } = await api.get('/recommend', { params:query });
    return data;
}