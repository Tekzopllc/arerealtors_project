import { Property } from '../types';
import { Phone } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-md">
      <img
        src={property.imageUrl}
        alt={property.title}
        className="object-cover w-full h-48"
        loading="lazy"
        width={400}
        height={192}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="p-4">
        <h3 className="mb-2 text-xl font-semibold text-secondary">{property.title}</h3>
        <p className="mb-2 text-2xl font-bold text-primary">
          ${property.price.toLocaleString()}
        </p>
        <p className="mb-2 text-gray-600">{property.location}</p>
        <div className="flex justify-between mb-4 text-sm text-gray-500">
          <span>{property.bedrooms} beds</span>
          <span>{property.bathrooms} baths</span>
          <span>{property.sqft.toLocaleString()} sqft</span>
        </div>
        <button className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white transition-colors rounded-md bg-primary hover:bg-primary-dark">
          <Phone className="w-4 h-4" />
          Contact Agent
        </button>
      </div>
    </div>
  );
}