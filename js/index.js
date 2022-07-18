// takes submit event, fetches entered user data from github

document.addEventListener('DOMContentLoaded', () => {
    handleGet();
})
function handleGet() {
    let form = document.getElementById('github-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        document.getElementById('user-list').innerHTML = ''
        //console.log(e.target.querySelector('#search').value)
        let input = e.target.querySelector('#search').value
        fetch(`https://api.github.com/search/users?q=${input}`, {
            // check this info with coach, it worked without so I can't tell if it's correct
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                accept: 'application/vnd.github.v3+json'
            }
        })
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            //console.log(data.items[0].id)
            for (let element in data.items) {
                let li = document.createElement('li')
                li.className = 'userListInfo'
                li.id = element
                li.innerHTML = `
                <ul>
                    <li>${data.items[element].login}</li>
                    <img src='${data.items[element].avatar_url}' class='userImage'/>
                    <li>URL: ${data.items[element].url}</li>
                    <li>Repositories: ${data.items[element].repos_url}</li>
                </ul>
                <br>
                <br>
                `
                li.addEventListener('click', (e) => {
                    document.getElementById('repos-list').innerHTML = ''
                    //console.log(e.target.parentNode.parentNode.className)
                    let elementsTest = document.getElementsByClassName('userListInfo')
                    console.log('elementsTest', elementsTest)
                    if (e.target.parentNode.parentNode.className === 'userListInfo') {
                        // console.log(e.target.parentNode.parentNode)
                        // console.log(e.target.parentNode.parentNode.id)
                        // console.log(element)
                        handleRepos(data.items[element].login)
                        let usersList = document.getElementsByClassName('userListInfo')
                        console.log(usersList)
                        for (let usersElement in usersList) {
                            let userCard = usersList[usersElement]
                            console.log(userCard)
                            // want to set all backgroundcolors to empty strings, but somehow not every userCard is an li element
                        }
                        let targetEntity = e.target.parentNode.parentNode
                        targetEntity.style.backgroundColor = 'red'
                        //console.log(targetEntity)
                    }
                })

                document.getElementById('user-list').appendChild(li)
                //console.log(li)
                //console.log(data.items[name].login)
            }
        })
        form.reset();
    })
}

function handleRepos(inputElement) {
    //console.log(inputElement)
    fetch(`https://api.github.com/users/${inputElement}/repos`, {
        // check this info with coach, it worked without so I can't tell if it's correct
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            accept: 'application/vnd.github.v3+json'
        }
    })
    .then(res => res.json())
    .then(reposObj => {
        document.getElementById('repos-list').innerHTML = ''
        for (let repo in reposObj) {
            let repoLi = document.createElement('li')
            repoLi.className = 'repoList'
            repoLi.textContent = `${reposObj[repo].name}`
            document.getElementById('repos-list').appendChild(repoLi)
        }
    })
}