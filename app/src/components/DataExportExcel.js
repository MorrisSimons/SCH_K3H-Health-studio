import * as XLSX from "xlsx";

//Component needs two props inorder to work. sheetData and sheetName
function DataExportExcel(props) {
    //Handle export click 
    const handleOnExport = () => {
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(props.sheetData);

    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");

    XLSX.writeFile(wb, props.sheetName+".xlsx");
  };
  
  return (
    <div>
        <button type="button" onClick={handleOnExport}>Export Excel</button>  
    </div>
  );
}

export default DataExportExcel;
