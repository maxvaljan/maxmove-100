import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

const businessFaqs = [
  {
    question: "Does Maxmove do delivery for businesses?",
    answer: "Yes! Every day we help thousands of businesses across Hong Kong to make delivery fast and easy. Whether your business just has a few deliveries per week or larger daily orders, we can scale your service accordingly.\n\nGet in touch with our friendly and professional sales team to find out more."
  },
  {
    question: "What can Maxmove deliver?",
    answer: "Maxmove can deliver almost anything to where you need it to go in Rhein-Ruhr Region. From small and fragile goods to large and bulky items, we offer a range of vehicles and drivers to provide fast and effective delivery solutions for businesses."
  },
  {
    question: "How much does Maxmove charge?",
    answer: "The fare of service is based on multiple factors such as traffic situation, order volume, availability of delivery partners, applicable tolls, surcharges and so on. Hence the total fare of the service may vary. The fare displayed at the time of request may not be the same if there is a change to order details.\n\nOpen up the Maxmove app and simply select the type of vehicle (courier bike, car, van, lorry etc), pick up and drop off locations. You'll instantly be given the price details before you choose whether to place the order."
  },
  {
    question: "Can Maxmove handle large volumes of orders?",
    answer: "Yes, we offer specific solutions for businesses that require lots of orders to be placed. Our API technical solution seamlessly integrates our delivery software into your systems to automate the scheduling of orders.\n\nGet in touch with our friendly and professional sales team to find out more."
  },
  {
    question: "Which features are available for API integrations?",
    answer: "Our capabilities include:\n\n• Quote delivery fees\n• Place order\n• Cancel order\n• Driver details & location\n• Get order status (ASSIGNING_DRIVER, ON_GOING, etc)\n• Add Tips (known as \"Priority Fee\" in app)\n• Receive auto update of delivery status easily and promptly through Webhook"
  },
  {
    question: "Can your API handle multi-stop orders?",
    answer: "Yes, customers can place multi-stop orders via API. Please note that the sequence in which you list the stops will be the routing the driver will take. Route optimization is yet to be available."
  },
  {
    question: "Will I be notified when there is an order status change via API?",
    answer: "Yes, our API is able to proactively provide status updates with Webhooks."
  },
  {
    question: "Is there someone I can reach out to for technical support?",
    answer: "We understand that your team may have questions while studying the documentation and also during integration. Feel free to contact us anytime at support@maxmove.com for technical support and our API specialists will respond as soon as possible."
  }
];

const Business = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const formSchema = z.object({
    companyName: z.string().min(2, {
      message: "Company name must be at least 2 characters.",
    }),
    contactName: z.string().min(2, {
      message: "Contact name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    phone: z.string().min(10, {
      message: "Please enter a valid phone number.",
    }),
    industry: z.string().min(1, {
      message: "Please select your industry.",
    }),
    message: z.string().min(10, {
      message: "Message must be at least 10 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      industry: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await supabase
        .from("business_inquiries")
        .insert([values]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your inquiry has been submitted. We'll get back to you soon.",
      });

      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-maxmove-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-maxmove-900 mb-6">
                Grow your business with Maxmove
              </h1>
              <p className="text-xl text-maxmove-600 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses that trust Maxmove for their delivery needs
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => navigate("/signup?type=business")}
                  className="bg-maxmove-600 text-white hover:bg-maxmove-700"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <BusinessServices />

        {/* Integration Section */}
        <section className="py-20 bg-maxmove-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-maxmove-900 mb-4">
                Seamless Integration
              </h2>
              <p className="text-xl text-maxmove-600">
                Connect your business systems directly with our API
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {businessFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-maxmove-600 whitespace-pre-line">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-maxmove-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Fill out the form below and our team will get back to you shortly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Company Name" {...field} />
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
                            <Input placeholder="Contact Name" {...field} />
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
                              <Input placeholder="Email" type="email" {...field} />
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
                              <Input placeholder="Phone Number" {...field} />
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
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="ecommerce">E-commerce</SelectItem>
                              <SelectItem value="food">Food & Beverage</SelectItem>
                              <SelectItem value="logistics">Logistics</SelectItem>
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
                              placeholder="Tell us about your business needs"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Submit
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Business;