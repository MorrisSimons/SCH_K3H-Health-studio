import * as XLSX from 'xlsx'
// Component needs two props inorder to work. sheetData and sheetName

function DataExportExcel (props) {
  // export excel file
  const handleOnExport = () => {
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(props.sheetData)

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')

    XLSX.writeFile(wb, props.sheetName + '.xlsx')
  }

  return (
    <div>
      <button type='button' onClick={handleOnExport}>
        Export Excel
      </button>
    </div>
  )
}

export default DataExportExcel
