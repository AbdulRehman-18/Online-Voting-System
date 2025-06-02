import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight, Info, Vote } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getInitials } from "@/lib/utils";

// TODO: Fetch positions and candidates data from backend
const positions: Array<{
  id: string;
  title: string;
  description: string;
  candidates: Array<{
    id: string;
    name: string;
    bio: string;
    avatar?: string;
    manifesto: string;
    tags: string[];
  }>;
}> = [];

export function VoterVote() {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [voteComplete, setVoteComplete] = useState(false);
  
  const position = positions[currentPosition];
  
  const handleSelect = (candidateId: string) => {
    setSelections({
      ...selections,
      [position.id]: candidateId
    });
  };
  
  const nextPosition = () => {
    if (currentPosition < positions.length - 1) {
      setCurrentPosition(currentPosition + 1);
    } else {
      setShowConfirmation(true);
    }
  };
  
  const prevPosition = () => {
    if (currentPosition > 0) {
      setCurrentPosition(currentPosition - 1);
    }
  };
  
  const submitVote = () => {
    // In a real app, this would send the vote to the backend
    setVoteComplete(true);
    setShowConfirmation(false);
  };
  
  const resetVote = () => {
    setSelections({});
    setCurrentPosition(0);
    setVoteComplete(false);
  };
  
  const isPositionSelected = selections[position?.id];
  const allPositionsSelected = positions.every(p => selections[p.id]);
  
  if (voteComplete) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center min-h-[70vh] text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-success/20 text-success rounded-full p-6 mb-6">
          <Check className="h-12 w-12" />
        </div>
        <h2 className="text-3xl font-light mb-2">Thank you for voting!</h2>
        <p className="text-muted-foreground max-w-lg mb-8">
          Your vote has been securely recorded. Your participation is crucial for a democratic and representative election.
        </p>
        <Button onClick={resetVote} variant="neumorphic">
          Return to Elections
        </Button>
      </motion.div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-light tracking-tight">Cast Your Vote</h2>
        <p className="text-muted-foreground">
          Student Council Elections 2025
        </p>
      </div>
      
      <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-full">
            <Info className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm">Please vote for each position to complete your ballot.</p>
        </div>
        <div className="text-sm font-medium">
          Step {currentPosition + 1} of {positions.length}
        </div>
      </div>
      
      {showConfirmation ? (
        <Card isGlassmorphic className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Confirm Your Vote</CardTitle>
            <CardDescription>
              Please review your selections before submitting your final vote
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {positions.map((pos) => {
                const selectedCandidate = pos.candidates.find(c => c.id === selections[pos.id]);
                return (
                  <div key={pos.id} className="p-4 rounded-lg bg-background/50 border">
                    <h4 className="font-medium">{pos.title}</h4>
                    {selectedCandidate ? (
                      <div className="flex items-center gap-3 mt-2">
                        <Avatar className="h-8 w-8">
                          {selectedCandidate.avatar && (
                            <AvatarImage src={selectedCandidate.avatar} alt={selectedCandidate.name} />
                          )}
                          <AvatarFallback>{getInitials(selectedCandidate.name)}</AvatarFallback>
                        </Avatar>
                        <span>{selectedCandidate.name}</span>
                      </div>
                    ) : (
                      <p className="text-muted-foreground mt-2">No selection made</p>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Go Back
            </Button>
            <Button onClick={submitVote} disabled={!allPositionsSelected} variant="neumorphic">
              <Vote className="mr-2 h-4 w-4" />
              Submit Vote
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card isGlassmorphic className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>{position.title}</CardTitle>
            <CardDescription>
              {position.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {position.candidates.map((candidate) => {
                const isSelected = selections[position.id] === candidate.id;
                return (
                  <motion.div
                    key={candidate.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      isSelected 
                        ? "bg-primary/10 border-primary" 
                        : "bg-background/50 hover:bg-background/80"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleSelect(candidate.id)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar>
                        {candidate.avatar && <AvatarImage src={candidate.avatar} alt={candidate.name} />}
                        <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-sm font-medium">{candidate.name}</h4>
                        <p className="text-xs text-muted-foreground">{candidate.bio}</p>
                      </div>
                      {isSelected && (
                        <div className="ml-auto bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    
                    <Tabs defaultValue="manifesto" className="w-full">
                      <TabsList className="w-full">
                        <TabsTrigger value="manifesto" className="flex-1">Manifesto</TabsTrigger>
                        <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
                      </TabsList>
                      <TabsContent value="manifesto" className="mt-2">
                        <p className="text-xs text-muted-foreground">{candidate.manifesto}</p>
                      </TabsContent>
                      <TabsContent value="profile" className="mt-2">
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-1 mt-1">
                            {candidate.tags.map(tag => (
                              <span key={tag} className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                    
                    <Button 
                      variant={isSelected ? "default" : "outline"} 
                      size="sm" 
                      className="w-full mt-3"
                      onClick={() => handleSelect(candidate.id)}
                    >
                      {isSelected ? "Selected" : "Select Candidate"}
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={prevPosition}
              disabled={currentPosition === 0}
            >
              Previous
            </Button>
            <Button 
              onClick={nextPosition}
              disabled={!isPositionSelected}
              variant="neumorphic"
            >
              {currentPosition < positions.length - 1 ? (
                <>Next <ChevronRight className="ml-2 h-4 w-4" /></>
              ) : (
                <>Review & Submit <ChevronRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}