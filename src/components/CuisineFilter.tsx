import { cuisineList } from "@/config/restaurant-options-configs";
import { Label } from "./ui/label";
import { Check, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
type Props = {
  onChage: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandClick: () => void;
};

const CuisineFilter = ({
  onChage,
  selectedCuisines,
  isExpanded,
  onExpandClick,
}: Props) => {
  const handleCuisinesReset = () => onChage([]);
  const handleCuisnesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;
    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

    onChage(newCuisinesList);
  };
  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Cuisine</div>
        <div
          onClick={handleCuisinesReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </div>
      </div>
      <div className="space-y-2 flex flex-col">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisin) => {
            const isSelected = selectedCuisines.includes(cuisin);
            return (
              <div className="flex">
                <input
                  type="checkbox"
                  id={`cuisine_${cuisin}`}
                  className="hidden"
                  value={cuisin}
                  checked={isSelected}
                  onChange={handleCuisnesChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisin}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisin}
                </Label>
              </div>
            );
          })}

        <Button onClick={onExpandClick} variant="link" className="mt-4 flex-1">
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View Less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View More <ChevronUp />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default CuisineFilter;
