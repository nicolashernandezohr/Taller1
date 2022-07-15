const agregarUsuario = async () => {
    const nombre = document.getElementsByName('nombre')[0].value;
    const edad = parseInt(document.getElementsByName('edad')[0].value);
    const fecha = document.getElementsByName('fecha')[0].value;
    alert(nombre, edad, fecha);
    const result = await fetch('http://localhost:4000/user/addUser', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ nombre, edad, fecha })
    });
    console.log(result.json());
}

const listarUsuario = async () => {
    try {
        const result = await fetch('http://localhost:4000/user/getUsers', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        });
        const body = await result.json();
        document.getElementById('listado').innerHTML = JSON.stringify(body);
        document.getElementsByName('actualizar').disabled=false;
    } catch (e) {
        alert(e);
    }

}


const actualizarUsuario = async () => {
    try {
        const id = document.getElementsByName('id')[0].value;
        const nombre = document.getElementsByName('nombre')[0].value;
        const edad = parseInt(document.getElementsByName('edad')[0].value);
        const fecha = document.getElementsByName('fecha')[0].value;
        const result = await fetch('http://localhost:4000/user/updateUser', {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({id,nombre,edad,fecha})
        });
       alert(result.json());
       
        
    } catch (e) {
        alert(e);
    }

}