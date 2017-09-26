(function(){

	function C() {
		console.log("C");
	}

	function E(f) {
		console.log("E");
		f();
		var f = F;
	}

	function A() {
		console.log("A");
		B();
	}

	var C;

	function G() {
		console.log("G");
		H();

		function H() {
			console.log("H");
			I();
		};
	}

	var D = d;

	function d() {
		console.log("D");
		E(F);
	}

	function I() {
		console.log("I");
		J();
		J();
	}

	function B() {
		console.log("B");
		C();
	};

	var F = function() {
		console.log("F");
		G();
	};

	var rest = "KLMNOPQRSTUVWXYZ".split("");
	for (var i=0; i<rest.length; i++) {
		(function(i){
			// define the current function
			window[rest[i]] = function() {
				console.log(rest[i]);
				if (i < (rest.length-1)) {
					window[rest[i+1]]();
				}
			};
		})(i);
	}

	var J = function() {
		J = function() {
			console.log("J");
			K();
		};
	};

	function C() {
		console.log("C");
		D();
	};
	return A;
})()();
