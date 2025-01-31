interface AccountTypeSectionProps {
  userRole: string;
}

export const AccountTypeSection = ({ userRole }: AccountTypeSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Account Type</h2>
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-700 font-medium">Current Account Type</p>
        <p className="text-lg text-orange-500 mt-2 capitalize">{userRole} Account</p>
      </div>
      <p className="text-sm text-gray-500">
        To change your account type, please contact our support team.
      </p>
    </div>
  );
};