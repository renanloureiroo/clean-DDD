import { Answer } from '../../enterprise/entities/answer'

interface AnswersRepository {
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
  findById(id: string): Promise<Answer | null>
  update(answer: Answer): Promise<void>
}

export { AnswersRepository }
