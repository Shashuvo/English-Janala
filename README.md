📘 English Janala

An interactive vocabulary learning web application built with HTML, Tailwind CSS, DaisyUI, and JavaScript.
It uses API integration and DOM manipulation to provide a dynamic, responsive, and engaging learning experience.

🌐 Live Site : https://english-janala-shuvo.netlify.app/

🚀 Features

🎯 Dynamically generated lesson buttons from API

📝 Load vocabulary words by level

📖 Word details modal with pronunciation, example sentence, and synonyms

🎨 Active lesson button highlighting

🔍 Search functionality

💖 Save words feature (Favorites)

🔊 Voice pronunciation using SpeechSynthesis API

⏳ Loading spinner during API fetch

✅ Handles null/undefined data gracefully

📱 Fully responsive design

⚡ API Endpoints
Purpose	Endpoint
Get All Levels	https://openapi.programming-hero.com/api/levels/all
Get Words by Level	https://openapi.programming-hero.com/api/level/{id}
Get Word Details	https://openapi.programming-hero.com/api/word/{id}
Get All Words	https://openapi.programming-hero.com/api/words/all
🛠️ Technologies Used

HTML5 – Structure & Layout

Tailwind CSS – Utility-first styling

DaisyUI – Pre-designed components

JavaScript – DOM manipulation & dynamic functionality

SpeechSynthesis API – Voice pronunciation

🎯 Functionalities
Lesson Section

Dynamically loads lesson buttons

Highlights the active lesson

Loads words for selected lessons

Vocabulary Section

Displays words in card format

Default text shown initially

Shows “No Word Found” if lesson has no words

Word Details Modal

Word with pronunciation

Example sentence

Synonyms

Close button ("Complete Learning")

Search

Dynamic search for words

Resets active lesson button on search

Save Words

Save words with heart icon

Saved words appear in a separate section

Voice Pronunciation
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN";
  window.speechSynthesis.speak(utterance);
}

📂 Project Purpose

Practice API integration and DOM manipulation

Learn dynamic content rendering

Implement responsive and modern UI with Tailwind CSS & DaisyUI

Build a functional, interactive, and real-world JavaScript project
