
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Clock, Users } from "lucide-react";

interface PendingInvitationsStepProps {
  userName: string;
}

const PendingInvitationsStep = ({ userName }: PendingInvitationsStepProps) => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Waiting for Team Invitation
            </h3>
            
            <p className="text-blue-700 mb-4">
              Hi {userName.split(' ')[0]}! You've chosen to join an existing team. 
              Your account setup is on hold until you receive an invitation.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-left">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Next Steps:</p>
                  <p className="text-sm text-blue-700">
                    Contact your team administrator and ask them to send you an invitation. 
                    They can do this from their team settings page.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 text-left">
                <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">What happens next?</p>
                  <p className="text-sm text-blue-700">
                    Once you receive and accept the invitation, you'll gain access to your team's 
                    dashboard and can start using the platform immediately.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <p className="text-sm text-muted-foreground mb-4">
          In the meantime, you can:
        </p>
        
        <div className="space-y-2">
          <Button variant="outline" className="w-full">
            View API Documentation
          </Button>
          <Button variant="outline" className="w-full">
            Contact Support
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PendingInvitationsStep;
