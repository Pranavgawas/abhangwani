import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import '../models/spiritual_content.dart';
import '../data/content_data.dart';

class ContentProvider with ChangeNotifier {
  List<SpiritualContent> _allContent = [];
  List<SpiritualContent> _filteredContent = [];
  Set<String> _likedContent = {};
  String _selectedLanguage = 'marathi';
  String _searchQuery = '';
  String? _selectedCategory;
  bool _isLoading = false;

  List<SpiritualContent> get allContent => _allContent;
  List<SpiritualContent> get filteredContent => _filteredContent;
  Set<String> get likedContent => _likedContent;
  String get selectedLanguage => _selectedLanguage;
  String get searchQuery => _searchQuery;
  String? get selectedCategory => _selectedCategory;
  bool get isLoading => _isLoading;

  List<String> get categories => ['Abhang', 'Aarti', 'Stotra', 'Bhajan'];

  ContentProvider() {
    loadContent();
  }

  Future<void> loadContent() async {
    _isLoading = true;
    notifyListeners();
    
    // Simulate loading delay
    await Future.delayed(const Duration(milliseconds: 500));
    
    _allContent = ContentData.getContentByLanguage(_selectedLanguage);
    _applyFilters();
    await _loadLikedContent();
    
    _isLoading = false;
    notifyListeners();
  }

  void setLanguage(String language) {
    if (_selectedLanguage != language) {
      _selectedLanguage = language;
      _applyFilters();
      notifyListeners();
    }
  }

  void setSearchQuery(String query) {
    _searchQuery = query;
    _applyFilters();
  }

  void setSelectedCategory(String? category) {
    _selectedCategory = category;
    _applyFilters();
  }

  List<SpiritualContent> searchContent(String query) {
    return _allContent.where((content) {
      return content.title.toLowerCase().contains(query.toLowerCase()) ||
          content.saint.toLowerCase().contains(query.toLowerCase()) ||
          content.category.toLowerCase().contains(query.toLowerCase());
    }).toList();
  }

  List<SpiritualContent> getFavoriteContent() {
    return _allContent.where((content) => _likedContent.contains(content.id)).toList();
  }

  List<SpiritualContent> getTrendingContent() {
    // Return first 5 items as trending for demo
    return _allContent.take(5).toList();
  }

  void _applyFilters() {
    _filteredContent = _allContent.where((content) {
      bool matchesSearch = _searchQuery.isEmpty ||
          content.title.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          content.saint.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          content.lyrics.toLowerCase().contains(_searchQuery.toLowerCase());

      bool matchesCategory = _selectedCategory == null ||
          content.category.toLowerCase() == _selectedCategory!.toLowerCase();

      return matchesSearch && matchesCategory;
    }).toList();

    notifyListeners();
  }

  void toggleLike(String contentId) {
    if (_likedContent.contains(contentId)) {
      _likedContent.remove(contentId);
    } else {
      _likedContent.add(contentId);
    }
    _saveLikedContent();
    notifyListeners();
  }

  bool isLiked(String contentId) {
    return _likedContent.contains(contentId);
  }

  Future<void> _loadLikedContent() async {
    final prefs = await SharedPreferences.getInstance();
    final likedIds = prefs.getStringList('liked_content') ?? [];
    _likedContent = Set.from(likedIds);
  }

  Future<void> _saveLikedContent() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList('liked_content', _likedContent.toList());
  }

  List<String> getDeities() {
    Set<String> deities = _allContent.map((content) => content.saint).toSet();
    return deities.toList();
  }
}
