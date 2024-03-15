import { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswerCommentsRepository {
  create(comment: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
  delete(id: string): Promise<void>
}
