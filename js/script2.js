const Kalkulator = function () {
	const buttons = document.querySelectorAll("h1");
	const bilPertama = document.querySelector("span#bil-pertama");
	const op = document.querySelector("span#op");
	const bilangan = document.querySelector("span#bilangan");
	let allNeed = {
		waitingForSecondNumber: false,
		operator: null,
		checkOperator: false,
		checkBilangan: true,
		checkKoma: true,
		checkPersen: true,
		persenSatu: false,
		persenDua: false,
		hasilPersen: true,
		hasil: false,
		displayArr: "",
		bilPersenSatu: "",
		bilPersenDua: "",
	};

	//? Update display setiap tombol ditekan
	function updateDisplay() {
		bilangan.textContent = allNeed.displayArr;
	}

	//? Mengambil inputan user
	function getNumbers(digit) {
		//? Jika user memasukan angka tidak lebih dari 22
		if (bilangan.textContent.length < 20) {
			//? Jika hasil sudah dikeluarkan
			if (allNeed.checkBilangan == false && bilangan.textContent.length >= 0) {
				allNeed.displayArr = "";
				bilangan.textContent = "";
				allNeed.displayArr += digit;
				allNeed.checkBilangan = true;
				//? Jika hasil ditimpa dengan bilangan baru atau jika hasil belum dikeluarkan
			} else if (allNeed.checkBilangan == true && bilangan.textContent.length >= 0) {
				allNeed.displayArr += digit;
			}
		} else {
			alert("Angka terlalu banyak!");
			clear();
		}
		//? Jika user sudah memasukan angka, maka operator akan aktif.
		allNeed.checkOperator = true;
	}

	//? Aturan penggunaan koma
	function koma(koma) {
		//? Jika user memasukan koma setelah hasil dikeluarkan
		if (koma == "." && allNeed.checkBilangan == false && bilangan.textContent.length >= 0) {
			allNeed.displayArr = "";
			bilangan.textContent = "";
			allNeed.displayArr = koma;
			allNeed.checkBilangan = true;
		} //? jika user memasukan koma pada kondisi checkkoma bernilai true
		else if (koma == "." && allNeed.checkKoma == true) {
			allNeed.displayArr += koma;
			allNeed.checkKoma = false;
			//? Jika user memasukan koma pada kondisi checkkoma bernilai false
		} else if (allNeed.checkOperator == false) {
			return;
		}
	}

	//? Aturan penggunaan clear
	function clear() {
		allNeed.waitingForSecondNumber = false;
		allNeed.operator = null;
		allNeed.checkOperator = false;
		allNeed.checkKoma = true;
		allNeed.checkPersen = true;
		allNeed.hasil = false;
		allNeed.displayArr = "";
		allNeed.bilPersenSatu = "";
		allNeed.bilPersenDua = "";
		bilPertama.textContent = "";
		op.textContent = "";
		bilangan.textContent = "";
	}

	function operator(operator) {
		//? Jika user memasukan salah satu operator pada kondisi belum ada angka yang ditekan
		if (allNeed.checkOperator == false) {
			return;
			//? Jika user memasukan salah satu operator pada kondisi sudah ada angka yang ditekan
		} else if (bilangan.textContent != "" && allNeed.waitingForSecondNumber == true) {
			//? Jika operator sudah ditetapkan
			if (allNeed.operator != null) {
				return;
				//? Jika opertor belum ditetapkan
			} else if (allNeed.operator == null) {
				bilPertama.textContent = bilangan.textContent;
				allNeed.displayArr = "";
				allNeed.operator = operator;
				op.textContent = operator;
			}
			//? Jika operator sudah ditetapkan
		} else if (!allNeed.waitingForSecondNumber) {
			allNeed.operator = operator;
			allNeed.waitingForSecondNumber = true;
			bilPertama.textContent = allNeed.displayArr;
			allNeed.displayArr = "";
			op.textContent = operator;
		} else {
			return;
		}
		allNeed.checkKoma = true;
		allNeed.checkPersen = true;
	}

	function del() {
		let hapusAngkaDisplay = allNeed.displayArr.substring(0, allNeed.displayArr.length - 1);
		let hapusAngkaBilPertama = bilPertama.textContent.substring(0, bilPertama.textContent.length - 1);
		//? Jika belum ada operator yang diterima
		if (allNeed.displayArr != "" || op.textContent == "") {
			//? Jika user ingin menghapus hasil
			if (allNeed.hasil == true) {
				clear();
			} else {
				for (let j = 0; j < allNeed.displayArr.length; j++) {
					//? Jika koma belum dihapus
					if (allNeed.displayArr.includes(".")) {
						allNeed.displayArr = hapusAngkaDisplay;
						//? Jika koma dihapus
					} else {
						allNeed.displayArr = hapusAngkaDisplay;
						allNeed.checkKoma = true;
					}
				}
			}
		} //? Jika operator sudah diterima
		else if (bilPertama.textContent != "" && op.textContent != "") {
			op.textContent = "";
			allNeed.displayArr = bilPertama.textContent;
			bilPertama.textContent = "";
			allNeed.checkOperator = true;
			allNeed.operator = null;
		} //? Jika operator sudah dihapus
		else if (bilPertama.textContent != "" && op.textContent == "") {
			bilPertama.textContent = hapusAngkaBilPertama;
		} //? Jika bilangan pertama sudah diterima, operator sudah diterima dan bilangan kedua sudah diterima
		else if (bilPertama.textContent != "" && op.textContent != "" && allNeed.displayArr != "") {
			allNeed.displayArr = hapusAngkaDisplay;
		}
	}

	function equals() {
		let hasil;
		//? Jika belum ada bilangan yang dimasukan
		if (allNeed.operator == null && bilPertama.textContent == "" && allNeed.bilPersenSatu == "") {
			return;
			//? Jika bilangan pertama sudah diterima dan operator sudah diterima tetapi bulum ada bilangan kedua yang diterima
		} else if (bilPertama.textContent != "" && allNeed.operator != null && allNeed.displayArr == "") {
			return;
			//? Jika bilangan pertama adalah persen
		} else if (bilPertama.textContent == "" && allNeed.bilPersenSatu != "" && allNeed.operator == null) {
			hasil = allNeed.bilPersenSatu.toString();
			allNeed.displayArr = hasil;
			allNeed.checkBilangan = false;
			allNeed.hasilPersen = false;
			allNeed.hasil = true;
		} else {
			if (allNeed.operator == "x") {
				//? Jika user memasukan persen pada bilangan pertama dan memasukan persen pada bilangan kedua
				if (allNeed.bilPersenSatu != "" && allNeed.bilPersenDua != "") {
					hasil = parseFloat(allNeed.bilPersenSatu) * parseFloat(allNeed.bilPersenDua);
					//? Jika user memasukan persen pada bilangan pertama dan tidak memasukan persen pada bilangan kedua
				} else if (allNeed.bilPersenSatu != "" && allNeed.bilPersenDua == "") {
					hasil = parseFloat(allNeed.bilPersenSatu) * parseFloat(allNeed.displayArr);
					//? Jika user tidak memasukan persen pada bilangan pertama dan memasukan persen pada bilangan kedua
				} else if (allNeed.bilPersenSatu == "" && allNeed.bilPersenDua != "") {
					hasil = parseFloat(bilPertama.textContent) * parseFloat(allNeed.bilPersenDua);
					//? Jika user tidak memasukan persen pada bilangan pertama dan kedua
				} else {
					hasil = parseFloat(bilPertama.textContent) * parseFloat(allNeed.displayArr);
				}
			} else if (allNeed.operator == ":") {
				//? Jika user memasukan persen pada bilangan pertama dan memasukan persen pada bilangan kedua
				if (allNeed.bilPersenSatu != "" && allNeed.bilPersenDua != "") {
					hasil = parseFloat(allNeed.bilPersenSatu) / parseFloat(allNeed.bilPersenDua);
					//? Jika user memasukan persen pada bilangan pertama dan tidak memasukan persen pada bilangan kedua
				} else if (allNeed.bilPersenSatu != "" && allNeed.bilPersenDua == "") {
					hasil = parseFloat(allNeed.bilPersenSatu) / parseFloat(allNeed.displayArr);
					//? Jika user tidak memasukan persen pada bilangan pertama dan memasukan persen pada bilangan kedua
				} else if (allNeed.bilPersenSatu == "" && allNeed.bilPersenDua != "") {
					hasil = parseFloat(bilPertama.textContent) / parseFloat(allNeed.bilPersenDua);
					//? Jika user tidak memasukan persen pada bilangan pertama dan kedua
				} else {
					hasil = parseFloat(bilPertama.textContent) / parseFloat(allNeed.displayArr);
				}
			} else if (allNeed.operator == "+") {
				//? Jika user memasukan persen pada bilangan pertama dan memasukan persen pada bilangan kedua
				if (allNeed.bilPersenSatu != "" && allNeed.bilPersenDua != "") {
					hasil = parseFloat(allNeed.bilPersenSatu) + parseFloat(allNeed.bilPersenDua);
					//? Jika user memasukan persen pada bilangan pertama dan tidak memasukan persen pada bilangan kedua
				} else if (allNeed.bilPersenSatu != "" && allNeed.bilPersenDua == "") {
					hasil = parseFloat(allNeed.bilPersenSatu) + parseFloat(allNeed.displayArr);
					//? Jika user tidak memasukan persen pada bilangan pertama dan memasukan persen pada bilangan kedua
				} else if (allNeed.bilPersenSatu == "" && allNeed.bilPersenDua != "") {
					hasil = parseFloat(bilPertama.textContent) + parseFloat(allNeed.bilPersenDua);
					//? Jika user tidak memasukan persen pada bilangan pertama dan kedua
				} else {
					hasil = parseFloat(bilPertama.textContent) + parseFloat(allNeed.displayArr);
				}
			} else if (allNeed.operator == "-") {
				//? Jika user memasukan persen pada bilangan pertama dan memasukan persen pada bilangan kedua
				if (allNeed.bilPersenSatu != "" && allNeed.bilPersenDua != "") {
					hasil = parseFloat(allNeed.bilPersenSatu) - parseFloat(allNeed.bilPersenDua);
					//? Jika user memasukan persen pada bilangan pertama dan tidak memasukan persen pada bilangan kedua
				} else if (allNeed.bilPersenSatu != "" && allNeed.bilPersenDua == "") {
					hasil = parseFloat(allNeed.bilPersenSatu) - parseFloat(allNeed.displayArr);
					//? Jika user tidak memasukan persen pada bilangan pertama dan memasukan persen pada bilangan kedua
				} else if (allNeed.bilPersenSatu == "" && allNeed.bilPersenDua != "") {
					hasil = parseFloat(bilPertama.textContent) - parseFloat(allNeed.bilPersenDua);
					//? Jika user tidak memasukan persen pada bilangan pertama dan kedua
				} else {
					hasil = parseFloat(bilPertama.textContent) - parseFloat(allNeed.displayArr);
				}
			}
			hasil = hasil.toString();
			for (i = 0; i <= hasil.length; i++) {
				if (hasil[i] == ".") {
					hasil = parseFloat(hasil);
					allNeed.displayArr = hasil.toFixed(2);
				} else {
					allNeed.displayArr = hasil;
				}
			}
			bilPertama.textContent = "";
			op.textContent = "";
			allNeed.operator = null;
			allNeed.checkBilangan = false;
			allNeed.checkKoma = true;
			allNeed.checkbilPersenDua = false;
			allNeed.hasil = true;
			allNeed.bilPersenSatu = "";
			allNeed.bilPersenDua = "";
		}
	}

	function invers() {
		if (allNeed.displayArr.length == 0) {
			return;
		} else {
			allNeed.displayArr = allNeed.displayArr *= -1;
		}
	}

	function persen(persen) {
		if (persen == "%" && allNeed.checkPersen == true) {
			//? Jika user memasukan persen ketika tidak ada bilangan yang dimasukan
			if (allNeed.displayArr.length == 0) {
				return;
				//? Jika user memasukan persen pada bilangan pertama
			} else if (bilPertama.textContent == "" && allNeed.bilPersenSatu == "") {
				allNeed.bilPersenSatu = allNeed.displayArr / 100;
				//? Jika user memasukan persen pada bilangan pertama dan kedua
			} else if (allNeed.bilPersenSatu != "" && allNeed.bilPersenDua == "") {
				allNeed.bilPersenDua = allNeed.displayArr / 100;
				//? Jika user tidak memasukan persen pada bilangan pertama, dan memasukan persen pada bilangan kedua
			} else if (bilPertama.textContent != "" && allNeed.bilPersenSatu == "") {
				allNeed.bilPersenDua = allNeed.displayArr / 100;
			}
			allNeed.displayArr += persen;
			allNeed.checkPersen = false;
		} else if (persen == "%" && allNeed.checkOperator == false) {
			return;
		}
	}

	buttons.forEach(function (button) {
		button.addEventListener("click", function (e) {
			let target = e.target;
			let targetText = e.target.textContent;
			if (target.classList.contains("clear")) {
				clear();
				updateDisplay();
				return;
			} else if (target.classList.contains("invers")) {
				invers();
				updateDisplay();
				return;
			} else if (target.classList.contains("operator")) {
				operator(targetText);
				updateDisplay();
				return;
			} else if (target.classList.contains("equals")) {
				equals();
				updateDisplay();
				return;
			} else if (target.classList.contains("del")) {
				del();
				updateDisplay();
				return;
			} else if (target.classList.contains("koma")) {
				koma(targetText);
				updateDisplay();
				return;
			} else if (target.classList.contains("persen")) {
				persen(targetText);
				updateDisplay();
				return;
			}
			getNumbers(targetText);
			updateDisplay();
		});
	});
};
Kalkulator();