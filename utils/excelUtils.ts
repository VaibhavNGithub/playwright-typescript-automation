import * as XLSX from 'xlsx';
import path from 'path';

export function readSheet<T = Record<string, unknown>>(
  fileName: string,
  sheetName: string
): T[] {
  const filePath = path.resolve('test-data', fileName);
  const workbook = XLSX.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];

  if (!worksheet) {
    throw new Error(`Excel sheet "${sheetName}" was not found in ${fileName}`);
  }

  return XLSX.utils.sheet_to_json<T>(worksheet);
}

export function getTestData<T extends { testCase: string }>(
  fileName: string,
  sheetName: string,
  testCase: string
): T {
  const rows = readSheet<T>(fileName, sheetName);
  const row = rows.find((item) => item.testCase === testCase);

  if (!row) {
    throw new Error(
      `Test case "${testCase}" was not found in sheet "${sheetName}"`
    );
  }

  return row;
}