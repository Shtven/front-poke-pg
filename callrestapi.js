var url = "http://34.70.63.72:8080/api/pokemon";

function postPokemon() {

    console.log(url);

    var myName = $('#name').val();
    var myNoPokedex = $('#noPokedex').val();
    var myTipo1 = $('#tipo1').val();
    var myTipo2 = $('#tipo2').val();
    var myHabilidad = $('#habilidad').val();
    var myRegion = $('#region').val();
    var myDescripcion = $('#descripcion').val();

    var mypokemon = {
        name: myName,
        noPokedex: myNoPokedex,
        tipo1: myTipo1,
        tipo2: myTipo2,
        habilidad: myHabilidad,
        region: myRegion,
        descripcion: myDescripcion
    };
    console.log(mypokemon);

    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            $('#resultado').html(JSON.stringify(data.pokemon));
        },
        data: JSON.stringify(mypokemon)
    });
}

function getPokemons() {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const pokemones = data.pokemons || []; // Ajustado por estructura
        let tablaHTML = `
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>No Pokédex</th>
                <th>Tipo 1</th>
                <th>Tipo 2</th>
                <th>Habilidad</th>
                <th>Región</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
        `;
  
        pokemones.forEach(pokemon => {
          tablaHTML += `
            <tr>
              <td>${pokemon.id}</td>
              <td>${pokemon.name}</td>
              <td>${pokemon.noPokedex}</td>
              <td>${pokemon.tipo1}</td>
              <td>${pokemon.tipo2}</td>
              <td>${pokemon.habilidad}</td>
              <td>${pokemon.region}</td>
              <td>${pokemon.descripcion}</td>
              <td>
              <button type="button" onclick="editarPokemon(${pokemon.id})">Editar</button>
              <button type="button" onclick="eliminarPokemon(${pokemon.id})">Eliminar</button>
              </td>
            </tr>
          `;
        });
  
        tablaHTML += `
            </tbody>
          </table>
        `;
  
        document.getElementById('resultado').innerHTML = tablaHTML;
      })
      .catch(error => console.error('Error al obtener los pokémon:', error));
  }

  function eliminarPokemon(id) {
    if (confirm('¿Seguro que quieres eliminar este Pokémon?')) {
      fetch(`${url}/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) throw new Error('Error al eliminar Pokémon');
        alert('Pokémon eliminado exitosamente');
        getPokemons();
      })
      .catch(error => {
        console.error('Error al eliminar Pokémon:', error);
      });
    }
  }
  
function editarPokemon(id) {
    const nuevoNombre = prompt('Nuevo nombre del Pokémon:');
    const nuevoNoPokedex = prompt('Nuevo número Pokédex:');
    const nuevoTipo1 = prompt('Nuevo Tipo 1:');
    const nuevoTipo2 = prompt('Nuevo Tipo 2:');
    const nuevaHabilidad = prompt('Nueva Habilidad:');
    const nuevaRegion = prompt('Nueva Región:');
    const nuevaDescripcion = prompt('Nueva Descripción:');
  
    const actualizado = {
      name: nuevoNombre,
      noPokedex: nuevoNoPokedex,
      tipo1: nuevoTipo1,
      tipo2: nuevoTipo2,
      habilidad: nuevaHabilidad,
      region: nuevaRegion,
      descripcion: nuevaDescripcion
    };
  
    fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(actualizado)
    })
    .then(response => {
      if (!response.ok) throw new Error('Error al actualizar Pokémon');
      alert('Pokémon actualizado exitosamente');
      getPokemons();
    })
    .catch(error => {
      console.error('Error al actualizar Pokémon:', error);
    });
  }
  
  function limpiarFormulario() {
    document.getElementById('name').value = '';
    document.getElementById('noPokedex').value = '';
    document.getElementById('tipo1').value = '';
    document.getElementById('tipo2').value = '';
    document.getElementById('habilidad').value = '';
    document.getElementById('region').value = '';
    document.getElementById('descripcion').value = '';
  }

