//Todo: The index.html file has a form with a search input. 
//Todo: When the form is submitted, it should take the value of the input and 
//Todo: search GitHub for user matches using the User Search Endpoint.


//Todo: Using the results of the search, display information about the users to the page. 
//Todo: (You might include showing their username, avatar and a link to their profile.)

//Todo: Clicking on one of these users should send a request to the User Repos Endpoint and 
//Todo: return data about all the repositories for that user.


//Todo: Using the response from the Users Repos Endpoint, 
//Todo: display all the repositories for that user on the page.

document.addEventListener("DOMContentLoaded", ()=>{ 
    let url = 'https://api.github.com/search/users?q='
    let form = document.querySelector('#github-form')

    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        let name = document.querySelector('#search').value

        fetch(`${url}${name}`)
        .then(res=>res.json())
        .then((data)=>{
            console.log('Data:', data)

            let display = document.querySelector('#user-list')
            display.style = 'display:flow-root;'

            while (display.hasChildNodes()) {
                display.removeChild(display.firstChild);
            }

            console.log(data.items[0].login)
            for (let i of data.items){

                let one = document.createElement('div')
                let user = document.createElement('h4')
                let avatar = document.createElement('img')
                let site = document.createElement('a')

                user.textContent = i.login
                user.style = 'margin-top: 0px; text-align: center; margin-bottom: 0px;'
                avatar.src = i.avatar_url
                avatar.style = 'height: 100px; width: 100px; border-radius: 10px; border: 2px solid; margin-top: 15px; margin-left: 8px'
                site.href = i.html_url
                site.textContent = 'Visit Page.'
                site.target="_blank"
                site.style = 'margin-top: 0px; margin-bottom: 0px; text-align: center;'

                display.appendChild(one)
                one.style= 'display: inline-block;'
                
                one.appendChild(avatar)
                one.appendChild(user)
                one.appendChild(site)
                
                
                avatar.addEventListener('click',()=>{
                    while (display.hasChildNodes()) {
                        display.removeChild(display.firstChild);
                    }

                    console.log(i);  
                    
                    let name = document.createElement('h3')
                    let picture = document.createElement('img')
                    let repositories = document.createElement('h3')
                    let link = document.createElement('a')

                    name.textContent = i.login
                    
                    picture.src = i.avatar_url
                    picture.style = 'height: 150px; width: 150px; border-radius: 10px; border: 2px solid;'

                    repositories.textContent = 'Repository List'

                    link.href = i.html_url
                    link.textContent = 'Visit Page.'
                    link.target="_blank"

                    display.appendChild(name)
                    display.appendChild(picture)
                    display.appendChild(repositories)
                    display.appendChild(link)

                    let uri = `https://api.github.com/users/${i.login}/repos`

                    console.log(uri)

                    repositories.addEventListener('click', () =>{
                        while (display.hasChildNodes()) {
                            display.removeChild(display.firstChild);
                        }

                        let list = document.querySelector('#repos-list')

                        fetch(uri)
                        .then(re=>re.json())
                        .then(data => {
                            let heading = document.createElement('h2');
                            heading.textContent = `${user.innerHTML}'s Repositories`
                            display.appendChild(heading);

                            for(let i of data){
                                let li = document.createElement('li');
                                let repos = document.createElement('a');
                                repos.href = i.html_url;
                                repos.textContent = i.name;
                                repos.target="_blank";

                                display.appendChild(li);
                                li.appendChild(repos);


                            }
                        })
                    })

                })


            }
            
            

        })
        
    })



})



                    
