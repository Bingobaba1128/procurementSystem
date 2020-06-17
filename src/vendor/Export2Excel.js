/* eslint-disable */
import { saveAs } from 'file-saver'
import XLSX from 'xlsx'


export function export_json_to_excel({
    multiHeader = [],
    header,
    data,
    filename,
    // merges = [],
    autoWidth = true,
    bookType = 'xlsx'
  } = {}) {
    window.console.log(data)

    /* original data */
    filename = filename || 'excel-list'
    data = [...data]
  //此处是第三行行表头
    data.unshift(header);

  //此处是第一行行表头
    for (let i = multiHeader.length - 1; i > -1; i--) {
      data.unshift(multiHeader[i])
    }}