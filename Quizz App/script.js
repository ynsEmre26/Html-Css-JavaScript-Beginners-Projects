const categorySection = document.querySelector('.category-section')
const buttonsCategory = categorySection.querySelectorAll('.btn')

const questionSection = document.querySelector('.questions-section')
const timeWrapper = questionSection.querySelector('.time-wrapper')
const quizTime = questionSection.querySelector('.time')
const ul = questionSection.querySelector('.questions-list')
const questionTitle = questionSection.querySelector('.questions-main .title')
const buttonNext = questionSection.querySelector('.btn-next')
const questionStatus = questionSection.querySelector('.info')

const resultSection = document.querySelector('.result-section')
const buttonTryAgain = resultSection.querySelector('.btn-try-again')
const resultContent = resultSection.querySelector('.description')

const quizTimeLimit = 10
const questionIndexes = []
const totalQuestions = 5
let currentTime = quizTimeLimit
let timer = null
let category
let currentQuestion = null
let countCorrectAnswer = 0

//=========================THE QUİZ RESULT PAGE

const showResultPage = () => {
  questionSection.style.display = 'none'
  resultSection.style.display = 'flex'
  buttonTryAgain.style.visibility = 'visible'

  resultContent.innerHTML = `you answered <span class="question font-bold">${countCorrectAnswer}</span> out of
  <span class="total font-bold">${totalQuestions}</span> questions correctly!`
}

//========================RESET TİMER

const resetTimer = () => {
  clearInterval(timer)
  currentTime = quizTimeLimit
  quizTime.textContent = `${currentTime}s`
}

//========================START TİMER

const startTimer = () => {
  timer = setInterval(() => {
    currentTime--
    quizTime.textContent = `${currentTime}s`
    if (currentTime <= 0) {
      clearInterval(timer)
      showCorrectAnswer()
      buttonNext.style.visibility = 'visible'

      //disable all answer after one is selected

      ul.querySelectorAll('.item').forEach((option) => {
        option.style.pointerEvents = 'none'
      })
    }
  }, 1000)
}

//========================SHOW CORRECT ANSWER

const showCorrectAnswer = () => {
  const correctAnswer = ul.querySelectorAll('.item')[currentQuestion.correct]
  correctAnswer.classList.add('correct')
}

//========================SELECTED OPTİON İS CORRECT OR NOT

const handleAnswer = (option, optionIndex) => {
  clearInterval(timer)

  const isCorrect = currentQuestion.correct === optionIndex

  option.classList.add(isCorrect ? 'correct' : 'incorrect')

  !isCorrect ? showCorrectAnswer() : countCorrectAnswer++

  //disable all answer after one option is selected

  ul.querySelectorAll('.item').forEach((option) => {
    option.style.pointerEvents = 'none'
  })

  buttonNext.style.visibility = 'visible'
}

//==========================FETCH RANDOM QUESTİON

const getRandomQuestion = () => {
  const categoryQuestion = questions.find(
    (cat) => cat.category.toUpperCase() === category.toUpperCase()
  ).questions

  //show results if all questions have been used
  if (
    questionIndexes.length >= Math.min(categoryQuestion.length, totalQuestions)
  ) {
    return showResultPage()
  }

  //filter asked questions
  const availableQuestions = categoryQuestion.filter(
    (_, index) => !questionIndexes.includes(index)
  )
  const question =
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)]

  questionIndexes.push(categoryQuestion.indexOf(question))

  return question
}

//========================RENDER CURRENT QUESTİON

const renderQuestion = () => {
  currentQuestion = getRandomQuestion()

  if (!currentQuestion) return
  resetTimer()
  startTimer()

  //update ul list and question title

  ul.innerHTML = ''
  buttonNext.style.visibility = 'hidden'
  questionTitle.textContent = currentQuestion.question
  questionStatus.innerHTML = `<span class="question font-bold">${questionIndexes.length}</span> of
              <span class="total font-bold">${totalQuestions}</span> Questions`

  //create option <li>

  currentQuestion.options.forEach((option, index) => {
    const li = document.createElement('li')
    li.classList.add(
      'item',
      'w-full',
      'text-center',
      'p-2.5',
      'my-2.5',
      'rounded-xl',
      'hover:cursor-pointer'
    )
    li.textContent = option
    ul.appendChild(li)
    li.addEventListener('click', () => handleAnswer(li, index))
  })
}

//==========================START THE QUİZ
buttonsCategory.forEach((button) => {
  button.addEventListener('click', () => {
    categorySection.style.display = 'none'
    questionSection.style.display = 'block'

    category = button.classList[1]
    renderQuestion()
  })
})

//==========================RESET THE QUİZ
const resetQuiz = () => {
  resetTimer()
  countCorrectAnswer = 0
  questionIndexes.length = 0
  categorySection.style.display = 'flex'
  resultSection.style.display = 'none'
}

buttonNext.addEventListener('click', renderQuestion)
buttonTryAgain.addEventListener('click', resetQuiz)
