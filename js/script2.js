// Agora, fazendo com axios

let btn = document.querySelector('#btn');

let div = document.querySelector('#app');

btn.onclick = function() {

    div.innerHTML = '';

    let spanName = document.createElement('span');

    let name = '';

    let github_user = document.querySelector('input[name=github_user]').value;

    axios.get(`https://api.github.com/users/${github_user}`)
    .then(function(response) {
        if (response.data.name != null) {
            name = document.createTextNode(response.data.name);

            let img = document.createElement('img');
            img.setAttribute('src', response.data.avatar_url);
            img.setAttribute('alt', response.data.name);
            img.setAttribute('width', '45px');
            img.setAttribute('height', '45px');

            div.appendChild(img);
            

        } else {
            name = document.createTextNode("Error: cannot find this user"); 
        }

        spanName.appendChild(name);
        div.appendChild(spanName);

        

    })
    .catch(function(error) {
        name = createTextNode("Error: The request couldn't be completed")
        spanName.appendChild(name);
        div.appendChild(spanName);
    });

     // Limpar o campo de input
     document.querySelector('input[name=github_user]').value = '';

}
