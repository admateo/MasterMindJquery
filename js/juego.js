{
	let arrayCirculos = [undefined, undefined, undefined, undefined];
	let tablero;

	var masterMind = function(){
		let arrayColores =  ["Amarillo", "Azul", "Blanco", "Marron", "Naranja", "Negro", "Rojo", "Verde"];
		let arrayObjetivo;

		let iniciarJuego = function(){
			arrayObjetivo = [];

			for (let i = 0; i < 4; i++) {
				//Se obtiene un número random entre el máximo(excluido) y el mínimo(incluido) y floor para obtener el número entero correctamente
				arrayObjetivo.push(arrayColores[Math.floor(Math.random() * (8 - 0))]); 
			}
			console.log(arrayObjetivo);
		}

		let comprobarColores = function($tableroParam){
			if(arrayCirculos.indexOf(undefined) === -1){
				let elementosTablero = $tableroParam.children()[$tableroParam.children().length-1];

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
						let posicion = arrayObjetivoCopia.indexOf(arrayCirculos[i]);
						arrayObjetivoCopia[posicion] = undefined;
						esta++;
					}
				}
				return [posicionCorrecta + esta, posicionCorrecta, elementosTablero];
			}
		}
		return {
			init: iniciarJuego,
			comprobarColores
		}
	}();

	$(function() {
		masterMind.init();

		$tablero = $("#tablero");
		let arrayImgs = $("img");
		for (let i = 0; i < 8; i++) {
			$(arrayImgs[i]).click(crearCirculos.bind(null, $tablero, arrayImgs[i].src));
		}
		nuevaFila();

		$("#aceptar").click(function(){
			let arrayCirculosDevolver = masterMind.comprobarColores($tablero);
			if(arrayCirculos.indexOf(undefined) === -1){
				rellenarCirculos(arrayCirculosDevolver[0], arrayCirculosDevolver[1], $(arrayCirculosDevolver[2]));
			}		
		});
    });

    let crearCirculos = function($tableroParam, imagen){
		let cajaActual = $tableroParam.children()[$tableroParam.children().length-1];
			for(let i = 0; i < 4; i++){
				if(arrayCirculos[i] === undefined){				
					let arraySrc = imagen.split("/");
					let stringColor = arraySrc[arraySrc.length-1];
					let color = stringColor.slice(0, stringColor.length-4);
					arrayCirculos[i] = color;
					let elementoActual = $(cajaActual).children()[i];
					$(elementoActual).attr("src", imagen);		       
					
				let selectedEffect = "scale";

				var options = {percent: 50};

		   		$(elementoActual).toggle("scale", options, 50);
				$(elementoActual).toggle("scale", options, 50);
				break;

				}
			}
	}

	let nuevaFila = function(){
		let $divCirculos = $('<div>', {'id': 'circulosVacios'});
		$('#tablero').append($divCirculos);
		for (let i = 0; i < 4; i++) {
			let $circulo = $('<img>', {'id': 'vacioGrande'+i, 'src': 'img/vacioGrande.svg'});
			$circulo.click(quitarCirculo.bind(null, $circulo, i));
			$('#circulosVacios:last-child').append($circulo);	
		}
		let blancosYNegros = $('<div/>');
		$('#circulosVacios:last-child').append(blancosYNegros);
		for (let i = 0; i < 4; i++) {
			let $circulo = $('<img>', {'id': 'vacioPequeño'+i, 'src': 'img/vacioPequeño.svg'});
			$(blancosYNegros).append($circulo);
		}
		$($divCirculos).effect("slide", 250);	
		window.scrollTo(0, 0);
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

	let rellenarCirculos = function(sumaCirculos, negras, $tableroParam){
		let tableroNegrasYBlancas = $tableroParam.children()[$tableroParam.children().length-1];
		for (let i = 0; i < sumaCirculos; i++) {
			let bolaPequeña = $(tableroNegrasYBlancas).children()[i];
			if(i < negras){
				$(bolaPequeña).attr("src", "img/pequeñoNegro.svg");

			}else{
				$(bolaPequeña).attr("src", "img/pequeñoBlanco.svg");
			}		
		}
		if(negras === 4){
			$( "#dialog-confirm" ).css("display", 'block');
			$("#dialog-confirm").dialog({
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
		    $(".ui-dialog-titlebar").hide();
		}else{
			nuevaFila();
			for(let i = 0; i < 4; i++){
				arrayCirculos[i] = undefined;
				let elementoHijo = $tableroParam.children()[i];
				$(elementoHijo).addClass("relleno");
				$(elementoHijo).css("cursor", "auto");
			}
		}
	}
}
