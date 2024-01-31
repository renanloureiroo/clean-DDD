import { Answer } from '../../enterprise/entities/answer'

interface AnswersRepository {
  create(answer: Answer): Promise<void>
}

export { AnswersRepository }
