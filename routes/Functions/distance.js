function distance(rotations, wheelSize){

	// wheel size is in inches

	var distance;
	var circumference;
	
	// convert to m then calculate circumference

	circumference = (wheelSize*0.0254) * PI;

	// distance in m
	
	distance = rotations * circumference;

	return distance;
}