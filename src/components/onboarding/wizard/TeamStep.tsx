
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Mail, AlertCircle, CheckCircle } from "lucide-react";
import { TeamData, TeamAction } from "../types/OnboardingTypes";

interface TeamStepProps {
  team: TeamData | null;
  updateField: (field: string, value: any) => void;
  userName: string;
}

const TeamStep = ({ team, updateField, userName }: TeamStepProps) => {
  const [teamName, setTeamName] = useState("");
  const [teamNameError, setTeamNameError] = useState("");
  const [isTeamNameValid, setIsTeamNameValid] = useState(false);
  const [hasSetDefault, setHasSetDefault] = useState(false);
  
  // Set default team name only once when component mounts
  useEffect(() => {
    if (userName && !hasSetDefault && !team?.teamName) {
      const defaultName = `${userName.split(' ')[0]}'s Team`;
      setTeamName(defaultName);
      validateTeamName(defaultName);
      setHasSetDefault(true);
    } else if (team?.teamName) {
      setTeamName(team.teamName);
      validateTeamName(team.teamName);
      setHasSetDefault(true);
    }
  }, [userName, team?.teamName, hasSetDefault]);

  const validateTeamName = (name: string) => {
    // Check minimum length
    if (name.length < 1) {
      setTeamNameError("Team name is required");
      setIsTeamNameValid(false);
      return false;
    }
    
    // Check maximum length
    if (name.length > 50) {
      setTeamNameError("Team name must be 50 characters or less");
      setIsTeamNameValid(false);
      return false;
    }
    
    // Check for at least one alphanumeric character
    const hasAlphanumeric = /[a-zA-Z0-9]/.test(name);
    if (!hasAlphanumeric) {
      setTeamNameError("Team name must contain at least one letter or number");
      setIsTeamNameValid(false);
      return false;
    }
    
    setTeamNameError("");
    setIsTeamNameValid(true);
    return true;
  };

  const handleActionChange = (action: TeamAction) => {
    const updatedTeam: TeamData = {
      action,
      teamName: action === "create-team" ? teamName : undefined
    };
    updateField("team", updatedTeam);
  };

  const handleTeamNameChange = (name: string) => {
    setTeamName(name);
    validateTeamName(name);
    
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
                    <Users className="h-5 w-5 text-primary" />
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
                      <div className="relative">
                        <Input
                          id="teamName"
                          value={teamName}
                          onChange={(e) => handleTeamNameChange(e.target.value)}
                          placeholder="Enter team name"
                          className={`w-full pr-10 ${
                            teamNameError ? 'border-red-500 focus-visible:ring-red-500' : 
                            isTeamNameValid ? 'border-green-500 focus-visible:ring-green-500' : ''
                          }`}
                          maxLength={50}
                        />
                        {teamName && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            {isTeamNameValid ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : teamNameError ? (
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            ) : null}
                          </div>
                        )}
                      </div>
                      {teamNameError && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {teamNameError}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        1-50 characters, must include at least one letter or number
                      </p>
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
