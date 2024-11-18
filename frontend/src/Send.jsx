import { SendMoney } from "./Components/SendMoney";
import { useLocation } from "react-router-dom";
function Send() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const name = query.get("name")
return <div><SendMoney name ={name}></SendMoney></div>
}

export default Send;