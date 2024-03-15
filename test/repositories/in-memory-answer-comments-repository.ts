import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
  private readonly answerComments: AnswerComment[] = []

  async create(comment: AnswerComment): Promise<void> {
    this.answerComments.push(comment)
  }
}

export { InMemoryAnswerCommentsRepository }
