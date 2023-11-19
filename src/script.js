
function clearEverything() {
	document.getElementById("weightRaw").value = "";
	document.getElementById("weightUnit").value = "0";
	document.getElementById("orderedAmount").value = "";
	document.getElementById("orderedUnit").value = "0";
	document.getElementById("orderedFrequency").value = "0";
	document.getElementById("safeDosageMin").value = "0";
	document.getElementById("safeDosageMax").value = "0";
	document.getElementById("safeDosageUnit").value = "0";
	document.getElementById("safeDosageFrequency").value = "0";
	document.getElementById("statusLog").innerHTML = "";
}

function fillSample() {
	document.getElementById("weightRaw").value = "50";
	document.getElementById("weightUnit").value = "lb";
	document.getElementById("orderedAmount").value = "250";
	document.getElementById("orderedUnit").value = "1";
	document.getElementById("orderedFrequency").value = "4.0000";
	document.getElementById("safeDosageMin").value = "25";
	document.getElementById("safeDosageMax").value = "50";
	document.getElementById("safeDosageUnit").value = "1";
	document.getElementById("safeDosageFrequency").value = "0.2500";
}

function calculateEverything() {
	document.getElementById("statusLog").innerHTML = "";
	if( document.getElementById("weightRaw").value === "" ) {
		document.getElementById("statusLog").innerHTML = "ERROR: You need to enter a weight";
		return;
	}

	// Setup Vars
	var rawWeight = parseFloat(document.getElementById("weightRaw").value);
	var calculatedWeight;
	var safeDosageFrequency = document.getElementById("safeDosageFrequency").value;
	var safeDosageUnit = document.getElementById("safeDosageUnit").value;
	var safeDosageMin = document.getElementById("safeDosageMin").value;
	var safeDosageMax = document.getElementById("safeDosageMax").value;
	var safeDosageMinPerDay;
	var safeDosageMinPerDose;
	var safeDosageMaxPerDay;
	var safeDosageMaxPerDose;
	var orderedDosage = document.getElementById("orderedAmount").value;
	var orderedDosageUnit = document.getElementById("orderedUnit").value;
	var orderedDosagePerDay;
	var orderedDosagePerDose;

	// Check if Pounds or Kilograms
	if (document.getElementById("weightUnit").value === "lb") {
		calculatedWeight = rawWeight / 2.2;
		calculatedWeight *= 10;
		calculatedWeight = Math.round(calculatedWeight);
		calculatedWeight /= 10;
	}

	// Calculate Safe Minimum Dosage
	safeDosageMinPerDose = safeDosageMin * safeDosageUnit * calculatedWeight * safeDosageFrequency;
	safeDosageMinPerDay = safeDosageMinPerDose / safeDosageFrequency;
	safeDosageMaxPerDose = safeDosageMax * safeDosageUnit * calculatedWeight * safeDosageFrequency;
	safeDosageMaxPerDay = safeDosageMaxPerDose / safeDosageFrequency;

	// Display Results
	document.getElementById("statusLog").innerHTML = "";
	document.getElementById("statusLog").innerHTML += document.getElementById("statusLog").innerHTML + "Patient Weight : " + calculatedWeight + " kg<br>";
	document.getElementById("statusLog").innerHTML += "Safe Dosage Minimum per DAY: " + safeDosageMinPerDay + "mg<br>";
	document.getElementById("statusLog").innerHTML += "Safe Dosage Minimum per DOSE: " + safeDosageMinPerDose + "mg<br>";
	document.getElementById("statusLog").innerHTML += "Safe Dosage Maximum per DAY: " + safeDosageMaxPerDay + "mg<br>";
	document.getElementById("statusLog").innerHTML += "Safe Dosage Maximum per DOSE: " + safeDosageMaxPerDose + "mg<br>";
	document.getElementById("statusLog").innerHTML += "Ordered Dosage per DAY:<br>";
	document.getElementById("statusLog").innerHTML += "Ordered Dosage per DOSE:<br>";
	document.getElementById("statusLog").innerHTML += "<br><br>..:: WORK ::..<br><br>";
	document.getElementById("statusLog").innerHTML += "PATIENT WEIGHT :: ";
	if (document.getElementById("weightUnit").value === "lb") {
		document.getElementById("statusLog").innerHTML += rawWeight + "lb &divide; 2.2 = ";
	}
	document.getElementById("statusLog").innerHTML += calculatedWeight + "kg<br>";
	document.getElementById("statusLog").innerHTML += "SAFE DOSAGE MINIMUM :: " + calculatedWeight + "kg x " + safeDosageMin + "mg x " + safeDosageFrequency + " = " + safeDosageMinPerDay + "mg/day &divide; " + safeDosageFrequency + " = " + safeDosageMinPerDose + "mg/dose<br>";
	document.getElementById("statusLog").innerHTML += "";
}

window.addEventListener('DOMContentLoaded',function () {
	document.getElementById("btn_reset").addEventListener("click", clearEverything, false);
	document.getElementById("btn_check").addEventListener("click", calculateEverything, false);
	document.getElementById("btn_sample").addEventListener("click", fillSample, false);
	clearEverything();
});