import { makeQuestion } from 'test/repositories/factories/make-question'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { ResourceNotFoundError } from './errors/resource-not-found'

let questionRepository: QuestionsRepository
let questionCommentsRepository: QuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment On Question', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()

    sut = new CommentOnQuestionUseCase(
      questionRepository,
      questionCommentsRepository,
    )
  })

  it('should be able to create a new comment on question', async () => {
    const question = makeQuestion()
    questionRepository.create(question)

    const response = await sut.execute({
      authorId: 'fake-author-id',
      questionId: question.id.toString(),
      content: 'fake-content',
    })
    expect(response.isRight()).toBeTruthy()
    expect(response.isRight() && response.value.questionComment.id).toBeTruthy()
  })

  it('should not be able to create comment on a non-existing question', async () => {
    const response = await sut.execute({
      authorId: 'fake-author-id',
      questionId: 'fake-question-id',
      content: 'fake-content',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.isLeft() && response.value).toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
