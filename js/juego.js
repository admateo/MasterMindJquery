/*DAVID MATEO CUENCA*/
{
	var masterMind = function(){
		let arrayColores =  ["Amarillo", "Azul", "Blanco", "Marron", "Naranja", "Negro", "Rojo", "Verde"];
		let arrayCirculos = [undefined, undefined, undefined, undefined];
		let arrayObjetivo;
		let tablero;

		let iniciarJuego = function(){
			arrayObjetivo = [];

			for (let i = 0; i < 4; i++) {
				//Se obtiene un número random entre el máximo(excluido) y el mínimo(incluido) y floor para obtener el número entero correctamente
				arrayObjetivo.push(arrayColores[Math.floor(Math.random() * (8 - 0))]); 
			}

			console.log(arrayObjetivo);
		}

		let comprobarColores = function(tablero){
			if(arrayCirculos.indexOf(undefined) === -1){
				let elementosTablero = tablero.children()[tablero.children().length-1];
				let tableroNegrasYBlancas = $(elementosTablero).children()[$(elementosTablero).children().length-1];

				let negros = 0;
				let posicionCorrecta = 0;
				let esta = 0;
				let arrayObjetivoCopia = arrayObjetivo.slice(); //Si no se usa el metodo slice se referencia el array no se copia, por eso se cambiaban los dos
				//Comprobamos si está en la posición correcta
				arrayCirculos.forEach( function(element, index) {
					if(arrayObjetivoCopia[index] === element){
						posicionCorrecta++;
						arrayObjetivoCopia[index] = undefined;
						arrayCirculos[index] = "hola";
					}
				});

				//Ahora comprobamos si los colores estan
				for (let i = 0; i < arrayCirculos.length; i++) {
					if(arrayObjetivoCopia.indexOf(arrayCirculos[i]) != -1){
						arrayObjetivoCopia[i-1] = undefined;
						esta++;
					}
				}

				let sumaCirculos = posicionCorrecta + esta;
				for (let i = 0; i < sumaCirculos; i++) {
					if(i < posicionCorrecta){
						$(tableroNegrasYBlancas).children()[i].src = "img/pequeñoNegro.svg";
					}else{
						$(tableroNegrasYBlancas).children()[i].src = "img/pequeñoBlanco.svg";
					}
					
				}

				if(posicionCorrecta === 4){
					$( "#dialog-confirm" ).css("display", 'block');
					$( "#dialog-confirm" ).dialog({
				    	resizable: false,
				    	height: "auto",
				    	width: 240,
				    	modal: true,
				    	buttons: {
				    		"Volver a jugar": function() {
				  				location.reload(true);
				    		},
				    		"Salir": function() {
				     			window.close();
				    		}
				    	}
				    });

				}else{
					nuevaFila();
					for(let i = 0; i < 4; i++){
						arrayCirculos[i] = undefined;						
						$(elementosTablero).children()[i].className = "relleno";
						$(elementosTablero).children()[i].style.cursor = "auto";
					}
				}
			}
		}

		let mostrar = function(){
			console.log(arrayObjetivo);
		}

		let quitarCirculo = function(elemento, index){
			if(!elemento.hasClass("relleno")){
				elemento.attr('src', 'img/vacioGrande.svg');
				arrayCirculos[index] = undefined;
				elemento.addClass('vacio');
				$(elemento).toggle("explode");
				$(elemento).toggle("explode");	
			}
		}

		let nuevaFila = function(){
			let $divCirculos = $('<div>', {'id': 'circulosVacios'});
			$('#tablero').append($divCirculos);
			for (let i = 0; i < 4; i++) {
				let $circulo = $('<img>', {'id': 'vacioGrande'+i, 'src': 'img/vacioGrande.svg'});
				$circulo.on("click", quitarCirculo.bind(null, $circulo, i));
				$('#circulosVacios:last-child').append($circulo);	
			}
			let blancosYNegros = $('<div/>');
			$('#circulosVacios:last-child').append(blancosYNegros);
			for (let i = 0; i < 4; i++) {
				let $circulo = $('<img>', {'id': 'vacioPequeño'+i, 'src': 'img/vacioPequeño.svg'});
				$(blancosYNegros).append($circulo);
			}
			$($divCirculos).effect("slide", 800);				
			window.scrollTo(0, 0);
		}

		let rellenarCirculos = function(tablero, imagen){
			let cajaActual = tablero.children()[tablero.children().length-1];
			for(let i = 0; i < 4; i++){
				if(arrayCirculos[i] === undefined){				
					let arraySrc = imagen.split("/");
					let stringColor = arraySrc[arraySrc.length-1];
					let color = stringColor.slice(0, stringColor.length-4);
					arrayCirculos[i] = color;
					let $elementoActual = $(cajaActual).children()[i];
					$elementoActual.src = imagen;
				    $($elementoActual).toggle("scale", 200);
				    $($elementoActual).toggle("scale", 200);			       
					break;
				}
			}
		}

		let init = function(){
			iniciarJuego();
			tablero = $("#tablero");
			let arrayImgs = $("img");
			for (let i = 0; i < 8; i++) {
				$(arrayImgs[i]).on("click", rellenarCirculos.bind(null, tablero, arrayImgs[i].src));
			}
			nuevaFila();
			$("#aceptar").on("click", comprobarColores.bind(null, tablero));
		}
		return {
			init:init,
			mostrar:mostrar
		}
	}();

	$(function() {
		masterMind.init();
		$("#reiniciar").on("click", function(){
			location.reload(true);
		});
		$("#salir").on("click", function(){
			window.close();
		});
	});
}
