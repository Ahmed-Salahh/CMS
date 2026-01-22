"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContactFormData } from "@/types/contact";
import { 
  FileText, 
  User, 
  Mail, 
  ChevronDown
} from "lucide-react";

interface ContactFormProps {
  userEmail: string;
}

export function ContactForm({ userEmail }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: userEmail,
    countryCode: "+996",
    phone: "",
    subject: "Complain",
    message: "",
    userEmail
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Submit form logic would go here
      console.log("Form submitted:", { ...formData, userEmail });
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: userEmail,
        countryCode: "+996",
        phone: "",
        subject: "Complain",
        message: "",
        userEmail
      });
    } catch (error) {
      console.error("Failed to submit form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-white shadow-md w-full max-w-[480px] lg:max-w-none">
      <CardContent className="p-4 lg:p-6">
        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
          {/* Type of Interest */}
          <div className="space-y-1">
            <Label htmlFor="subject" className="text-sm font-medium text-foreground">
              Type of interest
            </Label>
            <Select value={formData.subject} onValueChange={(value) => 
              setFormData(prev => ({ ...prev, subject: value }))
            }>
              <SelectTrigger className="w-full bg-white border border-border shadow-sm">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <SelectValue placeholder="Select type..." />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Complain">Complain</SelectItem>
                <SelectItem value="Inquiry">Inquiry</SelectItem>
                <SelectItem value="Feedback">Feedback</SelectItem>
                <SelectItem value="Support">Support</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Name */}
          <div className="space-y-1">
            <Label htmlFor="name" className="text-sm font-medium text-foreground">
              Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Write your name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="pl-10 bg-white border border-border shadow-sm"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="hello@kkesh.sa.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="pl-10 bg-white border border-border shadow-sm"
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <Label htmlFor="phone" className="text-sm font-medium text-foreground">
              Phone Number <span className="text-muted-foreground font-normal">(Optional)</span>
            </Label>
            <div className="flex bg-white border border-border rounded-lg shadow-sm overflow-hidden">
              {/* Country Code Selector */}
              <div className="flex items-center gap-2 px-3 py-2 border-r border-border bg-white">
                <div className="w-5 h-5 rounded bg-green-500 flex items-center justify-center">
                  <span className="text-xs text-white">🇸🇦</span>
                </div>
                <span className="text-sm text-foreground">+996</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
              {/* Phone Input */}
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="flex-1 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-1">
            <Label htmlFor="message" className="text-sm font-medium text-foreground">
              Your Message
            </Label>
            <Textarea
              id="message"
              placeholder="We're here to listen to you..."
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className="min-h-[120px] lg:min-h-[140px] bg-white border border-border shadow-sm resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-teal hover:bg-teal/90 text-white font-medium py-3 shadow-sm"
          >
            {isLoading ? "Sending..." : "Send message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}