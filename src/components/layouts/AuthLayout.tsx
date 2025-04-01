
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "react-router-dom";
import { AccountExecutiveProvider } from "@/contexts/AccountExecutiveContext";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const location = useLocation();
  const isSignUp = location.pathname === "/sign-up";
  
  return (
    <AccountExecutiveProvider>
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-5xl mx-auto"
        >
          <div className="glass-card rounded-xl p-6 sm:p-8">
            <div className={`flex flex-col ${isSignUp ? "md:flex-row" : ""}`}>
              {/* Left Side - Form */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className={isSignUp ? "md:w-1/2 md:pr-6" : "w-full flex justify-center"}
              >
                <div className={isSignUp ? "w-full" : "w-full max-w-md"}>
                  <div className="flex justify-center mb-8">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                    >
                      <img 
                        src="https://www.realestateapi.com/assets/img/realestateapi-logo-color.svg?v=08750727ac" 
                        alt="RealEstateAPI" 
                        className="h-8 w-auto" 
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/160x40?text=RealEstateAPI";
                        }}
                      />
                    </motion.div>
                  </div>
                  
                  {children}
                </div>
              </motion.div>
              
              {/* Only show separator and social proof for sign-up page */}
              {isSignUp && (
                <>
                  {/* Separator */}
                  <div className="hidden md:flex justify-center my-4 md:my-0">
                    <Separator orientation="vertical" className="mx-4" />
                  </div>
                  <Separator className="md:hidden my-6" />
                  
                  {/* Right Side - Social Proof */}
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="md:w-1/2 md:pl-6 flex flex-col items-center justify-center"
                  >
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-semibold">We don't like to brag...</h2>
                      <p className="text-lg font-medium">But our users do.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center mb-8">
                      <img 
                        src="/lovable-uploads/ce477b0d-ae2b-4f6a-a079-023a229fafd1.png" 
                        alt="G2 Easiest To Do Business With Winter 2025" 
                        className="h-28 w-auto"
                      />
                      <img 
                        src="/lovable-uploads/25b45e9d-d768-4b1c-81ff-e8262cd8f87e.png" 
                        alt="G2 High Performer Winter 2025" 
                        className="h-28 w-auto"
                      />
                      <img 
                        src="/lovable-uploads/1d9d9516-9460-4b44-9a33-41d3365e783f.png" 
                        alt="G2 Best Support Winter 2025" 
                        className="h-28 w-auto sm:col-span-2"
                      />
                    </div>
                    
                    <div className="mt-4 text-center">
                      <p className="text-base font-medium">TRUSTED BY +25,000 BUSINESSES</p>
                      <div className="flex justify-center items-center gap-8 mt-4">
                        <div className="w-20 h-6 bg-foreground/80 rounded opacity-70"></div>
                        <div className="w-20 h-6 bg-foreground/80 rounded opacity-70"></div>
                        <div className="w-20 h-6 bg-foreground/80 rounded opacity-70"></div>
                      </div>
                    </div>
                    
                    <div className="mt-8 glass-card rounded-xl p-4 text-center w-full">
                      <p className="text-sm font-medium">Join thousands of real estate professionals who trust our API</p>
                      <p className="text-xs text-muted-foreground mt-1">⭐⭐⭐⭐⭐ 4.9/5 average rating on G2</p>
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{  opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 text-sm text-muted-foreground text-center"
        >
          <p>© {new Date().getFullYear()} RealEstateAPI. All rights reserved.</p>
        </motion.div>
      </div>
    </AccountExecutiveProvider>
  );
};
