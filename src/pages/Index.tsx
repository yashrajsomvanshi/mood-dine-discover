
import { useState } from "react";
import { Search, ChefHat, Sparkles, Heart, Coffee, Utensils, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const moodSuggestions = [
    { icon: Coffee, text: "Cozy coffee date vibes", color: "text-warm-700" },
    { icon: Heart, text: "Romantic dinner for two", color: "text-red-600" },
    { icon: Sparkles, text: "Celebration with friends", color: "text-yellow-600" },
    { icon: Utensils, text: "Authentic local flavors", color: "text-sage-700" },
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
    // TODO: Integrate with n8n webhook
    console.log("Searching for:", searchQuery);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-warm-800" />
            <h1 className="text-2xl font-bold text-warm-900">MoodDine.ai</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-warm-700 hover:text-warm-900 transition-colors">Explore</a>
            <a href="#" className="text-warm-700 hover:text-warm-900 transition-colors">About</a>
            <Button variant="outline" className="border-warm-300 text-warm-800 hover:bg-warm-100">
              Sign In
            </Button>
            <Button className="bg-warm-800 hover:bg-warm-900 text-white">
              Sign Up
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold text-warm-900 mb-6 leading-tight">
              Find dining spots that
              <span className="text-gradient block mt-2">match your mood</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-warm-700 mb-12 max-w-2xl mx-auto leading-relaxed">
              Tell us what you're craving, and we'll find the perfect restaurant 
              that matches your vibe using AI-powered recommendations.
            </p>
          </div>

          {/* Search Interface */}
          <div className="animate-slide-up max-w-2xl mx-auto mb-16">
            <Card className="backdrop-blur-sm bg-white/80 shadow-2xl border-0">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-warm-500 h-5 w-5" />
                    <Input
                      placeholder="I want a cozy cafe with great coffee in Indiranagar..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-14 text-lg border-warm-200 focus:border-warm-400 focus:ring-warm-300"
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <Button 
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="h-14 px-8 bg-warm-800 hover:bg-warm-900 text-white font-medium"
                  >
                    {isSearching ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      "Find Places"
                    )}
                  </Button>
                </div>
                
                <div className="mt-6 text-sm text-warm-600">
                  <p className="mb-3">Try searching for:</p>
                  <div className="flex flex-wrap gap-2">
                    {exampleSearches.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchQuery(example)}
                        className="px-3 py-1 bg-warm-100 text-warm-700 rounded-full hover:bg-warm-200 transition-colors text-xs"
                      >
                        "{example}"
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mood Suggestions */}
          <div className="animate-slide-up max-w-4xl mx-auto mb-16">
            <h3 className="text-2xl font-semibold text-warm-800 mb-8">
              What's your dining mood today?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {moodSuggestions.map((mood, index) => (
                <Card 
                  key={index}
                  className="cursor-pointer hover:scale-105 transition-all duration-300 bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl"
                  onClick={() => setSearchQuery(mood.text)}
                >
                  <CardContent className="p-6 text-center">
                    <mood.icon className={`h-12 w-12 mx-auto mb-4 ${mood.color}`} />
                    <p className="text-warm-800 font-medium">{mood.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-sage-700" />
              </div>
              <h4 className="text-xl font-semibold text-warm-800 mb-2">AI-Powered Discovery</h4>
              <p className="text-warm-600">
                Our AI understands your mood and finds restaurants that perfectly match your vibe
              </p>
            </div>
            
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-sage-700" />
              </div>
              <h4 className="text-xl font-semibold text-warm-800 mb-2">Reddit + Google Reviews</h4>
              <p className="text-warm-600">
                Authentic recommendations from real people combined with verified ratings
              </p>
            </div>
            
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-sage-700" />
              </div>
              <h4 className="text-xl font-semibold text-warm-800 mb-2">Location-Based</h4>
              <p className="text-warm-600">
                Discover amazing dining spots in your area or explore new neighborhoods
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 pb-8 text-center text-warm-600">
        <p className="text-sm">
          Made with ❤️ for food lovers • Powered by AI and community recommendations
        </p>
      </footer>
    </div>
  );
};

export default Index;
