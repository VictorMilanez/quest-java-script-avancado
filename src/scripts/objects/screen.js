const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/>
                                        <div class="data">
                                         <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                                         <p>${user.bio ?? 'Não possui bio cadastrada 😥'} </p>
                                         <p>Seguidores 👥: ${user.followers.length ?? 'Não possui seguidores 😥'} </p>
                                         <p>Seguindo 👥: ${user.following.length ?? 'Não segue ninguém 😥'} </p>
                                      </div>
                                      </div>`

        let eventsItens = ''
        user.events.forEach(events => {
            if (events.type === "PushEvent" && events.payload.commits.length > 0) {
                const message = events.payload.commits[0].message
                eventsItens += `<li><a href="${events.repo.url}" target="_blank">${events.repo.name} / ${message}</a></li>`      
            }
            if (events.type === "CreateEvent"){
                eventsItens += "<p>Sem messagem de commit</p>"
            }
        })

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div>
                                             <h2>Eventos</h2>
                                             <br>
                                             <ul>${eventsItens}</ul>
                                           </div> `
        }

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}<br><br><span>🍴 ${repo.forks}</span> <span>⭐ ${repo.stargazers_count}</span> <span>👀 ${repo.watchers}</span> <span>👩‍💻 ${repo.language}</span></a></li>`)
                                                                
            
        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                 <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }