import PropertyCard from '../components/PropertyCard';
import { Property } from '../types';

export default function Properties() {
  // Sample properties data (in a real app, this would come from an API)
  const properties: Property[] = [
    {
      id: '1',
      title: 'Modern Luxury Villa',
      price: 1250000,
      location: 'Beverly Hills, CA',
      bedrooms: 5,
      bathrooms: 4,
      sqft: 4500,
      imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80',
      description: 'Stunning modern villa with panoramic views',
    },
    {
      id: '2',
      title: 'Oceanfront Estate',
      price: 2800000,
      location: 'Malibu, CA',
      bedrooms: 6,
      bathrooms: 5,
      sqft: 6200,
      imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80',
      description: 'Luxurious oceanfront property with private beach access',
    },
    {
      id: '3',
      title: 'Contemporary Mansion',
      price: 3500000,
      location: 'Hollywood Hills, CA',
      bedrooms: 7,
      bathrooms: 6,
      sqft: 7800,
      imageUrl: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&q=80',
      description: 'Spectacular mansion with city views',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-secondary mb-8">Featured Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}