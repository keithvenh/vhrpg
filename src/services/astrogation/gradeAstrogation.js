function getLetterGrade(pct) {
  const aurebeshGrades = [
    { min: 86, max: 100, grade: "A" },
    { min: 71, max: 85, grade: "B" },
    { min: 51, max: 70, grade: "C" },
    { min: 31, max: 50, grade: "D" },
    { min: 16, max: 30, grade: "E" },
    { min: 0, max: 15, grade: "F" }
  ];
  
  for (let { min, max, grade } of aurebeshGrades) {
    if (pct >= min && pct <= max) {
      return grade;
    }
  }
  
  return "G"; // Default grade if no range matches
}

export function gradeSegment(time, minTime, maxTime, route) {
  let percentage = ((time-minTime) / (maxTime - minTime)) * 100;
  percentage = Math.round(percentage)

  return getLetterGrade(percentage)
}

export function gradeRoute(route, routes) {

}