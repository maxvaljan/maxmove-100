import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

interface FAQLink {
  url: string;
  text: string;
}

interface FAQItem {
  question: string;
  answer: string;
  link?: FAQLink;
}

const FAQ = () => {
  const faqs: FAQItem[] = [
    {
      question: "Does Maxmove do delivery for businesses?",
      answer: "Yes! Every day we help thousands of businesses across Rhein-Ruhr Region to make delivery fast and easy. Whether your business just has a few deliveries per week or larger daily orders, we can scale your service accordingly. Get in touch with our friendly and professional sales team to find out more."
    },
    {
      question: "What can Maxmove deliver?",
      answer: "Maxmove can deliver almost anything to where you need it to go in Rhein-Ruhr Region. From small and fragile goods to large and bulky items, we offer a range of vehicles and drivers to provide fast and effective delivery solutions for businesses."
    },
    {
      question: "How much does Maxmove charge?",
      answer: "The fare of service is based on multiple factors such as traffic situation, order volume, availability of delivery partners, applicable tolls, surcharges and so on. Hence the total fare of the service may vary. The fare displayed at the time of request may not be the same if there is a change to order details. Open up the Maxmove app and simply select the type of vehicle (courier bike, car, van, lorry etc), pick up and drop off locations. You'll instantly be given the price details before you choose whether to place the order."
    },
    {
      question: "Can Maxmove handle large volumes of orders?",
      answer: "Yes, we offer specific solutions for businesses that require lots of orders to be placed. Our API technical solution seamlessly integrates our delivery software into your systems to automate the scheduling of orders. Get in touch with our friendly and professional sales team to find out more."
    },
    {
      question: "Which features are available for API integrations?",
      answer: "Our capabilities include: Quote delivery fees, Place order, Cancel order, Driver details & location, Get order status (ASSIGNING_DRIVER, ON_GOING, etc), Add Tips (known as 'Priority Fee' in app), Receive auto update of delivery status easily and promptly through Webhook"
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

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-maxmove-900">Frequently Asked Questions</h2>
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
                {faq.link && (
                  <Link 
                    to={faq.link.url}
                    className="inline-block mt-2 text-maxmove-800 hover:text-maxmove-900 font-medium"
                  >
                    {faq.link.text} →
                  </Link>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;