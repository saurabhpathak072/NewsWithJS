
let searchval;
let search1;
let theme;
let NewsContainer = document.querySelector('.newsContainer1');
let articles = [];
let search =document.getElementById("search");
let pagenum = document.querySelectorAll(".page-item");
let info = document.querySelector(".is-info");
let page;
let error = document.querySelector(".error");
const switcher = document.getElementById('mode-switch');
let cardd = document.getElementsByClassName('cardd');
const headlinesFilter = {
    page: 1,
    pageSize: 20,
    q: ''
  };
  let theme1= document.getElementById('theme');


let getHeadLines = (searchval) =>{

    (!searchval || null)?

    fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=ace352d7d0f040058c2f008f440820ee`)
    .then((response)=>response.json())
    .then((data)=>{console.log(data); renderHeadlines(data);})
    :
    fetch(`https://newsapi.org/v2/top-headlines?q=${searchval}&apiKey=ace352d7d0f040058c2f008f440820ee`)
    .then((response)=>response.json())
    .then((data1)=>{console.log("data1",data1); renderHeadlines(data1);})
}

let renderHeadlines =async (data) =>{
    let li,ul;
    console.log("1",data.articles);
     articles = data.articles;
    if(articles.length){
        let NewsList='<ul class="carcontainer container">';
       articles.forEach((art)=>{
           //console.log(art.author);
           NewsContainer.style.display='flex';
           info.style.display = 'none';
           error.style.display='none';
            NewsList += `
                        <li class="card-body card1 "><h5 class="card-title arttile">${art.title}</h5>
            
                        <img class="img-thumbnail mx-auto d-block" style="height: 200px,text-align:center,
                        width: 200px;" src="${art.urlToImage}" alt="Card image cap">
                        
                        <p class="card-text text">${art.content}</p>
                        <a href="${art.url}" class="btn button1 btn-primary">Go on full story</a>
                        <p class="author">- ${art.author}</p>
                        
                        </li>`;
            
        
         });
         NewsList += '</ul>';
       //  NewsList=`<ul>${news}<ul>`;

         
           NewsContainer.innerHTML=NewsList;
            console.log("Newscon",NewsContainer.innerHTML)
    }
    else if(articles.length==0 && data.status==='ok'){
        console.log(info);
        info.style.display = 'block';
        console.log(NewsContainer);
        NewsContainer.style.display='none';

        
        
    }
    else if (data.status!=='ok'){
            console.log(error);
            error.style.display='block';
            NewsContainer.style.display='none';
            error.innerHTML=`staus ${data.status} and message ${data.message}`
    }


    let getSearch = (e) =>{
        if(e.key==="Enter" || e.keyCode === 13 || e.which === 13){
            if(search.value){
                searchval = search.value;
                getHeadLines(searchval);
            }
            else{
                getHeadLines();
            }

        }
    }

    search.addEventListener("keypress",getSearch)


}

getHeadLines();
switcher.addEventListener('change', e => {
    const checked = e.target.checked;
    const theme = checked ? 'dark' : 'light';
    changeTheme(theme);
  });

  function changeTheme(theme) {
    if (theme === 'dark') {
      theme1.classList.add('wrapper');
      theme1.classList.remove('nowrapper');
      localStorage.setItem('theme', 'dark');
     

    } else if (theme === 'light') {
      theme1.classList.remove('wrapper');
      theme1.classList.add('nowrapper');
      localStorage.setItem('theme', 'light');
      
    }
  }
  function themeInit() {
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
  } else {
    theme = 'light';
    localStorage.setItem('theme', 'light');
  }
  changeTheme(theme);
  switcher.checked = theme === 'dark' ? true : false;
}

