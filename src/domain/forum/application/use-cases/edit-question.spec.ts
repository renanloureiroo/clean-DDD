import { makeQuestion } from 'test/repositories/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { QuestionsRepository } from '../repositories/questions-repository'
import { EditQuestionUseCase } from './edit-question'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found'

let questionRepository: QuestionsRepository
let sut: EditQuestionUseCase

describe('UseCases => Edit Question', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(questionRepository)
  })

  it('should be able edit a question', async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityId('question-1'))

    await questionRepository.create(newQuestion)

    await sut.execute({
      authorId: newQuestion.authorId.toString(),
      questionId: newQuestion.id.toString(),
      content: 'new content test',
      title: 'new title test',
    })

    const question = await questionRepository.findById(
      newQuestion.id.toString(),
    )
    expect(question?.title).toEqual('new title test')
    expect(question?.content).toEqual('new content test')
  })

  it("should not be able edit a question that doesn't exist", async () => {
    const response = await sut.execute({
      authorId: 'any_author_id',
      questionId: 'question-1',
      content: 'new content',
      title: 'new title',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.isLeft() && response.value).toBeInstanceOf(
      ResourceNotFoundError,
    )
  })

  it("should not be able edit a question that you don't own", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-id-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await questionRepository.create(newQuestion)

    const response = await sut.execute({
      authorId: 'any_author_id',
      questionId: newQuestion.id.toString(),
      content: 'new content',
      title: 'new title',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.isLeft() && response.value).toBeInstanceOf(NotAllowedError)
  })
})
