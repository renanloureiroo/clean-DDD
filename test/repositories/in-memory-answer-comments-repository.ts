import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
  private readonly answerComments: AnswerComment[] = []

  async findById(id: string): Promise<AnswerComment | null> {
    const comment = this.answerComments.find(
      (comment) => comment.id.toString() === id,
    )

    if (!comment) {
      return null
    }

    return comment
  }

  async delete(id: string): Promise<void> {
    const index = this.answerComments.findIndex(
      (comment) => comment.id.toString() === id,
    )

    this.answerComments.splice(index, 1)
  }

  async create(comment: AnswerComment): Promise<void> {
    this.answerComments.push(comment)
  }
}

export { InMemoryAnswerCommentsRepository }
