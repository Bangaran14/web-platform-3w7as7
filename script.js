console.log('Hello!');
let output = document.getElementById("output");
let input = document.getElementById("input");
let state = "inicio";
let jugador = {
  nombre: "",
  vida: 100,
  ataque: 10,
  defensa: 10
};
let enemigo = {
  nombre: "Ogro",
  vida: 50,
  ataque: 15,
  defensa: 5
};
let salaActual = 1;

function actualizar() {
  let textoInput = input.value.toLowerCase();
  input.value = "";
  let respuesta = "";
  if (state === "inicio") {
    jugador.nombre = textoInput;
    state = "jugando";
    respuesta = "¡Bienvenido al juego de rol de texto, " + jugador.nombre + "! ¿Estás listo para comenzar la aventura? Escribe 'si' o 'no'.";
  } else if (state === "jugando") {
    if (textoInput === "si") {
      state = "salas";
      respuesta = "Muy bien, " + jugador.nombre + ". Tu misión es encontrar la llave de la salida en una de las tres salas que hay en este castillo. Pero ten cuidado, hay peligros por todas partes. Estás en la Sala " + salaActual + ". ¿Qué deseas hacer? Puedes explorar, descansar o pelear.";
    } else if (textoInput === "no") {
      respuesta = "Bueno, tal vez otro día. ¡Hasta luego!";
      state = "fin";
    } else {
      respuesta = "No entiendo lo que dices. ¿Estás listo para comenzar la aventura? Escribe 'si' o 'no'.";
    }
  } else if (state === "salas") {
    if (textoInput === "explorar") {
      let encontrado = Math.floor(Math.random() * 3) + 1;
      if (encontrado === salaActual) {
        respuesta = "¡Encontraste la llave de la salida! ¡Felicidades, " + jugador.nombre + "! Ahora solo tienes que encontrar la salida.";
        state = "fin";
      } else {
        salaActual++;
        if (salaActual > 3) {
          salaActual = 1;
        }
        respuesta = "No encontraste nada interesante en la Sala " + encontrado + ". Ahora estás en la Sala " + salaActual + ". ¿Qué deseas hacer? Puedes explorar, descansar o pelear.";
      }
    } else if (textoInput === "descansar") {
      jugador.vida += 10;
      if (jugador.vida > 100) {
        jugador.vida = 100;
      }
      respuesta = "Te sientes mejor después de descansar un rato. Tu vida ahora es de " + jugador.vida + ". ¿Qué deseas hacer? Puedes explorar, descansar o pelear.";
    } else if (textoInput === "pelear") {
      state = "pelea";
      respuesta = "Te encuentras con un " + enemigo.nombre + ". ¿Qué deseas hacer? Puedes atacar o defenderte.";
    } else {
      respuesta = "No entiendo lo que dices. ¿Qué deseas hacer? Puedes explorar, descansar o pelear.";
    }
  } else if (state === "pelea") {
    let accion = textoInput.split(" ");
    if (accion[0] === "atacar") {
    let danoJugador = jugador.ataque - enemigo.defensa;
    if (danoJugador < 0) {
    danoJugador = 0;
    }
    enemigo.vida -= danoJugador;
    if (enemigo.vida <= 0) {
    state = "salas";
    respuesta = "¡Has derrotado al " + enemigo.nombre + "! Ahora estás en la Sala " + salaActual + ". ¿Qué deseas hacer? Puedes explorar, descansar o pelear.";
    } else {
    let danoEnemigo = enemigo.ataque - jugador.defensa;
    if (danoEnemigo < 0) {
    danoEnemigo = 0;
    }
    jugador.vida -= danoEnemigo;
    if (jugador.vida <= 0) {
    respuesta = "¡El " + enemigo.nombre + " te ha derrotado! ¡Fin del juego!";
    state = "fin";
    } else {
    respuesta = "Has atacado al " + enemigo.nombre + " y le has hecho " + danoJugador + " puntos de daño. Tu vida ahora es de " + jugador.vida + ". ¿Qué deseas hacer? Puedes atacar o defenderte.";
    }
    }
    } else if (accion[0] === "defenderse") {
    let danoEnemigo = (enemigo.ataque - jugador.defensa) / 2;
    if (danoEnemigo < 0) {
    danoEnemigo = 0;
    }
    jugador.vida -= danoEnemigo;
    if (jugador.vida <= 0) {
    respuesta = "¡El " + enemigo.nombre + " te ha derrotado! ¡Fin del juego!";
    state = "fin";
    } else {
    respuesta = "Te has defendido del ataque del " + enemigo.nombre + " y has recibido " + danoEnemigo + " puntos de daño. Tu vida ahora es de " + jugador.vida + ". ¿Qué deseas hacer? Puedes atacar o defenderte.";
    }
    } else {
    respuesta = "No entiendo lo que dices. ¿Qué deseas hacer? Puedes atacar o defenderte.";
    }
    }
    
    output.innerHTML += "<p>" + respuesta + "</p>";
    window.scrollTo(0,document.body.scrollHeight);
    }
    
    input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    event.preventDefault();
    actualizar();
    }
    });
