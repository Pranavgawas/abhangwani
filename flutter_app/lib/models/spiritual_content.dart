import 'dart:convert';

class SpiritualContent {
  final String id;
  final String title;
  final String saint;
  final String firstLine;
  final String meaning;
  final String type;
  final String category;
  final String subcategory;
  final String duration;
  final int plays;
  final bool hasAudio;
  final bool isPremium;
  final String audioUrl;
  final String lyrics;
  final String translation;

  SpiritualContent({
    required this.id,
    required this.title,
    required this.saint,
    required this.firstLine,
    required this.meaning,
    required this.type,
    required this.category,
    required this.subcategory,
    required this.duration,
    required this.plays,
    required this.hasAudio,
    required this.isPremium,
    required this.audioUrl,
    required this.lyrics,
    required this.translation,
  });

  factory SpiritualContent.fromMap(Map<String, dynamic> map) {
    return SpiritualContent(
      id: map['id']?.toString() ?? '',
      title: map['title'] ?? '',
      saint: map['saint'] ?? '',
      firstLine: map['firstLine'] ?? '',
      meaning: map['meaning'] ?? '',
      type: map['type'] ?? '',
      category: map['category'] ?? '',
      subcategory: map['subcategory'] ?? '',
      duration: map['duration'] ?? '',
      plays: map['plays'] ?? 0,
      hasAudio: map['hasAudio'] ?? false,
      isPremium: map['isPremium'] ?? false,
      audioUrl: map['audioUrl'] ?? '',
      lyrics: map['lyrics'] ?? '',
      translation: map['translation'] ?? '',
    );
  }

  factory SpiritualContent.fromJson(String source) {
    return SpiritualContent.fromMap(json.decode(source));
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'title': title,
      'saint': saint,
      'firstLine': firstLine,
      'meaning': meaning,
      'type': type,
      'category': category,
      'subcategory': subcategory,
      'duration': duration,
      'plays': plays,
      'hasAudio': hasAudio,
      'isPremium': isPremium,
      'audioUrl': audioUrl,
      'lyrics': lyrics,
      'translation': translation,
    };
  }

  String toJson() => json.encode(toMap());

  @override
  String toString() {
    return 'SpiritualContent(id: $id, title: $title, saint: $saint, type: $type)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is SpiritualContent && other.id == id;
  }

  @override
  int get hashCode {
    return id.hashCode;
  }
}
