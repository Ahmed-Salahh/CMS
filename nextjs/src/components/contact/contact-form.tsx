"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FileText,
  User,
  Mail,
  Phone,
  Loader2,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const countries = [
  { code: "+966", name: "Saudi Arabia", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+1", name: "United States", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+44", name: "United Kingdom", flag: "/CMS/saudi-arabia-flag.svg" },
  {
    code: "+971",
    name: "United Arab Emirates",
    flag: "/CMS/saudi-arabia-flag.svg",
  },
  { code: "+20", name: "Egypt", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+962", name: "Jordan", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+961", name: "Lebanon", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+968", name: "Oman", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+974", name: "Qatar", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+965", name: "Kuwait", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+973", name: "Bahrain", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+964", name: "Iraq", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+963", name: "Syria", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+970", name: "Palestine", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+967", name: "Yemen", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+212", name: "Morocco", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+213", name: "Algeria", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+216", name: "Tunisia", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+218", name: "Libya", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+249", name: "Sudan", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+90", name: "Turkey", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+98", name: "Iran", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+92", name: "Pakistan", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+91", name: "India", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+880", name: "Bangladesh", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+86", name: "China", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+81", name: "Japan", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+82", name: "South Korea", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+60", name: "Malaysia", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+62", name: "Indonesia", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+63", name: "Philippines", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+65", name: "Singapore", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+66", name: "Thailand", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+84", name: "Vietnam", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+33", name: "France", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+49", name: "Germany", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+39", name: "Italy", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+34", name: "Spain", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+31", name: "Netherlands", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+7", name: "Russia", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+27", name: "South Africa", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+234", name: "Nigeria", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+254", name: "Kenya", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+55", name: "Brazil", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+52", name: "Mexico", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+54", name: "Argentina", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+61", name: "Australia", flag: "/CMS/saudi-arabia-flag.svg" },
  { code: "+64", name: "New Zealand", flag: "/CMS/saudi-arabia-flag.svg" },
];

const formSchema = z.object({
  type_of_interest: z.enum(["complaint", "cooperation", "inquiry"], {
    required_error: "Please select a type",
  }),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type_of_interest: "complaint",
      name: "",
      email: "",
      phone_number: "",
      message: "",
    },
  });

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success!",
          description: "Your message has been sent successfully.",
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description:
            result.error || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card
      className="p-8 bg-white"
      style={{
        width: "480px",
        border: "none",
        boxShadow: "none",
      }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full"
        >
          {/* Type of Interest */}
          <FormField
            control={form.control}
            name="type_of_interest"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className="font-medium text-[14px] leading-[20px] text-[#333333]"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#333333",
                  }}
                >
                  Type of Interest
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 rounded-[8px] border-[#E5E5E5]">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#666666]" />
                        <SelectValue placeholder="Select type" />
                      </div>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="complaint">Complaint</SelectItem>
                    <SelectItem value="cooperation">Cooperation</SelectItem>
                    <SelectItem value="inquiry">General Inquiry</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className="font-medium text-[14px] leading-[20px] text-[#333333]"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#333333",
                  }}
                >
                  Name
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
                    <Input
                      placeholder="Enter your name"
                      className="h-12 pl-10 rounded-[8px] border-[#E5E5E5]"
                      style={{ fontFamily: "Montserrat" }}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className="font-medium text-[14px] leading-[20px] text-[#333333]"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#333333",
                  }}
                >
                  Email
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="h-12 pl-10 rounded-[8px] border-[#E5E5E5]"
                      style={{ fontFamily: "Montserrat" }}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone (Optional) */}
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className="font-medium text-[14px] leading-[20px] text-[#333333]"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#333333",
                  }}
                >
                  Phone Number{" "}
                  <span className="text-[#999999]">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <div className="flex items-center h-12 rounded-[8px] border border-[#E5E5E5] overflow-hidden bg-white">
                    {/* Country Selector Section */}
                    <Select
                      value={selectedCountry.code}
                      onValueChange={(value) => {
                        const country = countries.find((c) => c.code === value);
                        if (country) setSelectedCountry(country);
                      }}
                    >
                      <SelectTrigger className="flex items-center gap-2 pl-3 pr-2 h-full border-0 focus:ring-0 focus:ring-offset-0 w-[120px] rounded-none bg-white">
                        <div className="flex items-center gap-2">
                          {/* Country Flag */}
                          <Image
                            src={selectedCountry.flag}
                            alt={selectedCountry.name}
                            width={20}
                            height={20}
                            className="flex-shrink-0"
                            style={{ objectFit: "contain" }}
                          />
                          {/* Country Code */}
                          <span
                            className="font-normal text-[14px]"
                            style={{
                              fontFamily: "Montserrat",
                              color: "#0A0D14",
                              letterSpacing: "-0.084px",
                            }}
                          >
                            {selectedCountry.code}
                          </span>
                        </div>
                        {/* <ChevronDown className="w-4 h-4 text-[#525866] ml-auto" /> */}
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {countries.map((country) => (
                          <SelectItem
                            key={country.code}
                            value={country.code}
                            className="cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <Image
                                src={country.flag}
                                alt={country.name}
                                width={16}
                                height={16}
                                style={{ objectFit: "contain" }}
                              />
                              <span className="text-sm">{country.name}</span>
                              <span className="text-sm text-[#868C98] ml-auto">
                                {country.code}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {/* Separator */}
                    <div className="h-full w-px bg-[#E2E4E9]" />
                    {/* Phone Input */}
                    <Input
                      type="tel"
                      placeholder="(555) 000-0000"
                      className="flex-1 h-full border-0 rounded-none pl-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                      style={{
                        fontFamily: "Montserrat",
                        fontSize: "14px",
                        color: "#868C98",
                      }}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className="font-medium text-[14px] leading-[20px] text-[#333333]"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#333333",
                  }}
                >
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your message"
                    className="rounded-[8px] border-[#E5E5E5] resize-none"
                    style={{
                      fontFamily: "Montserrat",
                      height: "164px",
                    }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-[8px] text-white font-semibold text-[16px]"
            style={{
              backgroundColor: "#00ADB5",
              fontFamily: "Montserrat",
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              "Send message"
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
