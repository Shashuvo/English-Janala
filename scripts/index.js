const createElement = (arr) => {
    const htmlElements = arr.map(ele => `<button class="btn bg-[#EDF7FF] border-[#D7E4EF] text-md font-normal">${ele}</button>`);
    return htmlElements.join(" ");
}

function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
}

const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLesson(json.data));
}

const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("active");
            displayLevelWord(data.data)
        });
}

const loadWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}

const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else {
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("word-container").classList.remove("hidden");
    }
}

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn => btn.classList.remove("active"));
}

const displayWordDetails = (word) => {
    console.log(word)
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
    <div class="space-y-6 rounded-2xl">
    <div class="space-y-8 border-2 border-[#EDF7FF] rounded-2xl p-4 w-full">
      <h1 class="text-2xl font-semibold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})</h1>
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Meaning</h3>
        <p class="text-lg font-medium font-bangla">${word.meaning}</p>
      </div>
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Example</h3>
        <p class="text-lg">${word.sentence}</p>
      </div>
      <div class="space-y-2">
        <h3 class="text-lg font-medium font-bangla">সমার্থক শব্দ গুলো</h3>
        <div class="flex flex-wrap gap-4">
          ${createElement(word.synonyms)}
        </div>
      </div>
    </div>
  </div>
    `;
    document.getElementById("word_modal").showModal();
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class="text-center col-span-full font-bangla space-y-3 py-8 md:py-16">
            <img class="mx-auto" src="./assets/alert-error.png" alt="Alert Image"/>
            <h3 class="text-sm text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h3>
            <h1 class="text-xl md:text-4xl text-[#292524] font-medium">নেক্সট Lesson এ যান</h1>
        </div>
        `;
        manageSpinner(false)
    }
    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white h-full rounded-xl text-center p-7 md:p-14 space-y-6">
            <h1 class="text-3xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h1>
            <p class="text-xl font-medium">Meaning / Pronunciation</p>
            <p class="text-2xl font-semibold font-bangla pb-14">"${word.meaning ? word.meaning : "অর্থ নেই"} / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"}"</p>
            <div class="flex justify-between">
                <button onClick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF]"><i class="fa-solid fa-circle-info"></i></button>
                <button onClick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
    `;
        wordContainer.appendChild(card);
    })
    manageSpinner(false)
}

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    for (let lesson of lessons) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onClick="loadLevelWord(${lesson.level_no})" class="btn btn-outline text-[#422AD5] hover:bg-[#422AD5] hover:text-white lesson-btn">
        <i class="fa-solid fa-book-open"></i>
        Learn-${lesson.level_no}</button>
        `;
        levelContainer.appendChild(btnDiv);
    }
}

loadLesson();

document.getElementById("btn-search").addEventListener("click", () => {
    removeActive();
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    fetch("https://openapi.programming-hero.com/api/words/all")
        .then(res => res.json())
        .then(data => {
            const allWords = data.data;
            const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue));
            displayLevelWord(filterWords);
        });
})