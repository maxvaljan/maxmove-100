
interface DataCategory {
  title: string;
  items: string[];
}

interface PersonalDataGridProps {
  categories: DataCategory[];
}

export const PersonalDataGrid = ({ categories }: PersonalDataGridProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {categories.map((category) => (
        <div key={category.title} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-maxmove-900 mb-2">{category.title}</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {category.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
