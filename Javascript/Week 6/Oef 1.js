window.addEventListener("load", loaded);

function loaded() {
    let buttonGetAllPersons = document.getElementById('button_get_all_persons');
    buttonGetAllPersons.addEventListener("click", handleGetAllPersons);
    let buttonGetPerson = document.getElementById('button_get_person');
    buttonGetPerson.addEventListener("click", handleGetPerson);
    let buttonGetPersonByName = document.getElementById('button_get_person_by_name');
    buttonGetPersonByName.addEventListener("click", handleGetPersonByName);
    let buttonPost = document.getElementById('button_post_person');
    buttonPost.addEventListener("click", handlePostPerson);
    let buttonPut = document.getElementById("button_put_person");
    buttonPut.addEventListener("click", handlePutPerson);
}


function handleGetAllPersons() {
    let url = 'http://localhost:3000/persons/';
    let output = document.getElementById("div_output");
    makeElementEmpty(output);
    fetch(url)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw `error with status ${response.status}`;
            }
        })
        .then((persons) => {
            let data = [];
            for (let person of persons) {
                data.push([person.id, person.name]);
            }
            let table = makeTable(data);
            output.appendChild(table);
        })
        .catch((error) => {
            output.appendChild(document.createTextNode(error));
        });
}


function handleGetPerson() {
    let url = 'http://localhost:3000/persons/';
    let id = document.getElementById("txt_id").value;
    let output = document.getElementById("div_output");
    makeElementEmpty(output);
    if (id.trim() !== '') {
        fetch(url + id)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw `error with status ${response.status}`;
                }
            })
            .then((person) => {
                let data = [];
                console.log(person);
                data.push([person.id, person.name]);
                let table = makeTable(data);
                output.appendChild(table);
            })
            .catch((error) => {
                output.appendChild(document.createTextNode(error));
            });
    }
}

function handleGetPersonByName() {
    let url = 'http://localhost:3000/persons/?name=';
    let name = document.getElementById("name").value;
    let output = document.getElementById("div_output");
    makeElementEmpty(output);
    if (name.trim() !== '') {
        fetch(url + name)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw `error with status ${response.status}`;
                }
            })
            .then((person) => {
                let data = [];
                person.forEach(p => {
                    data.push([p.id, p.name])
                });
                let table = makeTable(data);
                output.appendChild(table);
            })
            .catch((error) => {
                output.appendChild(document.createTextNode(error));
            });
    }
}


function handlePostPerson() {
    let url = 'http://localhost:3000/persons/';
    let output = document.getElementById("div_output");
    let name = document.getElementById("post_name").value;
    let person = {name: name};
    makeElementEmpty(output);
    fetch(url,
        {
            method: "POST",
            body: JSON.stringify(person),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.status === 201) {
                console.log(response);
                console.log(response.json());
                return response.json();
            } else {
                throw `error with status ${response.status}`;
            }
        })
        .then((person) => {
            let data = [];
            data.push([person.id, person.name]);
            let table = makeTable(data);
            output.appendChild(table);
        })
        .catch((error) => {
            output.appendChild(document.createTextNode(error));
        });
}

function handlePutPerson() {
    let name = document.getElementById("put_name").value;
    let id = document.getElementById("put_id").value;
    let url = 'http://localhost:3000/persons/' + id;
    let person = {id: id, name: name};
    let output = document.getElementById("div_output");
    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(person),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            alert("Error");
        }
    }).then((person) => {
        let data = [];
        data.push([person.id, person.name]);
        let table = makeTable(data);
        output.appendChild(table);
    })
        .catch((error) => {
            output.appendChild(document.createTextNode(error));
        });
}


function makeElementEmpty(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
}

function makeTable(matrix) {
    let table = document.createElement("table");
    for (let i = 0; i < matrix.length; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < matrix[i].length; j++) {
            let td = document.createElement("td");
            td.appendChild(document.createTextNode(matrix[i][j]));
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}