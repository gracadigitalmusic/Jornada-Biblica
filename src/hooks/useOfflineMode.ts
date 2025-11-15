import { useState, useEffect, useCallback } from 'react';
import { FALLBACK_QUESTIONS } from '@/data/questions';

export function useOfflineMode() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isDataCached, setIsDataCached] = useState(false);
  const [isServiceWorkerReady, setIsServiceWorkerReady] = useState(false);

  // Monitora status da conexão
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Registra e gerencia o service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registrado:', registration);
          setIsServiceWorkerReady(true);

          // Verifica se há atualizações
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // Nova versão disponível
                  if (confirm('Nova versão disponível! Deseja atualizar agora?')) {
                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('Erro ao registrar Service Worker:', error);
        });
    }
  }, []);

  // Verifica se os dados estão em cache
  useEffect(() => {
    if ('caches' in window) {
      caches.has('divine-wisdom-offline-v1').then((hasCache) => {
        setIsDataCached(hasCache);
      });
    }
  }, []);

  // Faz download das perguntas para cache offline
  const downloadForOffline = useCallback(async () => {
    if (!isServiceWorkerReady || !navigator.serviceWorker.controller) {
      throw new Error('Service Worker não está pronto');
    }

    try {
      // Envia as perguntas para o service worker cachear
      navigator.serviceWorker.controller.postMessage({
        type: 'CACHE_QUESTIONS',
        questions: FALLBACK_QUESTIONS,
      });

      // Aguarda um pouco para garantir que foi cacheado
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsDataCached(true);
      return true;
    } catch (error) {
      console.error('Erro ao fazer download offline:', error);
      throw error;
    }
  }, [isServiceWorkerReady]);

  // Carrega perguntas do cache offline
  const loadOfflineQuestions = useCallback(async () => {
    if ('caches' in window) {
      try {
        const cache = await caches.open('divine-wisdom-offline-v1');
        const response = await cache.match('/offline-questions');
        
        if (response) {
          const questions = await response.json();
          return questions;
        }
      } catch (error) {
        console.error('Erro ao carregar perguntas offline:', error);
      }
    }
    
    // Fallback para as perguntas normais
    return FALLBACK_QUESTIONS;
  }, []);

  // Limpa cache offline
  const clearOfflineCache = useCallback(async () => {
    if ('caches' in window) {
      await caches.delete('divine-wisdom-offline-v1');
      setIsDataCached(false);
    }
  }, []);

  return {
    isOffline,
    isDataCached,
    isServiceWorkerReady,
    downloadForOffline,
    loadOfflineQuestions,
    clearOfflineCache,
  };
}
