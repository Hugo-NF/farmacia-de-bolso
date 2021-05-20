// File to hold utils related to medication measument units.

// Private functions.
function convertMeasurementUnitToPlural(measurementUnit: string) : string {
  return `${measurementUnit}s`;
}

function convertMeasurementUnitToSingular(measurementUnit: string) : string {
  return measurementUnit.substring(0, measurementUnit.length - 1);
}

function measurementUnitIsInvariable(measurementUnit: string) : boolean {
  const invariableMeasurementUnits = ['mg', 'ml', 'g', 'l'];
  return invariableMeasurementUnits.includes(measurementUnit.toLowerCase());
}

function measurementUnitIsPlural(measurementUnit: string) : boolean {
  return measurementUnit.slice(-1).toLowerCase() === 's';
}

// Exported functions.
export function measurementUnitPluralForm(measurementUnit: string) : string {
  if (
    measurementUnitIsInvariable(measurementUnit)
    || measurementUnitIsPlural(measurementUnit)
  ) return measurementUnit;

  return convertMeasurementUnitToPlural(measurementUnit);
}

export function measurementUnitSingularForm(measurementUnit: string) : string {
  if (
    measurementUnitIsInvariable(measurementUnit)
    || !measurementUnitIsPlural(measurementUnit)
  ) return measurementUnit;

  return convertMeasurementUnitToSingular(measurementUnit);
}
