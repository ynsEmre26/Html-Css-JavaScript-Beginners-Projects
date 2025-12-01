const questions = [
  {
    category: 'HTML',
    questions: [
      {
        question: 'HTML stands for __________',
        options: [
          'HyperText Markup Language',
          'HyperText Machine Language',
          'HyperText Marking Language',
          'HighText Marking Language',
        ],
        correct: 0,
      },
      {
        question: 'What is the correct syntax of doctype in HTML5?',
        options: [
          '</doctype html>',
          '<doctype html>',
          '<doctype html!>',
          '<!doctype html></doctype>',
        ],
        correct: 3,
      },
      {
        question:
          'Which of the following is used to read an HTML page and render it?',
        options: ['Web server', 'Web network', 'Web browser', 'Web matrix'],
        correct: 2,
      },
      {
        question:
          'Which of the following tag is used for inserting the largest heading in HTML?',
        options: ['head', '<h1>', '<h6>', 'heading'],
        correct: 1,
      },
      {
        question: 'In which part of the HTML metadata is contained?',
        options: ['head tag', 'title tag', 'html tag', 'body tag'],
        correct: 0,
      },
    ],
  },
  {
    category: 'CSS',
    questions: [
      {
        question:
          'Which of the following tag is used to embed css in html page?',
        options: ['<css>', '<!DOCTYPE html>', '<script>', '<style>'],
        correct: 3,
      },
      {
        question:
          'Which of the following type of HTML tag is used to define an internal style sheet?',
        options: ['<script>', '<link>', '<class>', '<style>'],
        correct: 3,
      },
      {
        question:
          'Which of the following CSS property is used to make the text bold?',
        options: [
          'text-decoration: bold',
          'font-weight: bold',
          'font-style: bold',
          'text-align: bold',
        ],
        correct: 1,
      },
      {
        question:
          'Which of the following CSS style property is used to specify an italic text?',
        options: ['style', 'font', 'font-style', '@font-face'],
        correct: 2,
      },
      {
        question:
          'Which of the following is the correct syntax to link an external style sheet in the HTML file?',
        options: [
          '<link rel=”stylesheet” href=”style.css” />',
          '<link rel=”stylesheet” src=”style.css” />',
          '<style rel=”stylesheet” src=”style.css” />',
          '<style rel=”stylesheet” link=”style.css” />',
        ],
        correct: 0,
      },
    ],
  },
  {
    category: 'JAVASCRIPT',
    questions: [
      {
        question: 'Which of the following is not javascript data types?',
        options: [
          'Null type',
          'Undefined type',
          'Number type',
          'All of the mentioned',
        ],
        correct: 3,
      },
      {
        question:
          'Where is Client-side JavaScript code is embedded within HTML documents?',
        options: [
          'A URL that uses the special javascript:code',
          'A URL that uses the special javascript:protocol',
          'A URL that uses the special javascript:encoding',
          'A URL that uses the special javascript:stack',
        ],
        correct: 1,
      },
      {
        question:
          ' Which of the following object is the main entry point to all client-side JavaScript features and APIs?',
        options: ['Position', 'Window', 'Standard', 'Location'],
        correct: 1,
      },
      {
        question:
          'Which of the following can be used to call a JavaScript Code Snippet?',
        options: ['Function/Method', 'Preprocessor', 'Triggering Event', 'RMI'],
        correct: 0,
      },
      {
        question:
          'Which of the following is the property that is triggered in response to JS errors?',
        options: ['onclick', 'onerror', 'onmessage', 'onexception'],
        correct: 1,
      },
    ],
  },
  {
    category: 'REACT',
    questions: [
      {
        question: 'React.js is primarily used for which of the following?',
        options: [
          'Backend Development',
          'Database Management',
          'Frontend Development',
          'Mobile App Development',
        ],
        correct: 2,
      },
      {
        question: 'What is the main purpose of JSX in React?',
        options: [
          'Database Query Language',
          'JavaScript Function',
          'CSS Styling',
          'HTML-like syntax',
        ],
        correct: 3,
      },
      {
        question:
          'Which of the following command is used to Install create-react-app?',
        options: [
          'npm install create-react-app',
          'npm install -f create-react-app',
          'npm install -g create-react-app',
          'install -g create-react-app',
        ],
        correct: 2,
      },
      {
        question: 'Which of the following is method is not a part of ReactDOM?',
        options: [
          'ReactDOM.hydrate()',
          'ReactDOM.destroy()',
          'ReactDOM.createPortal()',
          'All of the mentioned',
        ],
        correct: 1,
      },
      {
        question: 'Which of the following is used to display the UI in React?',
        options: ['view()', 'display()', 'render()', 'show()'],
        correct: 2,
      },
    ],
  },
]
