import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../providers/content_provider.dart';
import '../providers/audio_provider.dart';
import '../models/spiritual_content.dart';

class HomeTab extends StatelessWidget {
  const HomeTab({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('BhaktiSagar'),
        actions: [
          // Language Toggle
          Consumer<ContentProvider>(
            builder: (context, contentProvider, child) {
              return PopupMenuButton<String>(
                icon: const Icon(Icons.language),
                onSelected: (language) {
                  contentProvider.setLanguage(language);
                },
                itemBuilder: (context) => [
                  const PopupMenuItem(
                    value: 'marathi',
                    child: Text('मराठी'),
                  ),
                  const PopupMenuItem(
                    value: 'hindi',
                    child: Text('हिंदी'),
                  ),
                  const PopupMenuItem(
                    value: 'sanskrit',
                    child: Text('संस्कृत'),
                  ),
                ],
              );
            },
          ),
          
          // User Profile
          Consumer<AuthProvider>(
            builder: (context, authProvider, child) {
              return Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8),
                child: CircleAvatar(
                  backgroundColor: Theme.of(context).colorScheme.primary,
                  child: Text(
                    authProvider.user?.username.substring(0, 1).toUpperCase() ?? 'U',
                    style: const TextStyle(color: Colors.white),
                  ),
                ),
              );
            },
          ),
        ],
      ),
      body: Consumer<ContentProvider>(
        builder: (context, contentProvider, child) {
          if (contentProvider.isLoading) {
            return const Center(child: CircularProgressIndicator());
          }

          return SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Welcome Section
                Consumer<AuthProvider>(
                  builder: (context, authProvider, child) {
                    return Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          colors: [
                            Theme.of(context).colorScheme.primary.withOpacity(0.8),
                            Theme.of(context).colorScheme.secondary.withOpacity(0.6),
                          ],
                        ),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Welcome back, ${authProvider.user?.username ?? 'User'}!',
                            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            'Discover spiritual music and devotional content',
                            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              color: Colors.white.withOpacity(0.9),
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                ),
                
                const SizedBox(height: 24),
                
                // Categories Section
                Text(
                  'Categories',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 16),
                
                SizedBox(
                  height: 120,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: contentProvider.categories.length,
                    itemBuilder: (context, index) {
                      final category = contentProvider.categories[index];
                      return Container(
                        width: 100,
                        margin: const EdgeInsets.only(right: 16),
                        child: InkWell(
                          onTap: () {
                            contentProvider.setSelectedCategory(category);
                          },
                          borderRadius: BorderRadius.circular(12),
                          child: Container(
                            decoration: BoxDecoration(
                              color: contentProvider.selectedCategory == category
                                  ? Theme.of(context).colorScheme.primary.withOpacity(0.2)
                                  : Theme.of(context).colorScheme.surface,
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(
                                color: contentProvider.selectedCategory == category
                                    ? Theme.of(context).colorScheme.primary
                                    : Colors.grey.withOpacity(0.3),
                              ),
                            ),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(
                                  _getCategoryIcon(category),
                                  size: 40,
                                  color: contentProvider.selectedCategory == category
                                      ? Theme.of(context).colorScheme.primary
                                      : Colors.grey[600],
                                ),
                                const SizedBox(height: 8),
                                Text(
                                  category,
                                  style: TextStyle(
                                    fontSize: 12,
                                    fontWeight: contentProvider.selectedCategory == category
                                        ? FontWeight.bold
                                        : FontWeight.normal,
                                    color: contentProvider.selectedCategory == category
                                        ? Theme.of(context).colorScheme.primary
                                        : Colors.grey[600],
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ],
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
                
                const SizedBox(height: 24),
                
                // Content List
                Text(
                  'Spiritual Content',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 16),
                
                ListView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: contentProvider.filteredContent.length,
                  itemBuilder: (context, index) {
                    final content = contentProvider.filteredContent[index];
                    return ContentCard(content: content);
                  },
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  IconData _getCategoryIcon(String category) {
    switch (category.toLowerCase()) {
      case 'abhang':
        return Icons.music_note;
      case 'aarti':
        return Icons.local_fire_department;
      case 'stotra':
        return Icons.auto_stories;
      case 'bhajan':
        return Icons.library_music;
      default:
        return Icons.music_note;
    }
  }
}

class ContentCard extends StatelessWidget {
  final SpiritualContent content;

  const ContentCard({super.key, required this.content});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.all(16),
        leading: Container(
          width: 60,
          height: 60,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                Theme.of(context).colorScheme.primary,
                Theme.of(context).colorScheme.secondary,
              ],
            ),
            borderRadius: BorderRadius.circular(12),
          ),
          child: const Icon(
            Icons.music_note,
            color: Colors.white,
            size: 30,
          ),
        ),
        title: Text(
          content.title,
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 4),
            Text('By ${content.saint}'),
            const SizedBox(height: 4),
            Row(
              children: [
                Icon(Icons.timer, size: 16, color: Colors.grey[600]),
                const SizedBox(width: 4),
                Text(
                  content.duration,
                  style: TextStyle(color: Colors.grey[600], fontSize: 12),
                ),
                const SizedBox(width: 16),
                Icon(Icons.category, size: 16, color: Colors.grey[600]),
                const SizedBox(width: 4),
                Text(
                  content.category,
                  style: TextStyle(color: Colors.grey[600], fontSize: 12),
                ),
              ],
            ),
          ],
        ),
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Like Button
            Consumer<ContentProvider>(
              builder: (context, contentProvider, child) {
                final isLiked = contentProvider.isLiked(content.id);
                return IconButton(
                  onPressed: () {
                    contentProvider.toggleLike(content.id);
                  },
                  icon: Icon(
                    isLiked ? Icons.favorite : Icons.favorite_border,
                    color: isLiked ? Colors.red : Colors.grey,
                  ),
                );
              },
            ),
            
            // Play Button
            Consumer<AudioProvider>(
              builder: (context, audioProvider, child) {
                final isCurrentlyPlaying = audioProvider.currentContent?.id == content.id &&
                    audioProvider.isPlaying;
                
                return IconButton(
                  onPressed: () {
                    if (isCurrentlyPlaying) {
                      audioProvider.pause();
                    } else {
                      audioProvider.play(content);
                    }
                  },
                  icon: Icon(
                    isCurrentlyPlaying ? Icons.pause : Icons.play_arrow,
                    color: Theme.of(context).colorScheme.primary,
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
