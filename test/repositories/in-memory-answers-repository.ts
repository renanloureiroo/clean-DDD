import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

class InMemoryAnswersRepository implements AnswersRepository {
  private answers: Answer[] = []
  async update(answer: Answer): Promise<void> {
    const index = this.answers.findIndex(
      (item) => item.id.toString() === answer.id.toString(),
    )

    this.answers[index] = answer
  }

  async delete(answer: Answer): Promise<void> {
    const index = this.answers.findIndex(
      (a) => a.id.toString() === answer.id.toString(),
    )

    this.answers.splice(index, 1)
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.answers.find((answer) => answer.id.toString() === id)

    return answer ?? null
  }

  async create(answers: Answer) {
    this.answers.push(answers)
  }
}

export { InMemoryAnswersRepository }
