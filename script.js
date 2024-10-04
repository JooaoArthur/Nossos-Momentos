document.addEventListener("DOMContentLoaded", function () {
    loadMoments();

    document.getElementById('form-momento').addEventListener('submit', function (e) {
        e.preventDefault();

        const data = document.getElementById('data').value;
        const descricao = document.getElementById('descricao').value;
        const foto = document.getElementById('foto').files[0];

        if (foto && data && descricao) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const galeria = document.getElementById('galeria');

                // Criando o novo momento
                const momentDiv = document.createElement('div');
                momentDiv.classList.add('moment');

                // Criando os elementos internos (data, imagem, descrição)
                const dataElement = document.createElement('p');
                dataElement.classList.add('date');
                dataElement.textContent = new Date(data).toLocaleDateString();

                const imgElement = document.createElement('img');
                imgElement.src = event.target.result;
                imgElement.alt = descricao;

                const descricaoElement = document.createElement('p');
                descricaoElement.classList.add('description');
                descricaoElement.textContent = descricao;

                // Botão de exclusão
                const excluirButton = document.createElement('button');
                excluirButton.textContent = 'Excluir';
                excluirButton.classList.add('excluir');
                excluirButton.addEventListener('click', function () {
                    galeria.removeChild(momentDiv);
                    removeMomentFromLocalStorage(data);
                });

                // Adicionando tudo ao novo momento
                momentDiv.appendChild(dataElement);
                momentDiv.appendChild(imgElement);
                momentDiv.appendChild(descricaoElement);
                momentDiv.appendChild(excluirButton);

                // Adicionando o momento à galeria
                galeria.appendChild(momentDiv);

                // Salvando o momento no LocalStorage
                saveMoment(data, event.target.result, descricao);
            };

            reader.readAsDataURL(foto);

            // Limpando o formulário após adicionar o momento
            document.getElementById('form-momento').reset();
        }
    });
});

// Função para carregar momentos salvos do LocalStorage
function loadMoments() {
    const storedMoments = JSON.parse(localStorage.getItem('moments')) || [];
    const galeria = document.getElementById('galeria');

    storedMoments.forEach(moment => {
        const momentDiv = document.createElement('div');
        momentDiv.classList.add('moment');

        const dataElement = document.createElement('p');
        dataElement.classList.add('date');
        dataElement.textContent = new Date(moment.data).toLocaleDateString();

        const imgElement = document.createElement('img');
        imgElement.src = moment.foto;
        imgElement.alt = moment.descricao;

        const descricaoElement = document.createElement('p');
        descricaoElement.classList.add('description');
        descricaoElement.textContent = moment.descricao;

        // Botão de exclusão
        const excluirButton = document.createElement('button');
        excluirButton.textContent = 'Excluir';
        excluirButton.classList.add('excluir');
        excluirButton.addEventListener('click', function () {
            galeria.removeChild(momentDiv);
            removeMomentFromLocalStorage(moment.data);
        });

        momentDiv.appendChild(dataElement);
        momentDiv.appendChild(imgElement);
        momentDiv.appendChild(descricaoElement);
        momentDiv.appendChild(excluirButton);

        galeria.appendChild(momentDiv);
    });
}

// Função para salvar momentos no LocalStorage
function saveMoment(data, foto, descricao) {
    const storedMoments = JSON.parse(localStorage.getItem('moments')) || [];
    storedMoments.push({ data, foto, descricao });
    localStorage.setItem('moments', JSON.stringify(storedMoments));
}

// Função para remover momentos do LocalStorage
function removeMomentFromLocalStorage(data) {
    let storedMoments = JSON.parse(localStorage.getItem('moments')) || [];
    storedMoments = storedMoments.filter(moment => moment.data !== data);
    localStorage.setItem('moments', JSON.stringify(storedMoments));
}
