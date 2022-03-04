export default function (status) {
  const dnfStatuses = [
    "Disqualified",
    "Accident",
    "Collision",
    "Engine",
    "Gearbox",
    "Transmission",
    "Clutch",
    "Hydraulics",
    "Electrical",
    "Spun off",
    "Radiator",
    "Suspension",
    "Brakes",
    "Differential",
    "Overheating",
    "Mechanical",
    "Tyre",
    "Driver Seat",
    "Puncture",
    "Driveshaft",
  ];

  return dnfStatuses.includes(status);
}
