import '../models/spiritual_content.dart';

class ContentData {
  static List<SpiritualContent> getContentByLanguage(String language) {
    switch (language.toLowerCase()) {
      case 'marathi':
        return _marathiContent;
      case 'hindi':
        return _hindiContent;
      case 'sanskrit':
        return _sanskritContent;
      default:
        return _marathiContent;
    }
  }

  static final List<SpiritualContent> _marathiContent = [
    SpiritualContent(
      id: '1',
      title: 'विठ्ठल नाम',
      saint: 'संत तुकाराम',
      firstLine: 'विठ्ठल विठ्ठल विठोबा विठ्ठल',
      meaning: 'विठ्ठलाच्या नावाने मन शुद्ध होते आणि आनंद मिळतो',
      type: 'अभंग',
      category: 'भक्ती',
      subcategory: 'नामस्मरण',
      duration: '3:42',
      plays: 25000,
      hasAudio: true,
      isPremium: false,
      audioUrl: '/audio/marathi/tukaram1.mp3',
      lyrics: 'विठ्ठल विठ्ठल विठोबा विठ्ठल\nपांडुरंग हरी पांडुरंग\nउभा आहे वाट पाहतो\nभक्तांसाठी सदैव',
      translation: 'हा अभंग विठ्ठलाच्या नामस्मरणाचे महत्त्व सांगतो',
    ),
    SpiritualContent(
      id: '2',
      title: 'रुक्मिणीचा प्रिय',
      saint: 'संत ज्ञानेश्वर',
      firstLine: 'पांडुरंग रुक्मिणीचा प्रिय',
      meaning: 'भगवान पांडुरंगाची रुक्मिणीसह महिमा',
      type: 'अभंग',
      category: 'प्रेम',
      subcategory: 'दैवी प्रेम',
      duration: '2:58',
      plays: 18000,
      hasAudio: true,
      isPremium: false,
      audioUrl: '/audio/marathi/dnyaneshwar1.mp3',
      lyrics: 'पांडुरंग रुक्मिणीचा प्रिय\nमाझ्या मनात वसतो नित्य\nप्रेमाने भरून द्या\nह्रदय माझे सदा',
      translation: 'हा अभंग दैवी प्रेमाबद्दल आहे',
    ),
    SpiritualContent(
      id: '3',
      title: 'गणपती आरती',
      saint: 'पारंपरिक',
      firstLine: 'सुखकर्ता दुःखहर्ता वार्ता विघ्नाची',
      meaning: 'गणपती बाप्पाची आरती',
      type: 'आरती',
      category: 'पूजा',
      subcategory: 'गणेश',
      duration: '4:15',
      plays: 45000,
      hasAudio: true,
      isPremium: false,
      audioUrl: '/audio/marathi/ganpati_aarti.mp3',
      lyrics: 'सुखकर्ता दुःखहर्ता वार्ता विघ्नाची\nनुरवी पुरवी प्रेम कृपा जयाची\nसर्वांगी सुंदर उटी शेंदुराची\nकंठी झळके माळ मुक्ताफळांची',
      translation: 'ही गणपतीची पारंपरिक आरती आहे',
    ),
    SpiritualContent(
      id: '4',
      title: 'शिव आरती',
      saint: 'पारंपरिक',
      firstLine: 'आरती ओवाळू आरती ओवाळू शंकराची',
      meaning: 'भोळे शंकराची आरती',
      type: 'आरती',
      category: 'पूजा',
      subcategory: 'शिव',
      duration: '3:30',
      plays: 38000,
      hasAudio: true,
      isPremium: false,
      audioUrl: '/audio/marathi/shiv_aarti.mp3',
      lyrics: 'आरती ओवाळू आरती ओवाळू शंकराची\nकर्पूर गौरी गंध सुगंध फुलांची\nचंदन काजळ अक्षता कुमकुम केशरी\nनाना प्रकारची उटी जटाधारी',
      translation: 'ही भगवान शिवाची पारंपरिक आरती आहे',
    ),
    SpiritualContent(
      id: '5',
      title: 'वैकुंठ वासा',
      saint: 'संत नामदेव',
      firstLine: 'वैकुंठाचा वासा तू आमुच्या अंगणी',
      meaning: 'विठ्ठल आमच्या घरी रहावा',
      type: 'अभंग',
      category: 'प्रार्थना',
      subcategory: 'निवास',
      duration: '3:20',
      plays: 22000,
      hasAudio: true,
      isPremium: true,
      audioUrl: '/audio/marathi/namdev1.mp3',
      lyrics: 'वैकुंठाचा वासा तू आमुच्या अंगणी\nपांडुरंग हरी येशील कधी\nनामदेव म्हणे तुझ्या चरणी\nअर्पितो माझे मन सर्व',
      translation: 'नामदेवांचा हा अभंग निवासाबद्दल आहे',
    ),
  ];

