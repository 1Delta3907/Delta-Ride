function caloriesBurned(distance, time, weight){

	var calories;
	var speed;
	var caloriesBurned

	speed = distance / time;

	if (weight <= 130){

		if (speed < 22.5) {

			calories = 470;

		} else if (speed < 25.7){

			calories = 560;

		} else if (speed < 32){

			calories = 650;

		} else {

			calories = 740;

		}

	} else if (weight <= 155){

		if (speed < 22.5) {

			calories = 590;

		} else if (speed < 25.7){

			calories = 700;

		} else if (speed < 32){

			calories = 815;

		} else {

			calories = 930;

		}

	} else if (weight <= 185){
		
		if (speed < 22.5) {

			calories = 705;

		} else if (speed < 25.7){

			calories = 840;

		} else if (speed < 32){

			calories = 980;

		} else {

			calories = 1120;

		}
	} else {
		
		if (speed < 22.5) {

			calories = 945;

		} else if (speed < 25.7){

			calories = 1125;

		} else if (speed < 32){

			calories = 1310;

		} else {

			calories = 1490;
		}
	}

	caloriesBurned = calories / time;
	
	return caloriesBurned;
}