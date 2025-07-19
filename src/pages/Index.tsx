
import { useState } from "react";
import { Search, ChefHat, Sparkles, Heart, Coffee, Utensils, Star, MapPin, ExternalLink, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface SearchResult {
  name: string;
  address: string;
  rating: number;
  mapLink: string;
  openNow: boolean | null;
  image: string;
  redditSummary: string;
  redditScore: number;
  redditUrl: string;
  finalScore: number;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);
  const { toast } = useToast();

  const moodSuggestions = [
    { icon: Coffee, text: "Cozy coffee date vibes", color: "text-gray-600" },
    { icon: Heart, text: "Romantic dinner for two", color: "text-gray-600" },
    { icon: Sparkles, text: "Celebration with friends", color: "text-gray-600" },
    { icon: Utensils, text: "Authentic local flavors", color: "text-gray-600" },
  ];

  const exampleSearches = [
    "Best rooftop places in Koramangala with cocktails",
    "Peaceful South Indian breakfast spot near MG Road",
    "Aesthetic restaurants with good lighting for photos",
    "Cozy cafe with great coffee in Indiranagar"
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    // Check daily search limit
    let searchCount = parseInt(localStorage.getItem("searchCount")) || 0;
    let lastReset = parseInt(localStorage.getItem("lastReset")) || Date.now();
    
    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;
    
    if (now - lastReset > ONE_DAY) {
      searchCount = 0;
      lastReset = now;
      localStorage.setItem("searchCount", "0");
      localStorage.setItem("lastReset", now.toString());
    }
    
    if (searchCount >= 3) {
      alert("You've reached the daily search limit. Please come back tomorrow!");
      return;
    }
    
    searchCount++;
    localStorage.setItem("searchCount", searchCount.toString());
    
    setIsSearching(true);
    setSearchResults(null);
    console.log("Searching for:", searchQuery);
    
    try {
      const response = await fetch('https://yashrajsomvanshi.app.n8n.cloud/webhook/a4e42a34-3a22-4ed2-9b75-bc3f59a0c991', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Webhook response:', data);
        setSearchResults(data);
        toast({
          title: "Search completed!",
          description: "Found places that match your mood.",
        });
      } else {
        throw new Error('Failed to send search request');
      }
    } catch (error) {
      console.error('Error sending search request:', error);
      toast({
        title: "Search failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);  
    }
  };

  const renderSearchResults = () => {
    if (!searchResults || searchResults.length === 0) return null;

    return (
      <div className="max-w-4xl mx-auto mb-12">
        <h3 className="text-lg font-medium text-black mb-6">Found {searchResults.length} places for you</h3>
        <div className="grid gap-6 md:grid-cols-2">
          {searchResults.map((result, index) => (
            <Card key={index} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-black text-lg leading-tight">{result.name}</h4>
                  <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">{result.rating}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600 leading-relaxed">{result.address}</p>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  {result.openNow !== null && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className={`text-sm font-medium ${result.openNow ? 'text-green-600' : 'text-red-600'}`}>
                        {result.openNow ? 'Open now' : 'Closed'}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-500">Score:</span>
                    <span className="text-sm font-medium text-black">{result.finalScore.toFixed(1)}</span>
                  </div>
                </div>

                {result.redditSummary && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                      {result.redditSummary.substring(0, 150)}...
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Reddit score:</span>
                      <span className="text-xs font-medium text-black">{result.redditScore}</span>
                    </div>
                    
                    {result.redditUrl && (
                      <a 
                        href={result.redditUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        Reddit <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  
                  {result.mapLink && (
                    <Button
                      asChild
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <a 
                        href={result.mapLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <MapPin className="h-4 w-4" />
                        View on Google Maps
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen gradient-warm relative">
      
      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <nav className="max-w-4xl mx-auto flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-6 w-6 text-black" />
            <h1 className="text-xl font-semibold text-black">MoodDine</h1>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-3xl mx-auto text-center space-y-16">
          <div className="animate-fade-in space-y-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black leading-tight">
              Find dining spots that
              <span className="block mt-1">match your mood</span>
            </h2>
            
            <p className="text-base text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Tell us what you're craving, and we'll find the perfect restaurant 
              that matches your vibe using AI-powered Reddit + Google Places recommendations.
            </p>
          </div>

          {/* Search Interface */}
          <div className="animate-slide-up max-w-xl mx-auto">
            <Card className="bg-white/95 backdrop-blur-sm shadow-lg border border-white/20">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="I want a cozy cafe with great coffee in Indiranagar..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 text-sm border-gray-200 focus:border-gray-400 focus:ring-gray-300"
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <Button 
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="h-12 bg-black hover:bg-gray-800 text-white font-medium rounded-md text-sm shadow-md"
                  >
                    {isSearching ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Searching...
                      </div>
                    ) : (
                      "Find Places"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results or Loading or Examples */}
          {isSearching ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
              <p className="text-gray-600 text-sm">Finding the perfect places for you...</p>
            </div>
          ) : searchResults ? (
            renderSearchResults()
          ) : (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="text-sm text-gray-500">
                <p className="mb-4">Try searching for:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {exampleSearches.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(example)}
                      className="px-3 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors text-xs"
                    >
                      "{example}"
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mood Suggestions */}
          {!searchResults && (
            <div className="animate-slide-up max-w-3xl mx-auto">
              <h3 className="text-base font-medium text-black mb-6">
                What's your dining mood today?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {moodSuggestions.map((mood, index) => (
                  <Card 
                    key={index}
                    className="cursor-pointer hover:scale-105 transition-all duration-300 bg-white/95 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl"
                    onClick={() => setSearchQuery(mood.text)}
                  >
                    <CardContent className="p-4 text-center">
                      <mood.icon className={`h-6 w-6 mx-auto mb-3 ${mood.color}`} />
                      <p className="text-black font-medium text-xs">{mood.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {!searchResults && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Sparkles className="h-6 w-6 text-gray-600" />
                </div>
                <h4 className="text-sm font-medium text-black mb-2">AI-Powered Discovery</h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Our AI understands your mood and finds restaurants that perfectly match your vibe
                </p>
              </div>
              
              <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Star className="h-6 w-6 text-gray-600" />
                </div>
                <h4 className="text-sm font-medium text-black mb-2">Reddit + Google Reviews</h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Authentic recommendations from real people combined with verified ratings
                </p>
              </div>
              
              <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <MapPin className="h-6 w-6 text-gray-600" />
                </div>
                <h4 className="text-sm font-medium text-black mb-2">Location-Based</h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Discover amazing dining spots in your area or explore new neighborhoods
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-16 pb-8 text-center text-gray-500">
        <p className="text-xs">
          Made with ❤️ for food lovers • Powered by AI and community recommendations
        </p>
      </footer>
    </div>
  );
};

export default Index;