  static final List<SpiritualContent> _hindiContent = [
    SpiritualContent(
      id: '6',
      title: 'विट्ठल नाम',
      saint: 'संत तुकाराम',
      firstLine: 'विट्ठल विट्ठल विठोबा विट्ठल',
      meaning: 'विट्ठल के नाम से मन शुद्ध होता है और आनंद मिलता है',
      type: 'अभंग',
      category: 'भक्ति',
      subcategory: 'नामस्मरण',
      duration: '3:42',
      plays: 25000,
      hasAudio: true,
      isPremium: false,
      audioUrl: '/audio/hindi/tukaram1.mp3',
      lyrics: 'विट्ठल विट्ठल विठोबा विट्ठल\nपांडुरंग हरि पांडुरंग\nखड़ा है राह देख रहा\nभक्तों के लिए सदा',
      translation: 'यह अभंग विट्ठल के नामस्मरण का महत्व बताता है',
    ),
    SpiritualContent(
      id: '7',
      title: 'राम नाम',
      saint: 'संत तुलसीदास',
      firstLine: 'राम नाम मणि दीप धरु जीह देहरी द्वार',
      meaning: 'राम नाम की महिमा अपार है',
      type: 'दोहा',
      category: 'भक्ति',
      subcategory: 'राम',
      duration: '2:45',
      plays: 32000,
      hasAudio: true,
      isPremium: false,
      audioUrl: '/audio/hindi/tulsidas1.mp3',
      lyrics: 'राम नाम मणि दीप धरु जीह देहरी द्वार\nतुलसी भीतर बाहिरहुं जो चाहसि उजियार',
      translation: 'तुलसीदास जी का यह दोहा राम नाम की महिमा बताता है',
    ),
  ];

  static final List<SpiritualContent> _sanskritContent = [
    SpiritualContent(
      id: '8',
      title: 'गणेश स्तोत्र',
      saint: 'व्यास',
      firstLine: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ',
      meaning: 'गणेश जी का स्तोत्र',
      type: 'स्तोत्र',
      category: 'पूजा',
      subcategory: 'गणेश',
      duration: '5:20',
      plays: 15000,
      hasAudio: true,
      isPremium: false,
      audioUrl: '/audio/sanskrit/ganesh_stotra.mp3',
      lyrics: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा',
      translation: 'यह गणेश जी का पारंपरिक स्तोत्र है',
    ),
  ];

  static List<Map<String, dynamic>> getCategories() {
    return [
      {'name': 'अभंग', 'icon': '📿', 'count': 2547},
      {'name': 'आरती', 'icon': '🪔', 'count': 856},
      {'name': 'भजन', 'icon': '🎵', 'count': 1234},
      {'name': 'स्तोत्र', 'icon': '📜', 'count': 445},
    ];
  }

  static List<Map<String, dynamic>> getDeities() {
    return [
      {'name': 'गणेश', 'icon': '🐘', 'aartis': 45},
      {'name': 'कृष्ण', 'icon': '🦚', 'aartis': 78},
      {'name': 'शिव', 'icon': '🔱', 'aartis': 62},
      {'name': 'राम', 'icon': '🏹', 'aartis': 54},
      {'name': 'हनुमान', 'icon': '💪', 'aartis': 38},
      {'name': 'दुर्गा', 'icon': '⚔️', 'aartis': 29},
    ];
  }
}
