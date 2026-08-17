export type MetrologyTool = {
  slug: string;
  name: string;
  category: string;
  description: string;
};

export const metrologyTools: MetrologyTool[] = [
  { slug: "tolerance-calculator", name: "Tolerance Calculator", category: "DIMENSIONAL", description: "Calculate upper and lower limits from nominal and asymmetric tolerances." },
  { slug: "measurement-statistics", name: "Measurement Statistics", category: "STATISTICS", description: "Calculate count, mean, standard deviation, range, minimum, and maximum." },
  { slug: "percent-error", name: "Percent Error", category: "STATISTICS", description: "Compare a measured value against a reference value." },
  { slug: "percent-difference", name: "Percent Difference", category: "STATISTICS", description: "Compare two measured values without choosing a reference." },
  { slug: "capability-calculator", name: "Capability Calculator", category: "PROCESS", description: "Calculate Cp and Cpk from specification limits, mean, and standard deviation." },
  { slug: "tur-calculator", name: "TUR Calculator", category: "CALIBRATION", description: "Calculate test uncertainty ratio from tolerance and expanded uncertainty." },
  { slug: "uncertainty-calculator", name: "Uncertainty Calculator", category: "CALIBRATION", description: "Combine standard uncertainties and calculate expanded uncertainty." },
  { slug: "resolution-calculator", name: "Resolution Calculator", category: "CALIBRATION", description: "Compare instrument resolution against total tolerance." },
  { slug: "thermal-expansion", name: "Thermal Expansion", category: "DIMENSIONAL", description: "Estimate dimensional change from CTE and temperature change." },
  { slug: "measurement-converter", name: "Length Converter", category: "CONVERSION", description: "Convert between mm, inch, micrometre, mil, and metre." },
  { slug: "pressure-converter", name: "Pressure Converter", category: "CONVERSION", description: "Convert common pressure units." },
  { slug: "torque-converter", name: "Torque Converter", category: "CONVERSION", description: "Convert common torque units." },
  { slug: "force-converter", name: "Force Converter", category: "CONVERSION", description: "Convert common force units." },
  { slug: "temperature-converter", name: "Temperature Converter", category: "CONVERSION", description: "Convert Celsius, Fahrenheit, and Kelvin." },
  { slug: "calibration-interval", name: "Calibration Interval", category: "CALIBRATION", description: "Calculate the next calibration due date from a date and interval." },
];

export function getMetrologyTool(slug: string) {
  return metrologyTools.find((tool) => tool.slug === slug);
}
