
import { useState } from "react";
import { Search, ChefHat, Sparkles, Heart, Coffee, Utensils, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
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
    
    setIsSearching(true);
    setSearchResults(null);
    console.log("Searching for:", searchQuery);
    
    try {
      const response = await fetch('https://yashrajsomvanshi.app.n8n.cloud/webhook-test/a4e42a34-3a22-4ed2-9b75-bc3f59a0c991', {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <nav className="max-w-4xl mx-auto flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-6 w-6 text-gray-800" />
            <h1 className="text-xl font-semibold text-gray-900">MoodDine.ai</h1>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="px-6 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-normal text-gray-900 mb-4 leading-tight">
              Find dining spots that
              <span className="block mt-1">match your mood</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-12 max-w-xl mx-auto leading-relaxed">
              Tell us what you're craving, and we'll find the perfect restaurant 
              that matches your vibe using AI-powered recommendations.
            </p>
          </div>

          {/* Search Interface */}
          <div className="animate-slide-up max-w-xl mx-auto mb-12">
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="I want a cozy cafe with great coffee in Indiranagar..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 text-base border-gray-200 focus:border-gray-400 focus:ring-gray-300"
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <Button 
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md"
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

          {/* Results or Examples */}
          {isSearching ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Finding the perfect places for you...</p>
            </div>
          ) : searchResults ? (
            <div className="max-w-2xl mx-auto mb-12">
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Search Results</h3>
                  <div className="text-left">
                    <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                      {JSON.stringify(searchResults, null, 2)}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto mb-12">
              <div className="text-sm text-gray-500">
                <p className="mb-4">Try searching for:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {exampleSearches.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(example)}
                      className="px-3 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors text-sm"
                    >
                      "{example}"
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mood Suggestions */}
          <div className="animate-slide-up max-w-3xl mx-auto mb-12">
            <h3 className="text-lg font-medium text-gray-800 mb-6">
              What's your dining mood today?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {moodSuggestions.map((mood, index) => (
                <Card 
                  key={index}
                  className="cursor-pointer hover:scale-105 transition-all duration-300 bg-white border border-gray-200 shadow-sm hover:shadow-md"
                  onClick={() => setSearchQuery(mood.text)}
                >
                  <CardContent className="p-4 text-center">
                    <mood.icon className={`h-8 w-8 mx-auto mb-3 ${mood.color}`} />
                    <p className="text-gray-700 font-medium text-sm">{mood.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-gray-600" />
              </div>
              <h4 className="text-base font-medium text-gray-800 mb-2">AI-Powered Discovery</h4>
              <p className="text-gray-600 text-sm">
                Our AI understands your mood and finds restaurants that perfectly match your vibe
              </p>
            </div>
            
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-gray-600" />
              </div>
              <h4 className="text-base font-medium text-gray-800 mb-2">Reddit + Google Reviews</h4>
              <p className="text-gray-600 text-sm">
                Authentic recommendations from real people combined with verified ratings
              </p>
            </div>
            
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-gray-600" />
              </div>
              <h4 className="text-base font-medium text-gray-800 mb-2">Location-Based</h4>
              <p className="text-gray-600 text-sm">
                Discover amazing dining spots in your area or explore new neighborhoods
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 pb-8 text-center text-gray-500">
        <p className="text-sm">
          Made with ❤️ for food lovers • Powered by AI and community recommendations
        </p>
      </footer>
    </div>
  );
};

export default Index;
