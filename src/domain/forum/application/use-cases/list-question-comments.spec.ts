import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'

import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { ListQuestionCommentsUseCase } from './list-question-comments'
import { makeQuestionComment } from 'test/repositories/factories/make-question-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let questionCommentsRepository: QuestionCommentsRepository
let sut: ListQuestionCommentsUseCase

describe('List Question Comments', () => {
  beforeEach(() => {
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new ListQuestionCommentsUseCase(questionCommentsRepository)
  })

  it("should be able to list question's comments", async () => {
    const questionId = 'question-id-test'

    for (let i = 0; i < 3; i++) {
      const questionComment = makeQuestionComment({
        questionId: new UniqueEntityId('question-id-test'),
      })

      await questionCommentsRepository.create(questionComment)
    }

    const { questionComments } = await sut.execute({ questionId })

    expect(questionComments).toHaveLength(3)
  })

  it('should return an empty array if there are no comments', async () => {
    const questionId = 'question-id-test'

    const { questionComments } = await sut.execute({ questionId })

    expect(questionComments).toHaveLength(0)
  })

  it('should be able to paginate the comments', async () => {
    const questionId = 'question-id-test'

    for (let i = 0; i < 30; i++) {
      const questionComment = makeQuestionComment({
        questionId: new UniqueEntityId('question-id-test'),
      })

      await questionCommentsRepository.create(questionComment)
    }

    const { questionComments: firstPageComments } = await sut.execute({
      questionId,
      page: 1,
    })

    const { questionComments: secondPageComments } = await sut.execute({
      questionId,
      page: 2,
    })

    expect(firstPageComments).toHaveLength(20)
    expect(secondPageComments).toHaveLength(10)
  })
})
