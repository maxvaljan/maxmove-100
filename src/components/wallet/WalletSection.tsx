
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowRightLeft, PiggyBank, Wallet } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface WalletData {
  balance: number;
  currency: string;
}

interface PaymentMethod {
  id: string;
  type: string;
  details: any;
  is_default: boolean;
}

const WalletSection = () => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchWalletData();
    fetchPaymentMethods();
    fetchRecentTransactions();
  }, []);

  const fetchWalletData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data: wallet, error } = await supabase
      .from('wallet')
      .select('*')
      .eq('user_id', session.user.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching wallet:', error);
      return;
    }

    setWalletData(wallet);
  };

  const fetchPaymentMethods = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase
      .from('payment_methods')
      .select('*')
      .eq('user_id', session.user.id);

    if (error) {
      console.error('Error fetching payment methods:', error);
      return;
    }

    setPaymentMethods(data || []);
  };

  const fetchRecentTransactions = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase
      .from('wallet_transactions')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching transactions:', error);
      return;
    }

    setRecentTransactions(data || []);
  };

  const handleAddPaymentMethod = () => {
    toast({
      title: "Coming Soon",
      description: "This feature will be available soon!",
    });
  };

  const handleAddMoney = () => {
    toast({
      title: "Coming Soon",
      description: "This feature will be available soon!",
    });
  };

  return (
    <div className="p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {walletData?.currency || '$'} {walletData?.balance?.toFixed(2) || '0.00'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total available balance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {recentTransactions.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Methods</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {paymentMethods.length}
            </div>
            <Button 
              variant="link" 
              className="text-xs px-0 h-auto"
              onClick={handleAddPaymentMethod}
            >
              Add new method
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full text-sm"
              onClick={handleAddMoney}
            >
              Add Money
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {recentTransactions.length > 0 ? (
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div>
                      <p className="font-medium">{transaction.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </p>
                      {transaction.order_id && (
                        <p className="text-sm text-muted-foreground">
                          Order: {transaction.order_id}
                        </p>
                      )}
                    </div>
                    <div className={`font-bold ${
                      ['deposit', 'refund'].includes(transaction.type)
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {['deposit', 'refund'].includes(transaction.type) ? '+' : '-'}
                      ${Number(transaction.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-sm text-muted-foreground py-8">
                No transactions found
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletSection;
