export const button1Selector =
  '#mainContainer > main > div > div > div > div > main > div > div > div > div:nth-child(3) > div > div.b1opuclq > div > div.n5cc71p > div > a';
export const button2Selector =
  '#mainContainer > main > div > div > div > div > main > div > div > div > div:nth-child(2) > div > div.b1opuclq > div > div.n5cc71p > div > a';

// Reasoning:
// https://quizlet.com/explanations/textbook-solutions/fundamentals-of-electric-circuits-7th-edition-9781260570793/chapter-2-problems-24-xxxx-xxxx-xxxx-xxxx-xxxx
// is split via the '/' into the following (7) parts
// 'https:', '', 'quizlet.com', 'explanations', 'textbook-solutions', 'fundamentals-of-electric-circuits-7th-edition-9781260570793', 'chapter-2-problems-24-xxxx-xxxx-xxxx-xxxx-xxxx'
export const textbookURLParts = 7;

// Reasoning:
// The question name and number is found at the end of the url, 'chapter-2-problems-24-xxxx-xxxx-xxxx-xxxx-xxxx'
// If we remove the last 5 (i.e. minus 5 from the end), words seperated by hyphens we get 'chapter-2-problems-24'
export const questionNameLocation = -5;
