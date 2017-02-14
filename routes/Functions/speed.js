function speed(wheelSize, time){

	var circumference;
	var speed;

	circumference = wheelSize * PI;
	speed = circumference / time;

	return speed;
}