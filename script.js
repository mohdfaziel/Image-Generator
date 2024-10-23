let searchBtn = document.getElementById("btn");
let imgContainer = document.getElementsByClassName("lower")[0];
let input = document.getElementById("imagename");
async function imageGenerate() {
    imgContainer.innerHTML = "<div class='loader'></div>";
    let keyword = input.value;
    let data = await fetch(`https://api.unsplash.com/search/photos?query=${keyword}&client_id=0lzMzzZzFAZVjjJiOZnXsq7WSiv1SYExx-dQTCKa8jo`);
    let info = await data.json();
    let details = info.results;
    imgContainer.innerHTML = "";
    if(details.length==0)
    {
        imgContainer.innerHTML="Invalid Keyword";
    }
    details.map((x)=>
    {
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
                            <img src=${x.urls.regular} alt="">
                        </div>
                        <p class="desc">
                        ${x.alt_description}
                        </p>
                    `
        imgContainer.append(card);
    })
}
searchBtn.addEventListener("click", imageGenerate);