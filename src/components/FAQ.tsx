import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How does MaxMove delivery service work?",
      answer: "MaxMove connects you with reliable drivers through our user-friendly app. Simply enter your pickup and delivery locations, choose your vehicle type based on your needs, and get instant pricing. Our drivers will handle your delivery with care and professionalism while you track the entire process in real-time."
    },
    {
      question: "What types of vehicles are available?",
      answer: "We offer a range of vehicles to suit different delivery needs, from motorcycles for small packages to vans and trucks for larger items. Each vehicle type comes with specific dimensions and weight capacity information to help you choose the right option for your delivery."
    },
    {
      question: "How is the delivery price calculated?",
      answer: "Our pricing is transparent and based on several factors including distance, vehicle type, time of day, and delivery urgency. You'll see the exact price before confirming your booking, with no hidden fees or surprises."
    },
    {
      question: "Is my delivery insured?",
      answer: "Yes, all deliveries through MaxMove are covered by our comprehensive insurance policy. This provides protection for your items during transit, giving you peace of mind with every delivery."
    },
    {
      question: "How can I track my delivery?",
      answer: "Once your delivery is confirmed, you can track its progress in real-time through our app. You'll receive live updates on your driver's location and estimated arrival time, plus notifications at key stages of the delivery process."
    },
    {
      question: "What if I need to cancel my delivery?",
      answer: "You can cancel your delivery through the app before the driver picks up your item. Our cancellation policy varies depending on how close to the pickup time you cancel. Full details are available in our terms of service."
    },
    {
      question: "How do I become a MaxMove driver?",
      answer: "To become a MaxMove driver, you'll need to meet our requirements including having a valid driver's license, vehicle insurance, and passing our background check. You can start the application process through our driver app."
    },
    {
      question: "Is MaxMove available 24/7?",
      answer: "Yes, MaxMove operates 24/7, allowing you to schedule deliveries at any time. However, availability of specific vehicle types may vary depending on your location and time of day."
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-maxmove-900">Frequently Asked Questions</h2>
        <p className="mt-4 text-lg text-maxmove-600">
          Find answers to common questions about our delivery service
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-medium text-maxmove-800">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-maxmove-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;