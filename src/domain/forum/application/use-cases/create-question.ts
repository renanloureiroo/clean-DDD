import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface CreateQuestionUseCaseDTO {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

class CreateQuestionUseCase {
  constructor(private readonly questionRepository: QuestionsRepository) {}

  async execute({
    authorId,
    content,
    title,
  }: CreateQuestionUseCaseDTO): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      content,
      title,
    })

    await this.questionRepository.create(question)

    return {
      question,
    }
  }
}

export { CreateQuestionUseCase }
