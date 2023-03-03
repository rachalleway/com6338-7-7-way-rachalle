//Your code here
//get variables
var quiz = document.getElementById('quiz')
var correctAns = 0 
var currentQuestion = 0 
var remainingTime
var timerId

//create questions
var questionsArr = [
    {question: 'Which of these people were NOT a part of the British boy band, One Direction?',
      answer: 'Justin Timberlake',
      options: [
        'Zayn Malik',
        'Niall Horan',
        'Justin Timberlake',
        'Harry Styles'
      ]
    },

    {question: 'Once in Wonderland, what poem is recited to Alice by Tweedledee and Tweedledum?',
        answer: 'The Walrus and the Carpenter',
        options: [
          'Oysters in April',
          'The Little Butterfly',
          'The Mad Tea Party',
          'The Walrus and the Carpenter'
        ]
      },

      {question: 'How long did Queen Elizabeth II reign?',
        answer: '70 years',
        options: [
          '70 years',
          '68 years',
          '72 years',
          '65 years'
        ]
      },

      {question: 'What is the British dish, Bubble and Squeak?',
        answer: 'Fried Mashed Potatoes and Cabbage Patties',
        options: [
          'Mashed Potatoes and Sausage',
          'Fried Mashed Potatoes and Cabbage',
          'Baked Beans and Toast',
          'Yorkshire Pudding and Gravy'
        ]
      },

      {question: 'Which of these is NOT an album by The Beatles?',
        answer: 'My Generation',
        options: [
          'Revolver',
          '1',
          'Rubber Soul',
          'My Generation'
        ]
      },
  ]

  //main function
  quiz.onclick = function (e){
    if (e.target.id === 'start-quiz'){
      askQuestion()
    } else if (e.target.parentElement.id === 'choices'
    && e.target.tagName === 'BUTTON') {
      if ( e.target.textContent === questionsArr[currentQuestion].answer){
        correctAns++
      }
      clearInterval(timerId)
      currentQuestion++

      if(currentQuestion< questionsArr.length){
        askQuestion()
      } else {
        endQuiz()
      }
    }
  }

  //timer
  function startTimer(){
    var timerEl = document.getElementById('timer')
    
    timerId = setInterval(function(){
      remainingTime--
      if(remainingTime >= 0){
        timerEl.textContent = remainingTime
      } else { 
        clearInterval(timerId)

        currentQuestion ++

        if (currentQuestion < questionsArr.length){
          askQuestion()
        } else {
          endQuiz()
        }
      }
    }, 1000)
  }

  //start quiz
  function startQuiz() {
    quiz.innerHTML = ""
    var previousScore  = localStorage.getItem('previous-score')

    if (previousScore) {
      var previousScoreEl = document.createElement('p')
      previousScoreEl.textContent = 'Previous Score: ' + previousScore
      quiz.appendChild(previousScoreEl)
    }

    var quizBtn = document.createElement('button')
    quizBtn.id = 'start-quiz'
    quizBtn.textContent = "Start Quiz!"
    quiz.appendChild(quizBtn)
  }

//quiz questions and answers
  function askQuestion(){
    quiz.innerHTML= ""
    var question = questionsArr[currentQuestion]
    var questionTextEl = document.createElement('p')
    questionTextEl.textContent = question.question
    quiz.appendChild(questionTextEl)

    var options = document.createElement('div')
    options.id = 'choices'
    quiz.appendChild(options)

    question.options.forEach(function(choice){
      var optionBtn = document.createElement('button')
      optionBtn.textContent = choice
      options.appendChild(optionBtn)
    })

//timer display
    remainingTime = 30
    var timerEl = document.createElement('p')
    timerEl.id = 'timer'
    timerEl.textContent = remainingTime
    quiz.appendChild(timerEl)

    startTimer()
  }

  //get score
  function endQuiz(){
    quiz.innerHTML = ""
    var percentage = Math.round(correctAns / questionsArr.length * 100) + "%"
    localStorage.setItem('previous-score', percentage)
    startQuiz()
  }
  startQuiz()