import { FormatIDR } from "../utils/utils"

function TotalBayar({totalBayar}) {
    return (
      <div>
        <h4>Total Bayar: Rp {FormatIDR(totalBayar)}</h4>
        <button className="bg-white rounded-3 fw-medium w-100 hover-opacity">Bayar</button>
      </div>
    )
  }
  
  export default TotalBayar
  