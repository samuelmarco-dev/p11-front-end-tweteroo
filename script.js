let _username = "";
let entradaSala = null;

function signUp() {
  const username = document.querySelector("#username").value;
  const picture = document.querySelector("#picture").value;

  axios.post("http://localhost:5000/sign-up", {
    username,
    avatar: picture
  }).then(() => {
    _username = username;
    entradaSala = true;
    loadTweets();
  }).catch(err => {
    console.error(err.response);
    entradaSala = false;

    alert(`${err.response.data} statusCode: ${err.response.status}`);
  });
}

function carregar(){
  if(!entradaSala || entradaSala === null){
    return;
  }else{
    loadTweets();
  }
}
setInterval(() => {
  carregar();
}, 5000);

function loadTweets() {
  axios.get("http://localhost:5000/tweets").then(res => {
    const tweets = res.data;
    let tweetsHtml = '';
    console.log(tweets);

    for (const tweet of tweets) {
      tweetsHtml += `
        <div class="tweet">
          <div class="avatar">
            <img src="${tweet.avatar}" />
          </div>
          <div class="content">
            <div class="user">
              @${tweet.username}
            </div>
            <div class="body">
              ${escapeHtml(tweet.tweet)}
            </div>
          </div>
        </div>
      `;
    }

    document.querySelector(".tweets").innerHTML = tweetsHtml;
    document.querySelector(".pagina-inicial").classList.add("hidden");
    document.querySelector(".tweets-page").classList.remove("hidden");
  });
}

function postTweet() {
  const tweet = document.querySelector("#tweet").value;

  axios.post("http://localhost:5000/tweets", {
    username: _username,
    tweet
  }).then(() => {
    document.querySelector("#tweet").value = "";
    loadTweets();
  }).catch(err => {
    console.error(err);
    alert(`${err.response.data} statusCode: ${err.response.status}`);
  })
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }