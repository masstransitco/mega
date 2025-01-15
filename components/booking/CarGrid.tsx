'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { selectCar } from '@/store/userSlice';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import CarCard from './CarCard';
import { Car as CarType } from '@/types/booking';

// Sample cars data
const SAMPLE_CARS: CarType[] = [
  {
    id: 1,
    name: 'MG 4 Electric',
    type: 'Electric',
    price: 600,
    image: '/cars/car1.png',
    available: true,
    features: {
      range: 300,
      charging: 'Fast charging',
      acceleration: '0-60 in 3.1s'
    }
  },
  {
    id: 2,
    name: 'BMW i4',
    type: 'Electric',
    price: 800,
    image: '/cars/car2.png',
    available: true,
    features: {
      range: 280,
      charging: 'Fast charging',
      acceleration: '0-60 in 3.7s'
    }
  }
];

export default function CarGrid() {
  const dispatch = useAppDispatch();
  const selectedCarId = useAppSelector((state) => state.user.selectedCarId);
  const [filterType, setFilterType] = React.useState('all');
  const [showFilters, setShowFilters] = React.useState(false);

  const filteredCars = React.useMemo(() => {
    if (filterType === 'all') return SAMPLE_CARS;
    return SAMPLE_CARS.filter(car =>
      car.type.toLowerCase() === filterType.toLowerCase()
    );
  }, [filterType]);

  const handleSelectCar = (car: CarType) => {
    dispatch(selectCar(car.id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-2xl font-semibold text-foreground">Available Vehicles</h2>

        {/* Desktop filters */}
        <div className="hidden sm:block">
          <select
            className="bg-accent text-white px-4 py-2 rounded-lg transition-colors hover:bg-accent/80"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="electric">Electric</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        {/* Mobile filter button */}
        <button
          className="sm:hidden flex items-center gap-2 px-4 py-2 bg-accent rounded-lg text-white"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* Mobile filters */}
      {showFilters && (
        <div className="sm:hidden mb-4">
          <select
            className="w-full bg-background text-white px-4 py-2 rounded-lg"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setShowFilters(false);
            }}
          >
            <option value="all">All Types</option>
            <option value="electric">Electric</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      )}

      {/* Car grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCars.map((car) => (
          <motion.div
            key={car.id} // Important key for React
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CarCard
              car={car}
              selected={selectedCarId === car.id}
              onClick={() => handleSelectCar(car)}
            />
          </motion.div>
        ))}

        {filteredCars.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-8">
            No vehicles found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
