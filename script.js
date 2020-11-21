window.addEventListener('DOMContentLoaded', ()=>{
    console.log(window.innerWidth)
    console.log(window.outerWidth)
   return show()
})

window.onscroll = ()=>{
    if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350){
        document.getElementById("subprofile").style.visibility = "visible"
    }
    else if(document.body.scrollTop < 350 || document.documentElement.scrollTop < 350){
        document.getElementById("subprofile").style.visibility = "hidden"
    }
}

const show_menu = ()=>{
    const menu = document.getElementById('nav')
    menu.classList.toggle("show_nav")
}

const get_date = (x) =>{
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    let currentYear = new Date().getFullYear()
    
    let date = new Date(x);

    var day = date.getDate()
    var month = date.getMonth()
    var year = date.getFullYear();

    if(year === currentYear){
        return `Updated on ${day} ${monthNames[month]}`
    }

    else {
        return `Updated on ${day} ${monthNames[month -1]}, ${year}`
    }

}

window.onload = ()=>{
    if(window.innerWidth <= 800){
        document.getElementById('pulls').innerHTML = "Pulls"
        document.getElementById('spaces').style.display = 'none'
    }
    else{
        document.getElementById('pulls').innerHTML ="Pull Requests"
        document.getElementById('spaces').style.display = 'flex'
    }
}

window.onresize = ()=>{
    if(window.innerWidth <= 800){
        document.getElementById('pulls').innerHTML = "Pulls"
        document.getElementById('spaces').style.display = 'none'
    }
    else{
        document.getElementById('pulls').innerHTML ="Pull Requests"
        document.getElementById('spaces').style.display = 'flex'
    }
}



const show = ()=>{
    fetch('https://blooming-sea-31036.herokuapp.com/')
    .then(response => response.json())
    .then(key =>{
        shows(key)
    } )
    
}

const shows = (key)=>{
    fetch('https://api.github.com/graphql' , {
        method : 'POST',
        headers : {
            "Authorization" : `bearer ${key}` 
        },
        body : JSON.stringify({query : `{
            user(login: "\Quadrizzz"\ ) {
                 repositories(first: 20, isFork: false)
                  { nodes
                     { name  
                        url
                        description 
                        updatedAt 
                        forkCount 
                        stargazers{ 
                            totalCount
                        } 
                        primaryLanguage{
                            name color 
                        }  
                    }  

                }  
            }

        }`
    })
        
    }).then(response => {
           return response.json()
    }).then(data => {
        console.log(data)
        display(data)
    })
}

const display = (data)=>{
   const show = document.getElementById("repositories_1")
   const star = './Assets/star.png';
   const fork = './Assets/untitled.svg'
    data.data.user.repositories.nodes.map((answer, i)=>{
       let main_div = document.createElement('div');
       main_div.className = "repo_main"

       let text_div = document.createElement('div');
       text_div.className = "repo_main_text"

       let button = document.createElement('div')
       button.className = "repo_main_button"

       let button_image = document.createElement('img')
       button_image.class = "repo_btn_image";
       button_image.src = `${star}`

       let p_star = document.createElement('p')
       p_starclassName = "star_p"
       p_star.innerHTML = "Star"

       let others = document.createElement('div')
       others.className = "repo_others"

       let date = document.createElement('p')
       date.className = "repo_update"
       date.innerHTML = `${get_date(data.data.user.repositories.nodes[i].updatedAt)}`

       let lang_color = document.createElement('span')
       lang_color.innerHTML = "."
       lang_color.style.backgroundColor =`${data.data.user.repositories.nodes[i].primaryLanguage.color}`
       lang_color.style.color =`${data.data.user.repositories.nodes[i].primaryLanguage.color}`

       let repo_lang = document.createElement('div')
       repo_lang.className = "repo_language"

       let lang = document.createElement('p')
       lang.className = 'repo_lang'
       lang.innerHTML = `${data.data.user.repositories.nodes[i].primaryLanguage.name}`

       let name = document.createElement('h3')
       name.className = "repo_name" 
       name.innerHTML = `${data.data.user.repositories.nodes[i].name}`;
       let text_break = document.createElement('br')
       name.appendChild(text_break)

       let desc = document.createElement('p') 
       let span_desc = document.createElement('span')
       span_desc.appendChild(desc)

       let forks = document.createElement('div')
       forks.className = "repo_forks"

       let stars = document.createElement('div')
       stars.className = "repo_forks"
       stars.id = "repo_stars"

       let no_stars = document.createElement('p')
       no_stars.className = "repo_no_forks"
       no_stars.innerHTML = `${data.data.user.repositories.nodes[i].stargazers.totalCount}`

       let stars_image = document.createElement('img')
       stars_image.className = "fork_image"
       stars_image.src = `${star}`

       let no_forks = document.createElement('p')
       no_forks.className = "repo_no_forks"
       no_forks.innerHTML = `${data.data.user.repositories.nodes[i].forkCount}`

       let forks_image = document.createElement('img')
       forks_image.className = "fork_image"
       forks_image.src = `${fork}`
       
       repo_lang.appendChild(lang_color)
       repo_lang.appendChild(lang)
       button.appendChild(button_image);
       button.appendChild(p_star)
       text_div.appendChild(name)
       stars.appendChild(stars_image)
       stars.appendChild(no_stars)
       forks.appendChild(forks_image)
       forks.appendChild(no_forks)
       others.appendChild(repo_lang)

       if(data.data.user.repositories.nodes[i].stargazers.totalCount !== 0){
            others.appendChild(stars)
        }
   

       if(data.data.user.repositories.nodes[i].forkCount !== 0){
            others.appendChild(forks)
       }

       others.appendChild(date)

       if(data.data.user.repositories.nodes[i].description){
           desc.innerHTML = `${data.data.user.repositories.nodes[i].description}`
           name.appendChild(span_desc)
       }
       text_div.appendChild(others)
       main_div.appendChild(text_div)
       main_div.appendChild(button)
       show.appendChild(main_div)
   })
}