function distance(rotations, wheelSize){

	var distance;
	var circumference;
	
	circumference = wheelSize * PI;
	distance = rotations * circumference;

	return distance;
}