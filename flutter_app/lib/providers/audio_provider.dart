import 'package:flutter/foundation.dart';
import 'package:audioplayers/audioplayers.dart';
import '../models/spiritual_content.dart';

class AudioProvider with ChangeNotifier {
  final AudioPlayer _audioPlayer = AudioPlayer();
  SpiritualContent? _currentContent;
  bool _isPlaying = false;
  bool _isPaused = false;
  Duration _duration = Duration.zero;
  Duration _position = Duration.zero;
  double _volume = 1.0;
  bool _isLoading = false;

  SpiritualContent? get currentContent => _currentContent;
  bool get isPlaying => _isPlaying;
  bool get isPaused => _isPaused;
  Duration get duration => _duration;
  Duration get position => _position;
  double get volume => _volume;
  bool get isLoading => _isLoading;
  double get progress => _duration.inMilliseconds > 0 
      ? _position.inMilliseconds / _duration.inMilliseconds 
      : 0.0;

  AudioProvider() {
    _initializeListeners();
  }

  void _initializeListeners() {
    _audioPlayer.onDurationChanged.listen((duration) {
      _duration = duration;
      notifyListeners();
    });

    _audioPlayer.onPositionChanged.listen((position) {
      _position = position;
      notifyListeners();
    });

    _audioPlayer.onPlayerStateChanged.listen((state) {
      _isPlaying = state == PlayerState.playing;
      _isPaused = state == PlayerState.paused;
      _isLoading = state == PlayerState.playing && _position == Duration.zero;
      notifyListeners();
    });

    _audioPlayer.onPlayerComplete.listen((_) {
      _isPlaying = false;
      _position = Duration.zero;
      notifyListeners();
    });
  }

  Future<void> play(SpiritualContent content) async {
    try {
      if (_currentContent?.id != content.id) {
        await _audioPlayer.stop();
        _currentContent = content;
        // In a real app, you would use content.audioUrl
        // For demo, we'll simulate audio playback
        await _audioPlayer.play(AssetSource('audio/demo.mp3'));
      } else if (_isPaused) {
        await _audioPlayer.resume();
      } else {
        await _audioPlayer.play(AssetSource('audio/demo.mp3'));
      }
    } catch (e) {
      print('Error playing audio: $e');
      // Simulate audio for demo
      _simulateAudio(content);
    }
  }

  void _simulateAudio(SpiritualContent content) {
    _currentContent = content;
    _isPlaying = true;
    _duration = _parseDuration(content.duration);
    notifyListeners();
    
    // Simulate progress
    _simulateProgress();
  }

  void _simulateProgress() {
    if (_isPlaying && _position < _duration) {
      Future.delayed(const Duration(seconds: 1), () {
        if (_isPlaying) {
          _position = Duration(seconds: _position.inSeconds + 1);
          notifyListeners();
          if (_position < _duration) {
            _simulateProgress();
          } else {
            _isPlaying = false;
            _position = Duration.zero;
            notifyListeners();
          }
        }
      });
    }
  }

  Duration _parseDuration(String durationStr) {
    final parts = durationStr.split(':');
    if (parts.length == 2) {
      final minutes = int.tryParse(parts[0]) ?? 0;
      final seconds = int.tryParse(parts[1]) ?? 0;
      return Duration(minutes: minutes, seconds: seconds);
    }
    return const Duration(minutes: 3, seconds: 30); // Default duration
  }

  Future<void> pause() async {
    await _audioPlayer.pause();
  }

  Future<void> stop() async {
    await _audioPlayer.stop();
    _currentContent = null;
    _position = Duration.zero;
    notifyListeners();
  }

  Future<void> seek(Duration position) async {
    await _audioPlayer.seek(position);
  }

  void seekToPercent(double percent) {
    final position = Duration(
      milliseconds: (_duration.inMilliseconds * percent).round(),
    );
    seek(position);
  }

  Future<void> setVolume(double volume) async {
    _volume = volume.clamp(0.0, 1.0);
    await _audioPlayer.setVolume(_volume);
    notifyListeners();
  }

  String formatDuration(Duration duration) {
    final minutes = duration.inMinutes;
    final seconds = duration.inSeconds % 60;
    return '${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}';
  }

  @override
  void dispose() {
    _audioPlayer.dispose();
    super.dispose();
  }
}
