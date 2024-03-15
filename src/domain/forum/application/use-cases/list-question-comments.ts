import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface ListQuestionCommentsUseCaseDTO {
  questionId: string
  page?: number
}

interface ListQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[]
}

class ListQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page = 1,
  }: ListQuestionCommentsUseCaseDTO): Promise<ListQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return {
      questionComments,
    }
  }
}

export { ListQuestionCommentsUseCase }
