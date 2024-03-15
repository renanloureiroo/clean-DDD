import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface ListAnswerCommentsUseCaseDTO {
  answerId: string
  page?: number
}

interface ListAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[]
}

class ListAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page = 1,
  }: ListAnswerCommentsUseCaseDTO): Promise<ListAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      })

    return {
      answerComments,
    }
  }
}

export { ListAnswerCommentsUseCase }
