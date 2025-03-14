import { Property } from '../types';
import { Phone } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={property.imageUrl}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-secondary mb-2">{property.title}</h3>
        <p className="text-2xl font-bold text-primary mb-2">
          ${property.price.toLocaleString()}
        </p>
        <p className="text-gray-600 mb-2">{property.location}</p>
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>{property.bedrooms} beds</span>
          <span>{property.bathrooms} baths</span>
          <span>{property.sqft.toLocaleString()} sqft</span>
        </div>
        <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
          <Phone className="h-4 w-4" />
          Contact Agent
        </button>
      </div>
    </div>
  );
}