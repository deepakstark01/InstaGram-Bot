import React from 'react'
import exportFromJSON from 'export-from-json' 
export default function Export() {
    const fileName = 'download';  
    const exportType = 'xls';

    ExportToExcel = () => {  
        exportFromJSON({ data, fileName, exportType })  
      }  
  return (
    <div className="App">  
        <header className="App-header" style={{textAlign : 'center'}}>  
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" className="App-logo" alt="logo" width="200" /><br/>  
          <button type="button" onClick={this.ExportToExcel}>Export To Excel</button>  
        </header>  
      </div> 
  )
}
