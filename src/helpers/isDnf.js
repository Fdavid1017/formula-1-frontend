export default function (status) {
  const dnfStatuses = [
    "disqualified",
    "accident",
    "collision",
    "engine",
    "gearbox",
    "transmission",
    "clutch",
    "hydraulics",
    "electrical",
    "spun off",
    "radiator",
    "suspension",
    "brakes",
    "differential",
    "overheating",
    "mechanical",
    "tyre",
    "driver seat",
    "puncture",
    "driveshaft",
    "retired",
  ];

  return dnfStatuses.includes(status.toLowerCase());
}
