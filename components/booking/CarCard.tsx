'use client';

import { motion } from 'framer-motion';
import { Car as CarType } from '@/types/booking';
import { Check, Battery, Gauge } from 'lucide-react';

interface CarCardProps {
  car: CarType;
  selected: boolean;
  onClick: () => void;
}

export default function CarCard({ car, selected, onClick }: CarCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative overflow-hidden rounded-lg bg-card border border-border ${
        selected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onClick}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover"
        />
        {selected && (
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center">
            <Check className="w-12 h-12 text-white" />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-1">{car.name}</h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Battery className="w-4 h-4" />
              <span>{car.type}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">${car.price}</p>
            <p className="text-muted-foreground">per day</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-1">
            <Gauge className="w-4 h-4" />
            <span>{car.features.range} mi range</span>
          </div>
          <div className="flex items-center gap-1">
            <Battery className="w-4 h-4" />
            <span>{car.features.charging}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
