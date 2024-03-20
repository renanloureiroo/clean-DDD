import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ChooseQuestionBesAnswerUseCase } from './choose-question-best-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeQuestion } from 'test/repositories/factories/make-question'
import { makeAnswer } from 'test/repositories/factories/make-answer'
import { NotAllowedError } from './errors/not-allowed-error'

let questionRepository: QuestionsRepository
let answerRepository: AnswersRepository
let sut: ChooseQuestionBesAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    answerRepository = new InMemoryAnswersRepository()

    sut = new ChooseQuestionBesAnswerUseCase(
      questionRepository,
      answerRepository,
    )
  })

  it('should be able to choose the best answer for a question', async () => {
    const question = makeQuestion()
    questionRepository.create(question)
    const answer = makeAnswer({
      questionId: question.id,
    })

    answerRepository.create(answer)

    const response = await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(response.isRight()).toBeTruthy()
  })

  it("should not be able to choose the another user question's best answer", async () => {
    const question = makeQuestion()
    questionRepository.create(question)
    const answer = makeAnswer({
      questionId: question.id,
    })

    answerRepository.create(answer)

    const response = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'another-user-id',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotAllowedError)
  })
})
