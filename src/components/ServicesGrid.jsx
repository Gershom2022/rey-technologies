import { Link } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import { services } from "../data/services";
import {
  CustomSoftwareIcon,
  WebDesignIcon,
  MobileAppsIcon,
  CloudSolutionsIcon,
  DataAnalyticsIcon,
  AIIcon,
  ConsultancyIcon,
  CybersecurityIcon,
  InfrastructureIcon,
} from "./ServiceIcons";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const iconMap = {
  'custom-software': CustomSoftwareIcon,
  'web-design': WebDesignIcon,
  'mobile-apps': MobileAppsIcon,
  'cloud-solutions': CloudSolutionsIcon,
  'data-analytics': DataAnalyticsIcon,
  'ai-solutions': AIIcon,
  'ict-consultancy': ConsultancyIcon,
  'cybersecurity': CybersecurityIcon,
  'ict-infrastructure': InfrastructureIcon,
};

function ServicesGrid() {
  const handleServiceClick = async (service) => {
    try {
      await fetch(`${API_URL}/api/analytics/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: service.id,
          serviceTitle: service.title
        })
      });
    } catch (err) {
      console.error('Failed to track service view:', err);
    }
  };

  return (
    <section className="py-16 px-8">
      <h2 className="font-semibold text-xl mb-4">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Link key={service.id} to={`/services/${service.id}`}>
            <ServiceCard
              title={service.title}
              description={service.description}
              icon={iconMap[service.id]}
              onClick={() => handleServiceClick(service)}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ServicesGrid;