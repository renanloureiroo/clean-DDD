import { makeQuestion } from 'test/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

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
    await expect(
      sut.execute({
        authorId: 'any_author_id',
        questionId: 'question-1',
      }),
    ).rejects.toThrow('Question not found')
  })

  it("should not be able delete a question that you don't own", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-id-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await questionRepository.create(newQuestion)

    await expect(
      sut.execute({
        authorId: 'any_author_id',
        questionId: 'question-1',
      }),
    ).rejects.toThrow('You are not allowed to delete this question')
  })
})
