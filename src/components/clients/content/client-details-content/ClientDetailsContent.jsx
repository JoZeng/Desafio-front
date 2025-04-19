import "./client-details-content.css";
import ClientDetailsData from "./client-details-data/ClientDetailsData"; 
import ClientDetailsCharges from "./client-details-charges/ClientDetailsCharges";

export default function ClientDetailsContent({ handleModalClientsEdit }) {
  return (
    <div className="client-details">
      <ClientDetailsData handleModalClientsEdit={handleModalClientsEdit} />
      <ClientDetailsCharges />
    </div>
  );
}
