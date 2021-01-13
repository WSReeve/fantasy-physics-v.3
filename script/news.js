

window.onload = function() {


    let featuredDiv = document.querySelector(".post--feat__text");
    let postList = document.querySelector(".post-list");

    featuredDiv.querySelector(".title-link").innerHTML = posts[posts.length-1].title;
    featuredDiv.querySelector(".title-link").setAttribute("href","post.html");
    featuredDiv.querySelector(".date").innerHTML = posts[posts.length-1].date;
    featuredDiv.querySelector(".desc").innerHTML = posts[posts.length-1].description;

    for(i = posts.length - 2; i >= 0; i--) {
        let post = document.createElement("li");
        post.setAttribute("class", "post-entries");
        post.innerHTML = `<div class="entry-content" style="cursor: pointer;" onclick="console.log('click');posts[${i}].active = true;window.location='post.html';">
                            <p class="date">${posts[i].date}</p>
                            <a href="post.html">${posts[i].title}</a>
                            <i class="fa fa-angle-right" aria-hidden="true"></i>
                            <p class="desc">${posts[i].description}</p>
                        </div>`;
        postList.appendChild(post);
    }


}