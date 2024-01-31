import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionUseCaseDTO {
  authorId: string
  questionId: string
}

interface DeleteQuestionUseCaseResponse {}

class DeleteQuestionUseCase {
  constructor(private readonly questionRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseDTO): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('You are not allowed to delete this question')
    }

    await this.questionRepository.delete(question)

    return {}
  }
}

export { DeleteQuestionUseCase }
