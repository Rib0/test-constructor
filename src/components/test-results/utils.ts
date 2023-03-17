export const getQuestionEnding = (questionsAmount: number) => {
	return questionsAmount.toString().at(-1) === '1' ? 'вопроса' : 'вопросов';
};
