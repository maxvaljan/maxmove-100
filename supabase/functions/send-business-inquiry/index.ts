import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BusinessInquiryRequest {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  industry?: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: BusinessInquiryRequest = await req.json();
    console.log("Received business inquiry:", data);

    const emailResponse = await resend.emails.send({
      from: "MaxMove <onboarding@resend.dev>",
      to: ["sales@maxmove.com"],
      subject: `New Business Inquiry from ${data.companyName}`,
      html: `
        <h1>New Business Inquiry</h1>
        <h2>Company Details:</h2>
        <p><strong>Company Name:</strong> ${data.companyName}</p>
        <p><strong>Contact Name:</strong> ${data.contactName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Industry:</strong> ${data.industry || 'Not provided'}</p>
        <h2>Message:</h2>
        <p>${data.message || 'No message provided'}</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-business-inquiry function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);