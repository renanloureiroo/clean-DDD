import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface GetQuestionBySlugUseCaseDTO {
  slug: string
}

interface GetQuestionBySlugUseCaseResponse {
  question: Question
}

class GetQuestionBySlugUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseDTO): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found')
    }

    return {
      question,
    }
  }
}

export { GetQuestionBySlugUseCase }
