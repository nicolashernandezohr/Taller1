const agregarUsuario = async () => {
    const nombre = document.getElementsByName('nombre')[0].value;
    const fecha = document.getElementsByName('fecha')[0].value;
    const edad = calcularEdad(fecha);
   const result = await fetch('http://localhost:4000/user/addUser', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ nombre, edad, fecha })
    });
    await listarUsuarios();
    
}

const listarUsuarios = async () => {
    try {
        const result = await fetch('http://localhost:4000/user/getUsers', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        });
        const lista = document.getElementById('listaUsuarios');
        const resultado = await result.json();
        resultado.map(res => {
            let documento = document.getElementById(res.id);
            if(!documento){
                let li = document.createElement('li');
                let fecha = res.fecha_nacimiento;
                li.innerHTML = `Nombre: ${res.nombre} - Edad: ${res.edad} - Fecha de Nacimiento: ${fecha.substr(0, 10)}`;
                li.id = res.id;
                li.className = 'list-group-item overlay zoom';
                li.setAttribute('onclick', `obtenerUsuario(${res.id})`);
                lista.appendChild(li);
            }else{
                let fecha = res.fecha_nacimiento;
                documento.innerHTML= `Nombre: ${res.nombre} - Edad: ${res.edad} - Fecha de Nacimiento: ${fecha.substr(0, 10)}`;
            }
        });
    } catch (e) {
        alert(e);
    }
}

const actualizarUsuario = async () => {
    try {
        const id = document.getElementsByName('id')[0].value;
        const nombre = document.getElementsByName('nombre')[0].value;
        const fecha = document.getElementsByName('fecha')[0].value;
        const edad = calcularEdad(fecha);
        const result = await fetch('http://localhost:4000/user/updateUser', {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ id, nombre, edad, fecha })
        });
       await listarUsuarios();
    } catch (e) {
        alert(e);
    }

}

const obtenerUsuario = async (id) => {
    document.getElementById('actualizar').removeAttribute('disabled');
    try {
        const result = await fetch(`http://localhost:4000/user/getUser?id=${id}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        });
        const resultado = await result.json();
        document.getElementsByName('id')[0].value = resultado[0].id
        document.getElementsByName('nombre')[0].value = resultado[0].nombre;
        let fecha = resultado[0].fecha_nacimiento;
        document.getElementsByName('fecha')[0].value = fecha.substr(0, 10);
    } catch (e) {
        alert(e);
    }
}

const calcularEdad = (fechaNacimiento)=>{
    const fechaActual = new Date();
    const anoActual = parseInt(fechaActual.getFullYear());
    const mesActual = parseInt(fechaActual.getMonth())+1;
    const diaActual = parseInt(fechaActual.getDate());

    const anoNacimiento = parseInt(fechaNacimiento.substring(0,4));
    const mesNacimiento = parseInt(fechaNacimiento.substring(5,7));
    const diaNacimiento = parseInt(fechaNacimiento.substring(8,10));
    let edad= anoActual - anoNacimiento;
    if(mesActual<mesNacimiento){
        edad--;
    }else if(mesActual === mesNacimiento){
        if(diaActual<diaNacimiento){
            edad--;
        }
    }
    return edad;
}
