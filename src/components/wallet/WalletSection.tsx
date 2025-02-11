
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, WalletCards, ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface WalletData {
  balance: number;
  currency: string;
}

interface TransactionSummary {
  moneyIn: number;
  moneyOut: number;
  pending: number;
}

const WalletSection = () => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [transactionSummary, setTransactionSummary] = useState<TransactionSummary>({
    moneyIn: 0,
    moneyOut: 0,
    pending: 0
  });
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchWalletData();
    fetchTransactionSummary();
    fetchRecentTransactions();
  }, []);

  const fetchWalletData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data: wallet, error } = await supabase
      .from('wallet')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (error) {
      console.error('Error fetching wallet:', error);
      return;
    }

    setWalletData(wallet);
  };

  const fetchTransactionSummary = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Fetch money in (deposits and refunds)
    const { data: moneyIn } = await supabase
      .from('wallet_transactions')
      .select('amount')
      .eq('user_id', session.user.id)
      .in('type', ['deposit', 'refund'])
      .eq('status', 'completed')
      .gte('created_at', thirtyDaysAgo.toISOString());

    // Fetch money out (withdrawals and payments)
    const { data: moneyOut } = await supabase
      .from('wallet_transactions')
      .select('amount')
      .eq('user_id', session.user.id)
      .in('type', ['withdrawal', 'payment'])
      .eq('status', 'completed')
      .gte('created_at', thirtyDaysAgo.toISOString());

    // Fetch pending transactions
    const { data: pending } = await supabase
      .from('wallet_transactions')
      .select('amount')
      .eq('user_id', session.user.id)
      .eq('status', 'pending');

    setTransactionSummary({
      moneyIn: moneyIn?.reduce((sum, tx) => sum + Number(tx.amount), 0) || 0,
      moneyOut: moneyOut?.reduce((sum, tx) => sum + Number(tx.amount), 0) || 0,
      pending: pending?.reduce((sum, tx) => sum + Number(tx.amount), 0) || 0
    });
  };

  const fetchRecentTransactions = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data: transactions, error } = await supabase
      .from('wallet_transactions')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching transactions:', error);
      return;
    }

    setRecentTransactions(transactions || []);
  };

  const handleAddMoney = () => {
    toast({
      title: "Coming Soon",
      description: "This feature will be available soon!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Wallet</h2>
        <Button onClick={handleAddMoney} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Money
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            <WalletCards className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {walletData?.currency} {walletData?.balance?.toFixed(2) || '0.00'}
            </div>
            <p className="text-xs text-muted-foreground">
              Available for transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Money In</CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +${transactionSummary.moneyIn.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Money Out</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              -${transactionSummary.moneyOut.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${transactionSummary.pending.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Transactions in process
            </p>
          </CardContent>
        </Card>
      </div>

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
  );
};

export default WalletSection;
