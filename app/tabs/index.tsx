// app/tabs/index.tsx
// Page d'accueil complète de Gomune
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, StatusBar } from 'react-native';
import { Colors } from '../../constants/Colors';

// Import des composants


export default function HomeScreen() {
  const [playerVisible, setPlayerVisible] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header avec logo, recherche et onglets */}
        <Header />

        {/* Stories */}
        <Stories />

        {/* Activité récente */}
        <ActivitySection />

        {/* Les actualités */}
        <NewsSection />

        {/* Carte promo Gomune */}
        <GomunePromoCard />

        {/* Top Hits Gomune */}
        <TopHitsSection />

        {/* Suggestions Artistes */}
        <SuggestionsSection type="artists" />

        {/* Reels */}
        <ReelsSection />

        {/* Événements à venir */}
        <EventsSection />

        {/* Gomune Premium */}
        <PremiumSection />

        {/* Offres */}
        <OffersSection />

        {/* À la une */}
        <FeaturedSection />

        {/* Artistes populaires */}
        <ArtistsSection />

        {/* Chaînes Gomune */}
        <ChannelsSection />

        {/* Album sponsorisé */}
        <SponsoredAlbumSection />

        {/* Top 20 */}
        <Top20Section />

        {/* Suggestions Amis */}
        <SuggestionsSection type="friends" />

        {/* Clips vidéos */}
        <VideoClipsSection />

        {/* Livres */}
        <BooksSection />

        {/* Top 10 Albums */}
        <Top10AlbumsSection />

        {/* Espace pour le player et la nav */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Mini Player - ouvre le Full Player */}
      <MiniPlayer onPress={() => setPlayerVisible(true)} />

      {/* Navigation */}
      <BottomNav />

      {/* Full Player Modal */}
      <FullPlayer
        visible={playerVisible}
        onClose={() => setPlayerVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 160,
  },
  bottomSpacer: {
    height: 20,
  },
});
