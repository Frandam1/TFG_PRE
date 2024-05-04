// script.js
document.querySelectorAll('.list-group-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const technique = this.innerText.toLowerCase().replace(/\s/g, '');
        displayTechnique(technique);
    });
});

function displayTechnique(technique) {
    const descriptions = {
        desviacion: {
            title: "Desviación de Pensamientos",
            description: "Involucra dirigir activamente tu mente lejos de pensamientos negativos o no productivos hacia pensamientos más positivos o útiles.",
            example: "Cuando empieces a preocuparte excesivamente sobre un evento futuro, intenta concentrarte en una tarea que requiera tu atención completa, como resolver un rompecabezas o practicar un hobby.",
            application: "Utiliza esta técnica cuando te encuentres rumiando o preocupándote por cosas que no puedes controlar."
        },
        pruebaRealidad: {
            title: "Prueba de Realidad",
            description: "Te ayuda a cuestionar la veracidad de tus pensamientos negativos y a considerar si realmente tienen base en la realidad.",
            example: "Si te preocupa que todos te juzguen negativamente, podrías listar las evidencias reales que apoyan o contradicen este pensamiento.",
            application: "Aplica esta técnica cuando tus pensamientos te lleven a conclusiones extremas que te hacen sentir peor sobre ti mismo o tu situación."
        },
        busquedaAlternativas: {
            title: "Búsqueda de Alternativas",
            description: "Consiste en buscar interpretaciones alternativas a los pensamientos negativos, lo que puede ayudarte a ver la situación desde una perspectiva más equilibrada y menos emocional.",
            example: "Si te sientes como un fracaso por no cumplir con una meta, intenta pensar en todas las veces que has tenido éxito.",
            application: "Úsala cuando te sientas abrumado por los fracasos, para recordarte tus éxitos y capacidades."
        }
    };

    const techniqueInfo = descriptions[technique];
    const content = document.getElementById('content');
    content.innerHTML = `
        <h3>${techniqueInfo.title}</h3>
        <p>${techniqueInfo.description}</p>
        <p><strong>Ejemplo:</strong> ${techniqueInfo.example}</p>
        <p><strong>Aplicación:</strong> ${techniqueInfo.application}</p>
    `;
    loadSavedEntries(technique);
}

function saveExample(event, technique) {
    event.preventDefault();
    const exampleText = event.target.querySelector('textarea').value;
    let entries = JSON.parse(localStorage.getItem(technique) || "[]");
    entries.push({ text: exampleText, id: Date.now() });
    localStorage.setItem(technique, JSON.stringify(entries));
    alert('Ejemplo guardado!');
    loadSavedEntries(technique);
}

function loadSavedEntries(technique) {
    let entries = JSON.parse(localStorage.getItem(technique) || "[]");
    const savedEntries = document.getElementById('savedEntries');
    const descriptions = {
        desviacion: "Desviación de Pensamientos",
        pruebaRealidad: "Prueba de Realidad",
        busquedaAlternativas: "Búsqueda de Alternativas"
    };
    
    savedEntries.innerHTML = entries.map(entry => {
        const date = new Date(entry.id);
        const formattedDate = date.toLocaleDateString("es-ES", {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
        return `
            <div class="card mb-2">
                <div class="card-body">
                    <h5>${descriptions[technique]}</h5>
                    <p class="card-text">${entry.text}</p>
                    <button onclick="editEntry('${technique}', ${entry.id})" class="btn btn-warning btn-sm">Editar</button>
                    <button onclick="deleteEntry('${technique}', ${entry.id})" class="btn btn-danger btn-sm">Eliminar</button>
                    <span class="badge bg-primary">${formattedDate}</span>
                </div>
            </div>`
    }).join('');
}

function editEntry(technique, id) {
    let entries = JSON.parse(localStorage.getItem(technique));
    let entry = entries.find(entry => entry.id === id);
    if (entry) {
        const newText = prompt("Edita tu ejemplo:", entry.text);
        entry.text = newText;
        localStorage.setItem(technique, JSON.stringify(entries));
        loadSavedEntries(technique);
    }
}

function deleteEntry(technique, id) {
    let entries = JSON.parse(localStorage.getItem(technique));
    entries = entries.filter(entry => entry.id !== id);
    localStorage.setItem(technique, JSON.stringify(entries));
    loadSavedEntries(technique);
}

function savePersonalExample() {
    const technique = document.getElementById('techniqueSelect').value;
    const personalExample = document.getElementById('personalExample').value.trim();
    const personalApplication = document.getElementById('personalApplication').value.trim();

    if (personalExample && personalApplication && technique) {
        let entries = JSON.parse(localStorage.getItem(technique) || "[]");
        entries.push({ text: `Ejemplo: ${personalExample}, Aplicación: ${personalApplication}`, id: Date.now() });
        localStorage.setItem(technique, JSON.stringify(entries));
        alert('Ejemplo guardado!');
        document.getElementById('personalExampleForm').reset();
        loadSavedEntries(technique);
    } else {
        alert('Por favor, complete todos los campos.');
    }
}
