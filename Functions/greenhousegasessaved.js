function GreenhouseGasesSaved(efficency, distance){

	var FuelUsed;
	var GreenhouseGas

	FuelUsed = (efficency/100)*distance;

	//convert to gallons

	FuelUsed = FuelUsed/3.785411784;

	//cars create approx 8.91 kg of CO2 per gallon

	GreenhouseGas = FuelUsed*8.91;

	return GreenhouseGas;
}