<script setup>
// Halaman ini sekarang menjadi "rumah" bagi semua snippet Halaman Utama
import HeroSection from '../components/HeroSection.vue'
import UpcomingEvents from '../components/UpcomingEvents.vue'
import LatestArticles from '../components/LatestArticles.vue'
import AboutSnippet from '../components/AboutSnippet.vue'
import InstagramFeed from '../components/InstagramFeed.vue'
</script>

<template>
  <!-- 
    Semua komponen yang sebelumnya ada di App.vue, 
    sekarang dipindahkan ke 'Halaman Home'
  -->
  <HeroSection />
  <UpcomingEvents />
  <LatestArticles />
  <AboutSnippet />
  <InstagramFeed />
</template>