import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  private readonly questionComments: QuestionComment[] = []

  async create(comment: QuestionComment): Promise<void> {
    this.questionComments.push(comment)
  }
}

export { InMemoryQuestionCommentsRepository }
