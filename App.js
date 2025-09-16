import React, { useState, useEffect } from 'react';
import { Search, MapPin, Thermometer, Wind, Droplets, Eye, Sunrise, Sunset, Cloud, Globe } from 'lucide-react';

const WeatherApp = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('ar'); // 'ar' for Arabic, 'en' for English

  // Replace with your actual OpenWeather API key
  const API_KEY = 'YOUR_API_KEY_HERE';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  // Translations
  const translations = {
    ar: {
      title: "تطبيق الطقس",
      subtitle: "تابع حالة الطقس في مدينتك",
      searchPlaceholder: "ابحث عن مدينة...",
      loading: "جاري تحميل بيانات الطقس...",
      error: "خطأ في جلب بيانات الطقس. تأكد من صحة اسم المدينة.",
      feelsLike: "يشعر وكأنه",
      humidity: "الرطوبة",
      windSpeed: "سرعة الرياح",
      visibility: "الرؤية",
      pressure: "الضغط الجوي",
      sunrise: "شروق الشمس",
      sunset: "غروب الشمس",
      forecast: "توقعات الطقس لـ 5 أيام",
      poweredBy: "مدعوم بواسطة OpenWeather API",
      today: "اليوم",
      tomorrow: "الغد",
      dayAfter: "بعد الغد",
      thursday: "الخميس",
      friday: "الجمعة",
      weatherConditions: {
        "clear sky": "سماء صافية",
        "few clouds": "غائم جزئياً", 
        "scattered clouds": "غائم متناثر",
        "broken clouds": "غائم كثيف",
        "shower rain": "مطر غزير",
        "rain": "ماطر",
        "thunderstorm": "عاصفة رعدية",
        "snow": "ثلوج",
        "mist": "ضباب"
      }
    },
    en: {
      title: "Weather App",
      subtitle: "Track weather in your city",
      searchPlaceholder: "Search for a city...",
      loading: "Loading weather data...",
      error: "Error fetching weather data. Please check the city name.",
      feelsLike: "Feels like",
      humidity: "Humidity",
      windSpeed: "Wind Speed",
      visibility: "Visibility", 
      pressure: "Pressure",
      sunrise: "Sunrise",
      sunset: "Sunset",
      forecast: "5-Day Weather Forecast",
      poweredBy: "Powered by OpenWeather API",
      today: "Today",
      tomorrow: "Tomorrow",
      dayAfter: "Day After",
      thursday: "Thursday",
      friday: "Friday",
      weatherConditions: {
        "clear sky": "Clear Sky",
        "few clouds": "Few Clouds",
        "scattered clouds": "Scattered Clouds", 
        "broken clouds": "Broken Clouds",
        "shower rain": "Shower Rain",
        "rain": "Rain",
        "thunderstorm": "Thunderstorm",
        "snow": "Snow",
        "mist": "Mist"
      }
    }
  };

  const t = translations[language];

  // Mock weather data for demonstration
  const mockCurrentWeather = {
    name: language === 'ar' ? "القاهرة" : "Cairo",
    country: "EG",
    temp: 28,
    feels_like: 31,
    description: language === 'ar' ? "غائم جزئياً" : "Few Clouds",
    icon: "02d",
    humidity: 65,
    wind_speed: 12,
    visibility: 8,
    sunrise: "06:15",
    sunset: "18:45",
    pressure: 1013
  };

  const mockForecast = [
    { 
      date: t.today, 
      temp_max: 30, 
      temp_min: 22, 
      description: language === 'ar' ? "مشمس" : "Sunny", 
      icon: "01d" 
    },
    { 
      date: t.tomorrow, 
      temp_max: 32, 
      temp_min: 24, 
      description: language === 'ar' ? "غائم جزئياً" : "Partly Cloudy", 
      icon: "02d" 
    },
    { 
      date: t.dayAfter, 
      temp_max: 28, 
      temp_min: 20, 
      description: language === 'ar' ? "ماطر" : "Rainy", 
      icon: "10d" 
    },
    { 
      date: t.thursday, 
      temp_max: 26, 
      temp_min: 18, 
      description: language === 'ar' ? "عاصف" : "Windy", 
      icon: "50d" 
    },
    { 
      date: t.friday, 
      temp_max: 29, 
      temp_min: 21, 
      description: language === 'ar' ? "مشمس" : "Sunny", 
      icon: "01d" 
    }
  ];

  const fetchWeather = async (searchCity) => {
    setLoading(true);
    setError('');
    
    try {
      // In a real app, you would use actual API calls like this:
      // const currentResponse = await fetch(`${BASE_URL}/weather?q=${searchCity}&appid=${API_KEY}&units=metric&lang=${language}`);
      // const forecastResponse = await fetch(`${BASE_URL}/forecast?q=${searchCity}&appid=${API_KEY}&units=metric&lang=${language}`);
      
      // For demonstration, using mock data with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCurrentWeather(mockCurrentWeather);
      setForecast(mockForecast);
    } catch (err) {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌦️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[iconCode] || '🌤️';
  };

  // Load default weather on component mount
  useEffect(() => {
    fetchWeather('Cairo');
  }, []);

  // Update data when language changes
  useEffect(() => {
    if (currentWeather) {
      setCurrentWeather({
        ...mockCurrentWeather,
        name: language === 'ar' ? "القاهرة" : "Cairo",
        description: language === 'ar' ? "غائم جزئياً" : "Few Clouds"
      });
      setForecast(mockForecast);
    }
  }, [language]);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4 ${language === 'ar' ? 'font-arabic' : 'font-sans'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        {/* Header with Language Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div className={`text-center flex-1 ${language === 'ar' ? 'mr-12' : 'ml-12'}`}>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
              <Cloud className="w-10 h-10" />
              {t.title}
            </h1>
            <p className="text-blue-100">{t.subtitle}</p>
          </div>
          
          <button
            onClick={toggleLanguage}
            className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-3 text-white hover:bg-white/30 transition-colors"
            title={language === 'ar' ? 'English' : 'عربي'}
          >
            <Globe className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={t.searchPlaceholder}
              className={`w-full px-4 py-3 ${language === 'ar' ? 'pr-12' : 'pl-12'} rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50`}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
            />
            <button
              onClick={handleSearch}
              className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-white hover:text-blue-200`}
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">{t.loading}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 backdrop-blur-sm border border-red-300 rounded-lg p-4 mb-6 text-center">
            <p className="text-white">{error}</p>
          </div>
        )}

        {currentWeather && !loading && (
          <>
            {/* Current Weather Card */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/30">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-white" />
                  <h2 className="text-2xl font-bold text-white">
                    {currentWeather.name}, {currentWeather.country}
                  </h2>
                </div>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-6xl">{getWeatherIcon(currentWeather.icon)}</span>
                  <div>
                    <div className="text-5xl font-bold text-white">
                      {currentWeather.temp}°
                    </div>
                    <div className="text-white/80">
                      {t.feelsLike} {currentWeather.feels_like}°
                    </div>
                  </div>
                </div>
                <p className="text-xl text-white capitalize">
                  {currentWeather.description}
                </p>
              </div>

              {/* Weather Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Droplets className="w-6 h-6 text-blue-200 mx-auto mb-2" />
                  <div className="text-white font-semibold">{currentWeather.humidity}%</div>
                  <div className="text-white/70 text-sm">{t.humidity}</div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Wind className="w-6 h-6 text-blue-200 mx-auto mb-2" />
                  <div className="text-white font-semibold">
                    {currentWeather.wind_speed} {language === 'ar' ? 'كم/س' : 'km/h'}
                  </div>
                  <div className="text-white/70 text-sm">{t.windSpeed}</div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Eye className="w-6 h-6 text-blue-200 mx-auto mb-2" />
                  <div className="text-white font-semibold">
                    {currentWeather.visibility} {language === 'ar' ? 'كم' : 'km'}
                  </div>
                  <div className="text-white/70 text-sm">{t.visibility}</div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Thermometer className="w-6 h-6 text-blue-200 mx-auto mb-2" />
                  <div className="text-white font-semibold">
                    {currentWeather.pressure} {language === 'ar' ? 'هـ ب' : 'hPa'}
                  </div>
                  <div className="text-white/70 text-sm">{t.pressure}</div>
                </div>
              </div>

              {/* Sunrise & Sunset */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Sunrise className="w-6 h-6 text-yellow-200 mx-auto mb-2" />
                  <div className="text-white font-semibold">{currentWeather.sunrise}</div>
                  <div className="text-white/70 text-sm">{t.sunrise}</div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Sunset className="w-6 h-6 text-orange-200 mx-auto mb-2" />
                  <div className="text-white font-semibold">{currentWeather.sunset}</div>
                  <div className="text-white/70 text-sm">{t.sunset}</div>
                </div>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                {t.forecast}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {forecast.map((day, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-white font-semibold mb-2">{day.date}</div>
                    <div className="text-3xl mb-2">{getWeatherIcon(day.icon)}</div>
                    <div className="text-white text-sm mb-2 capitalize">{day.description}</div>
                    <div className="flex justify-between text-white text-sm">
                      <span>{day.temp_max}°</span>
                      <span className="text-white/70">{day.temp_min}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/70 text-sm">
            {t.poweredBy}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;