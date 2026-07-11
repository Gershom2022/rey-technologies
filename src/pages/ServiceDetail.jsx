import { useParams } from "react-router-dom";
import { services } from "../data/services";

function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.id === slug);

  if (!service) {
    return <div className="py-16 px-8">Service not found.</div>;
  }

  return (
    <div className="py-16 px-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
      <p className="text-gray-600 mb-6">{service.description}</p>

      {service.subItems && service.subItems.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            We develop and implement enterprise-grade systems including:
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            {service.subItems.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ServiceDetail;