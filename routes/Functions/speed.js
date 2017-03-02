function speed(wheelSize, time, rotations){

	// wheel size is in inches
	// time in s

	var circumference;
	var speed;
	var distance;

	// convert to m then calculate circumference

	circumference = (wheelSize*0.0254) * PI;

	distance = circumference * rotations;

	// speed is in km/hour

	speed = distance / (time*60*60);

	return speed;
}