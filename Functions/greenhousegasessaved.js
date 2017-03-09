function GreenhouseGasesSaved(efficency, distance){

	var FuelUsed;
	var GreenhouseGas
	//distanmce is in m
	//efficency is L/100 km

	distance = distance/1000;
	
	FuelUsed = (efficency/100)*distance;

	//convert to gallons

	FuelUsed = FuelUsed/3.785411784;

	//cars create approx 8.91 kg of CO2 per gallon

	GreenhouseGas = FuelUsed*8.91;

	return GreenhouseGas;
}