export function createHtmlTable(data, columnNames, extraContent) {
  const columns = getColumns(data);

  const headerColumns = columns
    .map((column) => `<td><p><strong>${columnNames[column]}</strong></p></td>`)
    .join("");
  const headerRow = `<tr>${headerColumns}</tr>`;

  const dataRows = getDataRows(data, columns);

  return prepareHtml(headerRow, dataRows, extraContent);
}

function getColumns(data) {
  return Object.keys(data[0]);
}

function getDataRows(data, columns) {
  return data
    .map((item) => {
      const cells = columns
        .map((column) => `<td><p>${item[column]}</p></td>`)
        .join("");

      return `<tr>${cells}</tr>`;
    })
    .join("");
}

function prepareHtml(headerRow, dataRows, extraContent) {
  return `<table border="1" cellspacing="0"><thead>${headerRow}</thead><tbody>${dataRows}${extraContent}</tbody></table>`;
}
