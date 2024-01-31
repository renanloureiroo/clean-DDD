import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

class InMemoryAnswersRepository implements AnswersRepository {
  private Answers: Answer[] = []

  async create(answers: Answer) {
    this.Answers.push(answers)
  }
}

export { InMemoryAnswersRepository }
