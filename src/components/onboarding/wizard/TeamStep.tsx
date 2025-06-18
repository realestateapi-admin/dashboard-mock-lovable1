
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Plus, Mail } from "lucide-react";
import { TeamData, TeamAction } from "../types/OnboardingTypes";

interface TeamStepProps {
  team: TeamData | null;
  updateField: (field: string, value: any) => void;
  userName: string;
}

const TeamStep = ({ team, updateField, userName }: TeamStepProps) => {
  const [teamName, setTeamName] = useState("");
  
  // Set default team name when component mounts or userName changes
  useEffect(() => {
    if (userName && !teamName) {
      const defaultName = `${userName.split(' ')[0]}'s Team`;
      setTeamName(defaultName);
    }
  }, [userName, teamName]);

  const handleActionChange = (action: TeamAction) => {
    const updatedTeam: TeamData = {
      action,
      teamName: action === "create-team" ? teamName : undefined
    };
    updateField("team", updatedTeam);
  };

  const handleTeamNameChange = (name: string) => {
    setTeamName(name);
    if (team?.action === "create-team") {
      updateField("team", {
        ...team,
        teamName: name
      });
    }
  };

  return (
    <div className="space-y-6">
      <RadioGroup
        value={team?.action || ""}
        onValueChange={handleActionChange}
        className="space-y-4"
      >
        {/* Create Team Option */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className={`cursor-pointer transition-all duration-200 ${
            team?.action === "create-team" 
              ? "ring-2 ring-primary border-primary" 
              : "hover:border-primary/50"
          }`}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="create-team" id="create-team" className="mt-1" />
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Plus className="h-5 w-5 text-primary" />
                    <Label htmlFor="create-team" className="text-base font-medium cursor-pointer">
                      Create a new team
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Start fresh with your own team and invite members later
                  </p>
                  
                  {team?.action === "create-team" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="teamName" className="text-sm">Team Name</Label>
                      <Input
                        id="teamName"
                        value={teamName}
                        onChange={(e) => handleTeamNameChange(e.target.value)}
                        placeholder="Enter team name"
                        className="w-full"
                      />
                    </motion.div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Join Team Option */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className={`cursor-pointer transition-all duration-200 ${
            team?.action === "join-team" 
              ? "ring-2 ring-primary border-primary" 
              : "hover:border-primary/50"
          }`}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="join-team" id="join-team" className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="h-5 w-5 text-primary" />
                    <Label htmlFor="join-team" className="text-base font-medium cursor-pointer">
                      Join an existing team
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Your team administrator will need to invite you
                  </p>
                  
                  {team?.action === "join-team" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.2 }}
                      className="bg-blue-50 border border-blue-200 rounded-lg p-3"
                    >
                      <div className="flex items-start space-x-2">
                        <Mail className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-blue-900 mb-1">Next Steps:</p>
                          <p className="text-blue-700">
                            Contact your team administrator and ask them to send you an invitation 
                            to join the team. They can do this from their team settings page.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </RadioGroup>
    </div>
  );
};

export default TeamStep;
