export type MetrologyTool = {
  slug: string;
  name: string;
  category: string;
  description: string;
  accent: "cyan" | "amber" | "green" | "violet" | "red";
};

export const metrologyTools: MetrologyTool[] = [
  { slug: "tolerance-calculator", name: "TOLERANCE CALCULATOR", category: "DIMENSIONAL", description: "Calculate bilateral or unilateral specification limits from a nominal dimension.", accent: "green" },
  { slug: "measurement-converter", name: "MEASUREMENT CONVERTER", category: "DIMENSIONAL", description: "Convert common dimensional units including inch, mm, µm, and mil.", accent: "green" },
  { slug: "measurement-statistics", name: "MEASUREMENT STATISTICS", category: "STATISTICS", description: "Calculate count, mean, range, standard deviation, minimum, and maximum.", accent: "green" },
  { slug: "percent-error", name: "PERCENT ERROR", category: "STATISTICS", description: "Compare a measured value against a known reference value.", accent: "green" },
  { slug: "percent-difference", name: "PERCENT DIFFERENCE", category: "STATISTICS", description: "Calculate relative difference between two measured values.", accent: "green" },
  { slug: "capability-calculator", name: "CAPABILITY CALCULATOR", category: "STATISTICS", description: "Calculate Cp and Cpk from specification limits, process mean, and standard deviation.", accent: "green" },
  { slug: "tur-calculator", name: "TUR CALCULATOR", category: "CALIBRATION", description: "Calculate Test Uncertainty Ratio from tolerance and calibration uncertainty.", accent: "green" },
  { slug: "uncertainty-calculator", name: "UNCERTAINTY CALCULATOR", category: "CALIBRATION", description: "Combine independent standard uncertainty components using root-sum-square.", accent: "green" },
  { slug: "calibration-interval", name: "CALIBRATION INTERVAL", category: "CALIBRATION", description: "Calculate the next calibration due date from a calibration date and interval.", accent: "green" },
  { slug: "resolution-calculator", name: "RESOLUTION RATIO", category: "CALIBRATION", description: "Compare instrument resolution against the allowed tolerance width.", accent: "green" },
  { slug: "thermal-expansion", name: "THERMAL EXPANSION", category: "DIMENSIONAL", description: "Estimate dimensional change using length, CTE, and temperature change.", accent: "green" },
  { slug: "pressure-converter", name: "PRESSURE CONVERTER", category: "PHYSICAL", description: "Convert pressure between Pa, kPa, MPa, bar, psi, and inHg.", accent: "green" },
  { slug: "torque-converter", name: "TORQUE CONVERTER", category: "PHYSICAL", description: "Convert torque between N·m, lbf·ft, lbf·in, and kgf·cm.", accent: "green" },
  { slug: "force-converter", name: "FORCE CONVERTER", category: "PHYSICAL", description: "Convert force between N, kN, lbf, and kgf.", accent: "green" },
  { slug: "temperature-converter", name: "TEMPERATURE CONVERTER", category: "PHYSICAL", description: "Convert temperature between Celsius, Fahrenheit, and Kelvin.", accent: "green" },
];

export function getMetrologyTool(slug: string) {
  return metrologyTools.find((tool) => tool.slug === slug);
}
