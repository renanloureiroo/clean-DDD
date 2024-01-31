import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface AnswerQuestionUseCaseDTO {
  instructorId: string
  questionId: string
  content: string
}

interface AnswerQuestionUseCaseResponse {
  answer: Answer
}

class AnswerQuestionUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseDTO): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })

    this.answersRepository.create(answer)

    return {
      answer,
    }
  }
}

export { AnswerQuestionUseCase }
