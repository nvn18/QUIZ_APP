import { Question } from '../lib/supabase';

export const mockQuestions: Question[] = [
  {
    id: '1',
    question_text: 'What is the correct syntax for referring to an external script called "app.js"?',
    category: 'JavaScript',
    option_a: '<script src="app.js"> - This is the standard way to include external JavaScript files',
    option_b: '<script name="app.js"> - The name attribute is not used for linking scripts',
    option_c: '<script href="app.js"> - The href attribute is used for links, not scripts',
    option_d: '<script file="app.js"> - The file attribute does not exist in HTML',
    correct_answer: 'A'
  },
  {
    id: '2',
    question_text: 'Which HTML tag is used to define an internal style sheet?',
    category: 'HTML',
    option_a: '<css> - This is not a valid HTML tag',
    option_b: '<script> - This tag is used for JavaScript, not CSS',
    option_c: '<style> - Correct! This tag contains CSS rules for the document',
    option_d: '<link> - This is used for external stylesheets, not internal ones',
    correct_answer: 'C'
  },
  {
    id: '3',
    question_text: 'How do you write "Hello World" in an alert box in JavaScript?',
    category: 'JavaScript',
    option_a: 'alertBox("Hello World") - This is not a valid JavaScript function',
    option_b: 'msg("Hello World") - This function does not exist in JavaScript',
    option_c: 'alert("Hello World") - Correct! This displays a browser alert dialog',
    option_d: 'msgBox("Hello World") - This is not a standard JavaScript function',
    correct_answer: 'C'
  },
  {
    id: '4',
    question_text: 'Which CSS property is used to change the text color of an element?',
    category: 'CSS',
    option_a: 'text-color - This property does not exist in CSS',
    option_b: 'color - Correct! This property sets the color of text content',
    option_c: 'font-color - This is not a valid CSS property',
    option_d: 'text-style - This property does not control color',
    correct_answer: 'B'
  },
  {
    id: '5',
    question_text: 'What does HTML stand for?',
    category: 'HTML',
    option_a: 'Hyper Text Markup Language - Correct! This is the standard markup language for web pages',
    option_b: 'Home Tool Markup Language - This is not the correct meaning',
    option_c: 'Hyperlinks and Text Markup Language - This is not accurate',
    option_d: 'Hyperlinking Text Management Language - This is incorrect',
    correct_answer: 'A'
  },
  {
    id: '6',
    question_text: 'How do you create a function in JavaScript?',
    category: 'JavaScript',
    option_a: 'function = myFunction() - This is incorrect syntax',
    option_b: 'function myFunction() - Correct! This is the standard function declaration',
    option_c: 'function:myFunction() - This syntax is invalid',
    option_d: 'create myFunction() - The create keyword does not exist in JavaScript',
    correct_answer: 'B'
  },
  {
    id: '7',
    question_text: 'Which property is used to change the background color in CSS?',
    category: 'CSS',
    option_a: 'bgcolor - This is an old HTML attribute, not a CSS property',
    option_b: 'color - This property changes text color, not background',
    option_c: 'background-color - Correct! This sets the background color of an element',
    option_d: 'back-color - This property does not exist in CSS',
    correct_answer: 'C'
  },
  {
    id: '8',
    question_text: 'What is the correct HTML element for inserting a line break?',
    category: 'HTML',
    option_a: '<break> - This tag does not exist in HTML',
    option_b: '<lb> - This is not a valid HTML element',
    option_c: '<br> - Correct! This creates a single line break',
    option_d: '<linebreak> - This tag is not part of the HTML specification',
    correct_answer: 'C'
  },
  {
    id: '9',
    question_text: 'How do you declare a JavaScript variable?',
    category: 'JavaScript',
    option_a: 'var myVariable - Correct! You can also use let or const in modern JavaScript',
    option_b: 'variable myVariable - This is not valid JavaScript syntax',
    option_c: 'v myVariable - This syntax does not exist in JavaScript',
    option_d: 'declare myVariable - The declare keyword is for TypeScript, not standard JavaScript',
    correct_answer: 'A'
  },
  {
    id: '10',
    question_text: 'Which CSS property controls the text size?',
    category: 'CSS',
    option_a: 'text-size - This property does not exist in CSS',
    option_b: 'font-style - This controls italic/normal text, not size',
    option_c: 'text-style - This is not a valid CSS property',
    option_d: 'font-size - Correct! This property sets the size of text',
    correct_answer: 'D'
  }
];
