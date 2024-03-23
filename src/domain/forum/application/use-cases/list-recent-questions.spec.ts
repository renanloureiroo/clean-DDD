import { makeQuestion } from 'test/repositories/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { QuestionsRepository } from '../repositories/questions-repository'
import { ListRecentQuestionsUseCase } from './list-recent-questions'

let questionsRepository: QuestionsRepository
let sut: ListRecentQuestionsUseCase

describe('List Recente Questions', async () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new ListRecentQuestionsUseCase(questionsRepository)
  })

  it('should list recent questions', async () => {
    await questionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 20) }),
    )
    await questionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 18) }),
    )

    await questionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 23) }),
    )

    const response = await sut.execute({ page: 1 })

    expect(response.isRight() && response.value.questions).toHaveLength(3)
    expect(response.isRight() && response.value.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 18) }),
    ])
  })

  it('should list recent questions with pagination', async () => {
    for (let i = 0; i < 26; i++) {
      await questionsRepository.create(makeQuestion())
    }

    const response = await sut.execute({ page: 2 })

    expect(response.isRight() && response.value.questions).toHaveLength(6)
  })
})
