import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

class InMemoryQuestionsRepository implements QuestionsRepository {
  async findById(questionId: string): Promise<Question | null> {
    const question = this.questions.find(
      (question) => question.id.toString() === questionId,
    )

    return question ?? null
  }

  private questions: Question[] = []

  async delete(question: Question): Promise<void> {
    const index = this.questions.findIndex(
      (item) => item.id.toString() === question.id.toString(),
    )

    this.questions.splice(index, 1)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.questions.find(
      (question) => question.slug.value === slug,
    )

    return question ?? null
  }

  async create(question: Question) {
    this.questions.push(question)
  }
}

export { InMemoryQuestionsRepository }
