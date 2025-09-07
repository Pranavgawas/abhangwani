import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import '../models/user.dart';

class AuthProvider with ChangeNotifier {
  User? _user;
  bool _isLoading = false;
  String? _error;
  bool _isAuthenticated = false;

  User? get user => _user;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isAuthenticated => _isAuthenticated;

  AuthProvider() {
    _loadUserFromStorage();
  }

  Future<void> _loadUserFromStorage() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final userData = prefs.getString('user_data');
      if (userData != null) {
        _user = User.fromJson(userData);
        notifyListeners();
      }
    } catch (e) {
      print('Error loading user data: $e');
    }
  }

  Future<void> checkLoginStatus() async {
    final prefs = await SharedPreferences.getInstance();
    final userJson = prefs.getString('user');
    
    if (userJson != null) {
      final userMap = jsonDecode(userJson);
      _user = User.fromJson(userMap);
      _isAuthenticated = true;
      notifyListeners();
    }
  }

  Future<bool> login(String username, String password) async {
    _setLoading(true);
    _error = null;

    try {
      // Simulate API call
      await Future.delayed(const Duration(seconds: 1));

      if (username == 'admin' && password == '12345') {
        _user = User(
          id: '1',
          username: 'admin',
          name: 'Administrator',
          role: 'admin',
          profilePicture: '',
        );
      } else if (username == 'guest' && password == 'guest') {
        _user = User(
          id: '2',
          username: 'guest',
          name: 'Guest User',
          role: 'user',
          profilePicture: '',
        );
      } else {
        _error = 'Invalid username or password';
        _setLoading(false);
        return false;
      }

      // Save user data
      await _saveUserToStorage();
      _setLoading(false);
      return true;
    } catch (e) {
      _error = 'Login failed. Please try again.';
      _setLoading(false);
      return false;
    }
  }

  Future<void> logout() async {
    _user = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('user_data');
    notifyListeners();
  }

  Future<void> _saveUserToStorage() async {
    if (_user != null) {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('user_data', _user!.toJson());
    }
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void clearError() {
    _error = null;
    notifyListeners();
  }
}
