{
	let arrayCirculos = [undefined, undefined, undefined, undefined];
	let tablero;
	let posicionCorrecta;
	let esta;

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

		let comprobarColores = function(){
			posicionCorrecta = 0;
			esta = 0;
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
		}
		return {
			init: iniciarJuego,
			comprobarColores
		}
	}();

	$(function() {
		masterMind.init();
		let arrayImgs = $("img");
		for (let i = 0; i < 8; i++) {
			$(arrayImgs[i]).click(crearCirculos.bind(null, arrayImgs[i].src));
		}
		nuevaFila();
		$("#aceptar").click(function(){
			masterMind.comprobarColores();
			rellenarCirculos();	
		});
    });

    let crearCirculos = function(imagen){
		$('#tablero #circulosVacios:last-child .vacio')
			.first()
			.attr("src", imagen)
			.removeClass("vacio")
			.toggle("scale", {percent: 50}, 50)
			.toggle("scale", {percent: 50}, 50);
		
		let arraySrc = imagen.split("/");
		let stringColor = arraySrc[arraySrc.length-1];
		let color = stringColor.slice(0, stringColor.length-4);

		for (let i = 0; i < arrayCirculos.length; i++) {
			if (arrayCirculos[i] == undefined) {
				arrayCirculos[i] = color;
				break;
			}
		}		
	}

	let nuevaFila = function(){
		let $divCirculos = $('<div>', {'id': 'circulosVacios'});
		$('#tablero').append($divCirculos);
		for (let i = 0; i < 4; i++) {
			let $circulo = $('<img>', {'id': 'vacioGrande'+i, 'src': 'img/vacioGrande.svg', 'class': 'vacio'});
			$circulo.click(quitarCirculo.bind(null, $circulo, i));
			$('#circulosVacios:last-child').append($circulo);	
		}
		let blancosYNegros = $('<div/>');
		$('#circulosVacios:last-child').append(blancosYNegros);
		for (let i = 0; i < 4; i++) {
			let $circulo = $('<img>', {'id': 'vacioPequeño'+i, 'src': 'img/vacioPequeño.svg', 'class': 'vacioPeque'});
			$(blancosYNegros).append($circulo);
		}
		$($divCirculos).effect("slide", 250);	
		window.scrollTo(0, 0);
	}

	let quitarCirculo = function(elemento, index){
		if(!elemento.hasClass("relleno")){
			elemento.attr('src', 'img/vacioGrande.svg');	
			elemento.addClass('vacio');
			$(elemento).toggle("explode");
			$(elemento).toggle("explode");
			arrayCirculos[index] = undefined;
		}
	}

	let rellenarCirculos = function(){
		if(arrayCirculos.indexOf(undefined) === -1){
			for (let i = 0; i < posicionCorrecta+esta; i++) {
				if(i < posicionCorrecta){
					$('#tablero #circulosVacios:last-child div .vacioPeque')
						.first()
						.attr("src", "img/pequeñoNegro.svg")
						.removeClass("vacioPeque");

				}else{
					$('#tablero #circulosVacios:last-child div .vacioPeque')
						.first()
						.attr("src", "img/pequeñoBlanco.svg")
						.removeClass("vacioPeque");
				}		
			}
			if(posicionCorrecta === 4){
				$( "#dialog-confirm" ).css("display", 'block').dialog({
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
				arrayCirculos = [undefined, undefined, undefined, undefined];
				$('#tablero #circulosVacios:last-child img')
					.css("cursor", "auto").addClass("relleno");
				nuevaFila();
			}
		}
	}
}
