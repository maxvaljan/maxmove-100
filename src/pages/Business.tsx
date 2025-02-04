import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import DeliveryWorkflow from "@/components/DeliveryWorkflow";

const Business = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('business_inquiries')
        .insert([
          {
            name,
            email,
            company,
            message,
          },
        ]);

      if (error) throw error;

      toast({
        title: "Message sent successfully",
        description: "We'll get back to you soon!",
      });

      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-maxmove-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 lg:pt-28">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-maxmove-900 mb-4">
            Business Solutions
          </h1>
          <p className="text-xl text-gray-600">
            Streamline your logistics with our comprehensive business solutions
          </p>
        </div>
      </div>

      <DeliveryWorkflow />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-maxmove-900 mb-6">
            Get in Touch
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Input
                placeholder="Company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>
            <div>
              <Textarea
                placeholder="Tell us about your business needs"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="min-h-[120px]"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-maxmove-800 hover:bg-maxmove-900 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Business;