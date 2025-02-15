import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface LocationSectionProps {
  language: "en" | "de";
  onUpdateLanguage: (value: "en" | "de") => void;
  onSave: () => void;
}
export const LocationSection = ({
  language,
  onUpdateLanguage,
  onSave
}: LocationSectionProps) => {
  return <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Location & Language</h2>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">LOCATION</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Germany</span>
            <span className="text-sm text-gray-500">(Only available location)</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">LANGUAGE</h3>
          <div className="flex items-center justify-between">
            <Select value={language} onValueChange={onUpdateLanguage}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={onSave} className="mt-4 text-slate-50 bg-slate-900 hover:bg-slate-800">
          Save Changes
        </Button>
      </div>
    </div>;
};