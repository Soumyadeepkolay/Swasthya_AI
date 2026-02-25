export const calculateBMI = (weight: number, height: number) => {
  const heightInMeters = height / 100;
  return (weight / (heightInMeters * heightInMeters)).toFixed(1);
};

export const calculateTDEE = (
  weight: number,
  height: number,
  age: number,
  gender: string,
  activityLevel: string
) => {
  let bmr;
  if (gender === 'male') {
    bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }

  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    extra_active: 1.9,
  };

  return Math.round(bmr * (activityMultipliers[activityLevel] || 1.2));
};

export const getBMICategory = (bmi: number) => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};
