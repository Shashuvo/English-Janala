const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLesson(json.data));
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayLevelWord(data.data));
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    words.forEach(word => {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white h-full rounded-xl text-center p-14 space-y-6">
            <h1 class="text-3xl font-bold">${word.word}</h1>
            <p class="text-xl font-medium">Meaning / Pronunciation</p>
            <p class="text-3xl font-semibold font-bangla">"${word.meaning} / ${word.pronunciation}"</p>
            <div class="flex justify-between mt-14">
                <button class="btn bg-[#1A91FF]/10"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF]/10"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
    `;
        wordContainer.appendChild(card);
    })
}

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    for (let lesson of lessons) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button onClick="loadLevelWord(${lesson.level_no})" class="group btn btn-outline text-[#422AD5] hover:bg-[#422AD5] hover:text-white">
        <img class="transition duration-200 group-hover:invert group-hover:brightness-0 group-hover:filter"
        src="./assets/fa-book-open.png" alt="FAQ logo">
        Learn-${lesson.level_no}</button>
        `;
        levelContainer.appendChild(btnDiv);
    }
}

loadLesson();