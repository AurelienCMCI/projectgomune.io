/** @jsxImportSource react */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { RegisterForm } from './components/RegisterForm'; 
import HomeScreen from './app/tabs/index';
import { supabase } from './lib/supabase';
import 'react-native-url-polyfill/auto';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // true = affiche HomeScreen directement

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    // Écouter les changements d'auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <PaperProvider>
      <View style={styles.container}>
        {isLoggedIn ? <HomeScreen /> : <RegisterForm />}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
});
