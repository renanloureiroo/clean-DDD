import { makeQuestion } from 'test/repositories/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { NotAllowedError } from './errors/not-allowed-error'

let questionRepository: QuestionsRepository
let sut: DeleteQuestionUseCase

describe('UseCases => Delete Question', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(questionRepository)
  })

  it('should be able delete a question', async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityId('question-1'))

    await questionRepository.create(newQuestion)

    await sut.execute({
      authorId: newQuestion.authorId.toString(),
      questionId: 'question-1',
    })

    const question = await questionRepository.findById('question-1')
    expect(question).toBeNull()
  })

  it("should not be able delete a question that doesn't exist", async () => {
    const response = await sut.execute({
      authorId: 'any_author_id',
      questionId: 'question-1',
    })
    expect(response.isLeft()).toBeTruthy()
    expect(response.isLeft() && response.value).toBeInstanceOf(
      ResourceNotFoundError,
    )
  })

  it("should not be able delete a question that you don't own", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-id-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await questionRepository.create(newQuestion)

    const response = await sut.execute({
      authorId: 'any_author_id',
      questionId: 'question-1',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.isLeft() && response.value).toBeInstanceOf(NotAllowedError)
  })
})
