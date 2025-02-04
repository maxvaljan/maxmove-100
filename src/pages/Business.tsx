import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BusinessServices from "@/components/BusinessServices";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Building2, Clock, CreditCard, FileText, Globe2, HeartHandshake, LayoutDashboard, Truck } from "lucide-react";

const businessInquirySchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  contactName: z.string().min(2, "Contact name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  industry: z.string().min(2, "Please select an industry"),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
  deliveryVehicle: z.string().min(2, "Please select a delivery vehicle"),
  deliveriesPerMonth: z.string().min(2, "Please select delivery frequency"),
  bulkDelivery: z.string().min(2, "Please select bulk delivery option"),
  preferredContact: z.string().min(2, "Please select preferred contact method"),
});

const Business = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(businessInquirySchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      industry: "",
      jobTitle: "",
      deliveryVehicle: "",
      deliveriesPerMonth: "",
      bulkDelivery: "",
      preferredContact: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof businessInquirySchema>) => {
    try {
      const { error: dbError } = await supabase.from('business_inquiries').insert({
        company_name: data.companyName,
        contact_name: data.contactName,
        email: data.email,
        phone: data.phone,
        industry: data.industry,
        additional_info: {
          jobTitle: data.jobTitle,
          deliveryVehicle: data.deliveryVehicle,
          deliveriesPerMonth: data.deliveriesPerMonth,
          bulkDelivery: data.bulkDelivery,
          preferredContact: data.preferredContact,
        },
      });

      if (dbError) throw dbError;

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
      
      {/* Hero Section with Integrated Form */}
      <section className="relative py-20 bg-maxmove-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a,#334155)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Last-mile delivery for your business
              </h1>
              <p className="text-xl text-maxmove-200 mb-8">
                Fast and reliable on-demand, same-day and advance-order deliveries for businesses of any size.
              </p>
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => navigate("/signup?type=business")}
              >
                Deliver Now
              </Button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-xl">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="First Name" className="bg-white/80" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Job Title" className="bg-white/80" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Company Name" className="bg-white/80" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="email" placeholder="Business Email" className="bg-white/80" {...field} />
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
                            <Input placeholder="Contact Number" className="bg-white/80" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="preferredContact"
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/80">
                              <SelectValue placeholder="Preferred contact method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="phone">Phone</SelectItem>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/80">
                              <SelectValue placeholder="Which best describes the industry you are in?" />
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
                    name="deliveryVehicle"
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/80">
                              <SelectValue placeholder="What type of delivery vehicle do you require most often?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="bike">Bike</SelectItem>
                            <SelectItem value="car">Car</SelectItem>
                            <SelectItem value="van">Van</SelectItem>
                            <SelectItem value="truck">Truck</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deliveriesPerMonth"
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/80">
                              <SelectValue placeholder="How many deliveries do you make on average per month?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1-10">1-10</SelectItem>
                            <SelectItem value="11-50">11-50</SelectItem>
                            <SelectItem value="51-200">51-200</SelectItem>
                            <SelectItem value="201+">201+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bulkDelivery"
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/80">
                              <SelectValue placeholder="Do you require bulk order delivery (e.g. 20+ orders per day)?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                            <SelectItem value="maybe">Maybe in the future</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                    Get Started
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Maxmove Business</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-maxmove-500 transition-all">
              <CardHeader>
                <Building2 className="h-12 w-12 text-maxmove-500 mb-4" />
                <CardTitle>Enterprise Dashboard</CardTitle>
                <CardDescription>Manage all your deliveries from a centralized dashboard with real-time tracking and analytics.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-maxmove-500 transition-all">
              <CardHeader>
                <Truck className="h-12 w-12 text-maxmove-500 mb-4" />
                <CardTitle>Fleet Management</CardTitle>
                <CardDescription>Access our vast network of verified drivers and vehicles to meet your delivery demands.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-maxmove-500 transition-all">
              <CardHeader>
                <Clock className="h-12 w-12 text-maxmove-500 mb-4" />
                <CardTitle>24/7 Support</CardTitle>
                <CardDescription>Dedicated account managers and round-the-clock support for your business needs.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Services Section */}
      <BusinessServices />

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
                <li className="flex items-start">
                  <Globe2 className="h-6 w-6 text-maxmove-500" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">RESTful API</h3>
                    <p className="text-gray-600">Easy-to-use API endpoints for seamless integration with your existing systems.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <LayoutDashboard className="h-6 w-6 text-maxmove-500" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Webhooks</h3>
                    <p className="text-gray-600">Real-time delivery updates and notifications through webhook events.</p>
                  </div>
                </li>
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

      {/* Business FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-0">
                <AccordionTrigger className="text-left text-lg font-medium text-maxmove-800">
                  Does Maxmove do delivery for businesses?
                </AccordionTrigger>
                <AccordionContent className="text-maxmove-600 whitespace-pre-line">
                  Yes! Every day we help businesses across Rhein-Ruhr to make delivery fast and easy. Whether your business just has a few deliveries per week or larger daily orders, we can scale your service accordingly. Get in touch with our friendly and professional sales team to find out more.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-lg font-medium text-maxmove-800">
                  What can Maxmove deliver?
                </AccordionTrigger>
                <AccordionContent className="text-maxmove-600 whitespace-pre-line">
                  Maxmove can deliver almost anything to where you need it to go in Rhein-Ruhr Region. From small and fragile goods to large and bulky items, we offer a range of vehicles and drivers to provide fast and effective delivery solutions for businesses.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg font-medium text-maxmove-800">
                  How much does Maxmove charge?
                </AccordionTrigger>
                <AccordionContent className="text-maxmove-600 whitespace-pre-line">
                  The fare of service is based on multiple factors such as traffic situation, order volume, availability of delivery partners, applicable tolls, surcharges and so on. Hence the total fare of the service may vary. The fare displayed at the time of request may not be the same if there is a change to order details.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg font-medium text-maxmove-800">
                  Can Maxmove handle large volumes of orders?
                </AccordionTrigger>
                <AccordionContent className="text-maxmove-600 whitespace-pre-line">
                  Yes, we offer specific solutions for businesses that require lots of orders to be placed. Our API technical solution seamlessly integrates our delivery software into your systems to automate the scheduling of orders. Get in touch with our friendly and professional sales team to find out more.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg font-medium text-maxmove-800">
                  Which features are available for API integrations?
                </AccordionTrigger>
                <AccordionContent className="text-maxmove-600 whitespace-pre-line">
                  Our capabilities include:
                  • Quote delivery fees
                  • Place order
                  • Cancel order
                  • Driver details & location
                  • Get order status (ASSIGNING_DRIVER, ON_GOING, etc)
                  • Add Tips (known as 'Priority Fee' in app)
                  • Receive auto update of delivery status easily and promptly through Webhook
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-lg font-medium text-maxmove-800">
                  Can your API handle multi-stop orders?
                </AccordionTrigger>
                <AccordionContent className="text-maxmove-600 whitespace-pre-line">
                  Yes, customers can place multi-stop orders via API. Please note that the sequence in which you list the stops will be the routing the driver will take. Route optimization is yet to be available.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left text-lg font-medium text-maxmove-800">
                  Will I be notified when there is an order status change via API?
                </AccordionTrigger>
                <AccordionContent className="text-maxmove-600 whitespace-pre-line">
                  Yes, our API is able to proactively provide status updates with Webhooks.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left text-lg font-medium text-maxmove-800">
                  Is there someone I can reach out to for technical support?
                </AccordionTrigger>
                <AccordionContent className="text-maxmove-600 whitespace-pre-line">
                  We understand that your team may have questions while studying the documentation and also during integration. Feel free to contact us anytime at support@maxmove.com for technical support and our API specialists will respond as soon as possible.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Business;
