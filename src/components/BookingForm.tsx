<lov-code>
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Clock, Plus, Trash2 } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, isBefore, startOfToday, isToday } from "date-fns";
import { de } from 'date-fns/locale';
import { cn } from "@/lib/utils";

interface Stop {
  address: string;
  type: 'pickup' | 'dropoff' | 'stop';
  coordinates?: [number, number];
}

interface Suggestion {
  place_name: string;
  center: [number, number];
}

interface BookingFormProps {
  stops: Stop[];
  setStops: (stops: Stop[]) => void;
  suggestions: Suggestion[];
  activeInput: number | null;
  suggestionsRef: React.RefObject<HTMLDivElement>;
  onAddressChange: (value: string, index: number) => void;
  onSuggestionSelect: (suggestion: Suggestion, index: number) => void;
  onAddStop: () => void;
  onRemoveStop: (index: number) => void;
}

const BookingForm = ({
  stops,
  setStops,
  suggestions,
  activeInput,
  suggestionsRef,
  onAddressChange,
  onSuggestionSelect,
  onAddStop,
  onRemoveStop
}: BookingFormProps) => {
  const [date, setDate] = useState<Date>(startOfToday());
  
  const now = new Date();
  const minutes = now.getMinutes();
  const roundedMinutes = Math.ceil(minutes / 30) * 30;
  now.setMinutes(roundedMinutes === 60 ? 0 : roundedMinutes);
  now.setHours(roundedMinutes === 60 ? now.getHours() + 1 : now.getHours());
  now.setSeconds(0);
  now.setMilliseconds(0);
  
  const defaultTime = format(now, 'HH:mm');
  const [selectedTime, setSelectedTime] = useState<string>(defaultTime);

  const generateTimeSlots = () => {
    const slots = [];
    const currentDate = new Date();
    const currentMinute = currentDate.getMinutes();
    const roundedMinute = Math.ceil(currentMinute / 30) * 30;
    const adjustedHour = roundedMinute === 60 ? currentDate.getHours() + 1 : currentDate.getHours();
    const adjustedMinute = roundedMinute === 60 ? 0 : roundedMinute;

    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (isToday(date)) {
          if (hour < adjustedHour || (hour === adjustedHour && minute < adjustedMinute)) {
            continue;
          }
        }
        
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    if (!newDate || isBefore(newDate, startOfToday())) {
      return;
    }
    setDate(newDate);
    
    if (isToday(newDate)) {
      const currentDate = new Date();
      const currentMinute = currentDate.getMinutes();
      const roundedMinute = Math.ceil(currentMinute / 30) * 30;
      const adjustedHour = roundedMinute === 60 ? currentDate.getHours() + 1 : currentDate.getHours();
      const adjustedMinute = roundedMinute === 60 ? 0 : roundedMinute;
      const currentTime = `${adjustedHour.toString().padStart(2, '0')}:${adjustedMinute.toString().padStart(2, '0')}`;
      
      if (selectedTime < currentTime) {
        setSelectedTime(currentTime);
      }
    }
  };

  const getDateDisplayText = () => {
    if (!date) return "Select date";
    return isToday(date) ? "Today" : format(date, "dd.MM.yyyy", { locale: de });
  };

  const getTimeDisplayText = () => {
    if (!selectedTime) return "Select time";
    
    const closestTime = getClosestAvailableTime();
    return selectedTime === closestTime && isToday(date) ? "Now" : selectedTime;
  };

  const getClosestAvailableTime = () => {
    const currentDate = new Date();
    const currentMinute = currentDate.getMinutes();
    const roundedMinute = Math.ceil(currentMinute / 30) * 30;
    const adjustedHour = roundedMinute === 60 ? currentDate.getHours() + 1 : currentDate.getHours();
    const adjustedMinute = roundedMinute === 60 ? 0 : roundedMinute;
    return `${adjustedHour.toString().padStart(2, '0')}:${adjustedMinute.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-xl shadow-sm">
      <div className="space-y-4">
        {stops.map((stop, index) => (
          <div key={index} className="relative">
            <div className="flex gap-2">
              <Input
                placeholder={stop.type === 'pickup' ? "Pickup location" : stop.type === 'dropoff' ? "Dropoff location" : "Stop location"}
                value={stop.address}
                onChange={(e) => onAddressChange(e.target.value, index)}
                className="pl-10"
              />
              <MapPin className="absolute left-3 top-1/2