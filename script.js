let searchBtn = document.getElementById("btn");
let imgContainer = document.getElementsByClassName("lower")[0];
let input = document.getElementById("imagename");
let refresh = document.getElementById("refresh");
let pageno = 1;
let keyword = ""
async function imageGenerate() {
    imgContainer.innerHTML = "<div class='loader'></div>";
    if (keyword.trim().length == 0) {
        imgContainer.innerHTML = "Invalid Keyword";
        refresh.style.display = "none";
        return;
    }
    let data = await fetch(`https://api.unsplash.com/search/photos?query=${keyword.trim()}&client_id=0lzMzzZzFAZVjjJiOZnXsq7WSiv1SYExx-dQTCKa8jo&page=${pageno}`);
    let info = await data.json();
    let details = info.results;
    imgContainer.innerHTML = "";
    if (details.length == 0) {
        imgContainer.innerHTML = "Invalid Keyword";
        refresh.style.display = "none";
        return;
    }
    let count = 0;
    details.map((x) => {
        let card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.innerHTML = `
                        <div class="user">
                            <div class="userDp">
                                <img width="50px" height="50px" src=${x.user.profile_image.large} alt="">
                            </div>
                            <p id="username">${x.user.name}</p>
                        </div>
                        <div class="img">
                            <a href = ${x.links.download} target="_blank"><img src=${x.urls.regular} alt=""><a>
                        </div>
                        <p class="desc">
                        ${x.alt_description.slice(0, 20)} <span>... see more</span>
                        </p>
                    `
        imgContainer.append(card);
        let desc = document.getElementsByClassName("desc")[count++];
        desc.addEventListener('click', () => {
            desc.innerHTML = x.alt_description
        })
        refresh.style.display = "block";
    })
}
searchBtn.addEventListener("click", ()=>
{
    keyword = input.value;
    input.value = "";
    pageno = 1;
    imageGenerate();
});
refresh.addEventListener("click", ()=>
{
    pageno++;
    imageGenerate();
});