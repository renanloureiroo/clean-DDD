import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  private readonly questionComments: QuestionComment[] = []

  async findById(id: string): Promise<QuestionComment | null> {
    const comment = this.questionComments.find(
      (comment) => comment.id.toString() === id,
    )

    if (!comment) return null

    return comment
  }

  async delete(id: string): Promise<void> {
    const index = this.questionComments.findIndex(
      (item) => item.id.toString() === id,
    )

    this.questionComments.splice(index, 1)
  }

  async create(comment: QuestionComment): Promise<void> {
    this.questionComments.push(comment)
  }
}

export { InMemoryQuestionCommentsRepository }
