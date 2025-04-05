
import React from "react";
import { motion } from "framer-motion";
import { Quote as QuoteIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const SocialProofSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="flex flex-col items-center justify-center h-full"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Join thousands of satisfied customers</h2>
        <p className="text-lg text-muted-foreground">See what our users are saying about us</p>
      </div>
      
      {/* SourceForge Badge */}
      <div className="flex justify-center mb-10">
        <a href="https://sourceforge.net/software/product/RealEstateAPI/" target="_blank" rel="noopener noreferrer">
          <img 
            src="https://sourceforge.net/cdn/syndication/badge_img/3819142/customers-love-us-white?&variant_id=sf&r=https://sourceforge.net/s/realestateapi/admin/ext/commercial_badges/" 
            alt="SourceForge Badge"
            width="125"
            height="auto"
          />
        </a>
      </div>
      
      <Separator className="my-6" />
      
      {/* Customer Quote */}
      <div className="bg-muted/50 rounded-lg p-6 mb-8 relative max-w-md">
        <QuoteIcon className="h-8 w-8 text-primary/20 absolute top-3 left-3" />
        <div className="pl-6 pt-4">
          <p className="text-lg italic">
            "Great team, great product. What's not to like! Very committed to your success..."
          </p>
          <p className="text-right mt-3 font-medium">— Satisfied Customer</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SocialProofSection;
