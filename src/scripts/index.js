import { getUser } from "./services/user.js"
import { getRepositories } from "./services/repositories.js"
import { getFollowing } from "./services/following.js"
import { getFollowers } from "./services/followers.js"
import { getEvents } from "./services/events.js"

import { screen } from "./objects/screen.js"
import { user } from "./objects/user.js"


document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if (validateEmptyInput(userName)) return
    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', (event) => {
    const userName = event.target.value
    const key = event.which || event.keyCode
    const isEnterKeyPressed = key === 13

    if (isEnterKeyPressed) {
        if (validateEmptyInput(userName)) return
        getUserData(userName)
    }
})

function validateEmptyInput(userName) {
    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuário')
        return true
    }
}

async function getUserData(userName) {
    const userResponse = await getUser(userName)

    if(userResponse.message === 'Not Found'){
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName)
    const followersResponse = await getFollowers(userName)
    const followingResponse = await getFollowing(userName)
    const eventsResponse = await getEvents(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setFollowers(followersResponse)
    user.setFollowing(followingResponse)
    user.setEvents(eventsResponse)
    screen.renderUser(user)

    console.log(eventsResponse);
    
}

