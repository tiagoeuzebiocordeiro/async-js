// assync js xml http request

let btn = document.querySelector('#btn');

let input = document.querySelector('input[name=github_user]');

let div = document.querySelector('#app');

btn.onclick = function() {

    div.innerHTML = ''; // limpar o conteudo da div caso precise pesquisar outro usuario e nao fique atolado la

    // passos: instanciar o ajax, abrir conexão, enviar dados (requisicao), pegar o result

    let ajax = new XMLHttpRequest();

    // abrir uma conexao na api com o valor do input p get no usernickname
    ajax.open('GET', `https://api.github.com/users/${input.value}`); 

    // pq to passando null? aqui a gente passa dados pro endereço, como o GET é apenas para "pegar" os dados, entao n precisa
    ajax.send(null); 

    // pegando os resultados
    ajax.onreadystatechange = function() {

        // Criar o span

        let spanName = document.createElement('span');

        // Criar var nome

        let name = '';



        if (ajax.readyState === 4) {
            if (ajax.status === 200) {
                /*
                Ajax Status, cod
                0 = antes da conexão ser aberta
                1 = conexão foi aberta
                2 = headers foram recebidos
                3 = carregando o request body (dados)
                4 = conteudo foi carregado e ready to use
                
                */ 
                usuario = JSON.parse(ajax.responseText);
                // Se o usuario possui nome 

                if (usuario['name'] ) 
                    txtName = document.createTextNode(usuario['name']);

                    let img = document.createElement('img');
                    img.setAttribute('src', usuario['avatar_url']);
                    img.setAttribute('alt', usuario['name']);
                    img.setAttribute('width', '45px');
                    img.setAttribute('height', '45px');
                    div.appendChild(img);
                    
            } else {
                txtName = document.createTextNode(`Error, cannot found user: ${input.value}`);
            }
            spanName.appendChild(txtName);
            div.appendChild(spanName);

            input.value = '';
        } 

    }

}

