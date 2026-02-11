const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLesson(json.data));
}

const displayLesson = (lessons) => {
    console.log(lessons);
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    for (let lesson of lessons) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button class="group btn btn-outline text-[#422AD5] hover:bg-[#422AD5] hover:text-white">
        <img class="transition duration-200 group-hover:invert group-hover:brightness-0 group-hover:filter"
        src="./assets/fa-book-open.png" alt="FAQ logo">
        Learn-${lesson.level_no}</button>
        `;
        levelContainer.appendChild(btnDiv);
    }
}

loadLesson();