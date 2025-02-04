import { ArrowRight, Building2, Clock, CreditCard, FileText, Globe2, HeartHandshake, LayoutDashboard, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const businessInquirySchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  contactName: z.string().min(2, "Contact name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  industry: z.string().min(2, "Please select an industry"),
  message: z.string().optional(),
});

const Business = () => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(businessInquirySchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      industry: "",
      message: "",
    },
  });

  const handleContactSales = () => {
    window.location.href = "mailto:sales@maxmove.com";
  };

  const onSubmit = async (data: z.infer<typeof businessInquirySchema>) => {
    try {
      const { error } = await supabase.from('business_inquiries').insert({
        company_name: data.companyName,
        contact_name: data.contactName,
        email: data.email,
        phone: data.phone,
        industry: data.industry,
        message: data.message,
      });

      if (error) throw error;

      toast({
        title: "Inquiry Submitted",
        description: "We'll get back to you soon!",
      });

      form.reset();
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-maxmove-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a,#334155)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Maxmove for Business
            </h1>
            <p className="text-xl md:text-2xl text-maxmove-200 mb-8 max-w-3xl mx-auto">
              Streamline your logistics operations with our enterprise-grade delivery solutions
            </p>
            <Button 
              size="lg" 
              className="bg-maxmove-500 hover:bg-maxmove-600"
              onClick={handleContactSales}
            >
              Contact Sales <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Maxmove Business</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessFeatures.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-maxmove-500 transition-all">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-maxmove-500 mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-maxmove-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Seamless Integration</h2>
              <p className="text-lg text-gray-600 mb-8">
                Connect Maxmove with your existing systems through our robust API. Automate your delivery operations and scale your business efficiently.
              </p>
              <ul className="space-y-4">
                {integrationFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-maxmove-500" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:ml-auto">
              <div className="bg-white p-8 rounded-xl shadow-2xl">
                <pre className="bg-maxmove-900 text-maxmove-50 p-6 rounded-lg overflow-x-auto">
                  <code>{`
// Example API Integration
const delivery = await maxmove.createDelivery({
  pickup: {
    address: "123 Business St",
    contact: "+1234567890"
  },
  dropoff: {
    address: "456 Customer Ave",
    contact: "+0987654321"
  },
  type: "express"
});`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-600">Fill out the form below and we'll reach out to discuss how Maxmove can help your business.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Contact name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="email" placeholder="Business email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Phone number (optional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="logistics">Logistics</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about your business needs (optional)" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-maxmove-500 hover:bg-maxmove-600">
                Submit Inquiry
              </Button>
            </form>
          </Form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-maxmove-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Delivery Operations?</h2>
          <p className="text-xl text-maxmove-200 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust Maxmove for their delivery needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="default">
              Schedule a Demo
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-maxmove-950">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const businessFeatures = [
  {
    icon: Building2,
    title: "Enterprise Dashboard",
    description: "Manage all your deliveries from a centralized dashboard with real-time tracking and analytics."
  },
  {
    icon: Truck,
    title: "Fleet Management",
    description: "Access our vast network of verified drivers and vehicles to meet your delivery demands."
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Dedicated account managers and round-the-clock support for your business needs."
  },
  {
    icon: CreditCard,
    title: "Flexible Billing",
    description: "Monthly invoicing, multiple payment options, and detailed expense reports."
  },
  {
    icon: FileText,
    title: "Custom Reports",
    description: "Generate detailed reports and analytics to optimize your delivery operations."
  },
  {
    icon: HeartHandshake,
    title: "Service Guarantee",
    description: "Reliable delivery service with insurance coverage and satisfaction guarantee."
  }
];

const integrationFeatures = [
  {
    icon: Globe2,
    title: "RESTful API",
    description: "Easy-to-use API endpoints for seamless integration with your existing systems."
  },
  {
    icon: LayoutDashboard,
    title: "Webhooks",
    description: "Real-time delivery updates and notifications through webhook events."
  }
];

export default Business;
