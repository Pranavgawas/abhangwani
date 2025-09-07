import 'dart:convert';

class User {
  final String id;
  final String username;
  final String name;
  final String role;
  final String profilePicture;

  User({
    required this.id,
    required this.username,
    required this.name,
    required this.role,
    required this.profilePicture,
  });

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      id: map['id'] ?? '',
      username: map['username'] ?? '',
      name: map['name'] ?? '',
      role: map['role'] ?? 'user',
      profilePicture: map['profilePicture'] ?? '',
    );
  }

  factory User.fromJson(String source) {
    return User.fromMap(json.decode(source));
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'username': username,
      'name': name,
      'role': role,
      'profilePicture': profilePicture,
    };
  }

  String toJson() => json.encode(toMap());

  bool get isAdmin => role == 'admin';
  bool get isUser => role == 'user';

  @override
  String toString() {
    return 'User(id: $id, username: $username, name: $name, role: $role)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is User && other.id == id;
  }

  @override
  int get hashCode {
    return id.hashCode;
  }
}
