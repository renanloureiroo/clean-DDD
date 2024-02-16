import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerUseCaseDTO {
  authorId: string
  answerId: string
}

interface DeleteAnswerUseCaseResponse {}

class DeleteAnswerUseCase {
  constructor(private readonly answerRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseDTO): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('You are not allowed to delete this answer')
    }

    await this.answerRepository.delete(answer)

    return {}
  }
}

export { DeleteAnswerUseCase }
