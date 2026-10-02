import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { VEHICLE_SIZES, type VehicleSizeId } from "@/data/pricing";

const isSize = (v: string | null): v is VehicleSizeId => VEHICLE_SIZES.some((s) => s.id === v);

/**
 * Vehicle size state seeded from `?size=` (set by the home page package finder),
 * so a visitor who picked "SUV" lands on SUV prices. Falls back to sedan.
 */
export const useSizeParam = (): [VehicleSizeId, (s: VehicleSizeId) => void] => {
  const [searchParams] = useSearchParams();
  const param = searchParams.get("size");
  const [size, setSize] = useState<VehicleSizeId>(isSize(param) ? param : "sedan");

  useEffect(() => {
    if (isSize(param)) setSize(param);
  }, [param]);

  return [size, setSize];
};
